// app/page.tsx
import HomePage from "@/modules/HomePage";
import AboutPage from "@/modules/AboutPage";
import SkillsAndStack from "@/modules/Skills&Stack";
import Experience from "@/modules/Experience";
import Projects from "@/modules/Projects";
import Contact from "@/modules/Contact";


export default function Home() {
  return (
    <>

      <div
        id="scroll-container"
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth scrollbar-hide snap-scroll"
        role="region"
        aria-label="Main content"
      >
        <div className="snap-start h-screen">
          <HomePage />
        </div>

        <div className="snap-start h-screen">
          <AboutPage />
        </div>

        <div className="snap-start h-screen">
          <SkillsAndStack />
        </div>

        <div className="snap-start h-screen">
          <Experience />
        </div>

        <div className="snap-start h-screen">
          <Projects />
        </div>

        <div className="snap-start h-screen">
          <Contact />
        </div>
      </div>
    </>
  );
}

