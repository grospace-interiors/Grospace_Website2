import { Navigation } from '@/components/navigation'
import { PriceEstimator } from '@/components/price-estimator'
import { Footer } from '@/components/footer'

export default function HomeInteriorPC() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-clip pt-20">
        <PriceEstimator initialCategory="home" />
      </main>
      <Footer />
    </>
  )
}
