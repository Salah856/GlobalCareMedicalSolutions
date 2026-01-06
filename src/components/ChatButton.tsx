import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactUsForm } from './ContactUsForm';

export const ChatButton = ({ isDark }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* Fixed Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300"
        onClick={togglePopup}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        Chat with Us
      </motion.button>

      {/* Popup Overlay and Form */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Overlay */}
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem'
              }}
              onClick={closePopup}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Popup Content - Increased width */}
              <motion.div
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  borderRadius: '1.5rem',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  maxWidth: '56rem', // Increased from 42rem to 56rem (max-w-4xl)
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
              >
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDark ? '#e5e7eb' : '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
                  }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ width: '1.5rem', height: '1.5rem' }} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div style={{ padding: '2rem' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: isDark ? '#ffffff' : '#1f2937',
                      marginBottom: '0.75rem'
                    }}>
                      Chat with Us
                    </h2>
                    <p style={{
                      fontSize: '1.125rem',
                      color: isDark ? '#d1d5db' : '#4b5563'
                    }}>
                      Fill out the form below and we'll get back to you shortly.
                    </p>
                  </div>
                  
                  <div style={{ width: '100%' }}>
                    <ContactUsForm 
                      isDark={isDark} 
                      containerStyle={{
                        width: '100%',
                        maxWidth: 'none'
                      }}
                      formStyle={{
                        width: '100%'
                      }}
                      inputStyle={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};