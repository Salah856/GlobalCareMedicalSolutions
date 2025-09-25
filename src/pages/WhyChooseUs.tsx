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
        {/* Animated Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 
                        animate-fade-in-up">
            Why Choose Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto
                       animate-fade-in-up animate-delay-200">
            Discover why healthcare providers trust The Spark for their medical billing needs.
          </p>
        </div>

        {/* Animated Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg
                        hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2
                        animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="text-4xl mb-4 animate-bounce-in">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3
                           animate-slide-in-left">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 animate-fade-in">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional: Animated decorative elements */}
        <div className="flex justify-center space-x-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-400"></div>
        </div>
      </div>
    </div>
  )
};