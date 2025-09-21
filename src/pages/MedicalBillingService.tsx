import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export function MedicalBillingService() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Medical Billing Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We take care of your entire billing cycle providing significant increase in revenue.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://thespark.pro/wp-content/uploads/2024/09/1-3.webp" 
              alt="Medical Billing Service"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Maximize Your Practice Revenue
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our staff works closely with your office to maximize cashflow and minimize unpaid claims rate.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Complete billing cycle management
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Significant revenue increase
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Cashflow optimization
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Reduced unpaid claims rate
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started Today
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How We Help Your Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <CardTitle>Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Significant increase in revenue through optimized billing processes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💸</span>
                </div>
                <CardTitle>Cashflow Maximization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team works closely with yours to ensure optimal cashflow.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📉</span>
                </div>
                <CardTitle>Reduced Unpaid Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Minimize your unpaid claims rate with our expert management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
};
