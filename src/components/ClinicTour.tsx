import React from 'react';
import { MapPin, CheckCircle2, Shield, Heart } from 'lucide-react';

export const ClinicTour: React.FC = () => {
  return (
    <section id="clinic-tour" className="py-20 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase">
            Inside The Clinic
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight">
            A Calm, Dignified & Private Environment
          </h2>
          <p className="mt-3 text-sm text-slate-600 font-light">
            Conveniently located at 538 Topsail Road in St. John's, our clinic is designed for comfort, confidentiality, and easy ground-floor accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Operatory Room with Consultation Chair (Requested Photo) */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100">
              <img
                src="/images/clinic-room.jpg"
                alt="Operatory chair and consultation station at Joan Andrews Denture Clinic"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-slate-200">
                Operatory & Fitting Station
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Private Consultation & Fitting Chair
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-light">
                  Direct, unhurried consultations in an ergonomic setting. Here, Joan reviews smile aesthetics, fine-tunes bite articulation, and tests comfort before any appliance is finalized.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-sky-700" />
                <span>Sanitized clinical environment with private mirror evaluation</span>
              </div>
            </div>
          </div>

          {/* Card 2: Treatment Suite Details (Second Maps Photo) */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100">
              <img
                src="/images/clinic-detail.jpg"
                alt="Natural light and clinic interior at Joan Andrews Denture Clinic St. John's"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-slate-900 border border-slate-200">
                Natural Light & Patient Comfort
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Natural Daylight Shade Matching
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-light">
                  Accurate tooth color selection requires genuine natural daylight. Our clinic operatory features expansive exterior windows so acrylic and porcelain shades look completely organic in everyday lighting.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-sky-700" />
                <span>Convenient ground-floor parking directly outside entrance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-10 bg-white rounded-2xl p-6 border border-slate-200/90 flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-700" />
            <span>538 Topsail Rd · Central St. John's</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-700" />
            <span>Canadian Clinical Infection Control Standards</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-sky-700" />
            <span>Gentle, Compassionate Senior-Friendly Care</span>
          </div>
        </div>
      </div>
    </section>
  );
};
