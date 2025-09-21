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


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <main>
        {/* <DarkModeToggle /> */}
        <Hero />
        <InteractiveFallingTags />
        <Services />
        <About />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <DarkModeToggle />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/medical-billing" element={<MedicalBillingService />} />
          <Route path="/llc-registration" element={<LLCRegistration />} />
          <Route path="/remote-employee-service" element={<RemoteEmployeeServices />} />
          <Route path="/eligibility-verification" element={<EligibilityVerification />} />
          <Route path="/credentialling" element={<CredentialingEnrollment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App; 

