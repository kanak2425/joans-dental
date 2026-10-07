import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ChevronRight, RotateCcw, Eye, ArrowDown, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { ToothLayerKey, ToothLayerInfo } from '../types';

interface ToothExperienceProps {
  onEmerge: () => void;
  isInitialView?: boolean;
}

const LAYERS: ToothLayerInfo[] = [
  {
    id: 'overview',
    title: 'THE COMPLETE ANATOMY',
    subtitle: 'A masterpiece of natural engineering',
    description: 'Every natural tooth is an intricate harmony of dense outer porcelain enamel, shock-absorbing dentin, and delicate living pulp rooted into the jawbone.',
    clinicalFact: 'When natural teeth are missing, dentures must replicate not only surface aesthetics, but balanced bite forces and structural harmony.',
    cameraX: 0,
    cameraY: 0.2,
    cameraZ: 6.8,
    targetY: 0,
    cutawayProgress: 0,
    colorTheme: 'from-sky-50 to-blue-50',
  },
  {
    id: 'enamel',
    title: 'ENAMEL',
    subtitle: 'The protective outer layer',
    description: 'The hardest substance in the human body, composed of 96% hydroxyapatite crystals. It shields against chewing forces and thermal shock.',
    clinicalFact: 'In premium denture prosthetics, medical-grade acrylics and porcelain composites are calibrated to mimic natural enamel light refraction and translucency.',
    cameraX: 0.6,
    cameraY: 1.1,
    cameraZ: 3.8,
    targetY: 1.0,
    cutawayProgress: 0.45,
    colorTheme: 'from-sky-100 to-indigo-50',
  },
  {
    id: 'dentin',
    title: 'DENTIN',
    subtitle: 'The strong layer beneath the enamel',
    description: 'A resilient, micro-tubular bone-like mineral matrix that absorbs heavy bite pressures and cushions the tooth crown during chewing.',
    clinicalFact: 'Dentin flexibility prevents brittle fractures. Custom dentures are shaped to properly disperse chewing load across your dental ridge.',
    cameraX: 0.3,
    cameraY: 0.5,
    cameraZ: 2.7,
    targetY: 0.4,
    cutawayProgress: 0.8,
    colorTheme: 'from-amber-50 to-sky-50',
  },
  {
    id: 'pulp',
    title: 'PULP',
    subtitle: 'Where nerves and blood vessels live',
    description: 'The vascular and neural heart of the tooth. Microscopic capillaries and nerve fibers nourish cells and register thermal sensations.',
    clinicalFact: 'Loss of natural pulp and tooth structures leads to gradual alveolar bone resorption. Joan Andrews designs dentures that preserve bone contours and comfort.',
    cameraX: 0.05,
    cameraY: 0.1,
    cameraZ: 1.6,
    targetY: 0.1,
    cutawayProgress: 1.0,
    colorTheme: 'from-rose-50 to-sky-50',
  },
  {
    id: 'root',
    title: 'ROOT',
    subtitle: 'Anchoring the tooth beneath the gumline',
    description: 'Tapered bifurcated roots locked into the alveolar jawbone, cushioned by the periodontal ligament to withstand hundreds of pounds of pressure.',
    clinicalFact: 'Denture stability relies on harmonious suction, muscular coordination, and custom impression fitting over the foundation where roots once rested.',
    cameraX: 0.1,
    cameraY: -1.3,
    cameraZ: 3.2,
    targetY: -1.2,
    cutawayProgress: 0.85,
    colorTheme: 'from-slate-100 to-sky-50',
  },
];

