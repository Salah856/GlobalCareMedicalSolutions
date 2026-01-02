import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function EligibilityVerification() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
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
            Eligibility Verification & Authorizations
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            For practices with increased patient volume requiring a dedicated employee 
            for Eligibility and Authorizations.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Eligibility Verification and Authorizations"
              className="rounded-lg shadow-lg w-full h-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>

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
              Dedicated Verification Experts
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              We guarantee outstanding and accurate services helping you maintain clean 
              claim ratio and timely claims payments.
            </motion.p>

            <motion.ul 
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="space-y-3 mb-8"
            >
              {[
                "Dedicated specialists for high-volume practices",
                "Accurate eligibility verification",
                "Authorization management",
                "Improved clean claim ratio",
                "Timely claims payments"
              ].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  variants={fadeInUp}
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
                Optimize Your Verification Process
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Benefits Section */}
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
            How Our Service Benefits Your Practice
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { icon: "📈", title: "Handle Increased Volume", desc: "Specialized support for practices experiencing growth in patient volume." },
              { icon: "✅", title: "Accuracy Guaranteed", desc: "We guarantee outstanding and accurate verification services." },
              { icon: "💸", title: "Timely Payments", desc: "Maintain clean claim ratios and ensure timely claims payments." }
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {card.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div 
          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Our Verification Process
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Patient Data Collection", desc: "Systematic gathering of patient insurance information" },
              { step: "2", title: "Insurance Verification", desc: "Confirm coverage, benefits, and eligibility with payers" },
              { step: "3", title: "Authorization Management", desc: "Obtain necessary pre-authorizations for services" },
              { step: "4", title: "Documentation", desc: "Complete records for clean claims submission" }
            ].map((proc, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold">{proc.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{proc.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {proc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Ready to Improve Your Verification Process?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Our dedicated eligibility and authorization specialists will help you manage increased 
            patient volume while maintaining accuracy and timely payments.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
              onClick={() => window.location.href = '/book-consultation'}
            >
              Get Started Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
};

