import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <main className="bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-4 mb-12">
            <h1 className="text-4xl lg:text-6xl font-serif font-light text-zinc-900 leading-tight">
              Privacy <span className="text-[#ee6669] italic">Policy</span>
            </h1>
            <p className="text-zinc-500 font-light italic">Last Updated: May 25, 2026</p>
          </div>

          <div className="prose prose-zinc prose-sm lg:prose-base max-w-none space-y-8 text-zinc-600 font-light leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">1. Our Commitment to Your Privacy</h2>
              <p>
                At Grospace Interiors, your trust is the foundation of our work. We respect your privacy and are committed to protecting the personal information you share with us. This policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">2. Information We Collect</h2>
              <p>
                We only collect information that is necessary to provide you with the best interior design experience. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Identity Information:</strong> Name, phone number, and email address shared via our contact forms or price calculator.</li>
                <li><strong>Project Details:</strong> Information about your home, BHK type, preferences, and budget shared during the estimation process.</li>
                <li><strong>Usage Data:</strong> Anonymous information about how you interact with our website (e.g., pages visited) to help us improve our user experience.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">3. How We Use Your Information</h2>
              <p>
                Your data is used exclusively to serve you better:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide personalized design consultations and accurate price estimates.</li>
                <li>To contact you via Phone, WhatsApp, or Email regarding your project inquiries.</li>
                <li>To share updates, newsletters, or promotional offers that we believe will be of value to you (only if you've opted in).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">4. Data Security & Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We use industry-standard security measures to protect your data from unauthorized access. Your information is only accessible to authorized team members who need it to fulfill your project requirements.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-light text-zinc-900 border-b border-zinc-100 pb-2">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or request the deletion of your personal data at any time. If you wish to stop receiving communications from us, you can unsubscribe using the links provided in our emails or by contacting us directly at <a href="mailto:grospaceinteriors@gmail.com" className="text-[#ee6669] hover:underline">grospaceinteriors@gmail.com</a>.
              </p>
            </section>

            <section className="space-y-4 pt-8">
              <p className="text-sm italic">
                By using our website, you consent to our Privacy Policy. If we make changes to this policy, we will update the date at the top of this page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
