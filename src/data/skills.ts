export interface SkillItem {
  name: string;
  category: string;
  tier: "Common" | "Rare" | "Epic" | "Legendary";
  minecraftItem: string;
  enchantment: string;
  lore: string;
  color: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core Coding Arsenals",
    icon: "Code2",
    color: "#f9a825", // Gold
    skills: [
      {
        name: "Java",
        category: "Programming Languages",
        tier: "Legendary",
        minecraftItem: "Diamond Sword",
        enchantment: "Object-Oriented Mastery V",
        lore: "Primary backend weapon for architecting scalable applications and robust enterprise logic.",
        color: "#f87171"
      },
      {
        name: "Python",
        category: "Programming Languages",
        tier: "Epic",
        minecraftItem: "Enchanted Bow",
        enchantment: "Automation & Vision IV",
        lore: "Versatile script crafting, OpenCV computer vision, and machine learning pipelines.",
        color: "#60a5fa"
      },
      {
        name: "JavaScript",
        category: "Programming Languages",
        tier: "Legendary",
        minecraftItem: "Trident",
        enchantment: "Asynchronous Flow IV",
        lore: "Essential weapon for interactive web frontends and runtime event loops.",
        color: "#fbbf24"
      },
      {
        name: "C++",
        category: "Programming Languages",
        tier: "Rare",
        minecraftItem: "Netherite Pickaxe",
        enchantment: "High Performance III",
        lore: "Low-level resource management and deep algorithmic efficiency.",
        color: "#818cf8"
      },
      {
        name: "C",
        category: "Programming Languages",
        tier: "Rare",
        minecraftItem: "Iron Axe",
        enchantment: "Fundamental Logic III",
        lore: "Foundation of memory structures, pointers, and systems programming.",
        color: "#94a3b8"
      }
    ]
  },
  {
    id: "web",
    title: "Web Technologies",
    subtitle: "Frontend & Backend Crafting",
    icon: "Globe",
    color: "#4deeea", // Diamond
    skills: [
      {
        name: "React.js",
        category: "Web Technologies",
        tier: "Legendary",
        minecraftItem: "Enchanted Book",
        enchantment: "Component Synergy V",
        lore: "Building reactive, high-performance user interfaces with modern component architectures.",
        color: "#38bdf8"
      },
      {
        name: "Node.js",
        category: "Web Technologies",
        tier: "Epic",
        minecraftItem: "Redstone Repeater",
        enchantment: "Event Loop Power IV",
        lore: "Asynchronous backend runtime executing JavaScript outside the browser.",
        color: "#4ade80"
      },
      {
        name: "Express.js",
        category: "Web Technologies",
        tier: "Epic",
        minecraftItem: "Redstone Comparator",
        enchantment: "Middleware Pipeline IV",
        lore: "Minimalist server routing and REST API construction.",
        color: "#e2e8f0"
      },
      {
        name: "REST APIs",
        category: "Web Technologies",
        tier: "Epic",
        minecraftItem: "Ender Pearl",
        enchantment: "Teleport Transport IV",
        lore: "Connecting decoupled client-server ecosystems with structured endpoints.",
        color: "#34d399"
      },
      {
        name: "HTML5",
        category: "Web Technologies",
        tier: "Rare",
        minecraftItem: "Oak Planks",
        enchantment: "Semantic Structure III",
        lore: "The fundamental building blocks of modern web accessibility and documents.",
        color: "#fb923c"
      },
      {
        name: "CSS3",
        category: "Web Technologies",
        tier: "Rare",
        minecraftItem: "Dye Kit & Banner",
        enchantment: "Responsive Styling III",
        lore: "Crafting fluid responsive layouts, animations, and visual polish.",
        color: "#38bdf8"
      }
    ]
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Data Vaults & Schemas",
    icon: "Database",
    color: "#55ff55", // Emerald
    skills: [
      {
        name: "MySQL",
        category: "Databases",
        tier: "Epic",
        minecraftItem: "Ender Chest",
        enchantment: "Relational Indexing IV",
        lore: "Structured relational queries, transactions, and foreign key integrity.",
        color: "#38bdf8"
      },
      {
        name: "Oracle",
        category: "Databases",
        tier: "Rare",
        minecraftItem: "Iron Vault",
        enchantment: "Enterprise Storage III",
        lore: "High-concurrency enterprise data management and PL/SQL operations.",
        color: "#f87171"
      },
      {
        name: "SQL Server",
        category: "Databases",
        tier: "Rare",
        minecraftItem: "Reinforced Chest",
        enchantment: "T-SQL Querying III",
        lore: "Microsoft relational database management and schema architecture.",
        color: "#fbbf24"
      },
      {
        name: "MongoDB",
        category: "Databases",
        tier: "Rare",
        minecraftItem: "Shulker Box",
        enchantment: "Document Flexibility III",
        lore: "NoSQL JSON-like schema design for agile data structures.",
        color: "#4ade80"
      }
    ]
  },
  {
    id: "tools",
    title: "Tools & Ecosystem",
    subtitle: "Developer Inventory",
    icon: "Wrench",
    color: "#a855f7", // Amethyst
    skills: [
      {
        name: "GitHub",
        category: "Tools",
        tier: "Legendary",
        minecraftItem: "Beacon",
        enchantment: "Branch Harmony V",
        lore: "Git version control, collaborative workflows, and repository management.",
        color: "#e2e8f0"
      },
      {
        name: "VS Code",
        category: "Tools",
        tier: "Legendary",
        minecraftItem: "Crafting Table",
        enchantment: "Workspace Optimization V",
        lore: "Primary development IDE configured with linting, debugging, and extensions.",
        color: "#38bdf8"
      },
      {
        name: "Postman",
        category: "Tools",
        tier: "Epic",
        minecraftItem: "Spyglass",
        enchantment: "API Telemetry IV",
        lore: "Comprehensive API inspection, payload testing, and route debugging.",
        color: "#fb923c"
      }
    ]
  },
  {
    id: "concepts",
    title: "Core Concepts & Others",
    subtitle: "Engineering Principles",
    icon: "Brain",
    color: "#ec4899",
    skills: [
      {
        name: "Data Structures & Algorithms (DSA)",
        category: "Concepts",
        tier: "Legendary",
        minecraftItem: "Totem of Undying",
        enchantment: "Optimal Complexity V",
        lore: "Arrays, Linked Lists, Stacks, Queues, Trees, Recursion, and Sorting.",
        color: "#fbbf24"
      },
      {
        name: "Object-Oriented Programming (OOP)",
        category: "Concepts",
        tier: "Legendary",
        minecraftItem: "Enchanted Golden Apple",
        enchantment: "Encapsulation & Polymorphism V",
        lore: "Clean inheritance, abstraction, and reusable architectural design.",
        color: "#4ade80"
      },
      {
        name: "Responsive Web Design",
        category: "Concepts",
        tier: "Epic",
        minecraftItem: "Clock",
        enchantment: "Adaptive Viewport IV",
        lore: "Fluid typography, grid systems, and mobile-first aesthetics.",
        color: "#38bdf8"
      },
      {
        name: "Debugging & Optimization",
        category: "Concepts",
        tier: "Epic",
        minecraftItem: "Flint & Steel",
        enchantment: "Bug Extinguisher IV",
        lore: "Root-cause analysis, performance profiling, and memory leak tracing.",
        color: "#f87171"
      },
      {
        name: "Basic Networking",
        category: "Others",
        tier: "Rare",
        minecraftItem: "Redstone Wire",
        enchantment: "Packet Routing III",
        lore: "TCP/IP, HTTP/HTTPS protocols, DNS resolution, and client-server handshakes.",
        color: "#a855f7"
      },
      {
        name: "Excel & Power BI",
        category: "Others",
        tier: "Rare",
        minecraftItem: "Cartography Table",
        enchantment: "Data Analytics III",
        lore: "Data aggregation, dashboards, formulas, and visual reporting.",
        color: "#10b981"
      }
    ]
  }
];
