import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { TrustStrip } from '@/components/trust-strip'
import { WhyGrospaceInteriors } from '@/components/why-choose-section'
import { OneStopShop } from '@/components/one-stop-shop'
import { InspirationGallery } from '@/components/inspiration-gallery'
import { ShopSection } from '@/components/shop-section'
import { PriceEstimator } from '@/components/price-estimator'
import { ProcessSection } from '@/components/process-section'
import { ProjectsSection } from '@/components/projects-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { FAQSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip">
        <HeroSection />
        <TrustStrip />
        <WhyGrospaceInteriors />
        <OneStopShop />
        <InspirationGallery />
        <ShopSection />
        <PriceEstimator />
        <ProcessSection />
        <ProjectsSection limit={4} />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
