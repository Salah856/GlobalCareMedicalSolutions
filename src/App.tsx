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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <About />
            <Footer />
          </div>
        } />
        <Route path="/why-choose-us" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <WhyChooseUs />
            <Footer />
          </div>
        } />
        <Route path="/specialities" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <Specialities />
            <Footer />
          </div>
        } />
        <Route path="/blog" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <Blog />
            <Footer />
          </div>
        } />
        <Route path="/contact-us" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <ContactUs />
            <Footer />
          </div>
        } />
        <Route path="/services/medical-billing" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <MedicalBillingService />
            <Footer />
          </div>
        } />
        <Route path="/services/llc-registration" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <LLCRegistration />
            <Footer />
          </div>
        } />
        <Route path="/services/credentialling" element={
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <DarkModeToggle />
            <Header />
            <CredentialingEnrollment />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App;
