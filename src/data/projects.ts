export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  minecraftBuilding: string;
  minecraftBiome: string;
  icon: string;
  tags: string[];
  features: string[];
  technologies: string[];
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  disclaimer?: string;
  lore: string;
  details: {
    overview: string;
    architecture: string;
    keyDeliverables: string[];
  };
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "wellify",
    title: "WELLIFY",
    subtitle: "Disease Prediction Web App",
    tagline: "Educational symptom analysis and predictive probability engine",
    description:
      "Built an educational web app using HTML, CSS, and JavaScript to predict diseases based on user-selected symptoms. Analyses 18 symptoms and predicts the top three possible conditions with confidence scores.",
    minecraftBuilding: "Alchemist's Laboratory & Brewing Sanctum",
    minecraftBiome: "Witch Hut / Forest Laboratory",
    icon: "FlaskConical",
    tags: ["HTML5", "CSS3", "JavaScript", "Algorithms", "Heuristics"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Confidence Scoring", "Responsive UI"],
    accentColor: "#55ff55", // Emerald
    githubUrl: "https://github.com/jayeshamundkar06-bit",
    disclaimer: "Educational demonstration model — strictly for academic demonstration and learning.",
    lore: "Equipped with brewing stands and enchanted potion cauldrons to synthesize symptom reagents into probability assessments.",
    features: [
      "Dynamic 18-symptom multi-selection matrix",
      "Confidence-weighted probabilistic scoring model",
      "Top-3 predicted condition breakdown with certainty percentages",
      "Fast client-side evaluation without latency"
    ],
    details: {
      overview:
        "Wellify demonstrates algorithmic classification logic on the frontend. It allows users to pick symptoms from a curated list of 18 conditions and computes matching probability scores.",
      architecture:
        "Lightweight vanilla JavaScript event pipeline with modular heuristic evaluation functions and responsive styling.",
      keyDeliverables: [
        "Interactive symptom checklist with real-time state management",
        "Probability algorithm ranking top 3 matching conditions",
        "Accessible, responsive layout"
      ]
    }
  },
  {
    id: "neuro-sketch",
    title: "NEURO SKETCH",
    subtitle: "Air Drawing Tool",
    tagline: "Real-time AI gesture-controlled canvas powered by computer vision",
    description:
      "Built a real-time virtual drawing tool using Python, OpenCV, and MediaPipe with webcam. Enabled drawing using index finger tracking with smooth rendering. Included gesture-based canvas clearing functionality.",
    minecraftBuilding: "Enchanted Art Sanctum & Rune Chamber",
    minecraftBiome: "Amethyst Geode / Sorcerer Tower",
    icon: "Sparkles",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "AI/ML"],
    technologies: ["Python 3", "OpenCV", "MediaPipe", "NumPy", "Real-Time Image Processing"],
    accentColor: "#a855f7", // Amethyst / Purple
    githubUrl: "https://github.com/jayeshamundkar06-bit",
    lore: "Harnessing ancient rune glyphs and particle trails, the user conjures glowing sketches directly in mid-air.",
    features: [
      "High-precision 21-landmark hand tracking via MediaPipe",
      "Smooth index finger stroke interpolation with customizable brush palettes",
      "Gesture-based canvas clear & tool toggle triggers",
      "Low-latency real-time video stream overlay at 30+ FPS"
    ],
    details: {
      overview:
        "Neuro Sketch creates a seamless touchless drawing experience using consumer webcams. It tracks hand landmarks to detect pointing gestures, allowing artists to draw freely in the air.",
      architecture:
        "OpenCV webcam capture pipeline integrated with MediaPipe Hands estimation. Spatial coordinates are smoothed using historical point buffers and overlaid on dynamic canvas layers.",
      keyDeliverables: [
        "Real-time finger tip tracking with jitter reduction",
        "Gesture recognizer for erasing and color switching",
        "Optimized frame loop for high framerates"
      ]
    }
  },
  {
    id: "vigor-ai",
    title: "VIGOR AI",
    subtitle: "Fitness App",
    tagline: "Cross-platform intelligent fitness tracker with AI body evaluations",
    description:
      "Developed a cross-platform fitness application using React Native, TypeScript, and Sency SMIT SDK for iOS and Android. Integrated Sency ML SDK to enable AI-powered fitness assessments and tracking. Implemented interactive 360° body evaluations.",
    minecraftBuilding: "Warrior Training Colosseum & Arena",
    minecraftBiome: "Desert Arena / Fortress Citadel",
    icon: "Activity",
    tags: ["React Native", "TypeScript", "Sency SDK", "iOS", "Android", "Mobile ML"],
    technologies: ["React Native", "TypeScript", "Sency SMIT SDK", "Sency ML SDK", "Cross-Platform Mobile"],
    accentColor: "#f9a825", // Gold
    githubUrl: "https://github.com/jayeshamundkar06-bit",
    lore: "A battle-hardened training arena where warriors hone their agility and endurance with precise movement feedback.",
    features: [
      "Cross-platform mobile UI architecture for iOS & Android",
      "Integration with Sency ML SDK for motion analysis & rep counting",
      "Interactive 360° body posture and mobility evaluation workflow",
      "Personalized workout assessment telemetry and tracking"
    ],
    details: {
      overview:
        "Vigor AI brings automated personal training into users' pockets. By pairing React Native with advanced Computer Vision ML SDKs, it evaluates workout form and tracks repetition counts in real time.",
      architecture:
        "React Native frontend with TypeScript type safety, leveraging native bridge modules for hardware-accelerated ML inference via Sency SDK.",
      keyDeliverables: [
        "Native camera streaming and pose tracking bridge",
        "Intuitive fitness assessment UI with real-time visual feedback",
        "Cross-platform compatibility for both iOS and Android"
      ]
    }
  },
  {
    id: "build-my-pc",
    title: "BUILD MY PC",
    subtitle: "PC Builder / E-Commerce Platform",
    tagline: "Smart e-commerce suite with 3D visualization and compatibility engine",
    description:
      "Built a premium e-commerce platform that empowers users to design custom computers. It features an interactive 3D build visualizer, real-time compatibility checking, and smart auto-budget suggestions based on budget and persona. Built with React and Node.js, it offers a seamless, modern UI.",
    minecraftBuilding: "Master Blacksmith Forge & Redstone Workshop",
    minecraftBiome: "Mountain Forge / Dwarven Stronghold",
    icon: "Cpu",
    tags: ["React", "Node.js", "3D Visualizer", "Full-Stack", "Compatibility Logic"],
    technologies: ["React.js", "Node.js", "Express.js", "3D Canvas", "RESTful API", "Tailwind CSS"],
    accentColor: "#4deeea", // Diamond Blue
    githubUrl: "https://github.com/jayeshamundkar06-bit",
    lore: "The high-tier forge where motherboard substrates, GPU redstone cores, and memory crystals are forged into legendary computing rigs.",
    features: [
      "Interactive 3D PC Component Visualizer & customizer",
      "Real-time socket, wattage & dimensional compatibility validator",
      "Smart Auto-Budget generator tailored to gamer, creator, or developer personas",
      "Full-stack architecture with modular REST API and inventory management"
    ],
    details: {
      overview:
        "Build My PC simplifies the process of assembling desktop computers. It prevents hardware mismatch errors by continuously evaluating TDP, physical clearance, socket types, and PCIe generations.",
      architecture:
        "React frontend coupled with an Express/Node.js backend. Features state-managed compatibility matrices and 3D visual preview modules.",
      keyDeliverables: [
        "Dynamic component selector with live compatibility validation",
        "Budget-optimizer algorithm matching components to user budget",
        "E-commerce cart, specs summary, and responsive checkout interface"
      ]
    }
  }
];
