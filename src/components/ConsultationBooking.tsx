import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, Sparkles } from 'lucide-react';

interface ConsultationBookingProps {
  initialService?: string;
}

const SERVICES_LIST = [
  { id: 'Complete Dentures', name: 'Complete Dentures', desc: 'Full upper or lower arch restoration' },
  { id: 'Partial Dentures', name: 'Partial Dentures', desc: 'Custom replacement for missing teeth' },
  { id: 'Denture Repair', name: 'Denture Repair', desc: 'Fracture repair, tooth replacement, urgent care' },
  { id: 'Denture Adjustment', name: 'Denture Adjustment', desc: 'Sore spot relief, relines & tight fit' },
  { id: 'Consultation', name: 'General Consultation', desc: 'First-time evaluation & personalized smile advice' },
];

const TIME_SLOTS = [
  '9:00 AM',
  '10:15 AM',
  '11:30 AM',
  '1:00 PM',
  '2:15 PM',
  '3:30 PM',
  '4:15 PM',
];

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({ initialService }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService || 'Complete Dentures');
  
  // Date selection state
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    // Default to tomorrow or next weekday
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    if (d.getDay() === 6) d.setDate(d.getDate() + 2);
    return d;
  });
  const [currentMonthOffset, setCurrentMonthOffset] = useState<number>(0);

  // Time slot state
  const [selectedTime, setSelectedTime] = useState<string>('10:15 AM');

  // Contact details state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    firstTimeWearer: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calendar generation for current view
  const displayDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
  const monthName = displayDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();

  const handleDateSelect = (day: number) => {
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    const dayOfWeek = newDate.getDay();
    // Sunday is closed, Saturday by special arrangement
    if (dayOfWeek === 0) {
      setValidationError('Our clinic is closed on Sundays. Please choose Monday through Saturday.');
      return;
    }
    setValidationError(null);
    setSelectedDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError('Please provide your name and phone number so Joan Andrews Clinic can reach you.');
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    // Simulate reliable frontend request processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-[#F8FAFC] via-sky-50/30 to-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-800 uppercase">
            Personalized Appointment
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-serif text-slate-900 tracking-tight">
            Let's Talk About Your Smile.
          </h2>
          <p className="mt-3 text-base text-slate-600 font-light leading-relaxed">
            Take the first step toward comfortable, confident denture care.
          </p>
        </div>

        {/* Booking Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
          {/* Step Progress Header */}
          {!isSubmitted && (
            <div className="bg-slate-50/90 border-b border-slate-200/80 px-6 py-4">
              <div className="flex items-center justify-between max-w-xl mx-auto">
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Date' },
                  { num: 3, label: 'Time' },
                  { num: 4, label: 'Details' },
                ].map((step, idx) => {
                  const isActive = currentStep === step.num;
                  const isDone = currentStep > step.num;
                  return (
                    <div key={step.num} className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (step.num < currentStep) setCurrentStep(step.num);
                        }}
                        disabled={step.num > currentStep}
                        className={`flex items-center gap-2 text-xs font-medium cursor-pointer ${
                          isActive
                            ? 'text-slate-900 font-bold'
                            : isDone
                            ? 'text-sky-700'
                            : 'text-slate-400'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                            isActive
                              ? 'bg-slate-900 text-white'
                              : isDone
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? '✓' : step.num}
                        </span>
                        <span className="hidden sm:inline">{step.label}</span>
                      </button>
                      {idx < 3 && <div className="w-8 sm:w-12 h-px bg-slate-200" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-10">
            {/* SUBMITTED CONFIRMATION STATE */}
            {isSubmitted ? (
              <div className="text-center py-10 max-w-lg mx-auto space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-3xl font-serif text-slate-900 font-bold">
                    Thank you. Your consultation request has been received.
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
                    Our St. John's clinic team will contact you within 1 business day at{' '}
                    <span className="font-semibold text-slate-900">{formData.phone}</span> to confirm your appointment.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Request Summary
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/50">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-medium text-slate-900">{selectedService}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/50">
                    <span className="text-slate-500">Requested Date:</span>
                    <span className="font-medium text-slate-900">
                      {selectedDate.toLocaleDateString('en-CA', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/50">
                    <span className="text-slate-500">Preferred Time:</span>
                    <span className="font-medium text-slate-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Patient Name:</span>
                    <span className="font-medium text-slate-900">{formData.name}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  Need immediate assistance or emergency repair today? Call us directly at{' '}
                  <a href="tel:709-364-8100" className="text-sky-900 font-semibold underline">
                    709-364-8100
                  </a>
                  .
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div>
                {/* STEP 1: CHOOSE A SERVICE */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-slate-900 mb-1">
                      Step 1: Choose a service
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Select the treatment you would like to discuss with Joan.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {SERVICES_LIST.map((srv) => {
                        const isChosen = selectedService === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedService(srv.id)}
                            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-sky-50/80 border-sky-400 shadow-xs ring-1 ring-sky-300'
                                : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-900 font-serif">
                                {srv.name}
                              </span>
                              {isChosen && <CheckCircle2 className="w-4 h-4 text-sky-700" />}
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                              {srv.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-xs transition-all cursor-pointer"
                      >
                        <span>CONTINUE TO PREFERRED DATE</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CHOOSE A PREFERRED DATE */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-serif text-slate-900">
                          Step 2: Choose a preferred date
                        </h3>
                        <p className="text-xs text-slate-500">
                          Select the day that best fits your schedule.
                        </p>
                      </div>

                      {/* Month navigators */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentMonthOffset((o) => Math.max(0, o - 1))}
                          disabled={currentMonthOffset === 0}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-semibold text-slate-900 min-w-28 text-center">
                          {monthName}
                        </span>
                        <button
                          onClick={() => setCurrentMonthOffset((o) => o + 1)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {validationError && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    {/* Clean Calendar Matrix */}
                    <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {/* Empty padding before day 1 */}
                        {[...Array(firstDayOfWeek)].map((_, i) => (
                          <div key={`empty-${i}`} className="h-10" />
                        ))}

                        {/* Calendar days */}
                        {[...Array(daysInMonth)].map((_, i) => {
                          const dayNum = i + 1;
                          const cellDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), dayNum);
                          const isSelectedDay =
                            selectedDate.getFullYear() === cellDate.getFullYear() &&
                            selectedDate.getMonth() === cellDate.getMonth() &&
                            selectedDate.getDate() === cellDate.getDate();
                          const isPast =
                            cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const isSunday = cellDate.getDay() === 0;

                          return (
                            <button
                              key={dayNum}
                              type="button"
                              disabled={isPast || isSunday}
                              onClick={() => handleDateSelect(dayNum)}
                              className={`h-10 rounded-xl text-xs font-medium flex flex-col items-center justify-center transition-all cursor-pointer ${
                                isSelectedDay
                                  ? 'bg-slate-900 text-white font-bold shadow-xs'
                                  : isPast || isSunday
                                  ? 'text-slate-300 cursor-not-allowed'
                                  : 'text-slate-700 hover:bg-sky-100 hover:text-slate-900'
                              }`}
                            >
                              <span>{dayNum}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-slate-500 flex items-center justify-between">
                      <span>Selected: {selectedDate.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[11px] text-slate-400">Clinic hours: Mon–Fri 9am–5pm</span>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                      >
                        ← Back to Services
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-xs cursor-pointer"
                      >
                        <span>CONTINUE TO APPOINTMENT TIME</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CHOOSE A TIME */}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-slate-900 mb-1">
                      Step 3: Choose a time
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Available consultation windows for {selectedDate.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isChosen = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3.5 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-300'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                      >
                        ← Back to Date
                      </button>
                      <button
                        onClick={() => setCurrentStep(4)}
                        className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-xs cursor-pointer"
                      >
                        <span>ENTER YOUR DETAILS</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: YOUR DETAILS & FINAL CTA */}
                {currentStep === 4 && (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-xl sm:text-2xl font-serif text-slate-900 mb-1">
                      Step 4: Your Details
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Let us know how to contact you to confirm your consultation at 538 Topsail Road.
                    </p>

                    {validationError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Margaret Collins"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-slate-50/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                            <input
                              type="tel"
                              required
                              placeholder="709-xxx-xxxx"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-slate-50/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email (Optional)
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                            <input
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-slate-50/50"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Notes or Questions
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Tell Joan about current denture wear, sore spots, or specific questions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent bg-slate-50/50"
                        />
                      </div>

                      <label className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={formData.firstTimeWearer}
                          onChange={(e) => setFormData({ ...formData, firstTimeWearer: e.target.checked })}
                          className="rounded border-slate-300 text-sky-800 focus:ring-sky-500"
                        />
                        <span>I am a first-time denture wearer or would like an introductory overview</span>
                      </label>
                    </div>

                    {/* Summary Tag */}
                    <div className="mt-6 p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex items-center justify-between text-xs text-sky-950">
                      <div>
                        <span className="font-semibold">{selectedService}</span> on{' '}
                        <span>
                          {selectedDate.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} at{' '}
                          {selectedTime}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[11px]">Free initial consultation</span>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                      >
                        ← Back to Time
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-9 py-4 text-sm font-semibold tracking-wider text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-lg shadow-slate-900/15 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>PROCESSING REQUEST...</span>
                        ) : (
                          <span>REQUEST CONSULTATION</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
