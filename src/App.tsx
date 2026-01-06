import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { InteractiveFallingTags } from './components/FallingTags'; 
import { About } from './components/About';
import { Footer } from './components/Footer';
import { DarkModeToggle } from './components/DarkModeToggle';
import { MedicalBillingService } from './pages/MedicalBillingService';
import { LLCRegistration } from './pages/LLCRegistrationService';
import { CredentialingEnrollment } from './pages/CredentialingEnrollmentService';
import { RemoteEmployeeServices } from './pages/RemoteEmployeeServices';
import { EligibilityVerification } from './pages/EligibilityVerificationService';
import { WhyChooseUs } from './pages/WhyChooseUs';
import { Specialities } from './pages/Specialities';
import { Blog } from './pages/Blog';
import { ContactUs } from './pages/ContactUs';
import BookConsultationPage from './pages/BookConsultation'; 
import { Tracker } from './pages/Tracker';
import { ContactUsForm } from './components/ContactUsForm';
import React, { useState, useEffect } from 'react'; 
import { SuccessStories } from './components/SuccessStories';
import { ChatButton } from './components/ChatButton';




const HomePage = ({ isDark }) => {
  return (
    <div 
      className="min-h-screen bg-white dark:bg-slate-900"
    >
      <main>
        <Hero />
        <InteractiveFallingTags />
        <Services />
        {/* <ContactUsForm isDark={isDark} /> */}
        <SuccessStories />
        <WhyChooseUs />
      </main>
    </div>
  );
};


function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode !== null) {
        return savedMode === 'true'
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode]);



  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <DarkModeToggle isDark={isDarkMode} setIsDark={setIsDarkMode} />
        <Header />
        <Tracker /> 

        <ChatButton isDark={isDarkMode} />
        
        <Routes>
          <Route path="/" element={<HomePage isDark={isDarkMode} />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/medical-billing" element={<MedicalBillingService />} />
          <Route path="/llc-registration" element={<LLCRegistration />} />
          <Route path="/remote-employee-service" element={<RemoteEmployeeServices />} />
          <Route path="/eligibility-verification" element={<EligibilityVerification />} />
          <Route path="/credentialling" element={<CredentialingEnrollment />} />
          <Route path="/book-consultation" element={<BookConsultationPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;