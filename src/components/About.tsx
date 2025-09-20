export function About() {
  const features = [
    { title: "Expert Team", description: "Certified medical billing professionals" },
    { title: "Advanced Technology", description: "State-of-the-art billing software" },
    { title: "Compliance", description: "HIPAA compliant and secure processes" },
    { title: "24/7 Support", description: "Round-the-clock customer support" }
  ];
  
  const problems = [
    "Are you having troubles organizing your billing cycle?",
    "Do you face multiple delays in your revenue?",
    "You get a lot of patient complaints about their bills?"
  ];
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://thespark.pro/wp-content/uploads/2024/09/maim-light.jpg" 
              alt="Healthcare Professional" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose GCMS?
            </h2>
            
            {/* Problem statements */}
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3">
                Common Challenges We Solve:
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-200">
                {problems.map((problem, index) => (
                  <li key={index}>{problem}</li>
                ))}
              </ul>
            </div>
            
            {/* Value proposition */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                We are here to provide outstanding Revenue Cycle Management ensuring ever growing cashflow for your business.
              </p>
            </div>
            
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We are trusted by top healthcare providers for our expertise, reliability, and commitment to excellence in medical billing services.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};
