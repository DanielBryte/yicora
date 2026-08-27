import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function MarketingFooter() {
  return (
    <footer className="bg-[#23001C] text-white pt-20 pb-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 sm:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Logo variant="light" />
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xs leading-relaxed font-normal">
              The AI localization infrastructure for African creative content.
            </p>
          </div>

          {/* Products Links */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">Products</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-normal">
              <li><Link href="/video" className="hover:text-white transition-colors">AI Video Dubbing</Link></li>
              <li><Link href="/voice" className="hover:text-white transition-colors">AI Text-to-Speech</Link></li>
              <li><Link href="/voice" className="hover:text-white transition-colors">AI Voice Over</Link></li>
              <li><Link href="/music" className="hover:text-white transition-colors">AI Music Box</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Face Changer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Voice Clone</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">Company</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">Resources</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feature Request</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight">Legal</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10 text-center text-[11px] sm:text-xs text-neutral-400 font-medium tracking-wide">
          <p>© 2026 YiCORA. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
