import React, { useState, useEffect } from 'react';
import { Calendar, Phone } from 'lucide-react';

interface FloatingBookingBarProps {
  onOpenBooking: () => void;
}

export const FloatingBookingBar: React.FC<FloatingBookingBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after user scrolls down 300px
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Floating Button (Bottom Right) */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <button
          onClick={onOpenBooking}
          className="group flex items-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-sky-950 text-white font-semibold text-xs tracking-wider uppercase rounded-full shadow-2xl shadow-slate-900/30 hover:shadow-sky-900/40 border border-slate-700/60 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          title="Schedule a consultation with Joan Andrews"
        >
          <Calendar className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          <span>BOOK A CONSULTATION</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 shadow-2xl flex items-center gap-2">
        <a
          href="tel:709-364-8100"
          className="p-3 rounded-xl bg-sky-50 text-sky-900 hover:bg-sky-100 flex items-center justify-center shrink-0 border border-sky-100"
          aria-label="Call clinic directly"
        >
          <Phone className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-4 bg-slate-900 active:bg-sky-950 text-white font-semibold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-sky-400" />
          <span>BOOK CONSULTATION</span>
        </button>
      </div>
    </>
  );
};
