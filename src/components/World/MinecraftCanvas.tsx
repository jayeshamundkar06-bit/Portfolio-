"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MinecraftCanvasProps {
  activeSection?: string;
}

export const MinecraftCanvas: React.FC<MinecraftCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { scrollProgress } = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e1422, 0.015); // Lighter, clearer fog

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 7, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- Procedural 16x16 Pixel Texture Generator ---
    const createPixelTexture = (colors: string[], width = 16, height = 16) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      return texture;
    };

    // --- High-Resolution Pixel Minecraft Character Face Texture ---
    const createFaceTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d")!;

      // Base Skin
      ctx.fillStyle = "#d79e6d";
      ctx.fillRect(0, 0, 16, 16);

      // Skin shading variance
      for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
          if (Math.random() > 0.6) {
            ctx.fillStyle = Math.random() > 0.5 ? "#cf9361" : "#e0a674";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Hair (Top and sides)
      ctx.fillStyle = "#271508";
      ctx.fillRect(0, 0, 16, 5);
      ctx.fillRect(0, 5, 2, 4);
      ctx.fillRect(14, 5, 2, 4);
      ctx.fillStyle = "#38200d";
      ctx.fillRect(3, 4, 10, 2);

      // Eyebrows
      ctx.fillStyle = "#1e1005";
      ctx.fillRect(2, 6, 4, 1);
      ctx.fillRect(10, 6, 4, 1);

      // Eyes (White sclera + deep pupil + reflection)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(2, 7, 4, 3);
      ctx.fillRect(10, 7, 4, 3);

      // Pupils (Brown / Blue)
      ctx.fillStyle = "#3b2210";
      ctx.fillRect(4, 7, 2, 3);
      ctx.fillRect(10, 7, 2, 3);
      // Pupil highlight
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(4, 8, 1, 1);
      ctx.fillRect(10, 8, 1, 1);

      // Nose
      ctx.fillStyle = "#bf8353";
      ctx.fillRect(6, 9, 4, 2);

      // Trimmed Beard (Characteristic requested feature - authentic Minecraft jawline & mustache)
      ctx.fillStyle = "#1f1107";
      // Mustache
      ctx.fillRect(4, 11, 8, 2);
      ctx.fillRect(7, 11, 2, 1);
      // Beard sides and chin
      ctx.fillRect(1, 10, 3, 6);
      ctx.fillRect(12, 10, 3, 6);
      ctx.fillRect(3, 13, 10, 3);
      ctx.fillStyle = "#2e1a0b";
      ctx.fillRect(5, 14, 6, 2);

      // Mouth
      ctx.fillStyle = "#733e25";
      ctx.fillRect(6, 12, 4, 1);

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      return texture;
    };

    // --- Minecraft Torso Texture ---
    const createTorsoTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 20;
      const ctx = canvas.getContext("2d")!;

      // Teal / Emerald adventurer jacket
      ctx.fillStyle = "#00887a";
      ctx.fillRect(0, 0, 16, 20);

      // Shading
      for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 20; y++) {
          if (Math.random() > 0.5) {
            ctx.fillStyle = Math.random() > 0.5 ? "#007a6d" : "#009688";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // V-Neck / Shirt opening
      ctx.fillStyle = "#d79e6d";
      ctx.fillRect(6, 0, 4, 4);
      ctx.fillRect(7, 4, 2, 2);

      // Belt
      ctx.fillStyle = "#3e2723";
      ctx.fillRect(0, 15, 16, 3);
      // Gold Buckle
      ctx.fillStyle = "#fbc02d";
      ctx.fillRect(6, 15, 4, 3);
      ctx.fillStyle = "#fff59d";
      ctx.fillRect(7, 16, 2, 1);

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      return texture;
    };

    // --- Block Textures ---
    const grassTopTex = createPixelTexture(["#5b8c32", "#4e7d28", "#689d38", "#436f20"]);
    const grassSideTex = createPixelTexture(["#866043", "#744f33", "#5c3d25", "#5b8c32"]);
    const dirtTex = createPixelTexture(["#866043", "#744f33", "#5c3d25", "#926848"]);
    const stoneTex = createPixelTexture(["#737373", "#616161", "#525252", "#808080"]);
    const woodTex = createPixelTexture(["#855427", "#6d441e", "#563515", "#996230"]);
    const leavesTex = createPixelTexture(["#2e7024", "#245c1c", "#38822d", "#1e4d16"]);
    const diamondOreTex = createPixelTexture(["#737373", "#616161", "#4deeea", "#00f0ff"]);
    const goldOreTex = createPixelTexture(["#737373", "#616161", "#f9a825", "#ffd700"]);
    const obsidianTex = createPixelTexture(["#161024", "#110b1c", "#241838", "#331f50"]);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    const grassMat = [
      new THREE.MeshLambertMaterial({ map: grassSideTex }),
      new THREE.MeshLambertMaterial({ map: grassSideTex }),
      new THREE.MeshLambertMaterial({ map: grassTopTex }),
      new THREE.MeshLambertMaterial({ map: dirtTex }),
      new THREE.MeshLambertMaterial({ map: grassSideTex }),
      new THREE.MeshLambertMaterial({ map: grassSideTex })
    ];

    const dirtMat = new THREE.MeshLambertMaterial({ map: dirtTex });
    const stoneMat = new THREE.MeshLambertMaterial({ map: stoneTex });
    const woodMat = new THREE.MeshLambertMaterial({ map: woodTex });
    const leavesMat = new THREE.MeshLambertMaterial({ map: leavesTex, transparent: true, opacity: 0.95 });
    const diamondMat = new THREE.MeshLambertMaterial({ map: diamondOreTex });
    const goldMat = new THREE.MeshLambertMaterial({ map: goldOreTex });
    const obsidianMat = new THREE.MeshLambertMaterial({ map: obsidianTex });

    // --- Build Floating 3D Minecraft Island ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const islandRadius = 8;
    for (let x = -islandRadius; x <= islandRadius; x++) {
      for (let z = -islandRadius; z <= islandRadius; z++) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist <= islandRadius + Math.sin(x * 1.5) * 1.2) {
          const height = Math.floor(Math.sin(x * 0.35) * 1.4 + Math.cos(z * 0.35) * 1.4);

          // Top Grass
          const grassMesh = new THREE.Mesh(boxGeo, grassMat);
          grassMesh.position.set(x, height, z);
          grassMesh.receiveShadow = true;
          grassMesh.castShadow = true;
          worldGroup.add(grassMesh);

          // Dirt
          for (let y = height - 1; y >= height - 2; y--) {
            const dirtMesh = new THREE.Mesh(boxGeo, dirtMat);
            dirtMesh.position.set(x, y, z);
            dirtMesh.receiveShadow = true;
            worldGroup.add(dirtMesh);
          }

          // Stone & Ores
          const bottomDepth = height - 3 - Math.floor(islandRadius - dist);
          for (let y = height - 3; y >= bottomDepth; y--) {
            let mat = stoneMat;
            const rand = Math.random();
            if (rand > 0.92) mat = diamondMat;
            else if (rand > 0.85) mat = goldMat;

            const stoneMesh = new THREE.Mesh(boxGeo, mat);
            stoneMesh.position.set(x, y, z);
            stoneMesh.receiveShadow = true;
            worldGroup.add(stoneMesh);
          }
        }
      }
    }

    // --- 3D Oak Tree ---
    const createTree = (tx: number, ty: number, tz: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, ty, tz);

      // Trunk
      for (let y = 0; y < 5; y++) {
        const trunk = new THREE.Mesh(boxGeo, woodMat);
        trunk.position.set(0, y + 0.5, 0);
        trunk.castShadow = true;
        treeGroup.add(trunk);
      }

      // Leaves
      for (let lx = -2; lx <= 2; lx++) {
        for (let ly = 3; ly <= 5; ly++) {
          for (let lz = -2; lz <= 2; lz++) {
            if (Math.abs(lx) === 2 && Math.abs(lz) === 2 && (ly === 5 || Math.random() > 0.4)) continue;
            if (lx === 0 && lz === 0 && ly < 5) continue;
            const leaf = new THREE.Mesh(boxGeo, leavesMat);
            leaf.position.set(lx, ly + 0.5, lz);
            leaf.castShadow = true;
            treeGroup.add(leaf);
          }
        }
      }
      for (let lx = -1; lx <= 1; lx++) {
        for (let lz = -1; lz <= 1; lz++) {
          if (Math.abs(lx) === 1 && Math.abs(lz) === 1) continue;
          const topLeaf = new THREE.Mesh(boxGeo, leavesMat);
          topLeaf.position.set(lx, 6.5, lz);
          topLeaf.castShadow = true;
          treeGroup.add(topLeaf);
        }
      }

      worldGroup.add(treeGroup);
    };

    createTree(-4, 2, -3);
    createTree(5, 1, 3);

    // --- 3D Nether Portal ---
    const portalGroup = new THREE.Group();
    portalGroup.position.set(3, 2.5, -4);
    worldGroup.add(portalGroup);

    const portalBlocks = [
      [0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0],
      [0, 1, 0], [0, 2, 0], [0, 3, 0], [0, 4, 0],
      [3, 1, 0], [3, 2, 0], [3, 3, 0], [3, 4, 0],
      [0, 4, 0], [1, 4, 0], [2, 4, 0], [3, 4, 0]
    ];

    portalBlocks.forEach(([px, py, pz]) => {
      const obs = new THREE.Mesh(boxGeo, obsidianMat);
      obs.position.set(px, py, pz);
      obs.castShadow = true;
      portalGroup.add(obs);
    });

    const portalEnergyGeo = new THREE.PlaneGeometry(2, 3);
    const portalEnergyMat = new THREE.MeshBasicMaterial({
      color: 0xb026ff,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const portalEnergy = new THREE.Mesh(portalEnergyGeo, portalEnergyMat);
    portalEnergy.position.set(1.5, 2, 0);
    portalGroup.add(portalEnergy);

    const portalLight = new THREE.PointLight(0xb026ff, 3.5, 14);
    portalLight.position.set(1.5, 2, 1);
    portalGroup.add(portalLight);

    // --- Authentic Minecraft Character (Jayesh with Beard, Hair, Eyes & Diamond Sword) ---
    const character = new THREE.Group();
    character.position.set(-0.5, 2.6, 2);
    character.scale.set(1.25, 1.25, 1.25); // Prominent size
    worldGroup.add(character);

    // Character Materials
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xd79e6d });
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x271508 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1a237e }); // Deep blue jeans
    const shoeMat = new THREE.MeshLambertMaterial({ color: 0x424242 }); // Gray shoes

    // Face & Head Materials
    const faceTex = createFaceTexture();
    const headMats = [
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#1f1107"]) }), // Right
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#1f1107"]) }), // Left
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#38200d"]) }), // Top
      new THREE.MeshLambertMaterial({ color: 0x1f1107 }),                                   // Bottom (beard under chin)
      new THREE.MeshLambertMaterial({ map: faceTex }),                                      // Front (Eyes, Beard, Nose)
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#1e1005"]) })  // Back
    ];

    const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const head = new THREE.Mesh(headGeo, headMats);
    head.position.set(0, 1.9, 0);
    head.castShadow = true;
    character.add(head);

    // Torso with jacket texture
    const torsoTex = createTorsoTexture();
    const torsoMats = [
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x00887a }),
      new THREE.MeshLambertMaterial({ color: 0x3e2723 }),
      new THREE.MeshLambertMaterial({ map: torsoTex }),
      new THREE.MeshLambertMaterial({ color: 0x00695c })
    ];
    const torsoGeo = new THREE.BoxGeometry(0.8, 1.2, 0.4);
    const torso = new THREE.Mesh(torsoGeo, torsoMats);
    torso.position.set(0, 0.9, 0);
    torso.castShadow = true;
    character.add(torso);

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.6, 1.3, 0);
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.2, 0.38), [
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x00887a }),
      new THREE.MeshLambertMaterial({ color: 0xd79e6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d })
    ]);
    leftArm.position.set(0, -0.4, 0);
    leftArm.castShadow = true;
    leftArmGroup.add(leftArm);
    character.add(leftArmGroup);

    // Right Arm (Holding Diamond Sword)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.6, 1.3, 0);
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.2, 0.38), [
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x00887a }),
      new THREE.MeshLambertMaterial({ color: 0xd79e6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d })
    ]);
    rightArm.position.set(0, -0.4, 0);
    rightArm.castShadow = true;
    rightArmGroup.add(rightArm);
    character.add(rightArmGroup);

    // --- Iconic Pixelated Minecraft Diamond Sword ---
    const swordGroup = new THREE.Group();
    swordGroup.position.set(0, -0.85, 0.35);
    swordGroup.rotation.x = Math.PI / 3.5;
    swordGroup.rotation.z = -Math.PI / 8;
    rightArmGroup.add(swordGroup);

    // Sword Materials
    const diamondCyanMat = new THREE.MeshLambertMaterial({ color: 0x4deeea });
    const diamondOutlineMat = new THREE.MeshLambertMaterial({ color: 0x1b8c89 });
    const swordHiltMat = new THREE.MeshLambertMaterial({ color: 0x5c3d25 });
    const swordGoldMat = new THREE.MeshLambertMaterial({ color: 0xf9a825 });

    // Hilt / Handle
    for (let i = 0; i < 4; i++) {
      const hiltSegment = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.06), swordHiltMat);
      hiltSegment.position.set(-0.06 * i, -0.06 * i, 0);
      swordGroup.add(hiltSegment);
    }

    // Crossguard
    const guard1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.08), swordGoldMat);
    guard1.position.set(0.06, 0.06, 0);
    swordGroup.add(guard1);
    const guard2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.08), diamondCyanMat);
    guard2.position.set(0.14, -0.02, 0);
    swordGroup.add(guard2);
    const guard3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.08), diamondCyanMat);
    guard3.position.set(-0.02, 0.14, 0);
    swordGroup.add(guard3);

    // Stepped Diamond Blade (Iconic 45-degree voxel step)
    for (let b = 1; b <= 9; b++) {
      // Core diamond blade block
      const bladeCore = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.06), diamondCyanMat);
      bladeCore.position.set(0.09 * b + 0.1, 0.09 * b + 0.1, 0);
      swordGroup.add(bladeCore);

      // Dark edge pixel
      const bladeEdge = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.05), diamondOutlineMat);
      bladeEdge.position.set(0.09 * b + 0.16, 0.09 * b + 0.06, 0);
      swordGroup.add(bladeEdge);
    }
    // Sword Tip
    const bladeTip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.06), diamondCyanMat);
    bladeTip.position.set(0.09 * 10 + 0.1, 0.09 * 10 + 0.1, 0);
    swordGroup.add(bladeTip);

    // Legs
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.2, 0.38), pantsMat);
    leftLeg.position.set(-0.2, -0.3, 0);
    leftLeg.castShadow = true;
    character.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.2, 0.38), pantsMat);
    rightLeg.position.set(0.2, -0.3, 0);
    rightLeg.castShadow = true;
    character.add(rightLeg);

    // --- Floating Glowing Runes & Particles ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = Math.random() * 30 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      const isCyan = Math.random() > 0.4;
      colors[i * 3] = isCyan ? 0.3 : 0.8;
      colors[i * 3 + 1] = isCyan ? 0.9 : 0.4;
      colors[i * 3 + 2] = 1.0;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Direct Crisp Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.6);
    sunLight.position.set(12, 24, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Character rim light
    const charLight = new THREE.PointLight(0x4deeea, 2, 8);
    charLight.position.set(-0.5, 3.5, 3.5);
    scene.add(charLight);

    // --- Mouse Parallax Controls ---
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- Render Loop ---
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.018;
      const progress = scrollRef.current;

      // Camera sweeps smoothly around the character and island
      const radius = 19 - progress * 6;
      const angle = progress * Math.PI * 1.5 + mouseX * 0.25;
      const targetCamX = Math.sin(angle) * radius;
      const targetCamZ = Math.cos(angle) * radius;
      const targetCamY = 6.5 + Math.sin(progress * Math.PI) * 3 - mouseY * 1.8;

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      camera.lookAt(character.position.x, character.position.y + 1.2, character.position.z);

      // Character Breathing & Looking at Mouse
      character.position.y = 2.6 + Math.sin(time * 2.2) * 0.04;
      head.rotation.y = Math.sin(time * 1.2) * 0.15 + mouseX * 0.35;
      head.rotation.x = -mouseY * 0.2;
      rightArmGroup.rotation.x = Math.sin(time * 2.2) * 0.08;
      leftArmGroup.rotation.x = -Math.sin(time * 2.2) * 0.08;

      // Portal energy pulse
      portalEnergy.scale.set(1 + Math.sin(time * 4) * 0.04, 1 + Math.cos(time * 4) * 0.04, 1);
      portalLight.intensity = 3 + Math.sin(time * 5) * 1.2;

      // Floating Runes
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += 0.025;
        if (posArray[i * 3 + 1] > 28) {
          posArray[i * 3 + 1] = -5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Dynamic Fog & Sky per Biome
      if (progress > 0.8) {
        if (scene.fog) scene.fog.color.setHex(0x1a0729);
        renderer.setClearColor(0x130221, 1);
        sunLight.color.setHex(0xd946ef);
      } else if (progress > 0.5) {
        if (scene.fog) scene.fog.color.setHex(0x1a1524);
        renderer.setClearColor(0x100e18, 1);
        sunLight.color.setHex(0xf59e0b);
      } else {
        if (scene.fog) scene.fog.color.setHex(0x0e1422);
        renderer.setClearColor(0x0a0f18, 1);
        sunLight.color.setHex(0xfff5e6);
      }

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};