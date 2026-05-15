import { Shield, Clock, Home, MapPin } from 'lucide-react'

export function TrustBar() {
  const stats = [
    {
      icon: MapPin,
      label: 'Bhopal-Based Team',
      description: 'Local expertise you can trust',
    },
    {
      icon: Shield,
      label: '10-Year Warranty',
      description: 'Quality materials & durability',
    },
    {
      icon: Clock,
      label: 'On-Time Delivery',
      description: 'Move in on your schedule',
    },
    {
      icon: Home,
      label: '50+ Happy Families',
      description: 'Trusted across the city',
    },
  ]

  return (
    <div className="w-full bg-[#0F0F0F] border-y border-white/5 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index} 
                className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4 group"
              >
                <div className="flex-shrink-0 p-2 md:p-3 bg-white/5 rounded-none group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white tracking-wide uppercase">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-500 font-light">
                    {stat.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
