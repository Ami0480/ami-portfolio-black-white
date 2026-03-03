import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <WorkSection />
    </main>
  );
}
