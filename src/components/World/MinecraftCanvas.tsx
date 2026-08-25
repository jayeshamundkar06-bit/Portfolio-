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
    scene.fog = new THREE.FogExp2(0x0e131f, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // --- Procedural Minecraft Textures ---
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

    // --- Build 3D Floating Minecraft Island ---
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const islandRadius = 7;
    for (let x = -islandRadius; x <= islandRadius; x++) {
      for (let z = -islandRadius; z <= islandRadius; z++) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist <= islandRadius + (Math.sin(x * 1.5) * 1.2)) {
          const height = Math.floor(Math.sin(x * 0.4) * 1.5 + Math.cos(z * 0.4) * 1.5);
          
          // Top Grass block
          const grassMesh = new THREE.Mesh(boxGeo, grassMat);
          grassMesh.position.set(x, height, z);
          grassMesh.receiveShadow = true;
          grassMesh.castShadow = true;
          worldGroup.add(grassMesh);

          // Dirt Layers
          for (let y = height - 1; y >= height - 2; y--) {
            const dirtMesh = new THREE.Mesh(boxGeo, dirtMat);
            dirtMesh.position.set(x, y, z);
            dirtMesh.receiveShadow = true;
            worldGroup.add(dirtMesh);
          }

          // Stone and Ore Deep Foundation
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

      // Leaves Canopy
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
      // Top leaf cap
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

    createTree(-3, 2, -2);
    createTree(4, 1, 3);

    // --- 3D Nether Portal ---
    const portalGroup = new THREE.Group();
    portalGroup.position.set(2, 2.5, -4);
    worldGroup.add(portalGroup);

    // Obsidian Frame
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

    // Swirling Portal Energy Plane
    const portalEnergyGeo = new THREE.PlaneGeometry(2, 3);
    const portalEnergyMat = new THREE.MeshBasicMaterial({
      color: 0xb026ff,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const portalEnergy = new THREE.Mesh(portalEnergyGeo, portalEnergyMat);
    portalEnergy.position.set(1.5, 2, 0);
    portalGroup.add(portalEnergy);

    // Nether Portal Light
    const portalLight = new THREE.PointLight(0xb026ff, 3, 12);
    portalLight.position.set(1.5, 2, 1);
    portalGroup.add(portalLight);

    // --- 3D Minecraft Character (Jayesh: Bearded Developer Adventurer) ---
    const character = new THREE.Group();
    character.position.set(0, 2.8, 1);
    worldGroup.add(character);

    // Head
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xd49b6a });
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x27170e });
    const beardMat = new THREE.MeshLambertMaterial({ color: 0x1f120a });
    const jacketMat = new THREE.MeshLambertMaterial({ color: 0x065f46 });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const diamondSwordMat = new THREE.MeshLambertMaterial({ color: 0x4deeea });

    const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 1.8, 0);
    head.castShadow = true;
    character.add(head);

    // Hair
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.35, 0.85), hairMat);
    hair.position.set(0, 2.05, 0);
    character.add(hair);

    // Beard
    const beard = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.25, 0.2), beardMat);
    beard.position.set(0, 1.55, 0.35);
    character.add(beard);

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.8, 1.1, 0.4);
    const torso = new THREE.Mesh(torsoGeo, jacketMat);
    torso.position.set(0, 0.9, 0);
    torso.castShadow = true;
    character.add(torso);

    // Right Arm with Diamond Sword
    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.35), jacketMat);
    rightArm.position.set(0.6, 0.85, 0);
    character.add(rightArm);

    // 3D Sword
    const swordBlade = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.1, 0.08), diamondSwordMat);
    swordBlade.position.set(0.6, 0.8, 0.5);
    swordBlade.rotation.x = Math.PI / 4;
    character.add(swordBlade);

    // Left Arm
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.0, 0.35), jacketMat);
    leftArm.position.set(-0.6, 0.85, 0);
    character.add(leftArm);

    // Legs
    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.0, 0.38), pantsMat);
    rightLeg.position.set(0.2, -0.2, 0);
    character.add(rightLeg);

    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.0, 0.38), pantsMat);
    leftLeg.position.set(-0.2, -0.2, 0);
    character.add(leftLeg);

    // --- Floating Clouds & Particle System ---
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 25 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const isRune = Math.random() > 0.5;
      colors[i * 3] = isRune ? 0.7 : 0.3;
      colors[i * 3 + 1] = isRune ? 0.3 : 0.9;
      colors[i * 3 + 2] = isRune ? 1.0 : 0.8;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    sunLight.position.set(15, 25, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // --- Mouse Parallax & Smooth Orbit Controls ---
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

    // --- Animation Loop ---
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.015;

      const progress = scrollRef.current;

      const radius = 22 - progress * 8;
      const angle = progress * Math.PI * 1.6 + mouseX * 0.3;
      const targetCamX = Math.sin(angle) * radius;
      const targetCamZ = Math.cos(angle) * radius;
      const targetCamY = 8 + Math.sin(progress * Math.PI) * 4 - mouseY * 2;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      camera.lookAt(0, 2 + Math.sin(time * 0.5) * 0.2, 0);

      // Character Breathing & Idling
      character.position.y = 2.8 + Math.sin(time * 2) * 0.05;
      head.rotation.y = Math.sin(time * 1.2) * 0.15 + mouseX * 0.2;
      swordBlade.rotation.z = Math.sin(time * 3) * 0.08;

      // Portal Energy Shimmer
      portalEnergy.scale.set(
        1 + Math.sin(time * 4) * 0.03,
        1 + Math.cos(time * 4) * 0.03,
        1
      );
      portalLight.intensity = 2.5 + Math.sin(time * 5) * 1.0;

      // Ambient Floating Particles Drift
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += 0.02;
        if (posArray[i * 3 + 1] > 25) {
          posArray[i * 3 + 1] = -5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Sky & Lighting Shift per Biome
      if (progress > 0.8) {
        if (scene.fog) scene.fog.color.setHex(0x1a062b);
        renderer.setClearColor(0x130221, 1);
        sunLight.color.setHex(0xd946ef);
      } else if (progress > 0.5) {
        if (scene.fog) scene.fog.color.setHex(0x1c1724);
        renderer.setClearColor(0x110f17, 1);
        sunLight.color.setHex(0xf59e0b);
      } else {
        if (scene.fog) scene.fog.color.setHex(0x0e131f);
        renderer.setClearColor(0x0a0f18, 1);
        sunLight.color.setHex(0xfffaed);
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