import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpenDesktop, setIsServicesOpenDesktop] = useState(false);
  const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { 
      name: 'Services', 
      href: '/services', 
      subItems: [
        { name: 'Medical Billing Service', href: '/medical-billing' },
        { name: 'LLC Registration', href: '/llc-registration' },
        { name: 'Credentialling and Enrolment', href: '/credentialling' },
      ]
    },
    { name: 'Specialities', href: '/specialities' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact-us' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset mobile services dropdown when menu is closed
    if (isMenuOpen) {
      setIsServicesOpenMobile(false);
    }
  };

  const toggleServicesDesktop = () => {
    setIsServicesOpenDesktop(!isServicesOpenDesktop);
  };

  const toggleServicesMobile = () => {
    setIsServicesOpenMobile(!isServicesOpenMobile);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpenMobile(false);
  };

  return (
    <header className={`bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="https://thespark.pro/wp-content/uploads/2023/08/tsc-final-logo-new-Dark.png" 
              alt="The Spark" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 relative">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {!item.subItems ? (
                  <a
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <>
                    <button
                      onClick={toggleServicesDesktop}
                      onMouseEnter={() => setIsServicesOpenDesktop(true)}
                      className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpenDesktop ? 'rotate-180' : ''}`} />
                    </button>
                    {isServicesOpenDesktop && (
                      <div 
                        className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                        onMouseLeave={() => setIsServicesOpenDesktop(false)}
                      >
                        <ul className="py-2">
                          {item.subItems.map((sub) => (
                            <li key={sub.name}>
                              <a
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                onClick={() => setIsServicesOpenDesktop(false)}
                              >
                                {sub.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button (Burger Menu) */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2 rounded-md"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav (Burger Menu) */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-slate-900">
            {/* Header with logo and close button */}
            <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <img 
                src="https://thespark.pro/wp-content/uploads/2023/08/tsc-final-logo-new-Dark.png" 
                alt="The Spark" 
                className="h-8 w-auto"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                aria-label="Close menu"
                className="p-2 rounded-md"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Navigation items */}
            <nav className="px-4 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    {!item.subItems ? (
                      <a
                        href={item.href}
                        className="block py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <>
                        <button
                          onClick={toggleServicesMobile}
                          className="flex items-center justify-between w-full py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.name}
                          {isServicesOpenMobile ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        {isServicesOpenMobile && (
                          <ul className="pl-6 pb-2 space-y-2">
                            {item.subItems.map((sub) => (
                              <li key={sub.name}>
                                <a
                                  href={sub.href}
                                  className="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                  onClick={closeMobileMenu}
                                >
                                  {sub.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Additional call-to-action buttons for mobile */}
              <div className="mt-8 space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get a Quote
                </Button>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800">
                  Contact Us
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
