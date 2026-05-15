import { Navigation } from '@/components/navigation'
import { PriceEstimator } from '@/components/price-estimator'
import { Footer } from '@/components/footer'

export default function WardrobePC() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <PriceEstimator initialCategory="wardrobe" />
      </main>
      <Footer />
    </>
  )
}
