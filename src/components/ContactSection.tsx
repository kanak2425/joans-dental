import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-16 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-sky-950/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Clinic Brand & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-sky-400 uppercase">
                Visit Us in St. John's
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-white tracking-tight">
                Joan Andrews Denture Clinic
              </h2>
            </div>

            <div className="space-y-3 text-sm text-slate-300 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">538 Topsail Rd</div>
                  <div>St. John's, NL A1E 2C5</div>
                  <div>Canada</div>
                  <div className="text-xs text-sky-300/80 mt-1">
                    Free ground-level patient parking directly in front of clinic
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                <a
                  href="tel:709-364-8100"
                  className="text-xl font-serif font-bold text-white hover:text-sky-300 transition-colors"
                >
                  709-364-8100
                </a>
              </div>
            </div>

            {/* Clean Buttons requested by user: CALL NOW and GET DIRECTIONS */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:709-364-8100"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-xs tracking-wider uppercase hover:bg-sky-50 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL NOW</span>
              </a>

              <a
                href="https://maps.app.goo.gl/kLDz357zBs6tav4s8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase border border-slate-700 hover:bg-slate-700 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Clinic Hours & Patient Service Information */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Clinic Hours & Walk-In Inquiries
            </h3>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-800 text-xs space-y-2.5">
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-300">Monday – Thursday</span>
                <span className="font-semibold text-white">9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-300">Friday</span>
                <span className="font-semibold text-white">9:00 AM – 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-700/60">
                <span className="text-slate-300">Saturday</span>
                <span className="text-sky-300 font-medium">By Special Appointment</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-300">Sunday</span>
                <span className="text-slate-400">Closed</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              * Same-day emergency denture repairs are prioritized to help you eat and smile without disruption. Call ahead for fastest laboratory preparation.
            </p>
          </div>

          {/* Quick Direct Booking Panel */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Consultation
            </h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              New patients, insurance queries, and existing denture check-ups are always welcomed.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A CONSULTATION</span>
            </button>
            <div className="text-[11px] text-slate-400 text-center">
              Direct billing assistance with most dental insurance plans.
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Joan Andrews Denture Clinic. 538 Topsail Rd, St. John's, NL. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Denture Specialists Newfoundland</span>
            <span aria-hidden="true">·</span>
            <span>Ground Floor Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
