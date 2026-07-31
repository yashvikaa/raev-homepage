import type { Metadata } from "next";
import Hero from "@/components/about/Hero";
import Services from "@/components/about/Services";
import Team from "@/components/about/Team";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us - RAEV",
  description: "Learn more about RAEV and our creative visual solutions.",
};

export default function AboutPage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <Hero />
      <Services />
      <Team />
      <Footer />
    </main>
  );
}
