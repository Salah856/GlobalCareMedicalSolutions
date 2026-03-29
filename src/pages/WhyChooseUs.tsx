import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Marquee from "react-fast-marquee";
import { Variants } from 'framer-motion';

// Animation variants with proper types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariants: Variants = {
  rest: { 
    scale: 1,
    rotate: 0,
    boxShadow: "0px 8px 30px rgba(3, 154, 255, 0.1)",
  },
  hover: { 
    scale: 1.05,
    rotate: 0.5,
    boxShadow: "0px 20px 50px rgba(104, 3, 255, 0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    }
  },
};

const iconVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    }
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  },
};


const colors = {
  primary: '#039AFF',
  secondary: '#031CFF',
  accent: '#6803FF',
  accent2: '#EB2626',
};




const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3,
      duration: 0.6,
    },
  },
};

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      title: "Expert Team",
      description: "Our team consists of experienced medical billing professionals with deep industry knowledge.",
      icon: "👥",
      color: colors.primary
    },
    {
      title: "Advanced Technology",
      description: "We use cutting-edge technology to ensure accurate and efficient billing processes.",
      icon: "💻",
      color: colors.accent
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support to address your concerns and questions promptly.",
      icon: "🔄",
      color: colors.secondary
    },
    {
      title: "Cost Effective",
      description: "Affordable solutions that maximize your revenue without breaking your budget.",
      icon: "💰",
      color: colors.accent2
    }
  ];

  const marqueeItems = [
    { text: "👥 Expert Team you can rely on", color: colors.primary },
    { text: "💻 Advanced Technology for accuracy", color: colors.accent },
    { text: "🔄 24/7 Dedicated Support", color: colors.secondary },
    { text: "💰 Cost-Effective & Revenue Focused", color: colors.accent2 },
    { text: "🏆 Industry Leading Accuracy", color: colors.primary },
    { text: "⚡ Lightning Fast Processing", color: colors.accent },
  ];

  const stats = [
    { number: "99.5%", label: "Accuracy Rate", icon: "🎯" },
    { number: "24/7", label: "Support Available", icon: "🛡️" },
    { number: "50%", label: "Cost Reduction", icon: "📉" },
    { number: "48h", label: "Faster Processing", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold mb-6 dark:text-white"
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            whileHover={{ scale: 1.02 }}
          >
            Why Choose GCMS
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            variants={textVariants}
          >
            Discover why healthcare providers trust GCMS for their medical billing needs.
          </motion.p>
        </motion.div>

        {/* Animated Features Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {/* Background Glow */}
              <motion.div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                style={{ backgroundColor: feature.color }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Feature Card */}
              <motion.div
                className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 backdrop-blur-sm"
                variants={cardVariants}
                style={{ willChange: 'transform' }}
              >
                {/* Icon Container */}
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl relative"
                  style={{ 
                    backgroundColor: `${feature.color}15`,
                  }}
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 10, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {/* Icon Shadow */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl"
                    style={{ backgroundColor: feature.color }}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative z-10">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center"
                  whileHover={{ color: feature.color }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-center leading-relaxed"
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {feature.description}
                </motion.p>

                {/* Decorative Dots */}
                <motion.div 
                  className="flex justify-center space-x-2 mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[1, 2, 3].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: feature.color }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        delay: dot * 0.2 
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Marquee */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Marquee
              gradient={false}
              speed={50}
              pauseOnHover
              className="py-5 rounded-2xl shadow-lg"
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              {marqueeItems.map((item, index) => (
                <motion.span
                  key={index}
                  className="mx-10 text-white font-semibold text-lg flex items-center gap-3"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.text}
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⭐
                  </motion.span>
                </motion.span>
              ))}
            </Marquee>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 text-center"
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0px 15px 40px ${colors.primary}20`,
                borderColor: colors.primary
              }}
              animate={{ 
                y: [0, -5, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <motion.div 
                className="text-3xl font-bold mb-2"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 1.2 + index * 0.1,
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={()=>{
              window.location.href = "/book-consultation";
            }}
            className="px-10 py-5 rounded-2xl font-bold text-lg relative overflow-hidden group"
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              color: 'white',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0px 20px 50px ${colors.accent}40`
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              background: [
                `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                `linear-gradient(90deg, ${colors.accent}, ${colors.primary})`,
                `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              ],
              backgroundSize: "200% 200%",
            }}
            transition={{
              background: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <span className="relative flex items-center justify-center gap-3">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🚀
              </motion.span>
              Start Your Free Consultation Today
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
          
          <motion.p 
            className="text-gray-500 dark:text-gray-400 mt-4"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Join 500+ healthcare providers who trust GCMS
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
