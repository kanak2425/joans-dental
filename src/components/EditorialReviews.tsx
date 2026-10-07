import React from 'react';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';

const REVIEWS_EDITORIAL = [
  {
    quote:
      'My dentures fit like a glove from the very first day without a single irritating sore spot. Joan takes the time to listen and make sure you feel completely happy and dignified.',
    author: 'Eleanor P.',
    treatment: 'Complete Upper & Lower Dentures',
    location: "St. John's, NL",
    rating: 5,
  },
  {
    quote:
      'I accidentally cracked my lower denture on a Friday. Joan took me in and had the acrylic repaired and reinforced the exact same afternoon. Truly exceptional care.',
    author: 'David M.',
    treatment: 'Emergency Same-Day Repair',
    location: "St. John's, NL",
    rating: 5,
  },
  {
    quote:
      'I was so self-conscious before coming to Joan Andrews. She helped me pick the right natural shade and shape. Now I can smile in family photos with total confidence again.',
    author: 'Margaret S.',
    treatment: 'Precision Partial Dentures',
    location: "Mount Pearl, NL",
    rating: 5,
  },
];

export const EditorialReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-28 bg-white border-t border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase block mb-3">
              Verified Patient Experiences
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-[1.08]">
              REAL PEOPLE. REAL CONFIDENCE.
            </h2>
          </div>

          {/* Prominent Google Rating Display */}
          <div className="flex items-center gap-4 bg-[#FAF9F6] border border-slate-200/80 rounded-2xl px-6 py-4 self-start md:self-auto">
            <div className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-1.5">
              <span>5.0</span>
              <span className="text-amber-500 text-2xl">★</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Google Rating
              </div>
              <div className="text-[11px] text-slate-500">
                5 Google Reviews · St. John's, NL
              </div>
            </div>
          </div>
        </div>

        {/* Large Elegant Editorial Magazine Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_EDITORIAL.map((rev, i) => (
            <div
              key={i}
              className="bg-[#FAF9F6] rounded-3xl p-8 sm:p-10 border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg text-slate-800 font-serif leading-relaxed italic">
                  “{rev.quote}”
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-sky-700" />
                    </div>
                    <div className="text-xs text-slate-500 font-light mt-0.5">
                      {rev.treatment}
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Link */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/wBgt6HzTH3PRmp126"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 underline uppercase tracking-wider"
          >
            <span>Read reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
