import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Layers, Wrench, Sliders, Shield } from 'lucide-react';
import { ServiceId, ServiceItem } from '../types';

interface InteractiveServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'complete',
    title: 'Complete Dentures',
    tagline: 'Full arch restoration replicating complete natural dentition',
    description:
      'Engineered for patients missing all teeth in an upper or lower jaw. We meticulously calculate bite vertical dimension, lip support, and phonetic alignment so you can speak and chew with total peace of mind.',
    anatomicalConnection:
      'Replaces the entire crown-to-root continuum. Crafted with natural gum shading and hand-selected tooth molds that contour harmoniously with your facial structure.',
    highlightPart: 'full',
    benefits: [
      'Personalized bite and smile design',
      'Restores natural facial contours and lip fullness',
      'High-impact acrylic for longevity and stain resistance',
      'Multiple fitting stages to guarantee comfort',
    ],
    duration: 'Multi-stage custom fitting',
  },
  {
    id: 'partial',
    title: 'Partial Dentures',
    tagline: 'Seamless integration with your existing natural teeth',
    description:
      'Ideal when one or more natural teeth remain. Partial dentures prevent your adjacent teeth from shifting out of place, distributing chewing forces evenly and completing your smile seamlessly.',
    anatomicalConnection:
      'Locks into the dentin and enamel contours of anchor teeth via precision, aesthetic clasps or lightweight biocompatible metal frameworks.',
    highlightPart: 'dentin',
    benefits: [
      'Prevents remaining natural teeth from tilting or drifting',
      'Blends imperceptibly with surrounding enamel shade',
      'Lightweight, discreet clasp systems',
      'Preserves current jaw alignment and chewing efficiency',
    ],
    duration: 'Custom fabricated in 3–4 visits',
  },
  {
    id: 'repairs',
    title: 'Denture Repairs',
    tagline: 'Rapid restoration for cracked bases and chipped teeth',
    description:
      'Accidents happen. Dropped dentures, fractured bases, or lost prosthetic teeth are treated with urgent laboratory care to get you smiling again without unnecessary delay.',
    anatomicalConnection:
      'Focused on outer enamel and acrylic base continuity. We reinforce fracture lines with medical-grade resin polymers matching your original appliance.',
    highlightPart: 'enamel',
    benefits: [
      'Same-day emergency turnaround available',
      'Structural reinforcement along stress fracture lines',
      'Replacement of chipped or worn acrylic teeth',
      'Professional cleaning and ultrasonic sanitization included',
    ],
    duration: 'Often completed within hours',
  },
  {
    id: 'adjustments',
    title: 'Denture Adjustments',
    tagline: 'Relief from sore spots, relines, and loose fittings',
    description:
      'As natural gum tissue and bone gently remodel over the years, dentures can loosen or rub. We gently recalibrate the tissue-bearing surface to eliminate pain and re-establish snug retention.',
    anatomicalConnection:
      'Addresses the basal root ridge and soft tissue interface. Micro-adjustments relieve pinpoint pressure spots on delicate oral mucosa.',
    highlightPart: 'root',
    benefits: [
      'Immediate relief from sore spots and friction rub',
      'Hard and soft relines to restore snug suction',
      'Occlusal equilibration for smooth biting pressure',
      'Complimentary minor checks for regular patients',
    ],
    duration: 'Single 30–45 minute consultation',
  },
];

