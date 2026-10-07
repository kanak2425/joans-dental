import React from 'react';
import { Calendar, Phone, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface EmotionalEndingProps {
  onOpenBooking: () => void;
}

export const EmotionalEnding: React.FC<EmotionalEndingProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative bg-white pt-20 pb-16 overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-Width Cinematic Photograph with Camera Zoom Feel */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] bg-slate-100 shadow-2xl shadow-slate-900/5 mb-16 border border-slate-200/80">
          <img
            src="/images/patient-confidence.jpg"
            alt="Natural, warm, confident smile of Canadian patient for Joan Andrews Denture Clinic"
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-103"
          />
          {/* Subtle soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Floating Message on the image */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-14 text-white">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-sky-200 block mb-2">
              Joan Andrews Denture Clinic
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight max-w-3xl">
              CONFIDENCE LOOKS GOOD ON YOU.
            </h2>
          </div>
        </div>

        {/* Closing Action Block */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4 pb-12">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold tracking-[0.35em] text-slate-800 uppercase">
              JOAN ANDREWS
            </h3>
            <p className="text-xs font-medium tracking-[0.25em] text-sky-800 uppercase">
              DENTURE CLINIC · ST. JOHN'S, NL
            </p>
          </div>

          <p className="text-sm text-slate-600 font-light max-w-md mx-auto leading-relaxed">
            Ready to talk about your smile? We look forward to meeting you at our Topsail Road clinic for a relaxed, pressure-free consultation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK A CONSULTATION</span>
            </button>

            <a
              href="tel:709-364-8100"
              className="px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-slate-800 bg-[#FAF9F6] hover:bg-white border border-slate-300 rounded-full shadow-2xs hover:shadow-sm transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700" />
              <span>CALL 709-364-8100</span>
            </a>
          </div>

          {/* Contact Details Grid */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 font-light text-center">
            <div>
              <div className="font-semibold text-slate-900 mb-0.5">Location</div>
              <div>538 Topsail Road</div>
              <div>St. John's, NL A1E 2C5</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-0.5">Hours</div>
              <div>Mon–Thu: 9am – 5pm</div>
              <div>Fri: 9am – 4pm · Sat: By Appt</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 mb-0.5">Direct Line</div>
              <a href="tel:709-364-8100" className="hover:text-sky-900 font-medium">
                709-364-8100
              </a>
              <div className="text-[11px] text-slate-400">Emergency repairs accepted</div>
            </div>
          </div>
        </div>

        {/* Minimal White Footer */}
        <footer className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Joan Andrews Denture Clinic. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://maps.app.goo.gl/kLDz357zBs6tav4s8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 flex items-center gap-1"
            >
              <span>Google Maps Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span aria-hidden="true">·</span>
            <span>Licensed Denturist Newfoundland</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
