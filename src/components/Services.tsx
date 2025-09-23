import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useState, useEffect } from 'react';

export function Services() {
  const services = [
    {
      title: "Medical Billing Service",
      description: "Comprehensive medical billing solutions designed to maximize your revenue and streamline your practice operations",
      image: "https://thespark.pro/wp-content/uploads/2024/09/1-3.webp"
    },
    {
      title: "Eligibility Verification & Authorizations",
      description: "For practices with increased patient volume requiring dedicated support for eligibility and authorizations",
      image: "https://thespark.pro/wp-content/uploads/2024/09/2-1.webp"
    },
    {
      title: "Credentialing Services",
      description: "Complete provider credentialing services to ensure your practice is properly enrolled with payers",
      image: "https://thespark.pro/wp-content/uploads/2024/09/reporting.jpg"
    },
    {
      title: "Remote Employee Services",
      description: "We provide experienced staff members to take care of dedicated tasks for your practice",
      image: "https://thespark.pro/wp-content/uploads/2024/09/payment-posting.jpg"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [services.length]);

  const getTransformStyle = (index) => {
    const position = (index - currentIndex + services.length) % services.length;
    
    switch (position) {
      case 0: // Current center card
        return 'translate-x-0 scale-100 z-10';
      case 1: // Right card
        return 'translate-x-full scale-90 opacity-80 z-5';
      case services.length - 1: // Left card
        return '-translate-x-full scale-90 opacity-80 z-5';
      default: // Hidden cards
        return 'translate-x-full scale-75 opacity-0 z-0';
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
        </div>
        
        {/* Circular Carousel Container */}
        <div className="relative h-96 mb-16 overflow-hidden">
          {services.map((service, index) => (
            <div
              key={index}
              className={`absolute top-0 left-1/4 w-1/2 transition-all duration-700 ease-in-out ${getTransformStyle(index)}`}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="p-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Grid layout for smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:hidden">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <CardHeader className="p-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Carousel Navigation */}
        <div className="hidden lg:flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous service"
          >
            ←
          </button>
          
          <div className="flex space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % services.length)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next service"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}