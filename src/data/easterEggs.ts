export interface EasterEggCommand {
  command: string;
  description: string;
  response: string;
}

export const EASTER_EGG_COMMANDS: EasterEggCommand[] = [
  {
    command: "/help",
    description: "Display available Minecraft console commands",
    response: "Available commands: /help, /tp <section>, /give diamond, /skin, /gamemode <0|1>, /clear, /coords, /quote"
  },
  {
    command: "/skin",
    description: "Inspect Jayesh's adventurer skin configuration",
    response: "[Server] Skin: Jayesh Amundkar (Bearded Developer Adventurer) - Level 83 (CGPA 8.36)"
  },
  {
    command: "/give diamond",
    description: "Spawns 64 Diamonds in your inventory",
    response: "[Server] Given [Diamond x64] to Player! *Ding!*"
  },
  {
    command: "/gamemode 1",
    description: "Activate Creative Mode",
    response: "[Server] Set own game mode to Creative Mode. Flying abilities unlocked across the portfolio!"
  },
  {
    command: "/gamemode 0",
    description: "Activate Survival Mode",
    response: "[Server] Set own game mode to Survival Mode. Watch out for creeping bugs!"
  },
  {
    command: "/coords",
    description: "Display current world coordinates",
    response: "[Server] Jayesh's Base: X: 19.0760, Y: 64, Z: 72.8777 (Biome: Mumbai IT Plains)"
  },
  {
    command: "/quote",
    description: "Get a developer wisdom quote",
    response: '"Never dig straight down, and always write unit tests for your crafting recipes."'
  }
];
