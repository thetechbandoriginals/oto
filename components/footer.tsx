import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Image src="/oto-logo.png" alt="Oto Auto Hub" width={120} height={48} className="h-10 w-auto" priority />
            <p className="text-muted-foreground text-sm">
              Your trusted partner for fast, reliable car insurance in Kenya.
            </p>
          </div>

          {/* Help Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Help</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Need Help?
              </Link>
              <Link
                href="/help#faqs"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                FAQs
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stalk Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Links</h3>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Notice
              </Link>
              <p className="text-xs text-muted-foreground">© 2024 Oto Auto Hub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
