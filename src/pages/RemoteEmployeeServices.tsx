import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { motion } from 'framer-motion'

export function RemoteEmployeeServices() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Remote Employee Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide experienced staff members to take care of dedicated tasks for your practice.
          </p>
          <motion.div 
            className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg inline-block"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              Only for $500/week
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dedicated Remote Staff for Your Practice
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our experienced remote employees become an extension of your team, handling dedicated tasks 
              with professionalism and expertise. Focus on growing your practice while we handle the operational details.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Experienced professionals for your specific needs",
                "Dedicated staff working exclusively for your practice",
                "Transparent pricing with no hidden fees",
                "Flexible engagement models"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = '/book-consultation'}
              >
                Hire Remote Staff
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Remote Employee Services"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our Remote Employees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "Dedicated Expertise",
                desc: "Get experienced professionals working exclusively on your practice's tasks."
              },
              {
                icon: "💵",
                title: "Cost Effective",
                desc: "Only $500/week for a dedicated staff member - much less than a full-time employee."
              },
              {
                icon: "⚡",
                title: "Focus on Growth",
                desc: "Free up your time to focus on patient care and practice growth."
              }
            ].map((card, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{card.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            No contracts, no hidden fees
          </p>
          <motion.div 
            className="bg-white dark:bg-slate-700 rounded-xl p-8 max-w-md mx-auto shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">$500</div>
            <div className="text-gray-600 dark:text-gray-300 mb-6">per week</div>
            <ul className="space-y-3 text-left mb-8">
              {[
                "Dedicated remote staff member",
                "40 hours per week",
                "Trained for medical practice tasks",
                "Weekly performance reports"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3"
                onClick={() => window.location.href = '/book-consultation'}
              >
                Get Started Now
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
};

