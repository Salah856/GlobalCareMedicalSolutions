import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
export function Services() {
  const services = [
    {
      title: "Medical Billing Service",
      description: "Comprehensive billing solutions to maximize your revenue",
      image: "https://thespark.pro/wp-content/uploads/2024/09/1-3.webp"
    },
    {
      title: "Revenue Cycle Management",
      description: "End-to-end revenue cycle optimization",
      image: "https://thespark.pro/wp-content/uploads/2024/09/2-1.webp"
    },
    {
      title: "Customized Reporting",
      description: "Detailed analytics and reporting for better insights",
      image: "https://thespark.pro/wp-content/uploads/2024/09/reporting.jpg"
    },
    {
      title: "Payment Posting",
      description: "Accurate and timely payment processing",
      image: "https://thespark.pro/wp-content/uploads/2024/09/payment-posting.jpg"
    },
    {
      title: "Denial Management",
      description: "Reduce denials and improve claim acceptance rates",
      image: "https://thespark.pro/wp-content/uploads/2024/09/deniel-management.jpg"
    },
    {
      title: "Claim Submission",
      description: "Fast and accurate claim submissions",
      image: "https://thespark.pro/wp-content/uploads/2024/09/claim-submission.jpg"
    }
  ];
  
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive medical billing solutions tailored to your healthcare practice needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
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
}