export const ToothExperience: React.FC<ToothExperienceProps> = ({ onEmerge }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);

  // Three.js mutable state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const cutawayGroupRef = useRef<THREE.Group | null>(null);
  const enamelMaterialsRef = useRef<THREE.Material[]>([]);
  const dentinMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const pulpMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const nervesGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Target camera positions for smooth interpolation
  const currentCameraPos = useRef(new THREE.Vector3(0, 0.2, 7.0));
  const targetCameraPos = useRef(new THREE.Vector3(0, 0.2, 6.8));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentCutaway = useRef(0);
  const targetCutaway = useRef(0);

  // Mouse drag interaction
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const toothRotation = useRef({ x: 0, y: 0 });

  // Sound generator (soft clinical ambient tone)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playLayerChime = (step: number) => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freqMap = [392, 440, 523.25, 587.33, 659.25, 783.99];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqMap[step] || 523.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    } catch {
      // Audio fallback silent
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf6f9fc);
    scene.fog = new THREE.FogExp2(0xf6f9fc, 0.04);

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.2, 7.0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting - Soft clinical studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.3); // Soft cyan/ice rim light
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xbae6fd, 1.5, 12);
    rimLight.position.set(0, 3, 3);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0xe0f2fe, 1.0, 8);
    bottomGlow.position.set(0, -3, 2);
    scene.add(bottomGlow);

    // 5. Build Anatomical Tooth Model
    const toothMainGroup = new THREE.Group();
    toothGroupRef.current = toothMainGroup;
    scene.add(toothMainGroup);

    // ==========================================
    // PROCEDURAL ANATOMICAL TOOTH GEOMETRY
    // ==========================================

    // A. ENAMEL CROWN (Outer shell)
    // Custom shape using Lathe with dental cusp sculpting
    const crownPoints: THREE.Vector2[] = [];
    crownPoints.push(new THREE.Vector2(0, 1.65)); // occlusal central groove
    crownPoints.push(new THREE.Vector2(0.5, 1.78)); // lingual cusp peak
    crownPoints.push(new THREE.Vector2(0.95, 1.75)); // buccal cusp peak
    crownPoints.push(new THREE.Vector2(1.22, 1.45)); // upper crown slope
    crownPoints.push(new THREE.Vector2(1.30, 1.05)); // crown widest contour
    crownPoints.push(new THREE.Vector2(1.18, 0.45)); // cervical contour
    crownPoints.push(new THREE.Vector2(0.95, 0.05)); // cementoenamel junction (CEJ)
    crownPoints.push(new THREE.Vector2(0.85, -0.2)); // gumline tuck

    const enamelCrownGeo = new THREE.LatheGeometry(crownPoints, 48);
    // Subtle anatomical cusp deform
    const crownPos = enamelCrownGeo.attributes.position;
    for (let i = 0; i < crownPos.count; i++) {
      const x = crownPos.getX(i);
      const y = crownPos.getY(i);
      const z = crownPos.getZ(i);
      if (y > 0.8) {
        // Form 4 distinct natural molar cusps
        const angle = Math.atan2(z, x);
        const cuspWave = Math.sin(angle * 4) * 0.12;
        crownPos.setY(i, y + cuspWave * (y - 0.7));
      }
    }
    enamelCrownGeo.computeVertexNormals();

    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xfbfcfd),
      roughness: 0.12,
      metalness: 0.02,
      transmission: 0.35, // Translucent enamel look
      thickness: 0.6,
      ior: 1.55,
      specularIntensity: 0.9,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.96,
      depthWrite: true,
    });
    enamelMaterialsRef.current.push(enamelMaterial);

    const enamelMesh = new THREE.Mesh(enamelCrownGeo, enamelMaterial);
    enamelMesh.castShadow = true;
    enamelMesh.receiveShadow = true;
    toothMainGroup.add(enamelMesh);

    // B. DENTIN INTERIOR LAYER (Slightly smaller, warm bone ivory)
    const dentinPoints: THREE.Vector2[] = crownPoints.map(p => new THREE.Vector2(p.x * 0.86, p.y * 0.92));
    const dentinGeo = new THREE.LatheGeometry(dentinPoints, 36);
    dentinGeo.computeVertexNormals();

    const dentinMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xfef3c7), // Warm dentin tone
      roughness: 0.38,
      metalness: 0.04,
      transparent: true,
      opacity: 0.9,
    });
    dentinMaterialRef.current = dentinMaterial;
    const dentinMesh = new THREE.Mesh(dentinGeo, dentinMaterial);
    toothMainGroup.add(dentinMesh);

    // C. PULP CHAMBER (Coronal pulp + root canal entrance)
    const pulpGroup = new THREE.Group();
    const pulpChamberGeo = new THREE.SphereGeometry(0.55, 32, 24);
    pulpChamberGeo.scale(0.8, 1.2, 0.7);
    pulpChamberGeo.translate(0, 0.55, 0);

    const pulpMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf43f5e), // Soft rose/crimson pulp tissue
      roughness: 0.35,
      emissive: new THREE.Color(0x9f1239),
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.88,
    });
    pulpMaterialRef.current = pulpMaterial;
    const pulpChamberMesh = new THREE.Mesh(pulpChamberGeo, pulpMaterial);
    pulpGroup.add(pulpChamberMesh);

    // D. DUAL ROOTS (Bifurcated molar roots: Mesial and Distal)
    const createCurvedRoot = (xOffset: number, curveDir: number) => {
      const rootCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset * 0.8, 0, 0),
        new THREE.Vector3(xOffset * 0.9, -0.6, 0.05),
        new THREE.Vector3(xOffset * 1.1 + curveDir * 0.2, -1.3, -0.05),
        new THREE.Vector3(xOffset * 1.0 + curveDir * 0.35, -2.1, 0),
        new THREE.Vector3(xOffset * 0.7 + curveDir * 0.45, -2.7, 0.05), // Root apex
      ]);
      return rootCurve;
    };

    const rootCurveLeft = createCurvedRoot(-0.55, -0.2);
    const rootCurveRight = createCurvedRoot(0.55, 0.2);

    const rootGeoLeft = new THREE.TubeGeometry(rootCurveLeft, 48, 0.42, 24, false);
    const rootGeoRight = new THREE.TubeGeometry(rootCurveRight, 48, 0.42, 24, false);

    // Taper root geometry toward the apex
    [rootGeoLeft, rootGeoRight].forEach((geo) => {
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const factor = Math.max(0.2, (y + 2.8) / 2.8);
        pos.setX(i, pos.getX(i) * (0.4 + 0.6 * factor));
        pos.setZ(i, pos.getZ(i) * (0.4 + 0.6 * factor));
      }
      geo.computeVertexNormals();
    });

    const rootMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf1f5f9),
      roughness: 0.45,
      metalness: 0.05,
    });

    const rootMeshLeft = new THREE.Mesh(rootGeoLeft, rootMaterial);
    const rootMeshRight = new THREE.Mesh(rootGeoRight, rootMaterial);
    rootMeshLeft.castShadow = true;
    rootMeshRight.castShadow = true;
    toothMainGroup.add(rootMeshLeft);
    toothMainGroup.add(rootMeshRight);

    // E. ROOT CANALS (Inside the roots)
    const canalGeoLeft = new THREE.TubeGeometry(rootCurveLeft, 36, 0.1, 12, false);
    const canalGeoRight = new THREE.TubeGeometry(rootCurveRight, 36, 0.1, 12, false);
    const canalMeshLeft = new THREE.Mesh(canalGeoLeft, pulpMaterial);
    const canalMeshRight = new THREE.Mesh(canalGeoRight, pulpMaterial);
    pulpGroup.add(canalMeshLeft);
    pulpGroup.add(canalMeshRight);

    // F. NERVE & BLOOD VESSEL BRANCHING (Neurovascular Bundle)
    const nervesGroup = new THREE.Group();
    nervesGroupRef.current = nervesGroup;

    // Artery (Red)
    const arteryCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, -2.6, 0.02),
      new THREE.Vector3(-0.45, -1.8, 0.04),
      new THREE.Vector3(-0.35, -0.8, -0.02),
      new THREE.Vector3(-0.15, 0.2, 0.05),
      new THREE.Vector3(0.1, 0.6, 0.02),
      new THREE.Vector3(0.25, 0.85, -0.05),
      new THREE.Vector3(0.35, 1.1, 0.05),
    ]);
    const arteryGeo = new THREE.TubeGeometry(arteryCurve, 32, 0.035, 8, false);
    const arteryMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });
    nervesGroup.add(new THREE.Mesh(arteryGeo, arteryMat));

    // Vein (Blue)
    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.35, -2.6, -0.02),
      new THREE.Vector3(0.48, -1.7, -0.05),
      new THREE.Vector3(0.38, -0.7, 0.02),
      new THREE.Vector3(0.12, 0.15, -0.04),
      new THREE.Vector3(-0.08, 0.55, -0.02),
      new THREE.Vector3(-0.25, 0.8, 0.04),
      new THREE.Vector3(-0.3, 1.05, -0.02),
    ]);
    const veinGeo = new THREE.TubeGeometry(veinCurve, 32, 0.032, 8, false);
    const veinMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      roughness: 0.3,
    });
    nervesGroup.add(new THREE.Mesh(veinGeo, veinMat));

    // Sensory Nerve Filaments (Golden Yellow)
    const nerveCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.3, -2.5, 0),
      new THREE.Vector3(-0.25, -1.0, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 0.95, 0.1),
    ]);
    const nerveCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, -2.5, 0),
      new THREE.Vector3(0.2, -0.9, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0, 0.95, -0.1),
    ]);
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xeab308,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    });
    nervesGroup.add(new THREE.Mesh(new THREE.TubeGeometry(nerveCurve1, 24, 0.02, 6, false), nerveMat));
    nervesGroup.add(new THREE.Mesh(new THREE.TubeGeometry(nerveCurve2, 24, 0.02, 6, false), nerveMat));

    toothMainGroup.add(pulpGroup);
    toothMainGroup.add(nervesGroup);
    cutawayGroupRef.current = pulpGroup;

    // G. GUM MARGIN (Soft anatomical collar at the cervical line)
    const gumShape = new THREE.RingGeometry(0.85, 1.6, 32);
    gumShape.rotateX(-Math.PI / 2);
    const gumMat = new THREE.MeshStandardMaterial({
      color: 0xfda4af, // Soft natural gingival gum tone
      roughness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const gumMesh = new THREE.Mesh(gumShape, gumMat);
    gumMesh.position.y = -0.25;
    toothMainGroup.add(gumMesh);

    // H. FLOATING ANATOMICAL PARTICLES (Clinical microscopic purity)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Initial position offset
    toothMainGroup.position.set(0, 0, 0);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Slow ambient hover rotation
      if (isRotating && !isDragging.current) {
        toothRotation.current.y += 0.35 * delta;
      }

      if (toothGroupRef.current) {
        toothGroupRef.current.rotation.y = toothRotation.current.y;
        toothGroupRef.current.rotation.x = toothRotation.current.x;
        // Subtle organic breathing float
        toothGroupRef.current.position.y = Math.sin(elapsedTime * 1.2) * 0.05;
      }

      // Smooth camera interpolation
      currentCameraPos.current.lerp(targetCameraPos.current, 0.045);
      camera.position.copy(currentCameraPos.current);

      currentLookAt.current.lerp(targetLookAt.current, 0.045);
      camera.lookAt(currentLookAt.current);

      // Smooth Cutaway transparency interpolation
      currentCutaway.current = THREE.MathUtils.lerp(currentCutaway.current, targetCutaway.current, 0.05);

      // Cutaway visibility & transparency adjustments
      if (enamelMaterialsRef.current.length > 0) {
        const mat = enamelMaterialsRef.current[0] as THREE.MeshPhysicalMaterial;
        // As cutaway increases, outer enamel turns glassy/translucent to reveal inside
        mat.opacity = THREE.MathUtils.lerp(0.96, 0.28, currentCutaway.current);
        mat.transmission = THREE.MathUtils.lerp(0.35, 0.85, currentCutaway.current);
      }
      if (dentinMaterialRef.current) {
        dentinMaterialRef.current.opacity = THREE.MathUtils.lerp(0.9, 0.45, currentCutaway.current);
      }

      // Gentle particle float
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Mouse drag controls
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      toothRotation.current.y += deltaX * 0.008;
      toothRotation.current.x = Math.max(-0.6, Math.min(0.6, toothRotation.current.x + deltaY * 0.008));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      toothRotation.current.y += deltaX * 0.008;
      toothRotation.current.x = Math.max(-0.6, Math.min(0.6, toothRotation.current.x + deltaY * 0.008));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, [audioEnabled, isRotating]);

  // Update camera targets whenever activeStep changes
  useEffect(() => {
    const layer = LAYERS[activeStep];
    if (layer) {
      targetCameraPos.current.set(layer.cameraX, layer.cameraY, layer.cameraZ);
      targetLookAt.current.set(0, layer.targetY, 0);
      targetCutaway.current = layer.cutawayProgress;
    }
  }, [activeStep]);

  const handleStartExperience = () => {
    setHasStarted(true);
    setActiveStep(1); // Move to Enamel
    playLayerChime(1);
  };

  const handleNextStep = () => {
    if (activeStep < LAYERS.length - 1) {
      const next = activeStep + 1;
      setActiveStep(next);
      playLayerChime(next);
    } else {
      // Completed through Root -> Emerge into Homepage!
      playLayerChime(5);
      onEmerge();
    }
  };

  const handleSelectStep = (index: number) => {
    setActiveStep(index);
    playLayerChime(index);
    if (!hasStarted && index > 0) {
      setHasStarted(true);
    }
  };

  const currentLayer = LAYERS[activeStep];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D anatomical tooth model"
      />

      {/* Top Clinical Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-10 bg-gradient-to-b from-white/80 via-white/40 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-900/10 flex items-center justify-center border border-sky-900/20">
            <div className="w-3 h-3 rounded-full bg-sky-900" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
              Joan Andrews Denture Clinic
            </h1>
            <p className="text-xs text-slate-500">St. John's, Newfoundland & Labrador</p>
          </div>
        </div>

        {/* Controls: Sound toggle, Skip to clinic */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white/80 border border-slate-200/80 rounded-full hover:bg-white transition-all shadow-xs"
            title={audioEnabled ? 'Mute sound' : 'Enable ambient chime'}
          >
            {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-700" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{audioEnabled ? 'Chime On' : 'Chime Off'}</span>
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white/80 border border-slate-200/80 rounded-full hover:bg-white transition-all shadow-xs"
            title="Toggle tooth auto-rotation"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
            <span className="hidden sm:inline">Rotate</span>
          </button>

          <button
            onClick={onEmerge}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-full transition-all"
          >
            <span>Skip to Clinic</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Opening Overlay (When not started) */}
      {!hasStarted && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between py-16 px-6 pointer-events-none">
          <div className="text-center pt-8">
            <p className="text-xs font-semibold tracking-[0.25em] text-sky-950/70 uppercase">
              Joan Andrews · St. John's, NL
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-serif text-slate-900 tracking-tight">
              A Better Smile Begins With Understanding.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
              Step inside the anatomy of a tooth to discover how personalized denture care restores comfort, balance, and natural confidence.
            </p>
          </div>

          {/* Interactive Hint & Primary CTA */}
          <div className="text-center space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs text-xs text-slate-600">
              <Eye className="w-3.5 h-3.5 text-sky-600" />
              <span>Drag anywhere to examine in 3D</span>
            </div>

            <div>
              <button
                onClick={handleStartExperience}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-sky-900/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>ENTER THE EXPERIENCE</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 tracking-wide">
              Click to travel through Enamel, Dentin, Pulp & Roots
            </p>
          </div>
        </div>
      )}

      {/* Cinematic Layer Walkthrough Overlays (When started) */}
      {hasStarted && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
          {/* Top Stage Indicator */}
          <div className="pt-16 flex items-center justify-center">
            <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
              {LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeStep === idx
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  <span className="capitalize">{layer.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Card for the Active Layer */}
          <div className="max-w-2xl mx-auto w-full pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-lg border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 transition-all duration-500">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.2em] text-sky-700 uppercase">
                    Layer 0{activeStep} · Anatomical Walkthrough
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight mt-0.5">
                    {currentLayer.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500 italic">
                    {currentLayer.subtitle}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200/60">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3D Cutaway Active</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {currentLayer.description}
              </p>

              {/* Clinical Prosthetic Connection */}
              <div className="mt-4 p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700">
                <span className="font-semibold text-sky-950">Clinical Denture Principle: </span>
                <span className="text-slate-600">{currentLayer.clinicalFact}</span>
              </div>

              {/* Navigation Action */}
              <div className="mt-6 flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => {
                    if (activeStep > 0) handleSelectStep(activeStep - 1);
                  }}
                  disabled={activeStep === 0}
                  className={`text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors ${
                    activeStep === 0 ? 'opacity-30 cursor-not-allowed' : ''
                  }`}
                >
                  ← Previous Layer
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white bg-slate-900 hover:bg-sky-950 rounded-full shadow-md shadow-slate-900/10 transition-all hover:scale-[1.02]"
                  >
                    <span>
                      {activeStep === LAYERS.length - 1 ? 'EMERGE INTO CLINIC →' : 'TRAVEL DEEPER →'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom prompt */}
            <div className="mt-3 text-center">
              <span className="text-[11px] text-slate-500 inline-flex items-center gap-1">
                <span>Drag tooth to rotate in 3D</span>
                <span aria-hidden="true">·</span>
                <span>Step {activeStep + 1} of {LAYERS.length}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Scroll Cue to Jump Down */}
      <div className="absolute bottom-4 right-6 z-20 hidden md:block">
        <button
          onClick={onEmerge}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 bg-white/70 hover:bg-white border border-slate-200/60 rounded-full backdrop-blur-xs transition-all shadow-2xs"
        >
          <span>Skip directly to services</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
