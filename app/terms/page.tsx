import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function TermsAndConditions() {
  return (
    <>
      <Navigation />
      <main className="bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 leading-tight">
              Terms & <span className="text-[#ee6669] italic">Conditions</span>
            </h1>
            <p className="text-zinc-500 font-light italic">Last Updated: May 25, 2026</p>
          </div>

          <div className="prose prose-zinc prose-sm lg:prose-base max-w-none space-y-8 text-zinc-600 font-light leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Grospace Interiors website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our website and services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">2. Services and Estimates</h2>
              <p>
                The information provided on our website, including the Price Calculator results, is for informational purposes only. While we strive for accuracy, all estimates are preliminary and subject to change based on actual site conditions, material availability, and final design approvals.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">3. Intellectual Property</h2>
              <p>
                All content on this website, including designs, images, logos, and text, is the property of Grospace Interiors or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">4. User Conduct</h2>
              <p>
                You agree to use our website only for lawful purposes. You are prohibited from sharing misleading information, attempting to gain unauthorized access to our systems, or using the website in any way that could damage or impair its functionality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">5. Limitation of Liability</h2>
              <p>
                Grospace Interiors shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or the inability to use our services. We do not guarantee that the website will be free from errors or interruptions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-100">
              <p className="text-sm font-medium text-zinc-900">Contact Us</p>
              <p className="text-sm">
                If you have any questions about these Terms & Conditions, please reach out to us at <a href="mailto:grospaceinteriors@gmail.com" className="text-[#ee6669] hover:underline">grospaceinteriors@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
