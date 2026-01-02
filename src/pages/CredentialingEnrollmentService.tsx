import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { motion } from 'framer-motion'


const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

export function CredentialingEnrollment() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Credentialing & Enrollment Services
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We take care of your enrollments and insurance credentialing services for a very competitive rate.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="https://thespark.pro/wp-content/uploads/2024/09/7.jpg" 
              alt="Credentialing and Enrollment"
              className="rounded-lg shadow-lg w-full h-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Get Enrolled with Major Payers
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              Our credentialing experts handle the entire enrollment process with insurance companies, 
              ensuring you're properly credentialed and ready to accept patients from major payers.
            </motion.p>

            <motion.ul 
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="space-y-3 mb-8"
            >
              {[
                "Complete application preparation",
                "Insurance panel enrollment",
                "CAQH profile management",
                "Recredentialing services",
                "Status tracking and follow-up"
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center text-gray-600 dark:text-gray-300"
                >
                  <span className="text-green-500 mr-2">✓</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp}>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = '/book-consultation'}
              >
                Start Credentialing
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Uncomment when you want insurers section with animation */}
        {/*
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Major Insurance Networks We Handle
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Humana', 'Tricare'].map((insurer, i) => (
              <motion.div 
                key={insurer}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <p className="font-semibold text-gray-900 dark:text-white">{insurer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}

      </div>
    </div>
  )
};


