import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'


export function RemoteEmployeeServices() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Remote Employee Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide experienced staff members to take care of dedicated tasks for your practice.
          </p>
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg inline-block">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              Only for $500/week
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dedicated Remote Staff for Your Practice
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our experienced remote employees become an extension of your team, handling dedicated tasks 
              with professionalism and expertise. Focus on growing your practice while we handle the operational details.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Experienced professionals for your specific needs
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Dedicated staff working exclusively for your practice
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Transparent pricing with no hidden fees
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Flexible engagement models
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Hire Remote Staff
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Remote Employee Services"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our Remote Employees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <CardTitle>Dedicated Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get experienced professionals working exclusively on your practice's tasks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💵</span>
                </div>
                <CardTitle>Cost Effective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Only $500/week for a dedicated staff member - much less than a full-time employee.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Focus on Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Free up your time to focus on patient care and practice growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            No contracts, no hidden fees
          </p>
          <div className="bg-white dark:bg-slate-700 rounded-xl p-8 max-w-md mx-auto shadow-lg">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">$500</div>
            <div className="text-gray-600 dark:text-gray-300 mb-6">per week</div>
            <ul className="space-y-3 text-left mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Dedicated remote staff member
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                40 hours per week
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Trained for medical practice tasks
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Weekly performance reports
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

