import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { motion, Variants, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'


const carouselImages = [
  "https://thespark.pro/wp-content/uploads/2024/09/1-3.webp",
  "https://thespark.pro/wp-content/uploads/2024/09/medical-billing.webp",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600"
];


export function MedicalBillingService() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Define variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const benefitCards = [
    {
      icon: "💰",
      title: "Revenue Growth",
      description: "Significant increase in revenue through optimized billing processes.",
      color: "blue"
    },
    {
      icon: "💸",
      title: "Cashflow Maximization",
      description: "Our team works closely with yours to ensure optimal cashflow.",
      color: "green"
    },
    {
      icon: "📉",
      title: "Reduced Unpaid Claims",
      description: "Minimize your unpaid claims rate with our expert management.",
      color: "purple"
    }
  ];

  return (
    <div ref={ref} className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Medical Billing Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We take care of your entire billing cycle providing significant increase in revenue.
          </p>
        </motion.div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Carousel */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg shadow-2xl overflow-hidden">
              {carouselImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Medical Billing Service ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    scale: index === currentImageIndex ? 1 : 1.1
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              ))}
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentImageIndex((prev) => 
                  prev === 0 ? carouselImages.length - 1 : prev - 1
                )}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => 
                  (prev + 1) % carouselImages.length
                )}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              >
                →
              </button>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 dark:text-white">
              Maximize Your Practice Revenue
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 text-lg">
              Our staff works closely with your office to maximize cashflow and minimize unpaid claims rate.
            </motion.p>

            <motion.ul className="space-y-4">
              {[
                "Complete billing cycle management",
                "Significant revenue increase",
                "Cashflow optimization",
                "Reduced unpaid claims rate"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center text-gray-600 dark:text-gray-300 text-lg"
                >
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transform hover:scale-105 transition-transform duration-300">
                Get Started Today
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            How We Help Your Practice
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefitCards.map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                variants={cardVariants}
                transition={{ delay: index * 0.2 + 0.9 }}
              >
                <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                        benefit.color === 'blue' 
                          ? 'bg-blue-100 dark:bg-blue-900' 
                          : benefit.color === 'green'
                          ? 'bg-green-100 dark:bg-green-900'
                          : 'bg-purple-100 dark:bg-purple-900'
                      }`}
                    >
                      <span className="text-2xl">{benefit.icon}</span>
                    </motion.div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}