export interface DsaData {
  title: string;
  subtitle: string;
  description: string;
  topics: {
    name: string;
    icon: string;
    mobEncounter: string;
    level: string;
  }[];
  leetcodeUrl: string;
  statusMessage: string;
}

export const DSA_DATA: DsaData = {
  title: "The Dungeon of Algorithms",
  subtitle: "Problem Solving • Data Structures • Algorithms",
  description:
    "Venturing through the deepslate labyrinth to slay algorithmic obstacles. Focused on building optimized time and space complexity solutions in Java, C++, and Python.",
  leetcodeUrl: "https://leetcode.com/", // Configurable profile URL
  statusMessage: "Conquering new algorithmic problems daily. Ready for competitive and technical interviews.",
  topics: [
    {
      name: "Arrays & Strings",
      icon: "Grid",
      mobEncounter: "Zombie Horde",
      level: "Two Pointers & Sliding Window"
    },
    {
      name: "Linked Lists & Stacks",
      icon: "Layers",
      mobEncounter: "Skeleton Archer",
      level: "Pointers & LIFO/FIFO Traversal"
    },
    {
      name: "Trees & Graphs",
      icon: "GitFork",
      mobEncounter: "Ender Dragon Lair",
      level: "DFS, BFS & Recursion"
    },
    {
      name: "Searching & Sorting",
      icon: "Binary",
      mobEncounter: "Creeper Ambush",
      level: "Binary Search & Divide/Conquer"
    }
  ]
};
