import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Projects - RAEV",
  description: "Explore projects by RAEV STUDIO.",
};

export default function ProjectsPage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Projects />
      <Footer />
    </main>
  );
}
