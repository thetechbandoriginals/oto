import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Component */}
      <Navigation />

      {/* Top padding to account for fixed navigation */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team. We're here to help with your car insurance needs.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="flex items-center p-6">
                      <Phone className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <p className="text-gray-600">+254 700 123 456</p>
                        <p className="text-sm text-gray-500">Mon-Fri: 8AM-6PM</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-center p-6">
                      <Mail className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-gray-600">support@oto.co.ke</p>
                        <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-center p-6">
                      <MapPin className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">Office</h3>
                        <p className="text-gray-600">Nairobi, Kenya</p>
                        <p className="text-sm text-gray-500">Visit by appointment</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-center p-6">
                      <Clock className="h-8 w-8 text-primary mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">Business Hours</h3>
                        <p className="text-gray-600">Monday - Friday: 8AM - 6PM</p>
                        <p className="text-gray-600">Saturday: 9AM - 2PM</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <Input placeholder="Enter your first name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input placeholder="Enter your last name" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" placeholder="Enter your email address" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input placeholder="0712345678" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input placeholder="What's this regarding?" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea placeholder="Tell us how we can help you..." rows={6} />
                    </div>

                    <Button className="w-full">Send Message</Button>

                    <p className="text-sm text-gray-500 text-center">
                      We'll respond to your message within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
