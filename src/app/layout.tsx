import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayesh Amundkar | Software Developer Portfolio",
  description:
    "Portfolio of Jayesh Amundkar — Information Technology graduate (CGPA 8.36), software developer, web developer and problem-solving enthusiast.",
  keywords: [
    "Jayesh Amundkar",
    "Software Developer",
    "Web Developer",
    "Java Developer",
    "React",
    "Next.js",
    "Minecraft Developer Portfolio",
    "Information Technology",
    "DSA",
    "Full-Stack Developer"
  ],
  authors: [{ name: "Jayesh Amundkar" }],
  creator: "Jayesh Amundkar",
  openGraph: {
    title: "Jayesh Amundkar | Minecraft-Themed Developer Portfolio",
    description:
      "Explore Jayesh's developer journey across an interactive Minecraft-themed cinematic world featuring projects, skills, and quests.",
    url: "https://portfolio-pxh39lukp-jayesh-amundkar.vercel.app/",
    siteName: "Jayesh Amundkar Portfolio",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayesh Amundkar | Software Developer",
    description: "Software Developer | Web Developer | DSA Enthusiast"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%234deeea%22/><rect x=%2220%22 y=%2220%22 width=%2260%22 height=%2260%22 fill=%22%231a1e27%22/><text x=%2250%22 y=%2262%22 font-size=%2240%22 text-anchor=%22middle%22 fill=%22%2355ff55%22 font-family=%22monospace%22 font-weight=%22bold%22>J</text></svg>" />
      </head>
      <body className="bg-mc-bg text-slate-100 min-h-screen selection:bg-mc-emerald selection:text-black antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
