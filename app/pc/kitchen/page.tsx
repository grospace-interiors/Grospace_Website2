import { Navigation } from '@/components/navigation'
import { PriceEstimator } from '@/components/price-estimator'
import { Footer } from '@/components/footer'

export default function KitchenPC() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip pt-20">
        <PriceEstimator initialCategory="kitchen" />
      </main>
      <Footer />
    </>
  )
}
