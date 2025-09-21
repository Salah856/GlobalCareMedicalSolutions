import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; 

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

  

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          {/* <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive healthcare business solutions tailored to your practice needs
          </p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
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
      </div>
    </section>
  )
};

