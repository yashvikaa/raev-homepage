import type { Metadata } from "next";
import Project1 from "@/components/project-showcase/Project1";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Project Showcase - RAEV",
  description: "Explore our project showcase and creative work.",
};

export default function ProjectShowcasePage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Project1 />
      <Footer />
    </main>
  );
}
