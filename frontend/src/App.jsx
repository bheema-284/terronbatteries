import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScooterShowcase from './components/ScooterShowcase';
import TechnologySection from './components/TechnologySection';
import CompareSection from './components/CompareSection';
import FoundersMessage from './components/FoundersMessage';
import OrderingGuide from './components/OrderingGuide';
import ContactFooter from './components/ContactFooter';
import MobileNav from './components/MobileNav';
import TestRideModal from './components/TestRideModal';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [testRideOpen, setTestRideOpen] = useState(false);
  const [selectedModelForRide, setSelectedModelForRide] = useState('CLASSIC SPORTS');

  const handleOpenTestRide = (modelName = 'CLASSIC SPORTS') => {
    setSelectedModelForRide(modelName);
    setTestRideOpen(true);
  };

  const handleCloseTestRide = () => {
    setTestRideOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#111E31] text-slate-100 flex flex-col font-sans selection:bg-[#EAB308] selection:text-slate-950">
      {/* 0. Cinematic Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* 1. Official Coming Soon Banner */}
      <Banner />

      {/* 2. Top Header Navigation */}
      <Navbar onOpenTestRide={() => handleOpenTestRide('CLASSIC SPORTS')} />

      {/* Main Brochure Sections */}
      <main className="flex-1">
        {/* 3. Hero Section - Auto-sliding 4 Bikes Showcase */}
        <Hero onOpenTestRide={() => handleOpenTestRide('CLASSIC SPORTS')} />

        {/* 4. Complete 4 EV Models Showcase (CLASSIC SPORTS, NEXA, SPORTS, TERRON+) */}
        <ScooterShowcase onOpenTestRide={handleOpenTestRide} />

        {/* 5. Everyday Convenience & Premium Technology (Page 8) */}
        <TechnologySection />

        {/* 6. Comparison & Financing Calculator */}
        <CompareSection onOpenTestRide={handleOpenTestRide} />

        {/* 7. Founder's Message - Sridevi Kadiyala (Page 2) */}
        <FoundersMessage />

        {/* 8. Configuration & Ordering Guide (Page 8) */}
        <OrderingGuide onOpenTestRide={() => handleOpenTestRide('TERRON+')} />
      </main>

      {/* 9. Corporate Information & Thank You Footer (Page 9) */}
      <ContactFooter />

      {/* 10. Floating Mobile Navigation Bar (Mobile Viewport Handling) */}
      <MobileNav onOpenTestRide={() => handleOpenTestRide('CLASSIC SPORTS')} />

      {/* 10. Interactive Test Ride Booking Drawer / Modal */}
      <TestRideModal
        isOpen={testRideOpen}
        onClose={handleCloseTestRide}
        preselectedModel={selectedModelForRide}
      />
    </div>
  );
}
