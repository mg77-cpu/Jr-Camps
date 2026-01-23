import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const Dropdown: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="group relative">
      <button className="px-4 py-2 text-gray-700 hover:text-black transition-colors duration-200 flex items-center text-sm font-medium">
        {title}
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md z-20 w-max min-w-[200px] border border-gray-100 mt-1">
        {children}
      </div>
    </div>
);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const headerBackground = useTransform(scrollY, [0, 50], ['#F7F5F2', '#F7F5F2']);
    const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);

    const navItems = [
        { title: 'Home', href: '#hero' },
        { title: 'Services', href: '#services' },
        { title: 'About', href: '#about' },
        { title: 'Contact', href: '#contact' },
    ];

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };
  
    return (
    <motion.nav 
      className="sticky top-0 z-50 border-b border-gray-100"
      style={{ backgroundColor: headerBackground, opacity: headerOpacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left side */}
            <div className="flex items-center">
              <a href="#" className="flex-shrink-0">
                <div className="rounded-full p-2 hover:bg-[#F7F5F2] transition-colors duration-200 bg-[#F7F5F2]">
                  <img 
                    src="/kplogo.png" 
                    alt="KP Accounting & Tax Services" 
                    className="h-16 w-auto"
                  />
                </div>
              </a>
            </div>
            
            {/* Navigation - Center */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item.href)}
                    className="relative group flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-black transition-all duration-200 text-sm font-medium"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -3,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      whileHover={{ 
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item.title}
                    </motion.span>
                    
                    {/* Enhanced floating dock-style underline with more dramatic animation */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5C2999] scale-x-0 origin-center"
                      initial={{ scaleX: 0 }}
                      whileHover={{ 
                        scaleX: 1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                    {/* Additional glow effect */}
                    <motion.div
                      className="absolute -inset-1 bg-[#5C2999] opacity-0 rounded-lg blur-sm"
                      whileHover={{ 
                        opacity: 0.1,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Right side buttons */}

            

            <div className="hidden lg:flex items-center space-x-4">
              
              
            </div>
            


            <div className="flex lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none">
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 flex flex-col justify-around">
                    <span className={`block h-0.5 w-full bg-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                    <span className={`block h-0.5 w-full bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-full bg-gray-700 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    x: 15,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    whileHover={{ 
                      x: 8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.title}
                  </motion.span>
                </motion.a>
              ))}
              <div className="border-t border-gray-200 my-4"></div>
              <a href="#" className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Client Portal</a>
              <a href="#" className="block px-3 py-3 rounded-md text-base font-medium text-white bg-[#5C2999] hover:bg-[#4A217A] rounded-md custom-button">Get Started</a>
            </div>
          </motion.div>
        )}
      </motion.nav>
    );
  };

export default Header;