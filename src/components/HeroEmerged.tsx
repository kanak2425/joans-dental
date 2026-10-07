import React from 'react';
import { Phone, Calendar, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

interface HeroEmergedProps {
  onOpenBooking: () => void;
  onReplayTooth: () => void;
  onReplayCinematic?: () => void;
}

export const HeroEmerged: React.FC<HeroEmergedProps> = ({ onOpenBooking, onReplayTooth, onReplayCinematic }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white overflow-hidden">
      {/* Subtle background ambient curves mimicking tooth enamel luster */}
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle Breadcrumb / Kicker */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] text-sky-900/80 uppercase mb-6">
          <span>St. John's, Newfoundland</span>
          <span aria-hidden="true">·</span>
          <span>538 Topsail Road</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Accepting New Patients
          </span>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-slate-900 tracking-tight leading-[1.08]">
            A Confident Smile Starts Here.
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Personalized denture care focused on comfort, fit and confidence.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            From initial precise impressions to same-day relines and adjustments, Joan Andrews provides dedicated, one-on-one care tailored to your unique smile.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-lg shadow-slate-900/15 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK A CONSULTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="tel:709-364-8100"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-sky-700" />
            <span>CALL 709-364-8100</span>
          </a>
        </div>

        {/* Interactive Experience Triggers */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {onReplayCinematic && (
            <button
              onClick={onReplayCinematic}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all shadow-2xs cursor-pointer"
            >
              <span>Replay Opening Sketch Film</span>
            </button>
          )}

          <button
            onClick={onReplayTooth}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-sky-900 hover:text-sky-950 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-full transition-all shadow-2xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Walk Through the 3D Tooth Model</span>
          </button>
        </div>

        {/* Key Quality Pillars (anti-slop, clean unboxed typography) */}
        <div className="mt-16 pt-10 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-slate-900">5.0 ★</div>
            <div className="text-xs text-slate-500 mt-1">Google Verified Reviews</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-slate-900">100%</div>
            <div className="text-xs text-slate-500 mt-1">Individualized Care</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-slate-900">Same-Day</div>
            <div className="text-xs text-slate-500 mt-1">Repairs & Relines</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-serif font-bold text-slate-900">Topsail Rd</div>
            <div className="text-xs text-slate-500 mt-1">Convenient Ground Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};
