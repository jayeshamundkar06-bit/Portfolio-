# Jayesh Amundkar — Minecraft-Themed Developer Portfolio

A cinematic, interactive developer portfolio built around a Minecraft-inspired world.

The portfolio presents my journey as a developer through an interactive environment, combining modern web technologies, procedural visuals, animations, sound design, and a structured presentation of my education, technical skills, projects, certifications, and problem-solving experience.

Live Portfolio: https://portfolio-pxh39lukp-jayesh-amundkar.vercel.app/

---

## Overview

This portfolio is designed to be more than a traditional developer website.

Instead of presenting information through conventional sections, the experience is structured as a continuous Minecraft-inspired world. Each area represents a different part of my development journey, allowing visitors to explore my background, technical abilities, projects, achievements, and problem-solving experience through an interactive environment.

The experience progresses from the Overworld to the Nether Portal, with each chapter representing a specific aspect of my profile.

---

## Portfolio Structure

### Hero — Welcome to My World

The entry point of the portfolio features an Overworld-inspired sunrise environment with:

- Animated player character
- Cinematic environment
- Developer status HUD
- Interactive world elements
- Smooth camera and section transitions

### Chapter I — The Enchanted Library

An interactive library section presenting my background and academic journey.

Includes:

- Developer introduction
- Personal background
- Academic history
- SSC: 85%
- HSC: 60%
- B.Sc. IT: 8.36 CGPA from R.J. College

### Chapter II — The Armory & Stable

A Minecraft-inspired inventory system used to present my technical skills.

Skill categories include:

- Programming Languages
- Web Technologies
- Databases
- Development Tools
- Core Concepts

Skills are presented using custom inventory slots, rarity levels, enchantments, and descriptive lore.

### Chapter III — Player Attributes

A Minecraft HUD-inspired developer statistics interface representing my core strengths and technical attributes.

The section focuses on areas such as:

- Problem Solving
- Programming
- Web Development
- Database Management
- Software Development
- Learning and Adaptability

### Chapter IV — Quest Completed

An experience section presented as a Minecraft-inspired bounty board.

Highlights my Java Web Developer internship experience at Code Alpha, including responsibilities, technical exposure, and completed work.

### Chapter V — My Builds & Village

An interactive project showcase featuring:

- Wellify
- Neuro Sketch
- Vigor AI
- Build My PC

Each project includes its purpose, technologies used, key features, and implementation details.

### Chapter VI — Advancements Made

A certification and achievement section presented through Minecraft-inspired advancement cards.

Current certifications include:

- Java Web Developer
- TATA Cybersecurity Analyst
- Generative AI 2026
- AWS to Azure Migration 2026

### Chapter VII — The Dungeon

A dedicated problem-solving section focused on Data Structures and Algorithms.

Includes:

- DSA topics
- Problem-solving experience
- LeetCode profile
- Competitive programming practice

### Chapter VIII — The Nether Portal

The final section provides direct ways to connect with me.

Includes:

- Email contact
- GitHub
- LinkedIn
- Quick email copy functionality
- Interactive portal environment
- Simulated server chat interface

---

## Interactive Features

The portfolio includes several interactive systems designed to make the experience feel like a connected world rather than a collection of static pages.

### Procedural Visual Engine

- Canvas-based environmental effects
- Procedural voxel-inspired visuals
- Dynamic lighting and atmospheric effects
- Animated environments
- Cinematic transitions

### Audio System

A procedural Web Audio API sound engine provides interactive 8-bit-inspired sound effects without relying on external copyrighted audio files.

### Easter Eggs

The portfolio contains hidden interactions and Minecraft-inspired mechanics, including:

- Secret loot chest
- Diamond confetti effect
- Command Block console
- Interactive commands such as `/help`
- Section teleportation using `/tp`
- Item commands such as `/give diamond`

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 |
| Frontend | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | Custom Minecraft-inspired Pixel UI |
| Icons | Lucide Icons |
| Animation | Canvas 2D / 3D Procedural Rendering |
| Visual Effects | Shaders and Canvas-based Effects |
| Audio | Web Audio API |
| Deployment | Vercel |

---

## Project Architecture

The portfolio keeps content separate from presentation through structured TypeScript data modules.

```text
src/
├── data/
│   ├── profile.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── certifications.ts
│   ├── dsa.ts
│   └── easterEggs.ts
│
├── components/
├── app/
└── ...
