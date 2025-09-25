import GCMS_Logo_without_bg from "../assets/GCMS_Logo_without_Background.png"; 

export function Footer() {
  const footerLinks = {
    Services: [
      'Medical Billing Service',
      'Credentialing',
      'Remote Employee Service',
      'Eligibility Verification & Authorizations',
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
      'HIPAA Compliance',
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <img 
              src={GCMS_Logo_without_bg}
              alt="GCMS Logo" 
              className="h-15 w-auto transform hover:scale-105 transition-transform duration-300"
            />
            <p className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-1">
              Your prescription for seamless growth
            </p>
            
            {/* Contact Information */}
            <div className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:gcmscorp@gmail.com" className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-1">
                    gcmscorp@gmail.com
                  </a>
                </div>
                <div className="flex items-center group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+13367738376" className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-1">
                    +1 336-773-8376
                  </a>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-4 transform hover:scale-105 transition-transform duration-300 inline-block">
                Connect with us
              </h3>
              <div className="flex space-x-4">
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/company/gcmscorp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-700/50"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5 transform hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a 
                  href="https://facebook.com/yourpage"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-600/50"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5 transform hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/yourprofile"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-pink-600/50"
                  aria-label="Instagram"
                >
                  <svg 
                    className="h-5 w-5 transform hover:rotate-12 transition-transform duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                  >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"/>
                  </svg>
                </a>
                
                {/* WhatsApp */}
                <a 
                  href="https://wa.me/1234567890"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-green-600/50"
                  aria-label="WhatsApp"
                >
                  <svg className="h-5 w-5 transform hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 2.047C6.207 2.047 1.451 6.804 1.451 12.614c0 1.846.48 3.582 1.32 5.082L2 22.047l4.396-1.156c1.45.78 3.101 1.226 4.621 1.226 5.811 0 10.567-4.757 10.567-10.567S17.828 2.047 12.017 2.047zm-5.94 14.66c-.241-.121-.872-.439-1.011-.483-.14-.045-.241-.07-.35.07-.11.14-.431.483-.527.58-.097.097-.193.121-.35.04-.158-.08-.668-.246-1.273-.78-.47-.42-.788-.94-.88-1.099-.092-.158-.01-.244.069-.323.07-.07.158-.183.237-.274.08-.092.105-.158.158-.264.053-.106.027-.198-.013-.278-.04-.08-.35-.844-.48-1.156-.122-.302-.246-.256-.35-.26-.09-.003-.197-.005-.303-.005-.106 0-.28.04-.426.198-.146.158-.558.544-.558 1.326 0 .782.57 1.538.65 1.645.08.106 1.124 1.712 2.724 2.405 1.6.693 1.6.462 1.888.432.288-.03.872-.356 1.004-.7.132-.344.132-.64.092-.7-.04-.06-.146-.096-.307-.168z"/>
                  </svg>
                </a>
                
                {/* Telegram */}
                <a 
                  href="https://t.me/yourchannel"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-400 p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/50"
                  aria-label="Telegram"
                >
                  <svg className="h-5 w-5 transform hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.05 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold transform hover:scale-105 transition-transform duration-300 inline-block">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:scale-105 block py-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 inline-block">
            © {new Date().getFullYear()} Global Care Medical Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

