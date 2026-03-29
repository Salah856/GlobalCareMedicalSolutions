import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Variants } from 'framer-motion';

// Animation variants with proper types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    boxShadow: "0px 4px 20px rgba(3, 154, 255, 0.1)",
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0px 20px 40px rgba(3, 154, 255, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
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
      stiffness: 100,
      damping: 15,
    },
  },
};

const gradientVariants: Variants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 3,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};


const colors = {
  primary: '#039AFF',
  secondary: '#031CFF',
  accent: '#6803FF',
  accent2: '#EB2626',
};


// Medical specialty icons with colors
const specialtyIcons = [
  { icon: "👨‍⚕️", color: colors.primary },
  { icon: "🫀", color: colors.accent2 },
  { icon: "👶", color: "#FF6B8B" },
  { icon: "❤️", color: colors.accent2 },
  { icon: "🦋", color: "#9C27B0" },
  { icon: "🦴", color: "#795548" },
  { icon: "🧠", color: colors.accent },
  { icon: "🧠", color: "#4CAF50" },
  { icon: "🤰", color: "#E91E63" },
  { icon: "👁️", color: "#2196F3" },
  { icon: "👂", color: "#FF9800" },
  { icon: "💧", color: colors.primary },
];

export function Specialities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const specialties = [
    "Family Practice",
    "Internal Medicine",
    "Pediatrics",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Psychiatry",
    "Obstetrics & Gynecology",
    "Ophthalmology",
    "ENT",
    "Urology"
  ];

  const stats = [
    { number: "12+", label: "Specialties Served" },
    { number: "99%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <div className={`min-h-screen pt-20 overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"
            variants={gradientVariants}
            initial="initial"
            animate="animate"
            style={{
              backgroundSize: "200% 200%",
              backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
            }}
          >
            Specialities We Serve
          </motion.h1>
          
          <motion.p 
            className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We provide specialized medical billing services for various healthcare specialties.
          </motion.p>
        </motion.div>

        {/* Specialty Cards Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {specialties.map((specialty, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {/* Background Glow Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Card */}
              <motion.div
                className={`relative p-8 rounded-xl border shadow-lg backdrop-blur-sm ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
                }`}
                variants={cardVariants}
                style={{ willChange: 'transform' }}
              >
                {/* Animated Icon */}
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                  style={{ 
                    backgroundColor: `${specialtyIcons[index]?.color}15`,
                    border: `2px solid ${specialtyIcons[index]?.color}30`
                  }}
                  variants={iconVariants}
                  whileHover={{ 
                    rotate: [0, 10, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {specialtyIcons[index]?.icon || "🏥"}
                </motion.div>
                
                {/* Title with Underline Animation */}
                <div className="relative">
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {specialty}
                  </h3>
                  <motion.div 
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Description with fade-in on hover */}
                <motion.p 
                  className={`text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  Expert billing solutions tailored for {specialty.toLowerCase()} practices
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center p-6 rounded-xl border ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 15px 30px rgba(3, 154, 255, 0.15)"
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
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 1 + index * 0.1,
                }}
              >
                {stat.number}
              </motion.div>
              <div className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button with Animation */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 30px rgba(104, 3, 255, 0.3)"
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
            onClick={()=>{
              window.location.href= "/book-consultation"
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-lg"
              >
                ➡️
              </motion.span>
              Get Started with Your Specialty
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

