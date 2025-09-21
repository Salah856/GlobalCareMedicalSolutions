import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'


export function EligibilityVerification() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Eligibility Verification & Authorizations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            For practices with increased patient volume requiring a dedicated employee 
            for Eligibility and Authorizations.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Eligibility Verification and Authorizations"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dedicated Verification Experts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We guarantee outstanding and accurate services helping you maintain clean 
              claim ratio and timely claims payments.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Dedicated specialists for high-volume practices
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Accurate eligibility verification
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Authorization management
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Improved clean claim ratio
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Timely claims payments
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Optimize Your Verification Process
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How Our Service Benefits Your Practice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <CardTitle>Handle Increased Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Specialized support for practices experiencing growth in patient volume.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <CardTitle>Accuracy Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  We guarantee outstanding and accurate verification services.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💸</span>
                </div>
                <CardTitle>Timely Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Maintain clean claim ratios and ensure timely claims payments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Verification Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Patient Data Collection</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Systematic gathering of patient insurance information
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Insurance Verification</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Confirm coverage, benefits, and eligibility with payers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Authorization Management</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Obtain necessary pre-authorizations for services
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Documentation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete records for clean claims submission
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Improve Your Verification Process?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Our dedicated eligibility and authorization specialists will help you manage increased 
            patient volume while maintaining accuracy and timely payments.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  )
};
