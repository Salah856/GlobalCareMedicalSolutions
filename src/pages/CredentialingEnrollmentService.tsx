// src/pages/CredentialingEnrollment.tsx
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

export function CredentialingEnrollment() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Credentialing & Enrollment Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We take care of your enrollments and insurance credentialing services for a very competitive rate.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            {/* <img 
              src="https://thespark.pro/wp-content/uploads/2024/09/credentialling.jpg" 
              alt="Credentialing and Enrollment"
              className="rounded-lg shadow-lg w-full h-auto"
            /> */}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Get Enrolled with Major Payers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our credentialing experts handle the entire enrollment process with insurance companies, 
              ensuring you're properly credentialed and ready to accept patients from major payers.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Complete application preparation
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Insurance panel enrollment
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                CAQH profile management
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Recredentialing services
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span>
                Status tracking and follow-up
              </li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Credentialing
            </Button>
          </div>
        </div>

        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Major Insurance Networks We Handle
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Humana', 'Tricare'].map((insurer) => (
              <Card key={insurer} className="text-center">
                <CardContent className="p-6">
                  <p className="font-semibold text-gray-900 dark:text-white">{insurer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  )
};

