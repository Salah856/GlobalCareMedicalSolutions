import { Button } from './ui/button';
import { useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

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

    return () => observer.disconnect();
  }, []);

  const sentence = "Your Prescription for Seamless Growth";
  const letters = sentence.split("");

  const colors = {
    primary: '#039AFF',     // Blue color
    secondary: '#031CFF',   // Darker blue
    accent: '#6803FF',      // Purple accent
    accent2: '#EB2626',     // Red accent
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://thespark.pro/wp-content/uploads/2024/09/main.jpg" 
          alt="Medical Background"
          className="w-full h-full object-cover object-center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(3, 154, 255, 0.15) 0%, rgba(3, 28, 255, 0.1) 50%, rgba(104, 3, 255, 0.15) 100%)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)' // Dark overlay for contrast
          }}
        ></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
          }}></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"
          style={{
            background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
          }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          style={{
            background: `radial-gradient(circle, ${colors.accent2} 0%, transparent 70%)`,
          }}></div>
      </div>

      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${colors.primary}20 1px, transparent 1px),
                           linear-gradient(90deg, ${colors.primary}20 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={textRef} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 transition-all duration-1000 ease-out opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)`,
                border: `1px solid ${colors.primary}30`,
              }}>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block"
                  style={{ 
                    color: 'white', // Changed to white for better contrast on background
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                  Global Care Medical
                </span>
                <span className="block mt-2"
                  style={{ 
                    color: colors.primary,
                    textShadow: `2px 2px 4px ${colors.primary}20, 2px 2px 8px rgba(0,0,0,0.3)`
                  }}>
                  Solutions
                </span>
              </h1>

              <h4 className="text-lg transition-all duration-1000 ease-out delay-500 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '3rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                Your top choice for comprehensive medical billing services – 
                your one-stop shop for revenue cycle management excellence!
              </h4>

              <motion.div
                className="text-2xl lg:text-4xl font-semibold"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.04 }
                  }
                }}
              >
                {sentence.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-2 last:mr-0">
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        className="inline-block"
                        style={{
                          color: colors.primary, // Blue text for animation
                          textShadow: `1px 1px 2px rgba(0,0,0,0.3)`
                        }}
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

            <p className="text-gray-200 dark:text-gray-300 transition-all duration-1000 ease-out delay-500 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0"
               style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Streamline your medical practice with our comprehensive billing solutions, 
              ensuring maximum revenue and minimal hassle. We combine cutting-edge technology 
              with expert knowledge to optimize your revenue cycle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(3, 154, 255, 0.4)'
                }}
                onClick={() => window.location.href = '/book-consultation'}
              >
                Book Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 relative group overflow-hidden"
                style={{
                  borderColor: colors.accent2,
                  color: 'white', // White text for better contrast
                  background: 'rgba(235, 38, 38, 0.1)', // Semi-transparent red background
                }}
                onClick={() => window.location.href = '/about-us'}
              >
                <span className="relative z-10">Learn More</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `${colors.accent2}20` }}
                ></span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 transition-all duration-1000 ease-out delay-900 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
              {[
                { value: '98%', label: 'Claim Accuracy', color: colors.primary },
                { value: '99%', label: 'Client Satisfaction', color: colors.accent2 },
                { value: '24/7', label: 'Support', color: colors.accent },
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl group hover:scale-105 transition-transform duration-300 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                    border: `1px solid rgba(255,255,255,0.2)`,
                    backdropFilter: 'blur(10px)',
                  }}>
                  <div className="text-2xl lg:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: stat.color, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty Column - Keeping the grid structure but empty */}
          <div className="hidden lg:block">
            {/* This column is intentionally left empty for spacing */}
            {/* You could add decorative elements here if needed */}
            <div className="relative h-full">
              {/* Optional decorative floating elements */}
              <div className="absolute top-1/4 -right-10 w-24 h-24 rounded-full animate-float opacity-20"
                style={{
                  background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }}></div>
              <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full animate-float delay-1500 opacity-20"
                style={{
                  background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                  filter: 'blur(25px)',
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};







// import { Button } from './ui/button';
// import { useEffect, useRef } from 'react';
// import { motion } from "framer-motion";


// export function Hero() {
//   const textRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate-enter');
//         }
//       });
//     }, observerOptions);

//     if (textRef.current) observer.observe(textRef.current);
//     if (imageRef.current) observer.observe(imageRef.current);

//     return () => observer.disconnect();
//   }, []);

//   const sentence = "Your Prescription for Seamless Growth";
//   const letters = sentence.split("");

//   // Color variables
//   const colors = {
//     primary: '#039AFF',     // Blue color
//     secondary: '#031CFF',   // Darker blue
//     accent: '#6803FF',      // Purple accent
//     accent2: '#EB2626',     // Red accent
//   };

//   return (
//     <section className="relative py-20 lg:py-32 overflow-hidden">
//       <div className="absolute inset-0 overflow-hidden"
//         style={{
//           background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}05 50%, ${colors.accent}10 100%)`,
//         }}>
//         <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
//           style={{
//             background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
//           }}></div>
//         <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"
//           style={{
//             background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
//           }}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
//           style={{
//             background: `radial-gradient(circle, ${colors.accent2} 0%, transparent 70%)`,
//           }}></div>
//       </div>

//       <div className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage: `linear-gradient(${colors.primary}20 1px, transparent 1px),
//                            linear-gradient(90deg, ${colors.primary}20 1px, transparent 1px)`,
//           backgroundSize: '50px 50px',
//         }}></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//           <div ref={textRef} className="space-y-8">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 transition-all duration-1000 ease-out opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0"
//               style={{
//                 background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)`,
//                 border: `1px solid ${colors.primary}30`,
//               }}>
             
