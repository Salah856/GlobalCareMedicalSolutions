import { Button } from './ui/button';
import { useEffect, useRef } from 'react';

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

    if (textRef.current) {
      observer.observe(textRef.current);
    }
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 py-20 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content with Staggered Animations */}
          <div 
            ref={textRef}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-all duration-1000 ease-out opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
                Global Care Medical Solutions
                <span className="block text-blue-600 dark:text-blue-400 transition-all duration-1000 ease-out delay-300 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
                  Your Prescription for Seamless Growth
                </span>
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 transition-all duration-1000 ease-out delay-500 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
              Streamline your medical practice with our comprehensive billing solutions, 
              ensuring maximum revenue and minimal hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 opacity-0 translate-y-8 animate-enter:opacity-100 animate-enter:translate-y-0">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                onClick={()=>{
                  window.location.href = '/book-consultation';
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-3 transform hover:scale-105 transition-transform duration-300 border-2"
                onClick={()=>{
                  window.location.href = '/about-us';
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Image with Hover Animation */}
          <div className="relative">
            <div className="relative group">
              <img 
                ref={imageRef}
                src="https://thespark.pro/wp-content/uploads/2024/09/medical-billing.webp" 
                alt="Medical Billing Services" 
                className="w-full h-auto rounded-lg shadow-2xl transition-all duration-1000 ease-out opacity-0 scale-95 animate-enter:opacity-100 animate-enter:scale-100 group-hover:scale-105"
              />
              
              {/* Floating elements around the image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-0 animate-enter:opacity-100 animate-enter:animate-bounce delay-1000"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-0 animate-enter:opacity-100 animate-enter:animate-ping delay-1200"></div>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

