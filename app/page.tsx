import { Navigation } from "@/components/navigation"
import { InsuranceForm } from "@/components/insurance-form"
import { Car, Shield, BarChart3, Instagram, Facebook, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-12 flex flex-col items-center min-h-[60vh] justify-center">
            {/* Title and Description - Now on top */}
            <div className="text-center space-y-6 pt-16">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
                Get Your <span className="italic underline">Car Insurance</span> in{" "}
                <span className="text-primary">3 Simple Steps</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty max-w-4xl mx-auto">
                Your Details, Vehicle Details, Choose Insurance then Pay via M-Pesa Fast & Secure
              </p>
            </div>

            {/* Form - Now below title and description */}
            <div className="w-full md:w-[80%]">
              <InsuranceForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Why Choose OTO?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-white hover:border-white/80 transition-colors bg-transparent">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Easy Vehicle Registration</h3>
                <p className="text-white/90">
                  Enter your reg number and details – we'll verify with NTSA. No paperwork hassles.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-white hover:border-white/80 transition-colors bg-transparent">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Instant Insurance Purchase</h3>
                <p className="text-white/90">
                  Get quotes from top insurers. Pay with M-Pesa and receive your policy by email in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-white hover:border-white/80 transition-colors bg-transparent">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Simple Dashboard Access</h3>
                <p className="text-white/90">
                  View your insurance cover details, vehicle info, and policy documents anytime in your personal
                  dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {/* Section 1: Logo and Tagline */}
            <div className="space-y-4">
              <Image src="/oto-logo.png" alt="OTO Logo" width={112} height={45} className="h-10 w-auto" priority />
              <p className="text-sm text-muted-foreground">
                Fast, secure car insurance for Kenya. Get covered in minutes.
              </p>
            </div>

            {/* Section 2: Help Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Help</h4>
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
                  Contacts
                </Link>
              </div>
            </div>

            {/* Section 3: Social Media */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Stalk Us</h4>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Section 4: Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Links</h4>
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
              </div>
              <p className="text-xs text-muted-foreground">© 2025 OTO.co.ke. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
