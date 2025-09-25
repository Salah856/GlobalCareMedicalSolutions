import { motion } from "framer-motion";
import GCMS_Logo_without_bg from "../assets/GCMS_Logo_without_Background.png"; 


export function Footer() {
  const footerLinks = {
    Services: [
      'Medical Billing Service',
      'Credentialing',
      'Remote Employee Service',
      'Eligibility Verification & Authorizations',
    ],
    Company: [
      'About Us',
      'Why Choose Us',
      'Specialities',
      'Blog',
      'Contact Us'
    ],
    Legal: [
      'Privacy Policy',
      'Terms of Service',
      'HIPAA Compliance',
    ]
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    }),
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <motion.div 
            className="space-y-4 lg:col-span-2"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={0}
          >
            <motion.img 
              src={GCMS_Logo_without_bg}
              alt="GCMS Logo" 
              className="h-15 w-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <p className="text-gray-300">
              Your prescription for seamless growth
            </p>
            
            {/* Contact Information */}
            <motion.div 
              className="pt-4 space-y-2"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={1}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:gcmscorp@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  gcmscorp@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+13367738376" className="text-gray-300 hover:text-white transition-colors">
                  +1 336-773-8376
                </a>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="pt-4"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={2}
            >
              <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
              <div className="flex space-x-4">
                {[
                  { href: "https://linkedin.com/company/gcmscorp", bg: "bg-blue-700 hover:bg-blue-600" },
                  { href: "https://facebook.com/yourpage", bg: "bg-blue-600 hover:bg-blue-500" },
                  { href: "https://instagram.com/yourprofile", bg: "bg-pink-600 hover:bg-pink-500" },
                  { href: "https://wa.me/1234567890", bg: "bg-green-600 hover:bg-green-500" },
                  { href: "https://t.me/yourchannel", bg: "bg-blue-500 hover:bg-blue-400" },
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.bg} p-2 rounded-full transition-colors`}
                    aria-label="Social Link"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div 
              key={category} 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={i + 3}
            >
              <h3 className="text-lg font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <motion.li 
                    key={link}
                    whileHover={{ x: 5, color: "#fff" }}
                  >
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-gray-300">
            © {new Date().getFullYear()} Global Care Medical Solutions. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

