import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function CookiePolicy() {
  return (
    <>
      <Navigation />
      <main className="bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 leading-tight">
              Cookie <span className="text-[#ee6669] italic">Policy</span>
            </h1>
            <p className="text-zinc-500 font-light italic">Last Updated: May 25, 2026</p>
          </div>

          <div className="prose prose-zinc prose-sm lg:prose-base max-w-none space-y-8 text-zinc-600 font-light leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">1. What are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences, understand how you use our site, and improve your overall experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">2. How We Use Cookies</h2>
              <p>
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function correctly, such as maintaining your session.</li>
                <li><strong>Performance Cookies:</strong> We use tools like Google Analytics to understand how visitors move around our website. This helps us optimize the site structure and content.</li>
                <li><strong>Functional Cookies:</strong> These allow us to remember your choices (like your preferred city) to provide a more personalized experience.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">3. Third-Party Cookies</h2>
              <p>
                Some cookies are placed by third-party services that appear on our pages, such as YouTube for videos or Google Maps for our location. These third parties have their own privacy and cookie policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">4. Managing Your Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can choose to block all cookies or only those from specific sites. Please note that disabling cookies may affect the functionality of some parts of our website.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-100">
              <p className="text-sm font-medium text-zinc-900">Questions?</p>
              <p className="text-sm">
                For more information on how we use cookies, please contact us at <a href="mailto:grospaceinteriors@gmail.com" className="text-[#ee6669] hover:underline">grospaceinteriors@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
