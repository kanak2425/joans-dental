import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, Calendar, Compass, SkipForward } from 'lucide-react';

interface CinematicOpeningSceneProps {
  onComplete: () => void;
  onOpenBooking: () => void;
}

export const CinematicOpeningScene: React.FC<CinematicOpeningSceneProps> = ({
  onComplete,
  onOpenBooking,
}) => {
  // Timeline progress (0 to 100)
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Total duration: 11 seconds for deliberate, unhurried, luxury medical pacing
  const TOTAL_DURATION = 11000;

  useEffect(() => {
    const handleAnimation = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const p = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(p);

      if (p < 100) {
        animationRef.current = requestAnimationFrame(handleAnimation);
      }
    };

    animationRef.current = requestAnimationFrame(handleAnimation);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleSkip = () => {
    setProgress(100);
  };

  // Phase Calculations (0 to 1 ranges)
  // Phase 0: Stillness on white (0% to 10%)
  // Phase 1: Sketch drawing (10% to 42%)
  const sketchProgress = Math.max(0, Math.min(1, (progress - 10) / 32));

  // Phase 2: Transition from Sketch -> Anatomical Illustration -> Realistic Smile (38% to 68%)
  const anatomicalProgress = Math.max(0, Math.min(1, (progress - 36) / 20));
  const smilePhotoProgress = Math.max(0, Math.min(1, (progress - 46) / 22));

  // Camera zoom: gently moves closer to smile, then pulls back slightly at the end
  let cameraZoom = 1.0;
  if (progress > 38 && progress <= 82) {
    // Slowly glides closer
    const zoomP = (progress - 38) / 44;
    cameraZoom = 1.0 + Math.sin(zoomP * Math.PI * 0.5) * 0.12; // up to 1.12
  } else if (progress > 82) {
    // Pulls back gently to settle
    const pullP = (progress - 82) / 18;
    cameraZoom = 1.12 - pullP * 0.10; // back to 1.02
  }

  // Phase 3: Brand Reveal (65% to 88%)
  const brandProgress = Math.max(0, Math.min(1, (progress - 64) / 18));
  const lineProgress = Math.max(0, Math.min(1, (progress - 72) / 10));
  const headlineProgress = Math.max(0, Math.min(1, (progress - 78) / 12));

  // Phase 4: Final Moment & Negative Space Emergence (85% to 100%)
  const settledProgress = Math.max(0, Math.min(1, (progress - 85) / 15));

  // Background color shift: Pure warm white -> Soft icy blue-white
  const bgShift = Math.max(0, Math.min(1, (progress - 50) / 35));

  return (
    <div
      className="relative w-full h-screen overflow-hidden text-slate-900 select-none flex flex-col justify-between transition-colors duration-1000"
      style={{
        backgroundColor: bgShift > 0.1 ? '#F4F8FC' : '#FAF9F6',
      }}
    >
      {/* Subtle fine paper texture & ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply transition-opacity duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(240,244,248,0.7) 65%, rgba(226,232,240,0.5) 100%)`,
        }}
      />

      {/* Top minimal header bar with discreet skip */}
      <header className="relative z-30 px-6 sm:px-12 py-7 flex items-center justify-between text-xs font-medium tracking-widest text-slate-400 uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-700/80" />
          <span className="font-serif tracking-[0.25em] text-slate-800 font-semibold text-xs sm:text-sm">
            Joan Andrews Denture Clinic
          </span>
          <span className="hidden sm:inline text-slate-400">· St. John's, NL</span>
        </div>

        <div>
          {progress < 95 && (
            <button
              onClick={handleSkip}
              className="group flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <span>Skip to Clinic</span>
              <SkipForward className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </header>

      {/* ============================================================ */}
      {/* MAIN VIEWPORT: THE SMILE REVEALS ITSELF                      */}
      {/* ============================================================ */}
      <div className="relative flex-1 flex items-center justify-center px-4 overflow-hidden">
        {/* Dynamic camera container with smooth physical zoom */}
        <div
          className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${cameraZoom}) translateY(${settledProgress * 20}px)`,
          }}
        >
          {/* ------------------------------------------------------------ */}
          {/* LAYER 1: REALISTIC HUMAN SMILE PHOTOGRAPH                    */}
          {/* Appears seamlessly as the medical sketch completes          */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden transition-all duration-1000 ease-in-out"
            style={{
              opacity: settledProgress > 0 ? 0.35 : smilePhotoProgress,
              filter:
                settledProgress > 0
                  ? 'blur(1px) contrast(0.95)'
                  : `contrast(${1 + (1 - smilePhotoProgress) * 0.08})`,
            }}
          >
            <img
              src="/images/smile-reveal-hero.jpg"
              alt="Natural warm human smile with fine medical illustration cutaway for Joan Andrews Denture Clinic"
              className="w-full h-full object-cover object-center"
            />
            {/* Soft vignette blending the edges into the negative space */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(250,249,246,0) 35%, rgba(244,248,252,0.6) 75%, rgba(244,248,252,0.98) 100%)',
              }}
            />
          </div>

          {/* ------------------------------------------------------------ */}
          {/* LAYER 2: ANATOMICAL GLASS CUTAWAY OVERLAY                     */}
          {/* The bridge between fine line sketch and realistic smile      */}
          {/* ------------------------------------------------------------ */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              opacity:
                settledProgress > 0
                  ? 0.15
                  : anatomicalProgress * (1 - smilePhotoProgress * 0.5),
            }}
          >
            {/* Subtle anatomical soft tint */}
            <div className="absolute right-12 top-10 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl" />
          </div>

          {/* ------------------------------------------------------------ */}
          {/* LAYER 3: HAND-DRAWN BLUE MEDICAL SKETCH (SVG)                 */}
          {/* Drawn by an invisible artist: abstract line -> jaw -> teeth   */}
          {/* ------------------------------------------------------------ */}
          <svg
            viewBox="0 0 800 500"
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700"
            style={{
              opacity: Math.max(0, 1 - smilePhotoProgress * 0.85),
            }}
          >
            {/* Architectural & Medical Reference Guidelines */}
            <g
              opacity={Math.min(0.35, sketchProgress * 0.6)}
              stroke="#0284C7"
              strokeWidth="0.6"
            >
              {/* Horizontal Occlusal Guide Line */}
              <line
                x1="120"
                y1="280"
                x2="680"
                y2="280"
                strokeDasharray="4 6"
                style={{
                  strokeDashoffset: (1 - sketchProgress) * 300,
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
              {/* Vertical Dental Midline Axis */}
              <line
                x1="400"
                y1="160"
                x2="400"
                y2="400"
                strokeDasharray="3 5"
                style={{
                  strokeDashoffset: (1 - sketchProgress) * 200,
                  transition: 'stroke-dashoffset 0.1s linear',
                }}
              />
              {/* Aesthetic Smile Arc Guide */}
              <path
                d="M 160 255 Q 400 315 640 255"
                fill="none"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </g>

            {/* A. Mandibular Jaw Outline (The initial curving line) */}
            <path
              d="M 180 270 C 230 335, 310 380, 400 380 C 490 380, 570 335, 620 270"
              fill="none"
              stroke="#0369A1"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset={Math.max(0, 600 - sketchProgress * 700)}
              style={{ transition: 'stroke-dashoffset 0.08s linear' }}
            />

            {/* Maxillary Upper Lip / Smile Contour */}
            <path
              d="M 210 260 C 270 235, 330 220, 385 235 Q 400 240 415 235 C 470 220, 530 235, 590 260"
              fill="none"
              stroke="#0284C7"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="500"
              strokeDashoffset={Math.max(0, 500 - sketchProgress * 650)}
              style={{ transition: 'stroke-dashoffset 0.08s linear' }}
            />

            {/* Lower Lip Curve */}
            <path
              d="M 210 260 C 280 340, 350 355, 400 355 C 450 355, 520 340, 590 260"
              fill="none"
              stroke="#0284C7"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="500"
              strokeDashoffset={Math.max(
                0,
                500 - Math.max(0, (sketchProgress - 0.15) * 1.3) * 500
              )}
            />

            {/* B. TEETH SKETCHED ONE BY ONE BY INVISIBLE ARTIST */}
            {/* Tooth 1 & 2: Central Incisors (Midline anchor) */}
            {sketchProgress > 0.22 && (
              <g
                stroke="#0369A1"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
                opacity={Math.min(1, (sketchProgress - 0.22) * 5)}
              >
                {/* Upper Left Central */}
                <path d="M 378 245 C 378 250, 375 275, 377 285 Q 388 286 398 285 L 398 245 C 392 243, 382 243, 378 245 Z" />
                {/* Upper Right Central */}
                <path d="M 402 245 L 402 285 Q 412 286 423 285 C 425 275, 422 250, 422 245 C 418 243, 408 243, 402 245 Z" />
                {/* Delicate incisal translucency sketch line */}
                <path d="M 380 282 Q 388 284 396 282" strokeWidth="0.8" opacity="0.6" />
                <path d="M 404 282 Q 412 284 420 282" strokeWidth="0.8" opacity="0.6" />
              </g>
            )}

            {/* Tooth 3 & 4: Lateral Incisors */}
            {sketchProgress > 0.42 && (
              <g
                stroke="#0369A1"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                opacity={Math.min(1, (sketchProgress - 0.42) * 5)}
              >
                {/* Left Lateral */}
                <path d="M 355 248 C 356 255, 354 274, 356 282 Q 366 283 375 283 L 375 247 C 368 245, 360 245, 355 248 Z" />
                {/* Right Lateral */}
                <path d="M 425 247 L 425 283 Q 434 283 444 282 C 446 274, 444 255, 445 248 C 440 245, 432 245, 425 247 Z" />
              </g>
            )}

            {/* Tooth 5 & 6: Canines (Cuspid form) */}
            {sketchProgress > 0.62 && (
              <g
                stroke="#0369A1"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                opacity={Math.min(1, (sketchProgress - 0.62) * 5)}
              >
                {/* Left Canine */}
                <path d="M 330 252 C 332 260, 331 276, 334 283 Q 343 286 352 281 L 352 250 C 344 249, 336 250, 330 252 Z" />
                {/* Right Canine */}
                <path d="M 448 250 L 448 281 Q 457 286 466 283 C 469 276, 468 260, 470 252 C 464 250, 456 249, 448 250 Z" />
              </g>
            )}

            {/* Tooth 7, 8, 9, 10: Premolars & Molars */}
            {sketchProgress > 0.80 && (
              <g
                stroke="#0369A1"
                strokeWidth="1.1"
                fill="none"
                strokeLinecap="round"
                opacity={Math.min(1, (sketchProgress - 0.80) * 5)}
              >
                {/* Left Premolars */}
                <path d="M 305 256 C 307 265, 308 274, 310 280 Q 319 282 328 281 L 328 253 Z" />
                <path d="M 280 260 C 282 268, 285 273, 287 277 Q 295 279 303 278 L 303 256 Z" />
                {/* Right Premolars */}
                <path d="M 472 253 L 472 281 Q 481 282 490 280 C 492 274, 493 265, 495 256 Z" />
                <path d="M 497 256 L 497 278 Q 505 279 513 277 C 515 273, 518 268, 520 260 Z" />
              </g>
            )}

            {/* C. Right-Side Anatomical Molar Cutaway (Matching user's reference photograph) */}
            {sketchProgress > 0.45 && (
              <g
                stroke="#0284C7"
                strokeWidth="1.1"
                fill="none"
                opacity={Math.min(0.9, (sketchProgress - 0.45) * 2)}
                transform="translate(480, 115) scale(0.66)"
              >
                {/* Enamel Crown Shell */}
                <path
                  d="M 80 50 C 40 70, 30 110, 35 160 C 40 210, 60 260, 70 320 C 75 320, 95 270, 110 220 C 125 270, 145 320, 150 320 C 160 260, 180 210, 185 160 C 190 110, 180 70, 140 50 C 120 40, 100 40, 80 50 Z"
                  strokeWidth="1.3"
                />
                {/* Pulp Chamber Contour */}
                <path
                  d="M 85 130 C 80 150, 90 170, 110 170 C 130 170, 140 150, 135 130 C 130 115, 90 115, 85 130 Z"
                  stroke="#F43F5E"
                  strokeWidth="1.2"
                />
                {/* Root Canals */}
                <path d="M 95 170 C 90 210, 80 260, 78 300" stroke="#EF4444" strokeWidth="1" />
                <path d="M 125 170 C 130 210, 140 260, 142 300" stroke="#3B82F6" strokeWidth="1" />
                {/* Delicate Medical Flow Strands */}
                <path d="M 20 80 Q 80 50 170 30" strokeDasharray="3 4" opacity="0.6" />
                <path d="M 170 80 Q 220 120 240 180" strokeDasharray="3 4" opacity="0.6" />
              </g>
            )}
          </svg>
        </div>

        {/* ============================================================ */}
        {/* BRAND REVEAL & LUXURY EDITORIAL CAMPAIGN TYPOGRAPHY         */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 px-6 text-center"
          style={{
            opacity: brandProgress,
            transform: `translateY(${settledProgress * -45}px)`,
          }}
        >
          {/* Brand Name */}
          <div className="space-y-1 mb-2">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.38em] text-slate-800 uppercase block">
              JOAN ANDREWS
            </span>
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] text-sky-800 uppercase block">
              DENTURE CLINIC
            </span>
            {/* Fine 1px Line Expanding Underneath */}
            <div
              className="h-px bg-slate-400/60 mx-auto transition-all duration-1000 ease-out mt-3"
              style={{
                width: `${Math.min(180, lineProgress * 180)}px`,
              }}
            />
          </div>

          {/* Luxury Editorial Campaign Headline */}
          <div
            className="transition-all duration-1000 mt-4"
            style={{
              opacity: headlineProgress,
              transform: `translateY(${(1 - headlineProgress) * 15}px)`,
            }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight max-w-3xl leading-[1.1]">
              CONFIDENCE LOOKS GOOD ON YOU.
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-light leading-relaxed">
              Thoughtful, individualized denture care focused on comfort, natural fit, and everyday ease in St. John's.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FINAL MOMENT: TWO CLEAN BUTTONS & SCROLL INSTRUCTION         */}
      {/* ============================================================ */}
      <footer
        className="relative z-30 pb-10 px-6 flex flex-col items-center gap-5 transition-all duration-700"
        style={{
          opacity: settledProgress,
          transform: `translateY(${(1 - settledProgress) * 20}px)`,
          pointerEvents: settledProgress > 0.5 ? 'auto' : 'none',
        }}
      >
        {/* Two Clean Buttons Requested by User */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5 text-sky-300" />
            <span>BOOK A CONSULTATION</span>
          </button>

          <button
            onClick={onComplete}
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-slate-800 bg-white/95 hover:bg-white border border-slate-300/80 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-sky-700" />
            <span>EXPLORE OUR CARE</span>
          </button>
        </div>

        {/* Small Instruction at Bottom */}
        <button
          onClick={onComplete}
          className="group flex flex-col items-center gap-1.5 text-[11px] font-semibold tracking-widest text-slate-500 hover:text-slate-900 transition-colors uppercase cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-sky-700 group-hover:text-slate-900" />
        </button>
      </footer>
    </div>
  );
};
