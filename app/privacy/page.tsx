export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              At OTO, we collect information you provide directly to us, such as when you create an account, purchase
              insurance, or contact us for support. This includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Personal identification information (Name, ID number, KRA PIN)</li>
              <li>Contact information (Email address, phone number, physical address)</li>
              <li>Vehicle information (Registration details, make, model, year)</li>
              <li>Payment information (M-Pesa details, transaction records)</li>
              <li>Usage data (How you interact with our services)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide, maintain, and improve our insurance services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Comply with legal obligations and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With insurance underwriters to process your policy</li>
              <li>With payment processors to handle transactions</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. This includes encryption of sensitive data and regular
              security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>File a complaint with relevant authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700">If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-gray-700">Email: privacy@oto.co.ke</p>
              <p className="text-gray-700">Phone: +254 700 123 456</p>
              <p className="text-gray-700">Address: Nairobi, Kenya</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
