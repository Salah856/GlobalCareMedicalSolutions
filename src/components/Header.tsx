import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import GCMS_Logo from '../assets/GCMS_Logo.jpeg';
import GCMS_Logo_without_bg from "../assets/GCMS_Logo_without_Background.png"; 
import NEW_GCMS_LOGO_WITHOUT_BG from "../assets/GCMS_LOGO_WITHOUT_BG.png";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpenDesktop, setIsServicesOpenDesktop] = useState(false);
  const [isServicesOpenMobile, setIsServicesOpenMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Dark mode effect
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Color mapping for each navigation item
  const getNavItemColor = (itemName) => {
    const colors = {
      'Home': 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
      'About Us': 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
      'Why Choose Us': 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300',
      'Services': 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300',
      'Specialities': 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300',
      'Blog': 'text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300',
      'Contact Us': 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300',
      'Book Consultation': 'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
    };
    return colors[itemName] || 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400';
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { 
      name: 'Services', 
      href: '/services', 
      subItems: [
        { name: 'Medical Billing Service', href: '/medical-billing' },
        { name: 'Eligibility Verification & Authorizations', href: '/eligibility-verification' },
        { name: 'Credentialing Services', href: '/credentialling' },
        { name: 'Remote Employee Services', href: '/remote-employee-service' }, 
      ],
    },
    { name: 'Specialities', href: '/specialities' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/book-consultation' }, 
    { name: 'Book Consultation', href: '/book-consultation' }, 
  ];

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpenMobile(false);
  };

  return (
    <header 
      className={`bg-sky-50 dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}
      style={{
        zIndex: '1000',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <div className="flex-shrink-0">
            <img 
              src={NEW_GCMS_LOGO_WITHOUT_BG}
              alt="GCMS Logo" 
              className="h-18 w-auto"
              onClick={() => window.location.href = '/'}
              style={{
                cursor: 'pointer',
                width: '8rem',
              }}
            />
          </div>

          <nav className="hidden md:flex space-x-8 relative items-center">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {!item.subItems ? (
                  <a
                    href={item.href}
                    className={`${getNavItemColor(item.name)} px-3 py-2 text-sm font-medium transition-colors inline-flex items-center`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <>
                    <button
                      onClick={toggleServicesDesktop}
                      onMouseEnter={() => setIsServicesOpenDesktop(true)}
                      className={`${getNavItemColor(item.name)} flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors`}
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpenDesktop ? 'rotate-180' : ''}`} />
                    </button>
                    {isServicesOpenDesktop && (
                      <div 
                        className="absolute left-0 mt-2 w-64 bg-sky-50 dark:bg-slate-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                        onMouseLeave={() => setIsServicesOpenDesktop(false)}
                      >
                        <ul className="py-2">
                          {item.subItems.map((sub) => (
                            <li key={sub.name}>
                              <a
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-slate-700"
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

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="bg-sky-50/80 dark:bg-slate-800/80 backdrop-blur-sm"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu Button */}
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
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-sky-50 dark:bg-slate-900">
            <div 
              className="flex justify-between items-center h-22 px-4 border-b border-gray-200 dark:border-gray-700"
            >
              <img 
                src={GCMS_Logo_without_bg}
                alt="GCMS Logo" 
                className="h-18 w-auto"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="bg-sky-50/80 dark:bg-slate-800/80 backdrop-blur-sm"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                
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
            </div>
            
            <nav className="px-4 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const mobileColorClass = getNavItemColor(item.name);
                  return (
                    <li key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      {!item.subItems ? (
                        <a
                          href={item.href}
                          className={`block py-4 text-lg font-medium ${mobileColorClass} transition-colors`}
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <>
                          <button
                            onClick={toggleServicesMobile}
                            className={`flex items-center justify-between w-full py-4 text-lg font-medium ${mobileColorClass} transition-colors`}
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
                  );
                })}
              </ul>
              
              <div className="mt-8 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                  onClick={() => {
                    window.location.href = '/contact-us';
                    closeMobileMenu();
                  }}
                >
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
