import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, Phone, Mail, HelpCircle, ArrowRight } from 'lucide-react';

interface MinimalConsultationBookingProps {
  initialService?: string;
}

const SERVICE_OPTIONS = [
  'Complete Dentures',
  'Partial Dentures',
  'Repairs',
  'Adjustments',
  "I'm not sure yet",
];

const TIME_WINDOWS = ['Morning (9am - 12pm)', 'Afternoon (1pm - 4pm)', 'Late Afternoon (4pm - 5pm)'];

export const MinimalConsultationBooking: React.FC<MinimalConsultationBookingProps> = ({
  initialService,
}) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialService || 'Complete Dentures'
  );
  const [selectedTime, setSelectedTime] = useState<string>('Morning (9am - 12pm)');
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setErrorMessage('Please provide your name and phone or email so we can reach you.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="booking-section" className="py-28 bg-[#FAF9F6] border-t border-slate-200/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Calmer Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase block mb-2">
            One-on-One Conversation
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight leading-[1.08]">
            LET'S TALK ABOUT YOUR SMILE.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Book a consultation and take the first step toward a smile that feels like you.
          </p>
        </div>

        {/* Minimal Booking Interface */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-8 sm:p-12">
          {isSubmitted ? (
            <div className="text-center py-10 max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-3xl font-serif text-slate-900 font-semibold">
                Thank you, {formData.name}.
              </h3>

              <p className="text-sm text-slate-600 font-light leading-relaxed">
                Your consultation request has been received. Our clinic at 538 Topsail Road will reach out to{' '}
                <span className="font-semibold text-slate-900">{formData.contact}</span> to confirm your appointment time.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs text-left space-y-1.5">
                <div className="text-slate-400 uppercase tracking-widest text-[10px] font-semibold mb-1">
                  Appointment Details
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-medium text-slate-900">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Date:</span>
                  <span className="font-medium text-slate-900">{preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Window:</span>
                  <span className="font-medium text-slate-900">{selectedTime}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Need immediate emergency repair today? Call us directly at{' '}
                <a href="tel:709-364-8100" className="text-sky-900 font-semibold underline">
                  709-364-8100
                </a>
                .
              </p>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', contact: '', notes: '' });
                }}
                className="px-6 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-all cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Service Selection: What can we help you with? */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-slate-700 mb-3">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICE_OPTIONS.map((opt) => {
                    const isSelected = selectedService === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSelectedService(opt)}
                        className={`p-3.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-700 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-700 mb-2">
                    Phone / Email *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Phone number or email"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-700 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50/50 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-700 mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50/50 text-slate-800 appearance-none"
                    >
                      {TIME_WINDOWS.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-slate-700 mb-2">
                  Questions or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any current discomfort, fitting questions, or goals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50/50"
                />
              </div>

              {/* Large Elegant Button Requested by User */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 text-sm font-semibold tracking-widest uppercase text-white bg-slate-900 hover:bg-sky-950 rounded-2xl shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'PREPARING YOUR REQUEST...' : 'BOOK A CONSULTATION'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 text-center">
                <span>Free initial consultation</span>
                <span aria-hidden="true">·</span>
                <span>Direct billing assistance</span>
                <span aria-hidden="true">·</span>
                <span>No pressure, unhurried care</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
