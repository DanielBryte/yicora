-- Shared wallet and Bachs checkout fulfillment.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS plan_access_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS lifetime_access BOOLEAN NOT NULL DEFAULT false;

-- The legacy owner-update policy allowed users to overwrite their own balance.
-- All profile writes are now performed server-side so credits and paid access cannot be self-granted.
REVOKE UPDATE ON public.profiles FROM anon, authenticated;

CREATE TABLE IF NOT EXISTS public.billing_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  checkout_id TEXT UNIQUE,
  event_id TEXT UNIQUE,
  product_key TEXT NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('USD','NGN')),
  amount NUMERIC(12,2) NOT NULL,
  estimated_commission NUMERIC(12,2) NOT NULL DEFAULT 0,
  credits INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS billing_orders_user_created_idx ON public.billing_orders(user_id, created_at DESC);
ALTER TABLE public.billing_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own billing orders" ON public.billing_orders FOR SELECT USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.debit_credits(p_user_id UUID, p_amount INTEGER, p_description TEXT)
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE remaining INTEGER;
BEGIN
  IF p_amount <= 0 THEN RAISE EXCEPTION 'Invalid credit amount'; END IF;
  UPDATE profiles SET credits = credits - p_amount, updated_at = NOW()
    WHERE id = p_user_id AND credits >= p_amount RETURNING credits INTO remaining;
  IF remaining IS NULL THEN RAISE EXCEPTION 'INSUFFICIENT_CREDITS'; END IF;
  INSERT INTO credit_transactions(user_id, amount, type, description)
    VALUES (p_user_id, -p_amount, 'debit', p_description);
  RETURN remaining;
END; $$;

CREATE OR REPLACE FUNCTION public.refund_credits(p_user_id UUID, p_amount INTEGER, p_description TEXT)
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE remaining INTEGER;
BEGIN
  UPDATE profiles SET credits = credits + p_amount, updated_at = NOW()
    WHERE id = p_user_id RETURNING credits INTO remaining;
  IF remaining IS NULL THEN RAISE EXCEPTION 'Profile not found'; END IF;
  INSERT INTO credit_transactions(user_id, amount, type, description)
    VALUES (p_user_id, p_amount, 'refund', p_description);
  RETURN remaining;
END; $$;

CREATE OR REPLACE FUNCTION public.fulfill_billing_order(
  p_checkout_id TEXT, p_event_id TEXT, p_amount NUMERIC, p_currency TEXT
) RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE o billing_orders%ROWTYPE; next_until TIMESTAMPTZ;
BEGIN
  SELECT * INTO o FROM billing_orders WHERE checkout_id = p_checkout_id FOR UPDATE;
  IF NOT FOUND THEN RETURN FALSE; END IF;
  IF o.status = 'paid' THEN RETURN TRUE; END IF;
  IF o.currency <> p_currency OR ABS(o.amount - p_amount) > 0.01 THEN
    RAISE EXCEPTION 'Payment amount or currency mismatch';
  END IF;
  UPDATE billing_orders SET status='paid', event_id=p_event_id, paid_at=NOW() WHERE id=o.id;
  IF o.credits > 0 THEN
    UPDATE profiles SET credits=credits+o.credits, updated_at=NOW() WHERE id=o.user_id;
    INSERT INTO credit_transactions(user_id, amount, type, description)
      VALUES (o.user_id, o.credits, 'credit', 'Credit purchase: ' || o.product_key);
  END IF;
  IF o.product_key = 'lifetime' THEN
    UPDATE profiles SET plan='lifetime', lifetime_access=true, plan_access_until=NULL WHERE id=o.user_id;
  ELSIF o.product_key IN ('monthly','yearly') THEN
    next_until := GREATEST(COALESCE((SELECT plan_access_until FROM profiles WHERE id=o.user_id), NOW()), NOW())
      + CASE WHEN o.product_key='monthly' THEN INTERVAL '1 month' ELSE INTERVAL '1 year' END;
    UPDATE profiles SET plan=o.product_key, plan_access_until=next_until WHERE id=o.user_id;
  END IF;
  RETURN TRUE;
END; $$;

REVOKE ALL ON FUNCTION public.debit_credits(UUID,INTEGER,TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.refund_credits(UUID,INTEGER,TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.fulfill_billing_order(TEXT,TEXT,NUMERIC,TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.debit_credits(UUID,INTEGER,TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.refund_credits(UUID,INTEGER,TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.fulfill_billing_order(TEXT,TEXT,NUMERIC,TEXT) TO service_role;
