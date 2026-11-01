import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ValuePillars from './components/ValuePillars.jsx';
import CategoryCards from './components/CategoryCards.jsx';
import ProductCatalog from './components/ProductCatalog.jsx';
import AboutUs from './components/AboutUs.jsx';
import HealthWellness from './components/HealthWellness.jsx';
import BatchVerificationSection from './components/BatchVerificationSection.jsx';
import Testimonials from './components/Testimonials.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import ProductModal from './components/ProductModal.jsx';
import CareersModal from './components/CareersModal.jsx';
import MissionModal from './components/MissionModal.jsx';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [careersModalOpen, setCareersModalOpen] = useState(false);
  const [missionModalOpen, setMissionModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    if (sectionId === 'careers') {
      setCareersModalOpen(true);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categorySlug) => {
    setSelectedCategory(categorySlug);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBatchVerifyWithCode = (code) => {
    const el = document.getElementById('verify-batch');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation matching Nexora */}
      <Navbar
        onOpenSearch={() => handleNavigate('products')}
        onOpenBatchVerify={() => handleNavigate('verify-batch')}
        onOpenContact={() => handleNavigate('contact')}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <Hero
        onExploreProducts={() => handleNavigate('products-showcase')}
      />

      {/* 5 Value Pillars */}
      <ValuePillars />

      {/* 4 Pastel Category Cards */}
      <CategoryCards
        onSelectCategory={handleSelectCategory}
        onViewAll={() => handleSelectCategory('all')}
      />

      {/* Interactive Products Catalog */}
      <ProductCatalog
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onOpenProductModal={(p) => setActiveProductModal(p)}
        onOpenBatchVerifyWithCode={handleOpenBatchVerifyWithCode}
      />

      {/* About Us: 20+ Years, 100+ Skilled, Global Quality */}
      <AboutUs
        onOpenMissionModal={() => setMissionModalOpen(true)}
      />

      {/* Health & Wellness: Healthy Choices for a Brighter Tomorrow */}
      <HealthWellness
        onLearnMore={() => setMissionModalOpen(true)}
      />

      {/* Medicine Batch Authenticity Checker */}
      <BatchVerificationSection />

      {/* Testimonials: Real People. Real Health Journeys. */}
      <Testimonials />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer matching Nexora */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBatchVerify={() => handleNavigate('verify-batch')}
      />

      {/* Modals */}
      {activeProductModal && (
        <ProductModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onVerifyBatch={(code) => handleOpenBatchVerifyWithCode(code)}
        />
      )}

      <CareersModal
        isOpen={careersModalOpen}
        onClose={() => setCareersModalOpen(false)}
      />

      <MissionModal
        isOpen={missionModalOpen}
        onClose={() => setMissionModalOpen(false)}
      />
    </div>
  );
}
