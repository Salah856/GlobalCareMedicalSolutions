export function Footer() {
  const footerLinks = {
    Services: [
      'Medical Billing Service',
      'Revenue Cycle Management',
      'Credentialing & Enrollment',
      'AR Management Service',
      'Denial Management'
    ],
    Company: [
      'About Us',
      'Why Choose Us',
      'Specialities',
      'Blog',
      'Contact Us'
    ],
    Legal: [
      'Privacy Policy',
      'Terms of Service',
      'HIPAA Compliance'
    ]
  }
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="https://thespark.pro/wp-content/uploads/2023/08/tsc-final-logo-new-Dark.png" 
              alt="The Spark" 
              className="h-10 w-auto"
            />
            <p className="text-gray-300">
              Leading medical billing services provider helping healthcare practices optimize their revenue cycle.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date()?.getFullYear()} Global Care Medical Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}