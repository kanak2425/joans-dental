import React from 'react';
import { UserCheck, Sparkles, Smile, ShieldCheck, Heart, Award } from 'lucide-react';

interface WhyJoanProps {
  onOpenBooking: () => void;
}

export const WhyJoan: React.FC<WhyJoanProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-sky-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Photography from Joan's St. John's Clinic Operatory */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-slate-900/5 bg-slate-100">
              <img
                src="/images/clinic-room.jpg"
                alt="Joan Andrews Denture Clinic consultation suite and operatory chair on Topsail Road, St. John's"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-200">
                  Operatory & Consultation Suite
                </span>
                <p className="text-sm font-medium mt-1 leading-snug">
                  538 Topsail Road · Dedicated private consultation room designed for patient comfort & precision adjustments.
                </p>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-800">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Licensed Denturist</div>
                <div className="text-[11px] text-slate-500">St. John's, NL · Direct Care</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial & Philosophy Content */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase">
              The Denturist Difference
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-serif text-slate-900 tracking-tight leading-[1.12]">
              Care That Goes Beyond the Smile.
            </h2>

            <p className="mt-6 text-base text-slate-600 font-light leading-relaxed">
              At Joan Andrews Denture Clinic, you work directly with your denturist from your very first conversation to your final fitting. There are no middlemen or assembly lines—every impression, adjustment, and personalized contour is crafted with meticulous attention to detail.
            </p>

            <blockquote className="mt-6 border-l-2 border-sky-800 pl-4 py-1 text-slate-700 italic font-serif text-lg">
              “When you lose your teeth, you lose more than just chewing power—you lose a part of how you express yourself. Our mission is to restore that confidence quietly and comfortably.”
            </blockquote>

            {/* Three Simple Pillars Requested by User */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
              {/* Point 1: Personal Attention */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-800">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">
                  Personal Attention
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Every patient receives individualized care. Joan listens to your specific needs, daily habits, and smile goals.
                </p>
              </div>

              {/* Point 2: Comfortable Fit */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-800">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">
                  Comfortable Fit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Thoughtful attention to fit and everyday comfort. We calibrate bite balance so eating and talking feel effortless.
                </p>
              </div>

              {/* Point 3: Natural Confidence */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-800">
                  <Smile className="w-4 h-4" />
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900">
                  Natural Confidence
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  Helping patients feel comfortable smiling again with teeth shaped to complement your authentic facial harmony.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full transition-all shadow-xs cursor-pointer"
              >
                SCHEDULE A PRIVATE CONSULTATION
              </button>
              <a
                href="tel:709-364-8100"
                className="text-xs font-semibold text-sky-900 hover:underline"
              >
                Questions? Call 709-364-8100
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