export const InteractiveServices: React.FC<InteractiveServicesProps> = ({ onSelectService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('complete');
  const [hoveredServiceId, setHoveredServiceId] = useState<ServiceId | null>(null);

  const activeId = hoveredServiceId || selectedServiceId;
  const activeService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase">
            Interactive Prosthetics
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-serif text-slate-900 tracking-tight">
            Discover Tailored Denture Services
          </h2>
          <p className="mt-4 text-base text-slate-600 font-light leading-relaxed">
            Hover or select an area to see how each prosthetic service directly connects to the anatomy of your smile.
          </p>
        </div>

        {/* Interactive Layout: 4 Service Selector Buttons + Center Anatomical Graphic + Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 4 Service Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {SERVICES.map((service) => {
              const isSelected = activeId === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-300 shadow-sm shadow-sky-900/5 translate-x-1.5'
                      : 'bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider uppercase text-sky-800">
                      {service.id === 'complete' && 'Full Restoration'}
                      {service.id === 'partial' && 'Targeted Replacement'}
                      {service.id === 'repairs' && 'Emergency Lab Repair'}
                      {service.id === 'adjustments' && 'Fit & Comfort Relining'}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isSelected ? 'bg-sky-700 scale-125' : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-slate-900 mt-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-light">
                    {service.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Center Column: Simplified Anatomical Tooth SVG with Dynamic Highlights */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50/40 via-white to-slate-50/40 rounded-3xl border border-slate-200/80 shadow-xs relative min-h-[380px]">
            <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-slate-400 font-medium">
              Anatomical Alignment
            </div>

            {/* Interactive Anatomical SVG */}
            <div className="w-56 h-72 relative flex items-center justify-center">
              <svg
                viewBox="0 0 200 280"
                className="w-full h-full drop-shadow-sm transition-all duration-500"
              >
                <defs>
                  {/* Subtle clean gradients - NO neon glow */}
                  <linearGradient id="enamelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F1F5F9" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>

                  <linearGradient id="dentinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF3C7" />
                    <stop offset="100%" stopColor="#FDE68A" />
                  </linearGradient>

                  <linearGradient id="pulpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#E11D48" />
                  </linearGradient>

                  <linearGradient id="activeHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="100%" stopColor="#BAE6FD" />
                  </linearGradient>
                </defs>

                {/* ROOT SECTION (Highlighted for Adjustments or Complete) */}
                <g
                  className={`transition-all duration-300 ${
                    activeService.highlightPart === 'root' || activeService.highlightPart === 'full'
                      ? 'stroke-sky-700 stroke-[2.5px] filter drop-shadow'
                      : 'stroke-slate-300 stroke-[1.2px]'
                  }`}
                >
                  {/* Left Root */}
                  <path
                    d="M 60 130 C 55 170, 48 215, 62 255 C 68 255, 75 240, 80 205 C 85 170, 92 145, 96 135 Z"
                    fill={
                      activeService.highlightPart === 'root'
                        ? 'url(#activeHighlightGrad)'
                        : activeService.highlightPart === 'full'
                        ? '#E0F2FE'
                        : '#F8FAFC'
                    }
                  />
                  {/* Right Root */}
                  <path
                    d="M 104 135 C 108 145, 115 170, 120 205 C 125 240, 132 255, 138 255 C 152 215, 145 170, 140 130 Z"
                    fill={
                      activeService.highlightPart === 'root'
                        ? 'url(#activeHighlightGrad)'
                        : activeService.highlightPart === 'full'
                        ? '#E0F2FE'
                        : '#F8FAFC'
                    }
                  />
                </g>

                {/* DENTIN CORE (Highlighted for Partial Dentures or Complete) */}
                <path
                  d="M 46 125 C 44 95, 52 50, 75 42 C 90 38, 100 48, 100 48 C 100 48, 110 38, 125 42 C 148 50, 156 95, 154 125 C 135 135, 115 130, 100 132 C 85 130, 65 135, 46 125 Z"
                  fill={
                    activeService.highlightPart === 'dentin'
                      ? '#FEF08A'
                      : activeService.highlightPart === 'full'
                      ? '#FEF3C7'
                      : '#FEF9C3'
                  }
                  className={`transition-all duration-300 ${
                    activeService.highlightPart === 'dentin' || activeService.highlightPart === 'full'
                      ? 'stroke-amber-600 stroke-[2px]'
                      : 'stroke-amber-200 stroke-[1px]'
                  }`}
                />

                {/* PULP CANALS & CHAMBER */}
                <path
                  d="M 85 85 C 85 68, 93 62, 100 62 C 107 62, 115 68, 115 85 C 115 105, 108 115, 104 125 C 102 155, 106 195, 125 235 C 122 235, 112 195, 100 135 C 88 195, 78 235, 75 235 C 94 195, 98 155, 96 125 C 92 115, 85 105, 85 85 Z"
                  fill="url(#pulpGrad)"
                  opacity="0.85"
                />

                {/* ENAMEL CROWN (Highlighted for Repairs or Complete) */}
                <path
                  d="M 32 125 C 30 85, 42 30, 72 20 C 88 14, 100 28, 100 28 C 100 28, 112 14, 128 20 C 158 30, 170 85, 168 125 C 150 135, 125 128, 100 130 C 75 128, 50 135, 32 125 Z"
                  fill={
                    activeService.highlightPart === 'enamel'
                      ? '#E0F2FE'
                      : activeService.highlightPart === 'full'
                      ? '#F0F9FF'
                      : 'url(#enamelGrad)'
                  }
                  className={`transition-all duration-300 ${
                    activeService.highlightPart === 'enamel' || activeService.highlightPart === 'full'
                      ? 'stroke-sky-700 stroke-[2.5px]'
                      : 'stroke-slate-300 stroke-[1.2px]'
                  }`}
                  fillOpacity={activeService.highlightPart === 'dentin' ? '0.35' : '0.88'}
                />

                {/* Gingival Gumline Contour Line */}
                <path
                  d="M 22 125 Q 100 148 178 125"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  opacity="0.5"
                />

                {/* Subtle indicator dots */}
                <circle cx="100" cy="30" r="3" fill="#0284C7" opacity={activeService.highlightPart === 'enamel' ? 1 : 0.4} />
                <circle cx="100" cy="85" r="3" fill="#D97706" opacity={activeService.highlightPart === 'dentin' ? 1 : 0.4} />
                <circle cx="100" cy="210" r="3" fill="#0369A1" opacity={activeService.highlightPart === 'root' ? 1 : 0.4} />
              </svg>
            </div>

            {/* Active zone label under graphic */}
            <div className="mt-4 text-center">
              <span className="text-xs font-semibold text-sky-900 bg-sky-100/70 px-3 py-1 rounded-full">
                {activeService.highlightPart === 'full' && 'Complete Arch Harmony'}
                {activeService.highlightPart === 'dentin' && 'Precision Tooth Anchors'}
                {activeService.highlightPart === 'enamel' && 'Enamel & Acrylic Restoration'}
                {activeService.highlightPart === 'root' && 'Gumline & Ridge Comfort'}
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Service Explanation & Action */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Selected Treatment</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 font-semibold">
                {activeService.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed font-light">
                {activeService.description}
              </p>

              {/* Anatomical synergy note */}
              <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-900 mb-0.5">Anatomical Focus:</div>
                {activeService.anatomicalConnection}
              </div>

              {/* Key benefits list */}
              <div className="mt-5 space-y-2">
                {activeService.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="mt-8 pt-4 border-t border-slate-200">
                <button
                  onClick={() => onSelectService(activeService.title)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <span>REQUEST {activeService.title.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