//             </div>

//             <div className="space-y-6">
//               <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
//                 <span className="block"
//                   style={{  }}>
//                   Global Care Medical
//                 </span>
//                 <span className="block mt-2"
//                   style={{ 
//                     color: colors.primary,
//                     textShadow: `2px 2px 4px ${colors.primary}20`
//                   }}>
//                   Solutions
//                 </span>
//               </h1>

//               <h4 className="text-lg transition-all duration-1000 ease-out delay-500 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0"
//                 style={{ 
//                   // color: colors.secondary, 
//                   marginBottom: '3rem', 
//                   }}
//                 >
//                 Your top choice for comprehensive medical billing services – 
//                 your one-stop shop for revenue cycle management excellence!
//               </h4>

//                   <motion.div
//           className="text-2xl lg:text-4xl font-semibold text-blue-600 dark:text-blue-400"
//           initial="hidden"
//           animate="visible"
//           variants={{
//             visible: {
//               transition: { staggerChildren: 0.04 }
//             }
//           }}
//         >
//           {/* Wrap words instead of individual letters */}
//           {sentence.split(" ").map((word, wordIndex) => (
//             <span key={wordIndex} className="inline-block mr-2 last:mr-0">
//               {word.split("").map((char, charIndex) => (
//                 <motion.span
//                   key={`${wordIndex}-${charIndex}`}
//                   className="inline-block"
//                   variants={{
//                     hidden: {
//                       opacity: 0,
//                       x: Math.random() * 200 - 100,
//                       y: Math.random() * 200 - 100,
//                     },
//                     visible: {
//                       opacity: 1,
//                       x: 0,
//                       y: 0,
//                       transition: { type: "spring", stiffness: 120, damping: 15 }
//                     }
//                   }}
//                 >
//                   {char}
//                 </motion.span>
//               ))}
//               {/* Add a space after each word except the last one */}
//               {wordIndex < sentence.split(" ").length - 1 ? "\u00A0" : ""}
//             </span>
//           ))}
//             </motion.div>

             
//             </div>

//             <p className="text-gray-600 dark:text-gray-300 transition-all duration-1000 ease-out delay-500 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
//               Streamline your medical practice with our comprehensive billing solutions, 
//               ensuring maximum revenue and minimal hassle. We combine cutting-edge technology 
//               with expert knowledge to optimize your revenue cycle.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
//               <Button 
//                 size="lg" 
//                 className="px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 style={{
//                   background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
//                   color: 'white',
//                 }}
//                 onClick={() => window.location.href = '/book-consultation'}
//               >
//                 Book Consultation
//               </Button>
//               <Button 
//                 variant="outline" 
//                 size="lg" 
//                 className="px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 relative group overflow-hidden"
//                 style={{
//                   borderColor: colors.accent2,
//                   // color: colors.accent2,
//                 }}
//                 onClick={() => window.location.href = '/about-us'}
//               >
//                 <span className="relative z-10">Learn More</span>
//                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   style={{ background: `${colors.accent2}10` }}
//                 ></span>
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-4 pt-8 transition-all duration-1000 ease-out delay-900 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
//               {[
//                 { value: '98%', label: 'Claim Accuracy', color: colors.primary },
//                 { value: '99%', label: 'Client Satisfaction', color: colors.accent2 },
//                 { value: '24/7', label: 'Support', color: colors.accent },
//               ].map((stat, index) => (
//                 <div key={index} className="text-center p-4 rounded-xl group hover:scale-105 transition-transform duration-300"
//                   style={{
//                     background: `linear-gradient(135deg, ${stat.color}05, ${stat.color}10)`,
//                     border: `1px solid ${stat.color}20`,
//                   }}>
//                   <div className="text-2xl lg:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300"
//                     style={{ color: stat.color }}>
//                     {stat.value}
//                   </div>
//                   <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className="relative">
//             <div className="relative group">
//               {/* Floating Elements */}
//               <div className="absolute -top-6 -left-6 w-12 h-12 rounded-lg animate-float"
//                 style={{
//                   background: `linear-gradient(135deg, ${colors.accent}30, ${colors.primary}30)`,
//                   border: `2px solid ${colors.accent}50`,
//                 }}></div>
//               <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full animate-float delay-1000"
//                 style={{
//                   background: `linear-gradient(135deg, ${colors.accent2}30, ${colors.primary}30)`,
//                   border: `2px solid ${colors.accent2}50`,
//                 }}></div>

//               <img 
//                 ref={imageRef}
//                 src="https://thespark.pro/wp-content/uploads/2024/09/medical-billing.webp" 
//                 alt="Medical Billing Services" 
//                 className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-1000 ease-out opacity-0 scale-95 animate-enter:opacity-100 animate-enter:scale-100 group-hover:scale-[1.02] relative z-10"
//                 style={{
//                   border: `4px solid ${colors.primary}20`,
//                 }}
//               />

//               {/* Gradient Border Effect */}
//               <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                 style={{
//                   background: `linear-gradient(45deg, ${colors.primary}30, ${colors.accent}30, ${colors.accent2}30)`,
//                   filter: 'blur(20px)',
//                   transform: 'scale(1.05)',
//                 }}></div>

//               {/* Floating Badge */}
//               <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
//                 style={{
//                   background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
//                   color: 'white',
//                 }}>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full animate-pulse bg-white"></div>
//                   <span className="font-semibold">Top-Rated Service</span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };