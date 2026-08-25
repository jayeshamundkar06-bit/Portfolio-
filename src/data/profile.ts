export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  year: string;
  location?: string;
  iconName: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitles: string[];
  roles: string[];
  bioHero: string;
  aboutParagraphs: string[];
  email: string;
  location: string;
  coordinates: string; // Minecraft style XYZ coordinates
  github: string;
  linkedin: string;
  portfolioUrl: string;
  education: EducationItem[];
  strengths: {
    title: string;
    description: string;
    minecraftBuff: string;
    attribute: string;
    icon: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Jayesh Amundkar",
  title: "Software Developer | Web Developer | DSA Enthusiast",
  subtitles: [
    "Software Developer",
    "Web Developer",
    "Java Developer",
    "Problem Solver",
    "DSA Enthusiast",
    "Full-Stack Developer"
  ],
  roles: [
    "Software Developer",
    "Web Developer",
    "Java Developer",
    "Full-Stack Developer",
    "DSA Enthusiast"
  ],
  bioHero: "Third-year Information Technology student passionate about software development, web technologies, and problem solving.",
  aboutParagraphs: [
    "I am a passionate and dedicated third-year Information Technology student with a strong interest in software development, web technologies, and problem-solving.",
    "I have built a solid foundation through academic projects, online courses, and self-learning.",
    "I am eager to apply my technical skills in a real-world environment and contribute meaningfully to a team.",
    "I am curious, detail-oriented, and always excited to explore new tools, languages, and technologies."
  ],
  email: "jayesh.amundkar06@gmail.com",
  location: "Mumbai, Maharashtra, India",
  coordinates: "X: 19.0760 | Y: 64 | Z: 72.8777 (Overworld - Mumbai)",
  github: "https://github.com/jayeshamundkar06-bit",
  linkedin: "https://www.linkedin.com/in/jayeshamundkar/",
  portfolioUrl: "https://portfolio-pxh39lukp-jayesh-amundkar.vercel.app/",
  education: [
    {
      institution: "Ramniranjan Jhunjhunwala College",
      degree: "Bachelor of Science in Information Technology (B.Sc.IT)",
      score: "CGPA — 8.36",
      year: "Currently in 3rd Year",
      location: "Mumbai",
      iconName: "Scroll",
      description: "Focusing on Software Engineering, Data Structures, Web Development, and Database Systems."
    },
    {
      institution: "PVG Vidya Bhawan College",
      degree: "Higher Secondary Certificate (HSC)",
      score: "60%",
      year: "2023",
      location: "Mumbai",
      iconName: "Map",
      description: "Science & Information Technology stream."
    },
    {
      institution: "R.N. Gandhi High School",
      degree: "Secondary School Certificate (SSC)",
      score: "85%",
      year: "2020",
      location: "Mumbai",
      iconName: "Compass",
      description: "Foundation in mathematics, sciences, and analytical thinking."
    }
  ],
  strengths: [
    {
      title: "Eager to Learn & Explore",
      description: "Constantly expanding knowledge across new programming languages, frameworks, and tools.",
      minecraftBuff: "Experience Boost V",
      attribute: "+50% Knowledge Acquisition",
      icon: "Sparkles"
    },
    {
      title: "Strong Problem-Solving Skills",
      description: "Analytical mindset breaking down complex computational problems and algorithmic challenges.",
      minecraftBuff: "Sharpness VI",
      attribute: "+100% Critical Logic",
      icon: "Swords"
    },
    {
      title: "Team Player & Communicator",
      description: "Effective communication and collaborative spirit for seamless team integration and progress.",
      minecraftBuff: "Beacon Aura of Harmony",
      attribute: "+100% Synergy",
      icon: "Users"
    },
    {
      title: "Quick Adaptation",
      description: "Rapidly adjusts to new environments, codebases, workflows, and modern software paradigms.",
      minecraftBuff: "Swiftness & Agility IV",
      attribute: "+75% Adaptation Speed",
      icon: "Zap"
    }
  ]
};
