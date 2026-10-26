import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

/**
 * Procedural Geological Texture Generators
 * Follows Three.js skill: 100% self-contained on HTML5 Canvases - zero 404 dependencies.
 * Theme: "Know Well Before You Drill" — Palette in all shades of maroon, cordovan, burgundy, wine, and ruby rose.
 */

// 1. Rich Earthy Maroon Topsoil (Deep earth maroon, organic humus)
function createSoilTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#22060e'; // Deep Earth Maroon
  ctx.fillRect(0, 0, 512, 512);

  // Earthy granules and humus particles
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 2.2 + 0.5;
    const shade = Math.floor(Math.random() * 40 + 20);
    ctx.fillStyle = `rgb(${shade + 40}, ${shade + 4}, ${shade + 12})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Organic matter specks
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = 'rgba(18, 3, 7, 0.85)';
    ctx.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 2 + 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 2. Alluvial Clay Aquitard (Compacted dense silty layers, cordovan and deep burgundy)
function createClayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1c050d'; // Deep cordovan slate
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y += 4) {
    const alpha = Math.sin(y * 0.12) * 0.18 + 0.22;
    const colVal = Math.floor(Math.random() * 25 + 20);
    ctx.fillStyle = `rgba(${colVal + 45}, ${colVal + 8}, ${colVal + 18}, ${alpha})`;
    ctx.fillRect(0, y, 512, 3 + Math.random() * 3);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 3. Porous Sand & Gravel Aquifer (Garnet quartz, wine pebbles, porous voids)
function createSandTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#2b0813'; // Wine earth base
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 7000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 2.4 + 0.8;
    const type = Math.random();
    if (type < 0.5) {
      // Rose-tinted quartz
      ctx.fillStyle = 'rgba(244, 114, 142, 0.4)';
    } else if (type < 0.8) {
      // Warm garnet mineral sand
      ctx.fillStyle = 'rgba(163, 29, 61, 0.5)';
    } else {
      // Dark oxblood pebble
      ctx.fillStyle = 'rgba(25, 4, 10, 0.75)';
    }
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 4. Fractured Sandstone & Crystalline Bedrock (Joint fractures and rose-maroon mineral veins)
function createRockTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#140308'; // Deep oxblood charcoal
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(244, 63, 94, 0.2)'; // Rose mineral fracture lines
  ctx.lineWidth = 1.3;
  for (let i = 0; i < 28; i++) {
    ctx.beginPath();
    let x = Math.random() * 512;
    let y = Math.random() * 512;
    ctx.moveTo(x, y);
    for (let step = 0; step < 6; step++) {
      x += (Math.random() - 0.5) * 110;
      y += (Math.random() - 0.5) * 80;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 5. Groundwater Flow Texture (Fluid luminescence with rich wine and rose filaments)
function createWaterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#24030d');
  gradient.addColorStop(0.5, '#6b0720');
  gradient.addColorStop(1, '#9b111e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = 'rgba(251, 113, 133, 0.22)';
  for (let i = 0; i < 45; i++) {
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * 256,
      Math.random() * 256,
      Math.random() * 60 + 20,
      Math.random() * 10 + 3,
      Math.random() * Math.PI,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 6. Multi-Spectral Subsurface Risk Heatmap Texture (Maroon/Oxblood/Burgundy hazard spectrum)
function createHeatmapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, 'rgba(155, 17, 30, 0.85)');   // Surface: High Risk (Garnet Maroon)
  grad.addColorStop(0.25, 'rgba(225, 29, 72, 0.75)');  // 30m: Arsenic Hazard (Ruby Maroon)
  grad.addColorStop(0.48, 'rgba(190, 18, 60, 0.65)');  // 60m: Intermediate Transition (Bordeaux)
  grad.addColorStop(0.72, 'rgba(128, 0, 32, 0.75)');   // 100m: Safe Aquifer (Classic Maroon)
  grad.addColorStop(1.0, 'rgba(251, 113, 133, 0.85)'); // 150m+: Deep Safe Aquifer (Luminous Rose Maroon)

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 512);

  // Digital geological depth calibration grid ticks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let y = 0; y < 512; y += 8) {
    ctx.fillRect(0, y, 128, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const GroundwaterCrossSection3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activePage } = useAppStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect software WebGL to balance performance without altering scene contents
    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene, Camera, and Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x120307, 0.034);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 2.5, 14.0);
    camera.lookAt(0, -1.0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. Lighting Rig: Volumetric Exploration Illumination (Velvet Maroon & Ruby Rose)
    const ambientLight = new THREE.AmbientLight(0x380612, 1.8);
    scene.add(ambientLight);

    // Directional sunlight skimming across surface terrain
    const sunLight = new THREE.DirectionalLight(0xfecdd3, 2.0);
    sunLight.position.set(14, 16, 12);
    scene.add(sunLight);

    // Deep Aquifer Bioluminescent Light (Luminous Garnet Maroon)
    const aquiferLight = new THREE.PointLight(0xe11d48, 3.4, 24, 1.2);
    aquiferLight.position.set(0, -6.5, 2.5);
    scene.add(aquiferLight);

    // Moving AI Scanner Light (Ruby Rose Beam)
    const scanLight = new THREE.PointLight(0xf43f5e, 2.8, 16, 1.3);
    scanLight.position.set(0, 0, 3.5);
    scene.add(scanLight);

    // Rotating Drill Bit Spark/Friction Light (Rose Glow)
    const drillLight = new THREE.PointLight(0xfb7185, 2.0, 8, 1.5);
    drillLight.position.set(0, -4.5, 0.6);
    scene.add(drillLight);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const crossSectionWidth = 28;
    const crossSectionDepth = 7;

    // Procedural Textures
    const soilTex = createSoilTexture();
    const clayTex = createClayTexture();
    const sandTex = createSandTexture();
    const rockTex = createRockTexture();
    const waterTex = createWaterTexture();
    const heatmapTex = createHeatmapTexture();

    soilTex.repeat.set(4, 1);
    clayTex.repeat.set(4, 1);
    sandTex.repeat.set(5, 1.5);
    rockTex.repeat.set(4, 2);
    waterTex.repeat.set(3, 1);

    // 3. SURFACE TOPOGRAPHY & ROLLING TERRAIN
    const landscapeGroup = new THREE.Group();
    worldGroup.add(landscapeGroup);

    const terrainGeo = new THREE.PlaneGeometry(crossSectionWidth + 6, crossSectionDepth + 4, 48, 24);
    const terrainPos = terrainGeo.attributes.position;
    for (let i = 0; i < terrainPos.count; i++) {
      const x = terrainPos.getX(i);
      const y = terrainPos.getY(i);
      const z = Math.sin(x * 0.25) * 0.45 + Math.cos(y * 0.35) * 0.35 + Math.sin(x * 0.6 + y * 0.5) * 0.15;
      terrainPos.setZ(i, z);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x22060e, // Rich Earth Maroon
      map: soilTex,
      roughness: 0.88,
      metalness: 0.1,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.position.set(0, 1.85, -1);
    landscapeGroup.add(terrainMesh);

    // Distant mountain ridges behind the site
    const mountainGeo = new THREE.ConeGeometry(5.5, 6.5, 5);
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x160408, // Velvet dark burgundy
      roughness: 0.95,
      metalness: 0.05,
    });

    const mountainPositions = [
      [-12, 3.8, -6],
      [-6, 4.5, -7],
      [2, 4.0, -6.5],
      [9, 5.0, -8],
      [14, 3.5, -6],
    ];

    mountainPositions.forEach(([mx, my, mz]) => {
      const m = new THREE.Mesh(mountainGeo, mountainMat);
      m.position.set(mx, my, mz);
      m.scale.set(1 + Math.random() * 0.4, 0.9 + Math.random() * 0.5, 0.8);
      landscapeGroup.add(m);
    });

    // 4. GEOLOGICAL STRATA CROSS-SECTION (Earth Maroon, Burgundy, Cordovan, Oxblood)
    const strataGroup = new THREE.Group();
    worldGroup.add(strataGroup);

    interface StrataConfig {
      name: string;
      yPos: number;
      height: number;
      color: number;
      texture: THREE.CanvasTexture;
      roughness: number;
      metalness: number;
    }

    const strataLayers: StrataConfig[] = [
      // 1. Organic Surface Topsoil (Rich dark earth maroon)
      { name: 'Topsoil', yPos: 1.2, height: 1.4, color: 0x300913, texture: soilTex, roughness: 0.9, metalness: 0.05 },
      // 2. Alluvial Clay & Silt Aquitard (Dense cordovan)
      { name: 'ClayAquitard', yPos: 0.0, height: 1.2, color: 0x1d050d, texture: clayTex, roughness: 0.86, metalness: 0.08 },
      // 3. Porous Sand & Gravel Aquifer (Garnet quartz gravel)
      { name: 'ShallowAquifer', yPos: -1.4, height: 1.6, color: 0x420d1c, texture: sandTex, roughness: 0.65, metalness: 0.15 },
      // 4. Dense Confining Mudstone Barrier (Compacted oxblood)
      { name: 'DeepClayBarrier', yPos: -2.9, height: 1.4, color: 0x17030a, texture: clayTex, roughness: 0.92, metalness: 0.05 },
      // 5. Fractured Sandstone & Crystalline Rock (Dark wine with veins)
      { name: 'FracturedRock', yPos: -4.5, height: 1.8, color: 0x2b0713, texture: rockTex, roughness: 0.82, metalness: 0.2 },
      // 6. Deep Confined Pristine Aquifer (Subterranean wine/ruby reservoir)
      { name: 'DeepPristineAquifer', yPos: -6.6, height: 2.4, color: 0x6e0d25, texture: waterTex, roughness: 0.35, metalness: 0.3 },
      // 7. Ancient Crystalline Basement Rock
      { name: 'BasementRock', yPos: -8.8, height: 2.0, color: 0x120207, texture: rockTex, roughness: 0.95, metalness: 0.25 },
    ];

    strataLayers.forEach((layer) => {
      const geo = new THREE.BoxGeometry(crossSectionWidth, layer.height, crossSectionDepth);
      const mat = new THREE.MeshStandardMaterial({
        color: layer.color,
        map: layer.texture,
        roughness: layer.roughness,
        metalness: layer.metalness,
        transparent: true,
        opacity: 0.76,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, layer.yPos, -1);
      strataGroup.add(mesh);

      // Fine edge wireframe highlighting strata boundary planes
      const edgesGeo = new THREE.EdgesGeometry(geo);
      const edgesMat = new THREE.LineBasicMaterial({
        color: 0xf43f5e,
        transparent: true,
        opacity: 0.15,
      });
      const edges = new THREE.LineSegments(edgesGeo, edgesMat);
      edges.position.copy(mesh.position);
      strataGroup.add(edges);
    });

    // 5. ACTIVE BOREHOLE DRILLING RIG & ROTATING DRILL STRING ("Know Well Before You Drill")
    const drillingGroup = new THREE.Group();
    worldGroup.add(drillingGroup);

    // Surface Drilling Rig Mast (Derrick Tower at X = 0)
    const rigMastGeo = new THREE.CylinderGeometry(0.18, 0.45, 2.2, 4);
    const rigMastMat = new THREE.MeshStandardMaterial({
      color: 0x260710,
      metalness: 0.85,
      roughness: 0.3,
    });
    const rigMast = new THREE.Mesh(rigMastGeo, rigMastMat);
    rigMast.position.set(0, 3.0, 0.6);
    drillingGroup.add(rigMast);

    // Top beacon on drilling derrick
    const beaconGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.set(0, 4.15, 0.6);
    drillingGroup.add(beaconMesh);

    // Main Vertical Drill String / Shaft penetrating deep into the subterranean cross-section
    const drillPipeGeo = new THREE.CylinderGeometry(0.04, 0.04, 8.8, 12);
    const drillPipeMat = new THREE.MeshStandardMaterial({
      color: 0x9b111e,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x4c0519,
      emissiveIntensity: 0.5,
    });
    const drillPipe = new THREE.Mesh(drillPipeGeo, drillPipeMat);
    drillPipe.position.set(0, -2.5, 0.6);
    drillingGroup.add(drillPipe);

    // Rotary Drill Bit Head at deep aquifer horizon
    const drillBitGeo = new THREE.ConeGeometry(0.12, 0.35, 8);
    const drillBitMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x800020,
      emissiveIntensity: 0.7,
    });
    const drillBit = new THREE.Mesh(drillBitGeo, drillBitMat);
    drillBit.rotation.x = Math.PI; // Pointing downward
    drillBit.position.set(0, -6.8, 0.6);
    drillingGroup.add(drillBit);

    // Drill Bit Active Telemetry Laser Rings (Pulsing sensor rings emitted during drilling)
    const telemetryRings: THREE.Mesh[] = [];
    for (let r = 0; r < 4; r++) {
      const ringGeo = new THREE.RingGeometry(0.12 + r * 0.14, 0.15 + r * 0.14, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        transparent: true,
        opacity: 0.6 - r * 0.12,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, -6.85, 0.6);
      drillingGroup.add(ring);
      telemetryRings.push(ring);
    }

    // Depth milestone sensor rings along the borehole path (30m, 60m, 100m, 150m)
    const milestoneDepths = [
      { y: 0.8, color: 0xfb7185, label: '15m Soil' },
      { y: -1.4, color: 0xe11d48, label: '30m Shallow Hazard' },
      { y: -3.5, color: 0xbe123c, label: '60m Transition' },
      { y: -6.6, color: 0xf43f5e, label: '150m Safe Aquifer' },
    ];

    milestoneDepths.forEach((m) => {
      const markerRingGeo = new THREE.RingGeometry(0.08, 0.15, 16);
      const markerRingMat = new THREE.MeshBasicMaterial({
        color: m.color,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(markerRingGeo, markerRingMat);
      ring.position.set(0, m.y, 0.62);
      drillingGroup.add(ring);
    });

    // 6. CONTINUOUS GROUNDWATER AQUIFER FLUIDS & PARTICLES (Luminous Wine & Ruby Rose)
    const aquiferGroup = new THREE.Group();
    worldGroup.add(aquiferGroup);

    const shallowWaterGeo = new THREE.PlaneGeometry(crossSectionWidth + 1, crossSectionDepth + 1, 32, 16);
    const shallowWaterMat = new THREE.MeshPhysicalMaterial({
      color: 0x800020,
      emissive: 0x4c0519,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.5,
      depthWrite: false,
    });
    const shallowWaterMesh = new THREE.Mesh(shallowWaterGeo, shallowWaterMat);
    shallowWaterMesh.rotation.x = -Math.PI / 2;
    shallowWaterMesh.position.set(0, -1.3, -1);
    aquiferGroup.add(shallowWaterMesh);

    // Deep Pristine Aquifer Water Horizon (Ruby Rose Luminescence)
    const deepWaterMat = new THREE.MeshPhysicalMaterial({
      color: 0x9b111e,
      emissive: 0x6e0d25,
      emissiveIntensity: 0.75,
      transparent: true,
      opacity: 0.55,
      roughness: 0.08,
      metalness: 0.2,
      transmission: 0.6,
      depthWrite: false,
    });
    const deepWaterMesh = new THREE.Mesh(shallowWaterGeo.clone(), deepWaterMat);
    deepWaterMesh.rotation.x = -Math.PI / 2;
    deepWaterMesh.position.set(0, -6.5, -1);
    aquiferGroup.add(deepWaterMesh);

    // Continuous Laminar Water Flow Particles
    const waterParticleCount = isSoftwareGl ? 450 : 1000;
    const waterParticleGeo = new THREE.BufferGeometry();
    const waterParticlePositions = new Float32Array(waterParticleCount * 3);
    const waterParticleSpeeds = new Float32Array(waterParticleCount);

    for (let i = 0; i < waterParticleCount; i++) {
      const idx = i * 3;
      const isDeep = Math.random() > 0.35;
      const baseY = isDeep ? -6.6 : -1.4;
      waterParticlePositions[idx] = (Math.random() - 0.5) * crossSectionWidth;
      waterParticlePositions[idx + 1] = baseY + (Math.random() - 0.5) * 1.3;
      waterParticlePositions[idx + 2] = (Math.random() - 0.5) * crossSectionDepth;
      waterParticleSpeeds[i] = Math.random() * 0.02 + 0.008;
    }
    waterParticleGeo.setAttribute('position', new THREE.BufferAttribute(waterParticlePositions, 3));

    const waterParticleMat = new THREE.PointsMaterial({
      color: 0xfb7185, // Rose water particles
      size: 0.09,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const waterParticles = new THREE.Points(waterParticleGeo, waterParticleMat);
    aquiferGroup.add(waterParticles);

    // 7. CONTINUOUS CONTAMINANT PERCOLATION PARTICLES (Surface Pollution -> Shallow Aquifer)
    const contaminantGroup = new THREE.Group();
    worldGroup.add(contaminantGroup);

    const contaminantCount = isSoftwareGl ? 220 : 500;
    const contaminantGeo = new THREE.BufferGeometry();
    const contaminantPositions = new Float32Array(contaminantCount * 3);
    const contaminantOrigins = new Float32Array(contaminantCount * 3);
    const contaminantSpeeds = new Float32Array(contaminantCount);

    for (let i = 0; i < contaminantCount; i++) {
      const idx = i * 3;
      const zoneOffset = (i % 3 - 1) * 7.5 + (Math.random() - 0.5) * 3;
      contaminantPositions[idx] = zoneOffset;
      contaminantPositions[idx + 1] = 1.8 - Math.random() * 3.8;
      contaminantPositions[idx + 2] = (Math.random() - 0.5) * (crossSectionDepth * 0.8);

      contaminantOrigins[idx] = zoneOffset;
      contaminantOrigins[idx + 1] = 1.85;
      contaminantOrigins[idx + 2] = contaminantPositions[idx + 2];

      contaminantSpeeds[i] = Math.random() * 0.01 + 0.004;
    }
    contaminantGeo.setAttribute('position', new THREE.BufferAttribute(contaminantPositions, 3));

    const contaminantMat = new THREE.PointsMaterial({
      color: 0xff4d4d, // Warning Crimson
      size: 0.11,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const contaminantParticles = new THREE.Points(contaminantGeo, contaminantMat);
    contaminantGroup.add(contaminantParticles);

    // 8. CONTINUOUS AI SCANNING BEAM & MULTI-SPECTRAL PREDICTIVE HEATMAP
    const aiGroup = new THREE.Group();
    worldGroup.add(aiGroup);

    const heatmapGeo = new THREE.PlaneGeometry(crossSectionWidth * 0.95, 9.5);
    const heatmapMat = new THREE.MeshBasicMaterial({
      map: heatmapTex,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const heatmapMesh = new THREE.Mesh(heatmapGeo, heatmapMat);
    heatmapMesh.position.set(0, -3.8, 1.8);
    aiGroup.add(heatmapMesh);

    // Vertical Holographic Laser Scanner Beam (Crimson / Ruby Rose)
    const scanPlaneGeo = new THREE.PlaneGeometry(crossSectionWidth + 2, 0.14);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.set(0, 0, 2.1);
    aiGroup.add(scanPlane);

    // AI Holographic Depth Benchmark Grid Lines
    const gridHelper = new THREE.GridHelper(crossSectionWidth, 24, 0x9b111e, 0x4c0519);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.set(0, -3.5, 0.8);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    aiGroup.add(gridHelper);

    // 9. SCROLL & MOUSE INTERACTION TRACKERS
    let targetScrollProgress = 0;
    let smoothScrollProgress = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 0.7;
      mouseY = normY * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. ALWAYS-MOVING KINETIC ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Conserve GPU/CPU when hidden or on Mapbox full-screen view
      if (!isTabVisible || activePage === 'map') return;

      const elapsedTime = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);

      // Smooth scroll lerp
      smoothScrollProgress += (targetScrollProgress - smoothScrollProgress) * 0.065;
      const sp = smoothScrollProgress;

      // =========================================================================
      // ALWAYS-MOVING KINETIC MOTION (Moves autonomously without user interaction)
      // =========================================================================

      // 1. Continuous Drill Bit Rotation & Pulse
      drillBit.rotation.y += delta * 7.5;
      drillLight.intensity = 2.0 + Math.sin(elapsedTime * 8) * 0.8;

      // 2. Continuous Telemetry Sensor Rings Expansion
      telemetryRings.forEach((ring, idx) => {
        const ringTime = (elapsedTime * 1.5 + idx * 0.6) % 2.5;
        const scale = 1.0 + ringTime * 2.2;
        ring.scale.set(scale, scale, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 - ringTime * 0.28);
      });

      // 3. Continuous Water Fluid Surface Waves
      const shallowPositions = shallowWaterGeo.attributes.position;
      for (let i = 0; i < shallowPositions.count; i++) {
        const u = shallowPositions.getX(i);
        const v = shallowPositions.getY(i);
        const wave = Math.sin(u * 0.6 + elapsedTime * 1.4) * 0.045 + Math.cos(v * 0.8 + elapsedTime * 1.1) * 0.035;
        shallowPositions.setZ(i, wave);
      }
      shallowPositions.needsUpdate = true;

      // 4. Continuous Laminar Groundwater Flow Particles
      const wPositions = waterParticleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < waterParticleCount; i++) {
        const idx = i * 3;
        wPositions[idx] += waterParticleSpeeds[i];
        if (wPositions[idx] > crossSectionWidth * 0.5) {
          wPositions[idx] = -crossSectionWidth * 0.5;
        }
      }
      waterParticleGeo.attributes.position.needsUpdate = true;

      // 5. Continuous Contaminant Infiltration Micro-Particles
      const cPositions = contaminantGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < contaminantCount; i++) {
        const idx = i * 3;
        cPositions[idx + 1] -= contaminantSpeeds[i];
        cPositions[idx] += Math.sin(elapsedTime * 2 + i) * 0.002;
        if (cPositions[idx + 1] < -2.9) {
          cPositions[idx] = contaminantOrigins[idx] + (Math.random() - 0.5) * 1.5;
          cPositions[idx + 1] = 1.85;
        }
      }
      contaminantGeo.attributes.position.needsUpdate = true;

      // 6. Continuous Vertical AI Scanning Laser Sweep
      const scanY = Math.sin(elapsedTime * 0.75) * 4.2 - 3.0;
      scanPlane.position.y = scanY;
      scanLight.position.y = scanY;
      scanPlaneMat.opacity = Math.sin(elapsedTime * 2.2) * 0.15 + 0.8;

      // 7. Continuous Gentle Orbital Swaying of the entire Earth Cross-Section
      worldGroup.rotation.y = Math.sin(elapsedTime * 0.1) * 0.045 + (mouseX * 0.025);
      worldGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.015;

      // =========================================================================
      // SCROLL-DRIVEN CAMERA PATH & TRANSITIONS (Seamlessly blends with auto-motion)
      // =========================================================================
      let camY: number;
      let camZ: number;
      let lookY: number;

      if (sp < 0.22) {
        // Hero: elevated perspective viewing landscape, derrick rig and surface
        const t = sp / 0.22;
        camY = THREE.MathUtils.lerp(3.2, 1.8, t);
        camZ = THREE.MathUtils.lerp(14.0, 11.8, t);
        lookY = THREE.MathUtils.lerp(0.5, -0.4, t);
      } else if (sp < 0.5) {
        // Geological Cross-Section descent
        const t = (sp - 0.22) / 0.28;
        camY = THREE.MathUtils.lerp(1.8, -1.8, t);
        camZ = THREE.MathUtils.lerp(11.8, 10.2, t);
        lookY = THREE.MathUtils.lerp(-0.4, -2.6, t);
      } else if (sp < 0.75) {
        // Groundwater & Infiltration horizon
        const t = (sp - 0.5) / 0.25;
        camY = THREE.MathUtils.lerp(-1.8, -4.5, t);
        camZ = THREE.MathUtils.lerp(10.2, 11.5, t);
        lookY = THREE.MathUtils.lerp(-2.6, -4.6, t);
      } else {
        // AI Prediction & Deep Aquifer Target Horizon
        const t = (sp - 0.75) / 0.25;
        camY = THREE.MathUtils.lerp(-4.5, -3.2, t);
        camZ = THREE.MathUtils.lerp(11.5, 12.8, t);
        lookY = THREE.MathUtils.lerp(-4.6, -3.5, t);
      }

      // Add autonomous continuous camera breathing and gentle mouse parallax
      const autoFloatX = Math.sin(elapsedTime * 0.15) * 0.4 + mouseX * 0.5;
      const autoFloatY = Math.cos(elapsedTime * 0.12) * 0.25 + mouseY * 0.25;

      camera.position.x += (autoFloatX - camera.position.x) * 0.04;
      camera.position.y += (camY + autoFloatY - camera.position.y) * 0.04;
      camera.position.z += (camZ - camera.position.z) * 0.04;
      camera.lookAt(0, lookY, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 11. Clean Memory Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh || (obj as THREE.Points).isPoints || (obj as THREE.Line).isLine) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      soilTex.dispose();
      clayTex.dispose();
      sandTex.dispose();
      rockTex.dispose();
      waterTex.dispose();
      heatmapTex.dispose();
      renderer.dispose();
    };
  }, [activePage]);

  if (activePage === 'map') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-65 md:opacity-85 transition-opacity duration-1000"
      />
      {/* Subterranean atmospheric gradient blending cleanly with existing dark UI */}
      <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#120307]/45 to-[#120307]/90 pointer-events-none" />
    </div>
  );
};
