import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};



// Colors
const colors = {
  primary: '#039AFF',
  secondary: '#031CFF',
  accent: '#6803FF',
  accent2: '#EB2626',
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  overflow: hidden;
  
  .dark & {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
`;

const HeroSection = styled(motion.section)`
  background: linear-gradient(135deg, ${colors.primary}20 0%, ${colors.accent}20 100%);
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
  
  .dark & {
    background: linear-gradient(135deg, ${colors.primary}10 0%, ${colors.accent}10 100%);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.accent}, ${colors.primary});
    background-size: 200% 100%;
    animation: shimmer 3s infinite linear;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.7rem;
  font-weight: 800;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  
  .dark & {
    -webkit-text-fill-color: transparent;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 600px;
  line-height: 1.6;
  
  .dark & {
    color: #94a3b8;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 80px 0;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
`;

const SidebarCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(3, 154, 255, 0.1);
  border: 1px solid rgba(3, 154, 255, 0.1);
  
  .dark & {
    background: #1e293b;
    border-color: rgba(3, 154, 255, 0.2);
  }
`;

const InfoSection = styled.div`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${colors.secondary};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  .dark & {
    color: ${colors.primary};
  }
`;

const InfoText = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  
  .dark & {
    color: #94a3b8;
  }
`;

const MapContainerStyled = styled.div`
  margin-top: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  
  .dark & {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(3, 154, 255, 0.3);
  }
`;

const FormSection = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(3, 154, 255, 0.1);
  border: 1px solid rgba(3, 154, 255, 0.1);
  
  .dark & {
    background: #1e293b;
    border-color: rgba(3, 154, 255, 0.2);
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
  
  .dark & {
    -webkit-text-fill-color: transparent;
  }
`;

const ConsultationNote = styled.div`
  background: linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10);
  border-left: 4px solid ${colors.primary};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  
  .dark & {
    background: linear-gradient(135deg, ${colors.primary}05, ${colors.accent}05);
  }
  
  p {
    color: #374151;
    line-height: 1.6;
    margin: 10px 0;
    
    &:first-child {
      color: ${colors.secondary};
      font-weight: 600;
    }
    
    .dark & {
      color: #94a3b8;
    }
    
    .dark &:first-child {
      color: ${colors.primary};
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NameFields = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
  
  .dark & {
    color: #e2e8f0;
  }
`;

const Input = styled.input`
  padding: 14px 16px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  .dark & {
    background: #1f2937;
    color: #f3f4f6;
    border-color: #4b5563;
  }
  
  .dark &::placeholder {
    color: #6b7280;
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
  
  .dark &:focus {
    box-shadow: 0 0 0 3px ${colors.primary}40;
  }
  
  &:hover {
    border-color: ${colors.primary}80;
  }
  
  .dark &:hover {
    border-color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 14px 16px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  .dark & {
    background: #1f2937;
    color: #f3f4f6;
    border-color: #4b5563;
  }
  
  .dark &::placeholder {
    color: #6b7280;
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
  
  .dark &:focus {
    box-shadow: 0 0 0 3px ${colors.primary}40;
  }
  
  &:hover {
    border-color: ${colors.primary}80;
  }
  
  .dark &:hover {
    border-color: ${colors.primary};
  }
`;

const ConsentCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 10px 0;
  
  label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    color: #4b5563;
    line-height: 1.5;
    
    .dark & {
      color: #94a3b8;
    }
  }
  
  input[type="checkbox"] {
    margin-top: 4px;
    accent-color: ${colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 18px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: rotate(45deg);
    animation: shimmer 2s infinite;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #10B98110, ${colors.primary}10);
  border: 1px solid #10B98130;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  
  .dark & {
    background: linear-gradient(135deg, #10B98105, ${colors.primary}05);
    border-color: #10B98120;
  }
  
  h3 {
    color: #10B981;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  p {
    color: #374151;
    line-height: 1.6;
    margin: 10px 0;
    
    .dark & {
      color: #94a3b8;
    }
  }
`;



const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

const pulseAnimation = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

// Global styles
const GlobalStyles = styled.div`
  ${shimmerAnimation}
  ${pulseAnimation}
`;


// Fix Leaflet icons
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

  const openDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${officeLocation[0]},${officeLocation[1]}`, '_blank');
  };

  return (
    <GlobalStyles>
      <PageContainer>

        {/* <HeroSection
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <HeroTitle variants={fadeInUp}>
                Contact Us
              </HeroTitle>
              <HeroSubtitle variants={fadeInUp}>
                We offer services for medical billing and practice management that can enhance your revenue.
              </HeroSubtitle>
            </motion.div>
          </Container>
        </HeroSection> */}

        <HeroSection
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Container>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <HeroTitle variants={fadeInUp}>
            Contact Us
          </HeroTitle>
          <HeroSubtitle variants={fadeInUp}>
            We offer services for medical billing and practice management that can enhance your revenue.
          </HeroSubtitle>
        </div>

        <motion.div
          variants={fadeInUp}
          style={{ flex: 1, minWidth: '300px' }}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-2xl lg:text-3xl font-semibold"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.04 }
              }
            }}
          >
            <HeroTitle>
              Global Care Medical Solutions
            </HeroTitle>
            {"Your Prescription for Seamless Growth".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 last:mr-0">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    className="inline-block"
                    style={{
                      background: "linear-gradient(135deg, #039AFF, #6803FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                      fontWeight: 'bold',
                    }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        rotate: Math.random() * 180 - 90,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        transition: { 
                          type: "spring", 
                          stiffness: 120, 
                          damping: 15,
                          delay: wordIndex * 0.05 + charIndex * 0.03
                        }
                      }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < "Your Prescription for Seamless Growth".split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </Container>
</HeroSection>

        <Container>
          <ContentGrid>
            <SidebarCard
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <InfoSection>
                  <SectionTitle>📍 Our Office</SectionTitle>
                  <InfoText>
                    Global Care Medical Solutions, 30 N Gould St, Sheridan, WY 82801, USA
                  </InfoText>
                </InfoSection>

                <InfoSection>
                  <SectionTitle>🗺️ Find Us</SectionTitle>
                  <MapContainerStyled>
                    <MapContainer 
                      center={officeLocation as any}
                      zoom={13} 
                      style={{ height: '250px', width: '100%' }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer 
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={officeLocation}>
                        <Popup>
                          <strong>Global Care Medical Solutions</strong><br />
                          1992 London Tunnel Bus Suite 1607
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </MapContainerStyled>
                </InfoSection>

                <InfoSection>
                  <SectionTitle>📧 Email Us</SectionTitle>
                  <InfoText>gcmscorp@gmail.com</InfoText>
                </InfoSection>

                <InfoSection>
                  <SectionTitle>📞 Call Us</SectionTitle>
                  <InfoText>+1 201-381-4440 (Ext. 800)</InfoText>
                  <InfoText>+1 248-654-6379</InfoText>
                </InfoSection>

                <ActionButtons>
                  <ActionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = 'tel:+12013814440'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>📞</span>
                    Get Assistance
                  </ActionButton>
                  <ActionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openDirections}
                  >
                    <span style={{ fontSize: '1.2rem' }}>📍</span>
                    Get Directions
                  </ActionButton>
                </ActionButtons>
              </motion.div>
            </SidebarCard>

            <FormSection
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <SuccessMessage
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3>🎉 Thank You!</h3>
                    <p>Your message has been sent successfully.</p>
                    <p>We'll contact you within 24 hours.</p>
                  </SuccessMessage>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FormTitle>
                      Are You Prepared to Begin?
                    </FormTitle>

                    <ConsultationNote>
                      <p><strong>Consulting Services in the Field of Medicine Available at NO CHARGE.</strong></p>
                      <p>The services provided by Global Care Medical Solutions (GCMS) are geared towards improving the revenue of healthcare practices by optimizing their administrative tasks.</p>
                    </ConsultationNote>

                    <Form onSubmit={handleSubmit}>
                      <NameFields>
                        <motion.div variants={fadeInUp}>
                          <FormGroup>
                            <Label>First Name</Label>
                            <Input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              placeholder="John"
                            />
                          </FormGroup>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                          <FormGroup>
                            <Label>Last Name</Label>
                            <Input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              placeholder="Doe"
                            />
                          </FormGroup>
                        </motion.div>
                      </NameFields>

                      <motion.div variants={fadeInUp}>
                        <FormGroup>
                          <Label>Email Address</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                          />
                        </FormGroup>
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <FormGroup>
                          <Label>Phone Number</Label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 8900"
                          />
                        </FormGroup>
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <FormGroup>
                          <Label>Subject</Label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                          />
                        </FormGroup>
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <FormGroup>
                          <Label>Brief Message</Label>
                          <TextArea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your medical billing needs or questions..."
                            required
                          />
                        </FormGroup>
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <ConsentCheckbox>
                          <label>
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => setConsent(e.target.checked)}
                              required
                            />
                            <span>
                              By checking this box, I consent to receive text messages related to Appointment/Billing from Global Care Medical Solutions LLC.
                            </span>
                          </label>
                        </ConsentCheckbox>
                      </motion.div>

                      <motion.div variants={fadeInUp}>
                        <SubmitButton
                          type="submit"
                          disabled={isLoading}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {isLoading ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                ⏳
                              </motion.span>
                              Sending...
                            </span>
                          ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                ✉️
                              </motion.span>
                              Send Message
                            </span>
                          )}
                        </SubmitButton>
                      </motion.div>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </FormSection>
          </ContentGrid>
        </Container>
      </PageContainer>
    </GlobalStyles>
  );
};

export default BookConsultationPage;



