import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../pages/SparkContactPage.css';


export const ContactUsForm: React.FC<any> = ({ 
  isDark = false, 
  containerStyle = {},
  formStyle = {},
  inputStyle = {} 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      alert('Please consent to receive messages to continue.');
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_subject', 'New GCMS Contact Form Submission');

      const response = await fetch(
        'https://formspree.io/f/xlgedjyk',
        {
          method: 'POST',
          body: formDataToSend,
          headers: { Accept: 'application/json' }
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
          setConsent(false);
        }, 5000);
      } else throw new Error('Form submission failed');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Apply default styles merged with passed styles
  const defaultContainerStyle = {
    width: '100%',
    ...containerStyle
  };

  const defaultFormStyle = {
    width: '100%',
    ...formStyle
  };

  const defaultInputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    ...inputStyle
  };

  const nameFieldsStyle = {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  };

  const halfFieldStyle = {
    flex: 1,
    minWidth: 0
  };

  return (
    <motion.div 
      className={`contact-form-section ${isDark ? 'dark-mode' : ''}`}
      style={defaultContainerStyle}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className={isDark ? 'dark-text' : ''}>Are You Prepared to Begin?</h2>
      
      {isSubmitted ? (
        <motion.div 
          className={`success-message ${isDark ? 'dark-success' : ''}`}
          style={{
            width: '100%',
            textAlign: 'center'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={isDark ? 'dark-text' : ''}>Thank You!</h3>
          <p className={isDark ? 'dark-text' : ''}>Your message has been sent successfully. We'll contact you soon.</p>
        </motion.div>
      ) : (
        <motion.form 
          className={`spark-contact-form ${isDark ? 'dark-form' : ''}`} 
          style={defaultFormStyle}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div style={nameFieldsStyle}>
            <div className={`form-group ${isDark ? 'dark-input-group' : ''}`} style={halfFieldStyle}>
              <label className={isDark ? 'dark-label' : ''}>First Name</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
                className={isDark ? 'dark-input' : ''}
                style={defaultInputStyle}
              />
            </div>
            <div className={`form-group ${isDark ? 'dark-input-group' : ''}`} style={halfFieldStyle}>
              <label className={isDark ? 'dark-label' : ''}>Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
                className={isDark ? 'dark-input' : ''}
                style={defaultInputStyle}
              />
            </div>
          </div>

          <div style={nameFieldsStyle}>
            <div className={`form-group ${isDark ? 'dark-input-group' : ''}`} style={halfFieldStyle}>
              <label className={isDark ? 'dark-label' : ''}>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className={isDark ? 'dark-input' : ''}
                style={defaultInputStyle}
              />
            </div>
            <div className={`form-group ${isDark ? 'dark-input-group' : ''}`} style={halfFieldStyle}>
              <label className={isDark ? 'dark-label' : ''}>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="8000 000-0000" 
                className={isDark ? 'dark-input' : ''}
                style={defaultInputStyle}
              />
            </div>
          </div>

          <div className={`form-group ${isDark ? 'dark-input-group' : ''}`} style={{ marginBottom: '1.5rem' }}>
            <label className={isDark ? 'dark-label' : ''}>Subject</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              className={isDark ? 'dark-input' : ''}
              style={defaultInputStyle}
            />
          </div>

          <div className={`form-group ${isDark ? 'dark-input-group' : ''}`} style={{ marginBottom: '1.5rem' }}>
            <label className={isDark ? 'dark-label' : ''}><strong>Brief Message</strong></label>
            <textarea 
              rows={5} 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Details you may want to share with us/offers!" 
              required
              className={isDark ? 'dark-textarea' : ''}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                ...inputStyle
              }}
            ></textarea>
          </div>

          <div className={`consent-checkbox ${isDark ? 'dark-consent' : ''}`} style={{ marginBottom: '1.5rem' }}>
            <label className={isDark ? 'dark-label' : ''}>
              <input 
                type="checkbox" 
                checked={consent} 
                onChange={(e) => setConsent(e.target.checked)} 
                required 
                className={isDark ? 'dark-checkbox' : ''}
                style={{ marginRight: '0.5rem' }}
              />
              <span 
                className={`checkmark ${isDark ? 'dark-checkmark' : ''}`}
                style={{
                  color:'black',
                }}
                >
                </span>
              By checking this box, I consent to receive text messages related to Appointment/Billing from Global Care Medical Solutions LLC.
            </label>
          </div>

          <motion.button 
            type="submit" 
            className={`submit-btn ${isDark ? 'dark-button' : ''}`} 
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              fontSize: '1.1rem'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
};