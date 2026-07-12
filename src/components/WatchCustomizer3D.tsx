import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Move, Sparkles } from 'lucide-react';

interface WatchCustomizer3DProps {
  dialColor: 'blue' | 'black' | 'champagne';
  metalType: 'rose' | 'platinum' | 'white';
  diamondBezel: boolean;
  language: 'FR' | 'EN';
}

export default function WatchCustomizer3D({
  dialColor,
  metalType,
  diamondBezel,
  language
}: WatchCustomizer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Interaction states
  const [isRotating, setIsRotating] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // References for Three.js objects we want to update dynamically
  const bezelMeshRef = useRef<THREE.Mesh | null>(null);
  const dialMeshRef = useRef<THREE.Mesh | null>(null);
  const strapTopMeshRef = useRef<THREE.Mesh | null>(null);
  const strapBottomMeshRef = useRef<THREE.Mesh | null>(null);
  const crownMeshRef = useRef<THREE.Mesh | null>(null);
  const secondsHandRef = useRef<THREE.Group | null>(null);
  const watchGroupRef = useRef<THREE.Group | null>(null);
  const diamondGroupRef = useRef<THREE.Group | null>(null);

  // Get color values for metals and dials
  const getMetalMaterialProps = (type: 'rose' | 'platinum' | 'white') => {
    switch (type) {
      case 'rose':
        return {
          color: 0xcd7f32,      // Warm rose gold
          roughness: 0.12,
          metalness: 0.95,
        };
      case 'platinum':
        return {
          color: 0xe5e4e2,      // Platinum sheen
          roughness: 0.08,
          metalness: 0.98,
        };
      case 'white':
        return {
          color: 0xdcdcdc,      // Elegant white gold
          roughness: 0.15,
          metalness: 0.9,
        };
    }
  };

  const getDialColorHex = (color: 'blue' | 'black' | 'champagne') => {
    switch (color) {
      case 'blue':
        return 0x0a1931; // Deep imperial blue
      case 'black':
        return 0x111111; // Rich volcanic black
      case 'champagne':
        return 0xf4ecd8; // Fine champagne gold
    }
  };

  // Mouse / Touch drag rotation variables
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 400;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background to fit website layout

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc18833, 0.5); // Golden fill light
    dirLight2.position.set(-5, -5, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 10);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // 4. Create the Watch Model Assembly (Group)
    const watchGroup = new THREE.Group();
    watchGroupRef.current = watchGroup;
    scene.add(watchGroup);

    // Initial rotation to present watch beautifully
    watchGroup.rotation.x = 0.5;
    watchGroup.rotation.y = -0.4;

    // --- GEOMETRIC PARTS CREATION ---
    const metalProps = getMetalMaterialProps(metalType);
    const watchMetalMaterial = new THREE.MeshStandardMaterial({
      color: metalProps.color,
      roughness: metalProps.roughness,
      metalness: metalProps.metalness,
    });

    // A. Main Case Cylinder
    const caseGeom = new THREE.CylinderGeometry(1.6, 1.6, 0.35, 64);
    caseGeom.rotateX(Math.PI / 2);
    const caseMesh = new THREE.Mesh(caseGeom, watchMetalMaterial);
    watchGroup.add(caseMesh);

    // B. Bezel Ring
    const bezelGeom = new THREE.CylinderGeometry(1.5, 1.55, 0.15, 64);
    bezelGeom.rotateX(Math.PI / 2);
    const bezelMesh = new THREE.Mesh(bezelGeom, watchMetalMaterial);
    bezelMesh.position.z = 0.2;
    watchGroup.add(bezelMesh);
    bezelMeshRef.current = bezelMesh;

    // C. Winding Crown
    const crownGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 24);
    crownGeom.rotateZ(Math.PI / 2);
    const crownMesh = new THREE.Mesh(crownGeom, watchMetalMaterial);
    crownMesh.position.set(1.68, 0, 0);
    watchGroup.add(crownMesh);
    crownMeshRef.current = crownMesh;

    // D. Dial (Cadran)
    const dialColorHex = getDialColorHex(dialColor);
    const dialMaterial = new THREE.MeshStandardMaterial({
      color: dialColorHex,
      roughness: 0.15,
      metalness: 0.6,
    });
    const dialGeom = new THREE.CylinderGeometry(1.35, 1.35, 0.05, 64);
    dialGeom.rotateX(Math.PI / 2);
    const dialMesh = new THREE.Mesh(dialGeom, dialMaterial);
    dialMesh.position.z = 0.16;
    watchGroup.add(dialMesh);
    dialMeshRef.current = dialMesh;

    // E. Hour markers (12 golden tick markers)
    const markerGeom = new THREE.BoxGeometry(0.06, 0.16, 0.04);
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0xc18833, // Gold marker
      roughness: 0.1,
      metalness: 0.9,
    });

    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const radius = 1.15;
      const markerX = Math.sin(angle) * radius;
      const markerY = Math.cos(angle) * radius;
      
      const singleMarker = new THREE.Mesh(markerGeom, markerMaterial);
      singleMarker.position.set(markerX, markerY, 0.2);
      singleMarker.rotation.z = -angle;
      watchGroup.add(singleMarker);
    }

    // F. Brand Signature Text Placeholder (Subtle gold emblem box)
    const emblemGeom = new THREE.BoxGeometry(0.35, 0.1, 0.02);
    const emblemMesh = new THREE.Mesh(emblemGeom, markerMaterial);
    emblemMesh.position.set(0, 0.5, 0.2);
    watchGroup.add(emblemMesh);

    // G. Watch Hands Group
    // Hour hand (thick gold hand pointing to 10 o'clock)
    const hourHandGeom = new THREE.BoxGeometry(0.06, 0.55, 0.02);
    hourHandGeom.translate(0, 0.25, 0); // Rotate around base
    const hourHandMesh = new THREE.Mesh(hourHandGeom, markerMaterial);
    hourHandMesh.position.z = 0.21;
    hourHandMesh.rotation.z = Math.PI * 0.75; // Pre-set luxurious angle
    watchGroup.add(hourHandMesh);

    // Minute hand (slender gold hand pointing to 2 o'clock)
    const minuteHandGeom = new THREE.BoxGeometry(0.045, 0.85, 0.02);
    minuteHandGeom.translate(0, 0.4, 0); // Rotate around base
    const minuteHandMesh = new THREE.Mesh(minuteHandGeom, markerMaterial);
    minuteHandMesh.position.z = 0.22;
    minuteHandMesh.rotation.z = Math.PI * -0.15; // Pre-set luxurious angle
    watchGroup.add(minuteHandMesh);

    // Dynamic Seconds Hand Group
    const secondsGroup = new THREE.Group();
    secondsGroup.position.set(0, 0, 0.23);
    
    const secHandGeom = new THREE.BoxGeometry(0.015, 0.95, 0.01);
    secHandGeom.translate(0, 0.4, 0);
    const secHandMaterial = new THREE.MeshBasicMaterial({ color: 0xc18833 }); // Pure gold sweeping wire
    const secHandMesh = new THREE.Mesh(secHandGeom, secHandMaterial);
    secondsGroup.add(secHandMesh);

    // Little hub center dot
    const hubGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16);
    hubGeom.rotateX(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeom, markerMaterial);
    hubMesh.position.z = 0.01;
    secondsGroup.add(hubMesh);

    watchGroup.add(secondsGroup);
    secondsHandRef.current = secondsGroup;

    // H. Signature Ebony Wood Straps (Extending up & down)
    const strapMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1a16, // Beautiful deep African Ebony wood tone
      roughness: 0.6,
      metalness: 0.1,
    });

    const strapGeomTop = new THREE.BoxGeometry(0.9, 2.2, 0.2);
    strapGeomTop.translate(0, 2.0, -0.1);
    const strapTopMesh = new THREE.Mesh(strapGeomTop, strapMaterial);
    watchGroup.add(strapTopMesh);
    strapTopMeshRef.current = strapTopMesh;

    const strapGeomBottom = new THREE.BoxGeometry(0.9, 2.2, 0.2);
    strapGeomBottom.translate(0, -2.0, -0.1);
    const strapBottomMesh = new THREE.Mesh(strapGeomBottom, strapMaterial);
    watchGroup.add(strapBottomMesh);
    strapBottomMeshRef.current = strapBottomMesh;

    // I. Sapphire Glass Crystal (semi-transparent high-gloss cover)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      roughness: 0.01,
      metalness: 0.9,
    });
    const glassGeom = new THREE.CylinderGeometry(1.4, 1.4, 0.04, 64);
    glassGeom.rotateX(Math.PI / 2);
    const glassMesh = new THREE.Mesh(glassGeom, glassMaterial);
    glassMesh.position.z = 0.25;
    watchGroup.add(glassMesh);

    // J. Simulated Sparkly VVS Diamonds Group (if activated)
    const diamondGroup = new THREE.Group();
    diamondGroup.position.z = 0.24;
    watchGroup.add(diamondGroup);
    diamondGroupRef.current = diamondGroup;

    const rebuildDiamonds = (isActive: boolean) => {
      // Clear existing diamonds
      while (diamondGroup.children.length > 0) {
        diamondGroup.remove(diamondGroup.children[0]);
      }

      if (!isActive) return;

      const diamondGeom = new THREE.SphereGeometry(0.04, 8, 8);
      const diamondMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xcccccc,
        roughness: 0.02,
        metalness: 0.98,
      });

      // Place diamonds around the inner bezel
      const numDiamonds = 24;
      for (let i = 0; i < numDiamonds; i++) {
        const angle = (i * Math.PI * 2) / numDiamonds;
        const radius = 1.43;
        const diaX = Math.sin(angle) * radius;
        const diaY = Math.cos(angle) * radius;

        const diaMesh = new THREE.Mesh(diamondGeom, diamondMat);
        diaMesh.position.set(diaX, diaY, 0);
        diamondGroup.add(diaMesh);
      }
    };

    rebuildDiamonds(diamondBezel);

    // 5. Active Render Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Sweep second hand in real-time
      const time = clock.getElapsedTime();
      if (secondsHandRef.current) {
        secondsHandRef.current.rotation.z = -time * 0.9; // Smooth mechanical sweeping speed
      }

      // Rotate watch on stand if automatic rotation is active
      if (isRotating && !isDragging.current) {
        watchGroup.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Observer to respond dynamically to container dimension alterations
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: currentWidth, height: currentHeight } = entry.contentRect;
        const calculatedWidth = currentWidth || width;
        const calculatedHeight = currentHeight || height;

        camera.aspect = calculatedWidth / calculatedHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(calculatedWidth, calculatedHeight);
      }
    });

    resizeObserver.observe(containerRef.current);

    // 7. Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  // 8. Handle option edits dynamically without recreating the entire WebGL scene
  useEffect(() => {
    const metalProps = getMetalMaterialProps(metalType);
    const newColor = new THREE.Color(metalProps.color);

    // Update metal materials across assemblies
    const updateMaterials = (group: THREE.Group) => {
      group.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          // Keep dial and strap materials pristine
          if (child === dialMeshRef.current || child === strapTopMeshRef.current || child === strapBottomMeshRef.current) {
            return;
          }
          child.material.color.copy(newColor);
          child.material.roughness = metalProps.roughness;
          child.material.metalness = metalProps.metalness;
          child.material.needsUpdate = true;
        }
      });
    };

    if (watchGroupRef.current) {
      updateMaterials(watchGroupRef.current);
    }
  }, [metalType]);

  useEffect(() => {
    if (dialMeshRef.current && dialMeshRef.current.material instanceof THREE.MeshStandardMaterial) {
      const hex = getDialColorHex(dialColor);
      dialMeshRef.current.material.color.setHex(hex);
      dialMeshRef.current.material.needsUpdate = true;
    }
  }, [dialColor]);

  useEffect(() => {
    // Dynamically add/remove VVS diamond bezels in existing group
    if (diamondGroupRef.current) {
      const group = diamondGroupRef.current;
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }

      if (diamondBezel) {
        const diamondGeom = new THREE.SphereGeometry(0.04, 8, 8);
        const diamondMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xbbbbbb,
          roughness: 0.01,
          metalness: 0.99,
        });

        const numDiamonds = 24;
        for (let i = 0; i < numDiamonds; i++) {
          const angle = (i * Math.PI * 2) / numDiamonds;
          const radius = 1.43;
          const diaX = Math.sin(angle) * radius;
          const diaY = Math.cos(angle) * radius;

          const diaMesh = new THREE.Mesh(diamondGeom, diamondMat);
          diaMesh.position.set(diaX, diaY, 0);
          group.add(diaMesh);
        }
      }
    }
  }, [diamondBezel]);

  // Mouse drag handles
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    setIsRotating(false);
    setHasInteracted(true);
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current || !watchGroupRef.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    watchGroupRef.current.rotation.y += deltaX * 0.007;
    watchGroupRef.current.rotation.x += deltaY * 0.007;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Touch drag handles for smartphones
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    isDragging.current = true;
    setIsRotating(false);
    setHasInteracted(true);
    previousMousePosition.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging.current || !watchGroupRef.current || e.touches.length === 0) return;

    const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

    watchGroupRef.current.rotation.y += deltaX * 0.009;
    watchGroupRef.current.rotation.x += deltaY * 0.009;

    previousMousePosition.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[450px] bg-neutral-900/40 border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-grab active:cursor-grabbing light:bg-stone-50 light:border-stone-200"
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        className="w-full h-full block"
      />

      {/* Exquisite Overlay HUD */}
      <div className="absolute inset-x-4 top-4 flex justify-between items-center pointer-events-none z-10">
        <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase bg-neutral-950/80 backdrop-blur border border-gold-400/20 px-2.5 py-1 rounded-full">
          3D Live Studio
        </span>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="pointer-events-auto p-2 bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 hover:text-gold-400 border border-neutral-800 rounded-full transition-all"
          title={language === 'FR' ? 'Rotation automatique' : 'Auto Rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      <div className="absolute bottom-4 inset-x-4 flex justify-center pointer-events-none z-10">
        <div className="px-3 py-1.5 rounded-full bg-neutral-950/90 border border-neutral-800/80 flex items-center gap-2 text-neutral-400 text-[10px] font-sans shadow-lg select-none">
          <Move className="w-3.5 h-3.5 text-gold-400" />
          <span>
            {language === 'FR' 
              ? 'Faites glisser pour pivoter à 360°' 
              : 'Drag to orbit watch 360°'}
          </span>
          {!hasInteracted && (
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-500"></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
