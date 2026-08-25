export interface ExperienceQuest {
  role: string;
  company: string;
  badge: string;
  status: "QUEST COMPLETED ✓";
  location: string;
  responsibilities: {
    id: string;
    text: string;
    icon: string;
    questNote: string;
  }[];
}

export const EXPERIENCE_DATA: ExperienceQuest = {
  role: "Java Web Developer Intern",
  company: "Code Alpha",
  badge: "Quest Completed",
  status: "QUEST COMPLETED ✓",
  location: "Remote / Internship",
  responsibilities: [
    {
      id: "resp-1",
      text: "Built responsive web applications using Java-based technologies and frontend tools.",
      icon: "Layout",
      questNote: "Architected responsive interfaces across modern screen viewports."
    },
    {
      id: "resp-2",
      text: "Developed backend functionalities and REST APIs for dynamic web features.",
      icon: "Server",
      questNote: "Engineered scalable endpoints and database interaction logic."
    },
    {
      id: "resp-3",
      text: "Identified and fixed bugs to improve application performance and usability.",
      icon: "Bug",
      questNote: "Conducted root-cause debugging to elevate runtime efficiency."
    },
    {
      id: "resp-4",
      text: "Gained hands-on experience with full-stack development and version control.",
      icon: "GitBranch",
      questNote: "Practiced agile workflows and Git version management."
    }
  ]
};
