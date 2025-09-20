import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { DarkModeToggle } from './components/DarkModeToggle';
import { MedicalBillingService } from './pages/MedicalBillingService';
import { LLCRegistration } from './pages/LLCRegistrationService';
import { CredentialingEnrollment } from './pages/CredentialingEnrollmentService';
import { WhyChooseUs } from './pages/WhyChooseUs';
import { Specialities } from './pages/Specialities';
import { Blog } from './pages/Blog';
import { ContactUs } from './pages/ContactUs';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <DarkModeToggle />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
      </main>
      <Footer />
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
          <Route path="/services/medical-billing" element={<MedicalBillingService />} />
          <Route path="/services/llc-registration" element={<LLCRegistration />} />
          <Route path="/services/credentialling" element={<CredentialingEnrollment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App; 

