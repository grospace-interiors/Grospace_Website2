import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white text-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-zinc-900 text-balance">
                Design rooted in material, detail, and execution.
              </h2>
              <div className="w-16 h-0.5 bg-primary" />
            </div>

            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>
                Founded by Nandlal Kushwaha, <span className="text-zinc-900 font-medium">Grospace Interiors</span> represents "Growing Spaces"—our commitment to transforming ordinary houses into smart, modern, and well-designed living spaces.
              </p>
              <p>
                Based in Bhopal, we specialize in creating functional and space-efficient interiors that look premium without overspending. Whether it's a new 2BHK or 3BHK home, our goal is to help you grow your living experience through thoughtful design.
              </p>
              <p>
                From modular kitchens to full home execution, we provide practical solutions that focus on quality materials and meticulous on-site delivery.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 lg:h-[500px] overflow-hidden order-1 lg:order-2">
            <Image
              src="/about-grospace.jpg"
              alt="Grospace interior design detail and materials"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
