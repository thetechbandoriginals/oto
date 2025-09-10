export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Notice</h1>
        <p className="text-gray-600 mb-8">Last updated: December 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files that are stored on your device when you visit our website. They help us
              provide you with a better experience by remembering your preferences and understanding how you use our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-700">
                  These cookies are necessary for the website to function properly. They enable core functionality such
                  as security, network management, and accessibility.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                <p className="text-gray-700">
                  These cookies help us understand how visitors interact with our website by collecting and reporting
                  information anonymously.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-700">
                  These cookies enable the website to provide enhanced functionality and personalization, such as
                  remembering your login details and preferences.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="text-gray-700 mb-4">You can control and manage cookies in various ways:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
              <li>Third-party tools: Use privacy tools to manage tracking cookies</li>
              <li>Opt-out links: Use opt-out mechanisms provided by advertising networks</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700">
              We may use third-party services that set cookies on your device. These include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
              <li>Google Analytics for website analytics</li>
              <li>Payment processors for secure transactions</li>
              <li>Customer support tools for better service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Notice</h2>
            <p className="text-gray-700">
              We may update this Cookie Notice from time to time. Any changes will be posted on this page with an
              updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">If you have any questions about our use of cookies, please contact us at:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="text-gray-700">Email: privacy@oto.co.ke</p>
              <p className="text-gray-700">Phone: +254 700 123 456</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
