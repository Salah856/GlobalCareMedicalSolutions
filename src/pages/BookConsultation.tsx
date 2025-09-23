import React, { useState } from 'react';
import './SparkContactPage.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) {
      alert('Please consent to receive messages to continue.');
      return;
    }
    
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setConsent(false);
    }, 5000);
  };

  return (
    <div className="spark-contact-page">
      
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We offer services for medical billing and practice management that can enhance your revenue.</p>
        </div>
      </section>

      <div className="contact-main-content">
        <div className="container">
          <div className="content-grid">
            <div className="contact-info-sidebar">
              <div className="info-section">
                <h3>Our Office</h3>
                <p>1992 London Tunnel Bus Suite 1607 1155<br />
                Park Waters Beach, FL 32547</p>
              </div>

              <div className="info-section">
                <h3>Email Us</h3>
                <p>gcmscorp@gmail.com</p>
              </div>

              <div className="info-section">
                <h3>Call Us</h3>
                <p>(416) 760-4340</p>
              </div>

              <div className="action-buttons">
                <button className="action-btn">
                  <span className="btn-icon">📞</span>
                  Get Assistance
                </button>
                <button className="action-btn">
                  <span className="btn-icon">📍</span>
                  Get Directions
                </button>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Are You Prepared to Begin?</h2>
              
              {isSubmitted ? (
                <div className="success-message">
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll contact you soon.</p>
                </div>
              ) : (

                <form className="spark-contact-form" onSubmit={handleSubmit}>
                 <div className="consultation-note">
                    <p><strong>Consulting Services in the Field of Medicine Available at NO CHARGE.</strong></p>
                    <p>The services provided by Global Care Medical Solutions (GCMS) are geared towards improving the revenue of healthcare practices by optimizing their administrative tasks. This is achieved through a collaborative approach with the client's team, ensuring that everyone is working towards the same objectives. The expert team at GCMS closely works with the client's office staff to provide fast and efficient medical billing services. This team has a wealth of experience and knowledge which is leveraged to help clients achieve their goals.</p>
                    <p>As a part of our commitment to delivering exceptional services, GCMS offers free consultation services to showcase how we can enhance the efficiency of your practice and increase revenue. We provide a comprehensive range of medical practice management services to assist in managing administrative tasks, which ultimately promotes better patient healthcare. At GCMS, we are dedicated to becoming an extension of your practice's success and are always ready to assist in any way possible.</p>
                  </div>
                  
                  <div className="name-fields">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="8000 000-0000"
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <strong>Break Message</strong>
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Details you may want to share with us/offers!"
                      required
                    ></textarea>
                  </div>

                  <div className="consent-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      <span className="checkmark"></span>
                      By checking this box, I consent to receive text messages related to Appointment/Billing from Global Care Medical Solutions LLC. You can reply STOP to opt out at any time. Message and data rates may apply. Message frequency may vary. Text HELP for assistance. For more information, please refer to our privacy policy (https://sparkbillingnetwork.com/privacy-policy/) and GCMS Terms and Conditions (https://sparkbillingnetwork.com/terms-and-conditions-2/) on our website.
                    </label>
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookConsultationPage;

