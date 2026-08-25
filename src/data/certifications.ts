export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  advancementType: "Challenge" | "Goal" | "Task";
  minecraftIcon: string;
  xpPoints: number;
  description: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-java",
    title: "Certified Java Web Developer",
    issuer: "Authorized Certification Authority",
    advancementType: "Challenge",
    minecraftIcon: "DiamondSword",
    xpPoints: 100,
    description: "Demonstrated proficiency in Java core concepts, OOP design, web architectures, and server-side components."
  },
  {
    id: "cert-cybersecurity",
    title: "TATA Cybersecurity Analyst",
    issuer: "Forage",
    advancementType: "Goal",
    minecraftIcon: "Shield",
    xpPoints: 75,
    description: "Completed practical security simulation analyzing vulnerability vectors, threat mitigation, and access control."
  },
  {
    id: "cert-genai",
    title: "Generative AI",
    issuer: "LinkedIn Learning",
    year: "2026",
    advancementType: "Task",
    minecraftIcon: "Sparkles",
    xpPoints: 50,
    description: "Trained in generative artificial intelligence foundations, prompt engineering patterns, and LLM applications."
  },
  {
    id: "cert-cloud-migration",
    title: "Migration from Amazon Web Services to Microsoft Azure",
    issuer: "Microsoft Learn",
    year: "2026",
    advancementType: "Challenge",
    minecraftIcon: "Cloud",
    xpPoints: 85,
    description: "Trained in cloud migration strategies, architectural mapping from AWS services to Azure cloud infrastructures."
  }
];
