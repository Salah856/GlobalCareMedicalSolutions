import { Button } from './ui/button'
export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Global Care Medical Solutions
              <span className="block text-blue-600 dark:text-blue-400">
                Your Prescription for Medical Growth 
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Streamline your healthcare revenue cycle with our comprehensive medical billing services. 
              We help healthcare providers maximize their revenue while reducing administrative burden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://thespark.pro/wp-content/uploads/2024/09/medical-billing.webp" 
              alt="Medical Billing Services" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}