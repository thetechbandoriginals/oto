import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MessageCircle, Search } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help You?</h1>
          <p className="text-lg text-gray-600 mb-8">Get quick answers to your questions or contact our support team</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search for help topics..." className="pl-10 py-3 text-lg" />
          </div>
        </div>
      </section>

      {/* Quick Help Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Speak directly with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">+254 700 123 456</p>
                <p className="text-sm text-gray-600">Mon-Fri: 8AM-6PM</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Get help via email within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">support@oto.co.ke</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with us in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Available 24/7</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I purchase car insurance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Simply fill out our 3-step form on the homepage with your details, vehicle information, and choose
                    your preferred insurance package. Payment can be made via M-Pesa for instant coverage.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What documents do I need?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You'll need your ID number, KRA PIN, vehicle registration details, and a valid phone number for
                    M-Pesa payments.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How quickly is my policy activated?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your insurance policy is activated immediately after successful payment. You'll receive your
                    certificate via SMS and email within minutes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I make claims online?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! Log into your dashboard to file claims, track their progress, and upload supporting documents.
                    Our team will process your claim within 48 hours.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We accept M-Pesa, bank transfers, and major credit/debit cards. M-Pesa is our recommended method for
                    instant policy activation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mt-16">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Still Need Help?</CardTitle>
                <CardDescription>Send us a message and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="What's this about?" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea placeholder="Describe your issue or question..." rows={5} />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
