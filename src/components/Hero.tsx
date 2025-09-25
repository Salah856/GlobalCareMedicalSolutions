import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-enter');
        }
      });
    }, observerOptions);

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  const sentence = "Your Prescription for Seamless Growth";
  const letters = sentence.split("");

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Global Care Medical Solutions
              </h1>

              {/* <motion.div
                className="text-2xl lg:text-4xl font-semibold text-blue-600 dark:text-blue-400 flex flex-wrap"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.04 }
                  }
                }}
              >
                {letters.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: Math.random() * 200 - 100, // انتشار عشوائي
                        y: Math.random() * 200 - 100,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        transition: { type: "spring", stiffness: 120, damping: 15 }
                      }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div> */}

              {/* Animated sentence */}
<motion.div
  className="text-2xl lg:text-4xl font-semibold text-blue-600 dark:text-blue-400"
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: { staggerChildren: 0.04 }
    }
  }}
>
  {/* Wrap words instead of individual letters */}
  {sentence.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block mr-2 last:mr-0">
      {word.split("").map((char, charIndex) => (
        <motion.span
          key={`${wordIndex}-${charIndex}`}
          className="inline-block"
          variants={{
            hidden: {
              opacity: 0,
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { type: "spring", stiffness: 120, damping: 15 }
            }
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* Add a space after each word except the last one */}
      {wordIndex < sentence.split(" ").length - 1 ? "\u00A0" : ""}
    </span>
  ))}
</motion.div>

            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 transition-all duration-1000 ease-out delay-500 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
              Streamline your medical practice with our comprehensive billing solutions, 
              ensuring maximum revenue and minimal hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/book-consultation'}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 transform hover:scale-105 transition-transform duration-300 border-2"
                onClick={() => window.location.href = '/about-us'}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative group">
              <img 
                ref={imageRef}
                src="https://thespark.pro/wp-content/uploads/2024/09/medical-billing.webp" 
                alt="Medical Billing Services" 
                className="w-full h-auto rounded-lg shadow-2xl transition-all duration-1000 ease-out opacity-0 scale-95 animate-enter:opacity-100 animate-enter:scale-100 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 


