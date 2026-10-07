import React from 'react';
import { Award, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';

interface PhotographicStoryProps {
  onOpenBooking: () => void;
}

export const PhotographicStory: React.FC<PhotographicStoryProps> = ({ onOpenBooking }) => {
  return (
    <section id="story" className="py-28 bg-white border-t border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Story Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase block mb-3">
            Handcrafted in St. John's
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-slate-900 tracking-tight leading-[1.1]">
            Precision you can feel. Craftsmanship you can trust.
          </h2>
          <p className="mt-4 text-base text-slate-600 font-light max-w-xl leading-relaxed">
            Unlike commercial dental centers where appliances are shipped away to distant labs, Joan Andrews works directly with you in person—sculpting, testing, and perfecting your fit.
          </p>
        </div>

        {/* Story Mosaic 1: Hand Craftsmanship & Clinical Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-200/80 aspect-[16/10] bg-slate-100">
              <img
                src="/images/craftsmanship.jpg"
                alt="Hands of denturist delicately shaping custom denture acrylic on workbench"
                className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-200">
                  Laboratory Calibration
                </span>
                <p className="text-sm font-medium mt-1">
                  Individual tooth placement and gingival matrix contouring matched to natural dental physiology.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl font-serif text-slate-900 font-semibold leading-tight">
              Direct denturist care from start to finish.
            </h3>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              When you visit our clinic at 538 Topsail Road, you sit down directly with Joan. There is no guesswork. Every bite record, aesthetic nuance, and subtle contour is observed first-hand.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Custom Shade Calibration</h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Evaluated under genuine daylight in our sunlit consultation suite for natural enamel realism.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Gentle Bedside Manner</h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    We listen to your previous denture challenges and take all the time you need to feel comfortable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Mosaic 2: Real Clinic Operatory Photograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-800">
              The Consultation Environment
            </span>
            <h3 className="text-3xl font-serif text-slate-900 font-semibold leading-tight">
              A private, calm, and dignified space.
            </h3>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Denture appointments should never feel hurried or intimidating. Our private operatory at 538 Topsail Road offers ground-level entrance with accessible parking right at our doorstep.
            </p>

            <blockquote className="border-l-2 border-sky-800 pl-4 py-1 text-slate-700 italic font-serif text-base">
              “My goal is simple: when you leave my clinic, you smile without even thinking about your teeth.”
              <span className="block not-italic text-xs text-slate-500 font-sans mt-2">
                — Joan Andrews, Licensed Denturist
              </span>
            </blockquote>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-slate-900 hover:bg-sky-950 rounded-full transition-all cursor-pointer shadow-xs"
              >
                SCHEDULE A VISIT
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-900/5 border border-slate-200/80 aspect-[16/11] bg-slate-100">
              <img
                src="/images/clinic-room.jpg"
                alt="Operatory chair and consultation station at Joan Andrews Denture Clinic on Topsail Road"
                className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-sky-200">
                  538 Topsail Road · Operatory Suite
                </span>
                <p className="text-sm font-medium mt-1">
                  Private patient consultation chair and custom fitting mirror station in St. John's.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
