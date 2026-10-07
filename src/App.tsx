import React, { useState } from 'react';
import { CinematicOpeningScene } from './components/CinematicOpeningScene';
import { Navbar } from './components/Navbar';
import { CinematicSmileJourney } from './components/CinematicSmileJourney';
import { EditorialServices } from './components/EditorialServices';
import { PhotographicStory } from './components/PhotographicStory';
import { MinimalConsultationBooking } from './components/MinimalConsultationBooking';
import { EditorialReviews } from './components/EditorialReviews';
import { EmotionalEnding } from './components/EmotionalEnding';
import { FloatingBookingBar } from './components/FloatingBookingBar';

export default function App() {
  const [showOpening, setShowOpening] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<string>('Complete Dentures');

  const handleOpeningComplete = () => {
    setShowOpening(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayOpening = () => {
    setShowOpening(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    if (showOpening) {
      setShowOpening(false);
    }
    setTimeout(() => {
      const bookingEl = document.getElementById('booking-section');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-sky-100 selection:text-sky-900 font-sans">
      {/* ============================================================ */}
      {/* 1. CINEMATIC OPENING SCENE: "THE SMILE REVEALS ITSELF"       */}
      {/* ============================================================ */}
      {showOpening ? (
        <CinematicOpeningScene
          onComplete={handleOpeningComplete}
          onOpenBooking={() => handleOpenBooking()}
        />
      ) : (
        /* ============================================================ */
        /* 2. THE HOMEPAGE & FULL EDITORIAL HEALTHCARE EXPERIENCE       */
        /* ============================================================ */
        <div className="relative animate-fadeIn">
          {/* Persistent Clean Navigation */}
          <Navbar
            onOpenBooking={handleOpenBooking}
            onReplayTooth={handleReplayOpening}
            onReplayCinematic={handleReplayOpening}
          />

          <main>
            {/* Scroll-Linked Camera Journey through Tooth & Smile */}
            <CinematicSmileJourney
              onScrollPast={() => {}}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* Bespoke Editorial Services */}
            <EditorialServices onSelectService={handleOpenBooking} />

            {/* Realistic Craftsmanship & Operatory Photography */}
            <PhotographicStory onOpenBooking={() => handleOpenBooking()} />

            {/* Minimal Consultation Booking: "LET'S TALK ABOUT YOUR SMILE." */}
            <MinimalConsultationBooking initialService={selectedService} />

            {/* Verified Patient Reviews: "REAL PEOPLE. REAL CONFIDENCE." */}
            <EditorialReviews />

            {/* Emotional Ending: "CONFIDENCE LOOKS GOOD ON YOU." */}
            <EmotionalEnding onOpenBooking={() => handleOpenBooking()} />
          </main>

          {/* Floating Booking CTA (Desktop & Mobile Sticky) */}
          <FloatingBookingBar onOpenBooking={() => handleOpenBooking()} />
        </div>
      )}
    </div>
  );
}
