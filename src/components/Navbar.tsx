import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (service?: string) => void;
  onReplayTooth: () => void;
  onReplayCinematic?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onReplayTooth, onReplayCinematic }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/70 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => {
            if (onReplayCinematic) onReplayCinematic();
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center gap-3 cursor-pointer"
          title="Return to cinematic intro"
        >
          <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-serif text-lg font-semibold shadow-xs group-hover:bg-sky-950 transition-colors">
            JA
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
              Joan Andrews
            </div>
            <div className="text-[11px] font-medium tracking-widest text-sky-800 uppercase">
              Denture Clinic · St. John's, NL
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-slate-600">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            The Smile
          </button>
          <button
            onClick={() => scrollToSection('services-story')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('story')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Craftsmanship
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('booking-section')}
            className="text-sky-900 font-semibold hover:text-slate-950 transition-colors cursor-pointer"
          >
            Consultation
          </button>
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:709-364-8100"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-sky-700" />
            <span>709-364-8100</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>BOOK A CONSULTATION</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="tel:709-364-8100"
            className="p-2 rounded-full bg-sky-50 text-sky-900"
            aria-label="Call clinic"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-6 py-6 shadow-xl backdrop-blur-md">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-700">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left py-1 hover:text-slate-900"
            >
              The Smile & Anatomy
            </button>
            <button
              onClick={() => scrollToSection('services-story')}
              className="text-left py-1 hover:text-slate-900"
            >
              Bespoke Services
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-left py-1 hover:text-slate-900"
            >
              Craftsmanship & Operatory
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-1 hover:text-slate-900"
            >
              Patient Stories (5.0 ★)
            </button>
            <button
              onClick={() => scrollToSection('booking-section')}
              className="text-left py-1 font-semibold text-sky-900"
            >
              Book a Consultation
            </button>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="tel:709-364-8100"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-50 text-sky-950 font-semibold text-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call 709-364-8100</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs tracking-wider uppercase"
              >
                Book a Consultation
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
