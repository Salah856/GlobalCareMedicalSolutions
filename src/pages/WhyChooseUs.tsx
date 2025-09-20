// src/pages/WhyChooseUs.tsx
export function WhyChooseUs() {
  const features = [
    {
      title: "Expert Team",
      description: "Our team consists of experienced medical billing professionals with deep industry knowledge.",
      icon: "👥"
    },
    {
      title: "Advanced Technology",
      description: "We use cutting-edge technology to ensure accurate and efficient billing processes.",
      icon: "💻"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support to address your concerns and questions promptly.",
      icon: "🔄"
    },
    {
      title: "Cost Effective",
      description: "Affordable solutions that maximize your revenue without breaking your budget.",
      icon: "💰"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover why healthcare providers trust The Spark for their medical billing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}; 

