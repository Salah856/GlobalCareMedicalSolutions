import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import './SparkContactPage.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const BookConsultationPage = () => {
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

  const officeLocation: LatLngExpression = [44.7972, -106.9565]; 

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
'https://formspree.io/f/xlgedjyk'
//'https://formspree.io/f/xblzjjvq'

, {
        method: 'POST',
        body: formDataToSend,
        headers: { Accept: 'application/json' }
      });

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

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${officeLocation[0]},${officeLocation[1]}`, '_blank');
  };

  return (
    <div className="spark-contact-page">
      
      {/* Hero Section */}
      <motion.section 
        className="contact-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h1>Contact Us</h1>
          <p>We offer services for medical billing and practice management that can enhance your revenue.</p>
        </div>
      </motion.section>

      <div className="contact-main-content">
        <div className="container">
          <div className="content-grid">

            {/* Sidebar */}
            <motion.div 
              className="contact-info-sidebar"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="info-section">
                <h3>Our Office</h3>
                <p>Global Care Medical Solutions, 30 N Gould St, Sheridan, WY 82801, USA</p>
              </div>

              <div className="map-section">
                <h3>Find Us</h3>
                <div className="map-container">
                  <MapContainer 
                    center={officeLocation as any}
                    zoom={13} 
                    style={{ height: '200px', width: '100%', borderRadius: '8px' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={officeLocation}>
                      <Popup>Global Care Medical Solutions<br />1992 London Tunnel Bus Suite 1607</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>

              <div className="info-section">
                <h3>Email Us</h3>
                <p>gcmscorp@gmail.com</p>
              </div>

              <div className="info-section">
                <h3>Call Us</h3>
                <p>+1 201-381-4440 (Ext. 800)</p>
              </div>

              <div className="action-buttons">
                <motion.button 
                  className="action-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-icon">📞</span>
                  Get Assistance
                </motion.button>
                <motion.button 
                  className="action-btn" 
                  onClick={openDirections}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="btn-icon">📍</span>
                  Get Directions
                </motion.button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              className="contact-form-section"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Are You Prepared to Begin?</h2>
              
              {isSubmitted ? (
                <motion.div 
                  className="success-message"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll contact you soon.</p>
                  <p><strong>Test Email:</strong> salah.othman.elhossiny@gmail.com</p>
                </motion.div>
              ) : (
                <motion.form 
                  className="spark-contact-form" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="consultation-note">
                    <p><strong>Consulting Services in the Field of Medicine Available at NO CHARGE.</strong></p>
                    <p>The services provided by Global Care Medical Solutions (GCMS) are geared towards improving the revenue of healthcare practices by optimizing their administrative tasks.</p>
                  </div>

                  {/* Fields */}
                  <div className="name-fields">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="8000 000-0000" />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label><strong>Brief Message</strong></label>
                    <textarea rows={5} name="message" value={formData.message} onChange={handleChange} placeholder="Details you may want to share with us/offers!" required></textarea>
                  </div>

                  <div className="consent-checkbox">
                    <label>
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                      <span className="checkmark"></span>
                      By checking this box, I consent to receive text messages related to Appointment/Billing from Global Care Medical Solutions LLC.
                    </label>
                  </div>

                  <motion.button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultationPage;
