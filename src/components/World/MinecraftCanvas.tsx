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
    scene.fog = new THREE.FogExp2(0x0e1422, 0.012);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 7, 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
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

    // --- Face Texture with Trimmed Beard & Eyes ---
    const createFaceTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#d79e6d";
      ctx.fillRect(0, 0, 16, 16);

      for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
          if (Math.random() > 0.6) {
            ctx.fillStyle = Math.random() > 0.5 ? "#cf9361" : "#e0a674";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      // Hair
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

      // Eyes (White sclera + deep pupil + blue specular)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(2, 7, 4, 3);
      ctx.fillRect(10, 7, 4, 3);

      ctx.fillStyle = "#3b2210";
      ctx.fillRect(4, 7, 2, 3);
      ctx.fillRect(10, 7, 2, 3);
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(4, 8, 1, 1);
      ctx.fillRect(10, 8, 1, 1);

      // Nose
      ctx.fillStyle = "#bf8353";
      ctx.fillRect(6, 9, 4, 2);

      // Beard & Mustache
      ctx.fillStyle = "#1f1107";
      ctx.fillRect(4, 11, 8, 2);
      ctx.fillRect(7, 11, 2, 1);
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

    // --- Developer Torso Texture ---
    const createTorsoTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 20;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#00887a";
      ctx.fillRect(0, 0, 16, 20);

      for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 20; y++) {
          if (Math.random() > 0.5) {
            ctx.fillStyle = Math.random() > 0.5 ? "#007a6d" : "#009688";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      ctx.fillStyle = "#d79e6d";
      ctx.fillRect(6, 0, 4, 4);
      ctx.fillRect(7, 4, 2, 2);

      ctx.fillStyle = "#3e2723";
      ctx.fillRect(0, 15, 16, 3);
      ctx.fillStyle = "#fbc02d";
      ctx.fillRect(6, 15, 4, 3);
      ctx.fillStyle = "#fff59d";
      ctx.fillRect(7, 16, 2, 1);

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      return texture;
    };

    // --- Laptop Screen Code Texture ---
    const createCodeScreenTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 40;
      const ctx = canvas.getContext("2d")!;

      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, 64, 40);

      // Code line representations
      const lineColors = ["#38bdf8", "#4ade80", "#a855f7", "#fbbf24", "#f87171", "#e2e8f0"];
      for (let y = 4; y < 36; y += 4) {
        const indent = (y % 8 === 0) ? 12 : 4;
        const width = Math.floor(Math.random() * 32) + 12;
        ctx.fillStyle = lineColors[Math.floor(Math.random() * lineColors.length)];
        ctx.fillRect(indent, y, width, 2);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
      return texture;
    };

    // --- Lamb Face Texture ---
    const createLambFaceTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d")!;

      // Wool Top
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, 16, 5);

      // Pink Face
      ctx.fillStyle = "#fbcfe8";
      ctx.fillRect(2, 5, 12, 11);

      // Sheep Eyes (White + Black horizontal pupil)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 6, 4, 3);
      ctx.fillRect(12, 6, 4, 3);

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(1, 7, 2, 2);
      ctx.fillRect(13, 7, 2, 2);

      // Nose & Mouth
      ctx.fillStyle = "#f472b6";
      ctx.fillRect(6, 11, 4, 2);
      ctx.fillStyle = "#db2777";
      ctx.fillRect(7, 13, 2, 1);

      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = THREE.NearestFilter;
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
    const woolTex = createPixelTexture(["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1"]);

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
    const woolMat = new THREE.MeshLambertMaterial({ map: woolTex });

    // --- Floating Minecraft Island Group ---
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

      for (let y = 0; y < 5; y++) {
        const trunk = new THREE.Mesh(boxGeo, woodMat);
        trunk.position.set(0, y + 0.5, 0);
        trunk.castShadow = true;
        treeGroup.add(trunk);
      }

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

    const portalEnergy = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 3),
      new THREE.MeshBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
    );
    portalEnergy.position.set(1.5, 2, 0);
    portalGroup.add(portalEnergy);

    const portalLight = new THREE.PointLight(0xb026ff, 3.5, 14);
    portalLight.position.set(1.5, 2, 1);
    portalGroup.add(portalLight);

    // --- Authentic Minecraft Character (Jayesh with Beard, Hair, Eyes & Laptop) ---
    const character = new THREE.Group();
    character.position.set(-0.8, 2.6, 2);
    character.scale.set(1.25, 1.25, 1.25);
    worldGroup.add(character);

    // Head
    const faceTex = createFaceTexture();
    const headMats = [
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#1f1107"]) }),
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#1f1107"]) }),
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#38200d"]) }),
      new THREE.MeshLambertMaterial({ color: 0x1f1107 }),
      new THREE.MeshLambertMaterial({ map: faceTex }),
      new THREE.MeshLambertMaterial({ map: createPixelTexture(["#271508", "#1e1005"]) })
    ];
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), headMats);
    head.position.set(0, 1.9, 0);
    head.castShadow = true;
    character.add(head);

    // Torso
    const torsoTex = createTorsoTexture();
    const torsoMats = [
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x00887a }),
      new THREE.MeshLambertMaterial({ color: 0x3e2723 }),
      new THREE.MeshLambertMaterial({ map: torsoTex }),
      new THREE.MeshLambertMaterial({ color: 0x00695c })
    ];
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.4), torsoMats);
    torso.position.set(0, 0.9, 0);
    torso.castShadow = true;
    character.add(torso);

    // Arms
    const armMat = [
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x00887a }),
      new THREE.MeshLambertMaterial({ color: 0xd79e6d }), // hand
      new THREE.MeshLambertMaterial({ color: 0x007a6d }),
      new THREE.MeshLambertMaterial({ color: 0x007a6d })
    ];

    // Left Arm angled towards laptop
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.55, 1.3, 0);
    leftArmGroup.rotation.x = -Math.PI / 4;
    leftArmGroup.rotation.y = Math.PI / 8;
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.35), armMat);
    leftArm.position.set(0, -0.4, 0);
    leftArm.castShadow = true;
    leftArmGroup.add(leftArm);
    character.add(leftArmGroup);

    // Right Arm holding the laptop
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.55, 1.3, 0);
    rightArmGroup.rotation.x = -Math.PI / 3.5;
    rightArmGroup.rotation.y = -Math.PI / 10;
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.35), armMat);
    rightArm.position.set(0, -0.4, 0);
    rightArm.castShadow = true;
    rightArmGroup.add(rightArm);
    character.add(rightArmGroup);

    // --- 3D Minecraft Developer Laptop ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 0.75, 0.55);
    laptopGroup.rotation.x = Math.PI / 12;
    character.add(laptopGroup);

    // Laptop Base / Keyboard chassis (Space Gray Aluminum)
    const laptopChassisMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.45), laptopChassisMat);
    laptopGroup.add(laptopBase);

    // Keyboard Area
    const keyboardMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.01, 0.25), keyboardMat);
    keyboard.position.set(0, 0.025, -0.05);
    laptopGroup.add(keyboard);

    // Trackpad
    const trackpad = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.005, 0.12), new THREE.MeshLambertMaterial({ color: 0x475569 }));
    trackpad.position.set(0, 0.025, 0.12);
    laptopGroup.add(trackpad);

    // Laptop Screen Lid (Angled back at 110 deg)
    const laptopScreenLid = new THREE.Group();
    laptopScreenLid.position.set(0, 0.02, -0.22);
    laptopScreenLid.rotation.x = -Math.PI / 2.8;
    laptopGroup.add(laptopScreenLid);

    // Screen Bezel
    const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.03), laptopChassisMat);
    screenBezel.position.set(0, 0.22, 0);
    laptopScreenLid.add(screenBezel);

    // Glowing Code Screen Plane
    const codeScreenTex = createCodeScreenTexture();
    const screenDisplay = new THREE.Mesh(
      new THREE.PlaneGeometry(0.58, 0.38),
      new THREE.MeshBasicMaterial({ map: codeScreenTex })
    );
    screenDisplay.position.set(0, 0.22, 0.02);
    laptopScreenLid.add(screenDisplay);

    // Screen light casting glow onto Jayesh
    const laptopGlow = new THREE.PointLight(0x38bdf8, 1.8, 3);
    laptopGlow.position.set(0, 0.25, 0.1);
    laptopScreenLid.add(laptopGlow);

    // Legs
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1a237e });
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.2, 0.38), pantsMat);
    leftLeg.position.set(-0.2, -0.3, 0);
    leftLeg.castShadow = true;
    character.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.2, 0.38), pantsMat);
    rightLeg.position.set(0.2, -0.3, 0);
    rightLeg.castShadow = true;
    character.add(rightLeg);

    // --- Cute Little Minecraft Lamb / Baby Sheep beside Jayesh ---
    const lambGroup = new THREE.Group();
    lambGroup.position.set(1.4, 2.2, 2.2);
    lambGroup.scale.set(0.85, 0.85, 0.85);
    lambGroup.rotation.y = -Math.PI / 6;
    worldGroup.add(lambGroup);

    // Lamb Wool Body
    const lambBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.75, 1.1), woolMat);
    lambBody.position.set(0, 0.65, 0);
    lambBody.castShadow = true;
    lambGroup.add(lambBody);

    // Lamb Head with Wool Cap and Face Texture
    const lambHeadGroup = new THREE.Group();
    lambHeadGroup.position.set(0, 1.05, 0.55);
    lambGroup.add(lambHeadGroup);

    const lambFaceTex = createLambFaceTexture();
    const lambHeadMats = [
      new THREE.MeshLambertMaterial({ map: woolTex }),
      new THREE.MeshLambertMaterial({ map: woolTex }),
      new THREE.MeshLambertMaterial({ map: woolTex }),
      new THREE.MeshLambertMaterial({ color: 0xfbcfe8 }),
      new THREE.MeshLambertMaterial({ map: lambFaceTex }),
      new THREE.MeshLambertMaterial({ map: woolTex })
    ];
    const lambHead = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), lambHeadMats);
    lambHead.castShadow = true;
    lambHeadGroup.add(lambHead);

    // Lamb Ears
    const earPinkMat = new THREE.MeshLambertMaterial({ color: 0xfbcfe8 });
    const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.08), earPinkMat);
    leftEar.position.set(-0.32, 0.05, -0.05);
    leftEar.rotation.z = Math.PI / 8;
    lambHeadGroup.add(leftEar);

    const rightEar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.08), earPinkMat);
    rightEar.position.set(0.32, 0.05, -0.05);
    rightEar.rotation.z = -Math.PI / 8;
    lambHeadGroup.add(rightEar);

    // 4 Lamb Legs
    const lambLegMat = new THREE.MeshLambertMaterial({ color: 0xfbcfe8 });
    const legGeo = new THREE.BoxGeometry(0.2, 0.55, 0.2);

    const lambLegFL = new THREE.Mesh(legGeo, lambLegMat);
    lambLegFL.position.set(-0.3, 0.28, 0.35);
    lambLegFL.castShadow = true;
    lambGroup.add(lambLegFL);

    const lambLegFR = new THREE.Mesh(legGeo, lambLegMat);
    lambLegFR.position.set(0.3, 0.28, 0.35);
    lambLegFR.castShadow = true;
    lambGroup.add(lambLegFR);

    const lambLegBL = new THREE.Mesh(legGeo, lambLegMat);
    lambLegBL.position.set(-0.3, 0.28, -0.35);
    lambLegBL.castShadow = true;
    lambGroup.add(lambLegBL);

    const lambLegBR = new THREE.Mesh(legGeo, lambLegMat);
    lambLegBR.position.set(0.3, 0.28, -0.35);
    lambLegBR.castShadow = true;
    lambGroup.add(lambLegBR);

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

    // --- Crisp Direct & Ambient Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.6);
    sunLight.position.set(12, 24, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Character & Lamb keylight
    const charLight = new THREE.PointLight(0x4deeea, 1.8, 9);
    charLight.position.set(0, 3.5, 3.5);
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

      const radius = 19 - progress * 6;
      const angle = progress * Math.PI * 1.5 + mouseX * 0.25;
      const targetCamX = Math.sin(angle) * radius;
      const targetCamZ = Math.cos(angle) * radius;
      const targetCamY = 6.5 + Math.sin(progress * Math.PI) * 3 - mouseY * 1.8;

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      camera.lookAt(character.position.x + 0.5, character.position.y + 1.0, character.position.z);

      // Jayesh Breathing & Typing
      character.position.y = 2.6 + Math.sin(time * 2.2) * 0.04;
      head.rotation.y = Math.sin(time * 1.2) * 0.15 + mouseX * 0.35;
      head.rotation.x = -mouseY * 0.2 + 0.1; // looking slightly down at screen
      leftArmGroup.rotation.z = Math.sin(time * 6) * 0.04;
      rightArmGroup.rotation.z = -Math.sin(time * 6) * 0.04;

      // Little Lamb Nibbling & Head Tilting
      lambGroup.position.y = 2.2 + Math.sin(time * 2.5) * 0.03;
      lambHeadGroup.rotation.x = Math.sin(time * 1.8) * 0.15;
      lambHeadGroup.rotation.y = Math.cos(time * 1.2) * 0.25;
      leftEar.rotation.z = Math.PI / 8 + Math.sin(time * 4) * 0.1;
      rightEar.rotation.z = -Math.PI / 8 - Math.sin(time * 4) * 0.1;

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