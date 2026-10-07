import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface EditorialServicesProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICES_DATA = [
  {
    id: 'complete',
    title: 'Complete Dentures',
    kicker: 'Full Arch Restoration',
    tagline: 'Crafted to harmonize with your natural facial anatomy.',
    description:
      'Engineered for full tooth replacement. Joan Andrews hand-calibrates bite vertical dimension, lip contour, and phonetic alignment so you can speak, laugh, and dine with unwavering confidence.',
    image: '/images/smile-reveal-hero.jpg',
    points: ['Restores youthful lip fullness', 'High-impact stain-resistant acrylic', 'Multi-stage precision bite fittings'],
  },
  {
    id: 'partial',
    title: 'Partial Dentures',
    kicker: 'Targeted Tooth Integration',
    tagline: 'Seamlessly anchoring alongside your existing natural teeth.',
    description:
      'When healthy teeth remain, partial dentures preserve their position and prevent unwanted shifting. Fabricated with discreet, aesthetic clasps that blend imperceptibly with your natural enamel.',
    image: '/images/craftsmanship.jpg',
    points: ['Prevents remaining teeth from drifting', 'Lightweight biocompatible frameworks', 'Custom enamel shade replication'],
  },
  {
    id: 'repairs',
    title: 'Denture Repairs',
    kicker: 'Urgent Same-Day Care',
    tagline: 'Swift laboratory reinforcement for fractures and chips.',
    description:
      'Accidents occur without warning. Cracked bases, fractured teeth, or broken clasps are treated with urgent laboratory precision right at our Topsail Road clinic to restore your smile without delay.',
    image: '/images/clinic-detail.jpg',
    points: ['Same-day turnaround for urgent cases', 'Structural molecular resin rebonding', 'Ultrasonic sanitization & repolish'],
  },
  {
    id: 'adjustments',
    title: 'Adjustments & Relines',
    kicker: 'Comfort Recalibration',
    tagline: 'Relief from friction spots and natural ridge remodeling.',
    description:
      'Over the years, the alveolar jaw ridge naturally remodels. Joan performs hard and soft relines, removing painful pressure spots and restoring a snug, comfortable suction seal.',
    image: '/images/clinic-room.jpg',
    points: ['Immediate sore spot relief', 'Hard & soft laboratory relines', 'Occlusal pressure rebalancing'],
  },
];

export const EditorialServices: React.FC<EditorialServicesProps> = ({ onSelectService }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentService = SERVICES_DATA[activeIndex];

  return (
    <section id="services-story" className="py-28 bg-[#FAF9F6] border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with generous breathing space */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase block mb-3">
            Bespoke Prosthetics
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-[1.08]">
            Care shaped around your life.
          </h2>
          <p className="mt-4 text-base text-slate-600 font-light max-w-xl leading-relaxed">
            Every smile has distinct biomechanics. Discover how Joan Andrews approaches individual treatments with editorial attention to detail.
          </p>
        </div>

        {/* Refined Horizontal Selector & Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Minimal Service Navigation List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {SERVICES_DATA.map((srv, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-lg shadow-slate-900/5 border border-slate-200/90 translate-x-2'
                      : 'hover:bg-white/60 border border-transparent text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-800">
                      0{idx + 1} · {srv.kicker}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? 'bg-slate-900 scale-150' : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  <h3 className="text-2xl font-serif text-slate-900 font-semibold mt-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1 line-clamp-1">
                    {srv.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Hero Showcase Card with Realistic Photography */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-900/5 overflow-hidden">
              {/* Realistic Service Photograph */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-8 border border-slate-200/70">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-slate-900 border border-slate-200">
                  {currentService.kicker}
                </div>
              </div>

              {/* Service Editorial Information */}
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 font-bold">
                  {currentService.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 font-medium italic">
                  “{currentService.tagline}”
                </p>
                <p className="mt-4 text-sm text-slate-600 font-light leading-relaxed">
                  {currentService.description}
                </p>

                {/* Key Pillars */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentService.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 font-light">
                      <Check className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400">
                    Consultation at 538 Topsail Road
                  </span>
                  <button
                    onClick={() => onSelectService(currentService.title)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-slate-900 hover:bg-sky-950 rounded-full transition-all shadow-xs cursor-pointer"
                  >
                    <span>REQUEST {currentService.title.toUpperCase()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
