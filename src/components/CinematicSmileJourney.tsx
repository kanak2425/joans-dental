import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, Sparkles, ChevronDown } from 'lucide-react';

interface CinematicSmileJourneyProps {
  onScrollPast: () => void;
  onOpenBooking: () => void;
}

export const CinematicSmileJourney: React.FC<CinematicSmileJourneyProps> = ({
  onScrollPast,
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Three.js refs for anatomical tooth 3D cutaway
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const enamelMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const dentinMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pulpGroupRef = useRef<THREE.Group | null>(null);

  // Monitor scroll progress across the 400vh container
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      // Progress from 0.0 to 1.0
      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollableDistance));
      setScrollProgress(progress);

      if (progress > 0.05 && !hasInteracted) {
        setHasInteracted(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasInteracted]);

  // Set up Three.js Anatomical Visualization Layer
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.5, 6.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Clinical Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xbae6fd, 1.4);
    softFill.position.set(-5, -2, -4);
    scene.add(softFill);

    // Anatomical Tooth Geometry
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    scene.add(toothGroup);

    // 1. Enamel Crown with natural contours
    const crownPoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 1.7),
      new THREE.Vector2(0.5, 1.82),
      new THREE.Vector2(0.98, 1.78),
      new THREE.Vector2(1.24, 1.48),
      new THREE.Vector2(1.32, 1.05),
      new THREE.Vector2(1.18, 0.45),
      new THREE.Vector2(0.92, 0.05),
      new THREE.Vector2(0.82, -0.2),
    ];
    const crownGeo = new THREE.LatheGeometry(crownPoints, 48);
    const crownPos = crownGeo.attributes.position;
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);
      if (y > 0.8) {
        const angle = Math.atan2(z, x);
        const cusp = Math.sin(angle * 4) * 0.1;
        crownPos.setY(i, y + cusp * (y - 0.7));
      }
    }
    crownGeo.computeVertexNormals();

    const enamelMat = new THREE.MeshPhysicalMaterial({
      color: 0xfcfdfd,
      roughness: 0.12,
      metalness: 0.02,
      transmission: 0.4,
      thickness: 0.8,
      ior: 1.54,
      specularIntensity: 0.95,
      clearcoat: 0.9,
      transparent: true,
      opacity: 0.95,
    });
    enamelMatRef.current = enamelMat;
    const crownMesh = new THREE.Mesh(crownGeo, enamelMat);
    toothGroup.add(crownMesh);

    // 2. Dentin Core Layer
    const dentinPoints = crownPoints.map(p => new THREE.Vector2(p.x * 0.86, p.y * 0.9));
    const dentinGeo = new THREE.LatheGeometry(dentinPoints, 36);
    dentinGeo.computeVertexNormals();
    const dentinMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a, // Soft warm dentin amber-ivory
      roughness: 0.4,
      metalness: 0.02,
      transparent: true,
      opacity: 0.88,
    });
    dentinMatRef.current = dentinMat;
    toothGroup.add(new THREE.Mesh(dentinGeo, dentinMat));

    // 3. Pulp Chamber & Neurovascular Canals
    const pulpGroup = new THREE.Group();
    pulpGroupRef.current = pulpGroup;

    const pulpChamberGeo = new THREE.SphereGeometry(0.52, 28, 20);
    pulpChamberGeo.scale(0.85, 1.25, 0.75);
    pulpChamberGeo.translate(0, 0.55, 0);
    const pulpMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0x9f1239,
      emissiveIntensity: 0.35,
      roughness: 0.35,
    });
    pulpGroup.add(new THREE.Mesh(pulpChamberGeo, pulpMat));

    // Roots & Canals
    const createRoot = (offset: number, curveDir: number) => {
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(offset * 0.8, 0, 0),
        new THREE.Vector3(offset * 0.9, -0.6, 0.05),
        new THREE.Vector3(offset * 1.1 + curveDir * 0.2, -1.3, -0.05),
        new THREE.Vector3(offset * 1.0 + curveDir * 0.35, -2.1, 0),
        new THREE.Vector3(offset * 0.7 + curveDir * 0.45, -2.7, 0.05),
      ]);
    };
    const rootCurveL = createRoot(-0.55, -0.2);
    const rootCurveR = createRoot(0.55, 0.2);

    const rootGeoL = new THREE.TubeGeometry(rootCurveL, 40, 0.4, 20, false);
    const rootGeoR = new THREE.TubeGeometry(rootCurveR, 40, 0.4, 20, false);
    const rootMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.48 });
    toothGroup.add(new THREE.Mesh(rootGeoL, rootMat));
    toothGroup.add(new THREE.Mesh(rootGeoR, rootMat));

    // Pulp Canals (interior)
    pulpGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rootCurveL, 32, 0.1, 12, false), pulpMat));
    pulpGroup.add(new THREE.Mesh(new THREE.TubeGeometry(rootCurveR, 32, 0.1, 12, false), pulpMat));

    // Neurovascular Vessels (Artery red, Vein blue)
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, -2.6, 0.02),
      new THREE.Vector3(-0.4, -1.5, 0.04),
      new THREE.Vector3(-0.15, 0.2, 0.05),
      new THREE.Vector3(0.2, 0.85, -0.05),
    ]);
    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, -2.6, -0.02),
      new THREE.Vector3(0.42, -1.5, -0.05),
      new THREE.Vector3(0.12, 0.15, -0.04),
      new THREE.Vector3(-0.2, 0.8, 0.04),
    ]);
    const arteryMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c, emissiveIntensity: 0.5 });
    const veinMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.4 });
    pulpGroup.add(new THREE.Mesh(new THREE.TubeGeometry(arteryCurve, 28, 0.035, 8, false), arteryMat));
    pulpGroup.add(new THREE.Mesh(new THREE.TubeGeometry(veinCurve, 28, 0.032, 8, false), veinMat));

    toothGroup.add(pulpGroup);

    // Initial render loop with slow gentle float
    let animId: number;
    const render = () => {
      animId = requestAnimationFrame(render);
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    render();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  // Sync scrollProgress to 3D Camera & Layer Transparency
  useEffect(() => {
    const camera = cameraRef.current;
    const toothGroup = toothGroupRef.current;
    const enamelMat = enamelMatRef.current;
    const dentinMat = dentinMatRef.current;
    if (!camera || !toothGroup) return;

    // SCROLL PHASES:
    // 0.00 -> 0.18: Opening Smile
    // 0.18 -> 0.35: Entering the Smile -> Approaches tooth
    // 0.35 -> 0.43: Stage 1 (Enamel)
    // 0.43 -> 0.52: Stage 2 (Dentin)
    // 0.52 -> 0.61: Stage 3 (Pulp)
    // 0.61 -> 0.70: Stage 4 (Root)
    // 0.70 -> 0.85: Emerge back outward -> Returning to Smile
    // 0.85 -> 1.00: Final emergence message ("Your smile is more than what you see")

    if (scrollProgress < 0.2) {
      // Resting overview
      camera.position.set(0, 0.4, 6.8);
      camera.lookAt(0, 0, 0);
      toothGroup.rotation.y = scrollProgress * 0.5;
      if (enamelMat) enamelMat.opacity = 0.98;
      if (dentinMat) dentinMat.opacity = 0.88;
    } else if (scrollProgress >= 0.2 && scrollProgress < 0.7) {
      // Traveling into the anatomy
      const subP = (scrollProgress - 0.2) / 0.5; // 0 to 1

      // Camera travels from outer enamel into root
      const camY = THREE.MathUtils.lerp(1.2, -1.8, subP);
      const camZ = THREE.MathUtils.lerp(4.5, 1.4, Math.sin(subP * Math.PI)); // zooms deep then slightly pulls back to view root
      camera.position.set(Math.sin(subP * 3.14) * 0.4, camY, Math.max(1.5, camZ));
      camera.lookAt(0, camY * 0.9, 0);

      toothGroup.rotation.y = subP * 1.8;

      // Cutaway & transparency
      if (enamelMat) {
        enamelMat.opacity = THREE.MathUtils.lerp(0.95, 0.2, Math.min(1, subP * 1.8));
        enamelMat.transmission = THREE.MathUtils.lerp(0.4, 0.88, Math.min(1, subP * 1.8));
      }
      if (dentinMat) {
        dentinMat.opacity = THREE.MathUtils.lerp(0.88, 0.35, Math.min(1, subP * 1.6));
      }
    } else {
      // Emerging back outward! (0.70 -> 1.0)
      const emergeP = (scrollProgress - 0.7) / 0.3; // 0 to 1
      const camY = THREE.MathUtils.lerp(-1.8, 0.4, emergeP);
      const camZ = THREE.MathUtils.lerp(2.2, 6.8, emergeP);
      camera.position.set(0, camY, camZ);
      camera.lookAt(0, 0, 0);

      toothGroup.rotation.y = THREE.MathUtils.lerp(1.8, 0, emergeP);
      if (enamelMat) {
        enamelMat.opacity = THREE.MathUtils.lerp(0.2, 0.98, emergeP);
        enamelMat.transmission = THREE.MathUtils.lerp(0.88, 0.38, emergeP);
      }
      if (dentinMat) {
        dentinMat.opacity = THREE.MathUtils.lerp(0.35, 0.88, emergeP);
      }
    }
  }, [scrollProgress]);

  // Active stage labels calculation
  const getStageInfo = () => {
    if (scrollProgress >= 0.34 && scrollProgress < 0.43) {
      return {
        title: 'ENAMEL',
        subtitle: 'The protective outer layer.',
        detail: 'Crystalline hydroxyapatite reflecting natural daylight with subtle translucency.',
      };
    }
    if (scrollProgress >= 0.43 && scrollProgress < 0.52) {
      return {
        title: 'DENTIN',
        subtitle: 'The foundation beneath the surface.',
        detail: 'Resilient microscopic tubular mineral structure absorbing chewing pressures.',
      };
    }
    if (scrollProgress >= 0.52 && scrollProgress < 0.61) {
      return {
        title: 'PULP',
        subtitle: 'The living center of the tooth.',
        detail: 'Vascular capillaries and sensory neurovascular bundles nurturing cell health.',
      };
    }
    if (scrollProgress >= 0.61 && scrollProgress < 0.70) {
      return {
        title: 'ROOT',
        subtitle: 'The foundation of every healthy smile.',
        detail: 'Bifurcated anchors locked into the alveolar ridge and periodontal tissue.',
      };
    }
    return null;
  };

  const activeStage = getStageInfo();

  // Photo opacity calculation:
  // Visible during opening (0.00 - 0.22), fades during deep tooth entry (0.25 - 0.68),
  // re-emerges during return (0.72 - 1.00)
  const photoOpacity =
    scrollProgress < 0.22
      ? 1 - scrollProgress * 2.5
      : scrollProgress > 0.72
      ? (scrollProgress - 0.72) / 0.22
      : 0;

  // Scale of photo: moves closer as user scrolls into the smile!
  const photoScale = 1 + scrollProgress * 0.45;

  const handleExploreClick = () => {
    const el = containerRef.current;
    if (el) {
      const targetY = window.pageYOffset + window.innerHeight * 1.2;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[420vh] bg-[#FAF9F6]">
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* Soft Background Tint */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700"
          style={{
            backgroundColor:
              scrollProgress > 0.3 && scrollProgress < 0.7 ? '#F0F7FF' : '#FAF9F6',
          }}
        />

        {/* Ambient Subtle Paper Texture Vignette */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.7) 60%, rgba(226,232,240,0.4) 100%)`,
          }}
        />

        {/* ============================================================ */}
        {/* LAYER A: REALISTIC SMILE PHOTOGRAPH                          */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
          style={{
            opacity: Math.max(0, Math.min(1, photoOpacity)),
          }}
        >
          <div
            className="w-full h-full max-w-6xl mx-auto flex items-center justify-center p-4 transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${photoScale})`,
            }}
          >
            <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/5">
              <img
                src="/images/smile-reveal-hero.jpg"
                alt="Natural human smile with realistic enamel translucency and warm lighting"
                className="w-full h-full object-cover object-center"
              />
              {/* Soft editorial vignette around photo borders */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(250,249,246,0) 40%, rgba(250,249,246,0.65) 80%, rgba(250,249,246,0.98) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* LAYER B: THREE.JS 3D ANATOMICAL TOOTH (INSIDE THE TOOTH)      */}
        {/* ============================================================ */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity:
              scrollProgress > 0.18 && scrollProgress < 0.8
                ? Math.min(1, (scrollProgress - 0.18) * 5)
                : 0,
          }}
        />

        {/* ============================================================ */}
        {/* LAYER C: EDITORIAL TYPOGRAPHY & OVERLAYS                     */}
        {/* ============================================================ */}

        {/* Top Minimal Brand Kicker */}
        <div className="relative z-20 px-6 sm:px-12 py-7 flex items-center justify-between text-xs font-medium tracking-widest text-slate-500 uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-700" />
            <span className="font-serif tracking-[0.25em] text-slate-900 font-semibold text-sm">
              Joan Andrews
            </span>
            <span className="hidden sm:inline text-slate-400">· St. John's, NL</span>
          </div>

          <div className="text-[11px] text-slate-400">
            {scrollProgress > 0.25 && scrollProgress < 0.72 ? (
              <span className="text-sky-800 font-semibold tracking-wider">
                Anatomical Journey
              </span>
            ) : (
              <span>538 Topsail Road</span>
            )}
          </div>
        </div>

        {/* 1. OPENING SCREEN TEXT (0.00 - 0.20) */}
        {scrollProgress < 0.22 && (
          <div
            className="relative z-20 max-w-3xl mx-auto text-center px-6 transition-opacity duration-500"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 5),
              transform: `translateY(${scrollProgress * 40}px)`,
            }}
          >
            <div className="space-y-1 mb-3">
              <h2 className="text-sm font-semibold tracking-[0.35em] text-slate-800 uppercase">
                JOAN ANDREWS
              </h2>
              <p className="text-xs font-medium tracking-[0.3em] text-sky-800 uppercase">
                DENTURE CLINIC
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-slate-900 tracking-tight leading-[1.08]">
              A confident smile starts here.
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto leading-relaxed">
              Experience the harmony of natural tooth anatomy, bespoke craftsmanship, and personalized care.
            </p>

            <div className="mt-8">
              <button
                onClick={handleExploreClick}
                className="group inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase text-slate-900 bg-white/90 hover:bg-white border border-slate-300/80 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>EXPLORE YOUR SMILE</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-sky-800" />
              </button>
            </div>
          </div>
        )}

        {/* 2. ANATOMICAL STAGE LABELS (0.34 - 0.70) */}
        {activeStage && (
          <div className="relative z-20 max-w-xl mx-auto text-center px-6 transition-all duration-500">
            <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-3xl border border-sky-100 shadow-xl shadow-slate-900/5">
              <span className="text-[10px] font-bold tracking-[0.25em] text-sky-700 uppercase block mb-1">
                Anatomical Exploration
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-slate-900 font-bold tracking-tight">
                {activeStage.title}
              </h3>
              <p className="text-sm font-medium text-slate-700 italic mt-0.5">
                {activeStage.subtitle}
              </p>
              <p className="text-xs text-slate-500 font-light mt-2 max-w-sm mx-auto leading-relaxed">
                {activeStage.detail}
              </p>
            </div>
          </div>
        )}

        {/* 3. EMERGE BACK INTO THE SMILE (0.75 - 1.00) */}
        {scrollProgress >= 0.75 && (
          <div
            className="relative z-20 max-w-3xl mx-auto text-center px-6 transition-opacity duration-700"
            style={{
              opacity: Math.min(1, (scrollProgress - 0.75) * 4),
            }}
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-sky-800 uppercase block mb-2">
              Beyond The Surface
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-slate-900 tracking-tight leading-[1.1]">
              Your smile is more than what you see.
            </h2>
            <p className="mt-4 text-xs sm:text-base text-slate-600 font-light max-w-xl mx-auto leading-relaxed">
              Every curve, cusp, and foundation tells a story. At Joan Andrews Denture Clinic, custom prosthetics are calibrated not just for outward beauty, but to mirror natural biology for lasting comfort and confidence.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-md transition-all cursor-pointer"
              >
                BOOK A CONSULTATION
              </button>
              <button
                onClick={() => {
                  const target = document.getElementById('services-story');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-full transition-all cursor-pointer"
              >
                DISCOVER OUR CARE ↓
              </button>
            </div>
          </div>
        )}

        {/* Bottom Scroll Cue */}
        <div className="relative z-20 pb-8 px-6 flex flex-col items-center justify-center text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          <div className="flex items-center gap-2">
            <span>Scroll to travel through the tooth</span>
            <ArrowDown className="w-3 h-3 text-sky-700 animate-bounce" />
          </div>
          {/* Subtle scroll progress track */}
          <div className="w-36 h-0.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
