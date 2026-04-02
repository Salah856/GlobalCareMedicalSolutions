import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0px 25px 50px rgba(3, 154, 255, 0.25)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
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
      damping: 12,
    },
  },
};

const gradientVariants: Variants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 3,
      ease: "easeInOut",
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

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.6,
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(104, 3, 255, 0.3)",
  },
  tap: { scale: 0.95 },
};

// Blog categories
const categories = ["All", "Billing", "Technology", "Compliance", "Best Practices"];

export function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const blogPosts = [
    {
      title: "Understanding Medical Billing Codes",
      excerpt: "Learn about the different medical billing codes and how they impact your practice.",
      date: "2024-01-15",
      category: "Billing",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Maximizing Revenue Cycle Management",
      excerpt: "Tips and strategies to optimize your revenue cycle management process.",
      date: "2024-01-10",
      category: "Best Practices",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "HIPAA Compliance in 2024",
      excerpt: "Latest updates on HIPAA regulations and how to stay compliant.",
      date: "2023-12-20",
      category: "Compliance",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "AI in Medical Billing",
      excerpt: "How artificial intelligence is revolutionizing medical billing processes.",
      date: "2023-12-15",
      category: "Technology",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
  ];

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Animated Header */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-12"
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold mb-6 dark:text-white"
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Blog & Insights
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            variants={textVariants}
          >
            Latest insights and updates from the world of medical billing and healthcare technology.
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Blog Posts Grid - Fixed to show immediately */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={index}
              className="group cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Card with Glass Morphism Effect */}
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-100 dark:border-slate-700">
                {/* Featured Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                    style={{ backgroundColor: `${colors.primary}CC` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {post.category}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date and Read Time */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <motion.time 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      📅 {formatDate(post.date)}
                    </motion.time>
                    <span className="text-gray-300 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      ⏱️ {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <motion.h2 
                    className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {post.title}
                  </motion.h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <motion.div className="flex items-center justify-between">
                    <motion.button
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>Read More</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.button>

                    {/* Like Button */}
                    <motion.button
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ❤️
                    </motion.button>
                  </motion.div>
                </div>

                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg relative overflow-hidden group dark:shadow-purple-900/30"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            />
            
            <span className="relative flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                🔄
              </motion.span>
              Load More Articles
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

