import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { ReviewItem } from '../types';

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Eleanor P.',
    rating: 5,
    date: 'Verified Google Review',
    highlight: 'Fit like a glove from day one',
    quote:
      'Joan is simply wonderful. My new dentures fit like a glove from the very first day without any irritating sore spots. She is gentle, patient, and truly cares about her patients.',
    serviceReceived: 'Complete Upper & Lower Dentures',
  },
  {
    id: 'rev-2',
    author: 'David M.',
    rating: 5,
    date: 'Verified Google Review',
    highlight: 'Emergency repair completed same afternoon',
    quote:
      'I accidentally cracked my partial denture right before an important family gathering. Joan had it repaired and reinforced the exact same afternoon. Exceptional service in St. John’s.',
    serviceReceived: 'Same-Day Laboratory Repair',
  },
  {
    id: 'rev-3',
    author: 'Margaret S.',
    rating: 5,
    date: 'Verified Google Review',
    highlight: 'Smiling in family photos with confidence',
    quote:
      'I was so self-conscious before coming to Joan. She took the time to understand exactly how I wanted my smile to look. I can finally eat comfortably and smile proudly again.',
    serviceReceived: 'Custom Partial Denture',
  },
];

export const PatientStories: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase">
            Patient Stories
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-serif text-slate-900 tracking-tight">
            Real People. Real Confidence.
          </h2>

          {/* Prominent 5.0 Rating Display Requested by User */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-slate-50 border border-slate-200/90 rounded-2xl px-6 py-3.5 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="text-sm font-semibold text-slate-900">
              <span className="text-base font-bold">5.0</span> Google Rating
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="text-xs text-slate-500">
              5 Reviews · St. John's Denture Clinic
            </div>
          </div>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-50/60 rounded-3xl p-8 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="text-sm font-semibold text-slate-900 mb-2">
                  “{review.highlight}”
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  "{review.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{review.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-sky-700" />
                    </div>
                    <div className="text-[11px] text-slate-500">{review.serviceReceived}</div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps link verification */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/wBgt6HzTH3PRmp126"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-sky-900 hover:text-slate-900 hover:underline"
          >
            <span>Read all reviews on Google Maps</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
