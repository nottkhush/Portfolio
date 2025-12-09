// app/page.tsx
import HomePage from "@/modules/HomePage";
import AboutPage from "@/modules/AboutPage";
import SkillsAndStack from "@/modules/Skills&Stack";
import Experience from "@/modules/Experience";
import Projects from "@/modules/Projects";
import Contact from "@/modules/Contact";
import { ScrollSmoothProvider } from "@/wrappers/SmoothScroller";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <ScrollSmoothProvider>
      <Navbar />
      <main
        id="scroll-container"
        className={`
          h-screen w-full overflow-y-auto scrollbar-hide
          md:snap-y md:snap-mandatory md:snap-scroll md:scroll-smooth
        `}
        role="region"
        aria-label="Main content"
      >
        {/* Normal stacked layout on mobile, full-screen snap on md+ */}
        <div className="min-h-screen md:h-screen md:snap-start">
          <HomePage />
        </div>

        <div className="min-h-screen md:h-screen md:snap-start">
          <AboutPage />
        </div>

        <div className="min-h-screen md:h-screen md:snap-start">
          <SkillsAndStack />
        </div>

        <div className="min-h-screen md:h-screen md:snap-start">
          <Experience />
        </div>

        <div className="min-h-screen md:h-screen md:snap-start">
          <Projects />
        </div>

        <div className="min-h-screen md:h-screen md:snap-start">
          <Contact />
        </div>
      </main>
    </ScrollSmoothProvider>
  );
}
