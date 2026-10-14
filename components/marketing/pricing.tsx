"use client";

import { motion } from "framer-motion";
import { PricingOptions } from "@/components/billing/pricing-options";

export function Pricing() {
  return <motion.section id="pricing" className="bg-[#fcfbfe] px-4 py-16 text-darktext sm:py-20 lg:py-24" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
    <div className="mx-auto w-full max-w-7xl"><PricingOptions /></div>
  </motion.section>;
}
