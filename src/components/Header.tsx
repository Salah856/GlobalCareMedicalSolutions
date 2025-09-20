import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Services', href: '/services', subItems: [
      { name: 'Medical Billing Service', href: '/services/medical-billing' },
      { name: 'LLC Registration', href: '/services/llc-registration' },
      { name: 'Credentialling and Enrolment', href: '/services/credentialling' },
      // { name: 'AR Management Service', href: '/services/ar-management' },
      // { name: 'Customized Reporting', href: '/services/customized-reporting' },
      // { name: 'Eligibility and Verification', href: '/services/eligibility' },
      // { name: 'License and Tax Registration', href: '/services/license-tax' },
      // { name: 'Patient Registration', href: '/services/patient-registration' },
      // { name: 'Revenue Cycle Management', href: '/services/revenue-cycle' },
      // { name: 'Tele Health Services', href: '/services/telehealth' },
      // { name: 'Denial Management', href: '/services/denial-management' },
      // { name: 'Charge Entry', href: '/services/charge-entry' },
      // { name: 'Claim Submissions', href: '/services/claim-submissions' }
    ]},
    { name: 'Specialities', href: '/specialities' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact-us' }
  ]

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
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
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {isServicesOpen && (
                      <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50">
                        <ul className="py-2">
                          {item.subItems.map((sub) => (
                            <li key={sub.name}>
                              <a
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {!item.subItems ? (
                    <a
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-base font-medium transition-colors"
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {isServicesOpen && (
                        <div className="pl-4">
                          {item.subItems.map((sub) => (
                            <a
                              key={sub.name}
                              href={sub.href}
                              className="block px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
};
