import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function MarketingFooter() {
  return (
    <footer className="bg-burgundy-deep text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              The AI localization & creative infrastructure platform empowering African creators, filmmakers, musicians, and brands worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white-300">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><Link href="/video" className="hover:text-white transition-colors">AI Video Dubbing</Link></li>
              <li><Link href="/voice" className="hover:text-white transition-colors">AI Voice</Link></li>
              <li><Link href="/music" className="hover:text-white transition-colors">AI Music Box</Link></li>
              <li><Link href="/voice" className="hover:text-white transition-colors">Voiceover</Link></li>
              <li><a href="#voices" className="hover:text-white transition-colors">African Voices</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white-300">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white-300">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 YiCORA Inc. All rights reserved.</p>
          <p>Built with ❤️ for African Creators.</p>
        </div>
      </div>
    </footer>
  );
}
