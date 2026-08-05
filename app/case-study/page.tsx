import type { Metadata } from "next";
import Hero from "@/components/case-studies/Hero";
import CaseGrid from "@/components/case-studies/CaseGrid";
import Process from "@/components/case-studies/Process";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Case Studies - RAEV",
  description: "Explore in-depth case studies and creative visual solutions by RAEV.",
};

export default function CaseStudyPage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Hero />
      <CaseGrid />
      <Process />
      <Footer />
    </main>
  );
}
