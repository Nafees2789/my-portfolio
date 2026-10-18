import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";
import { Intro } from "@/components/intro";
import { Nav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { SpotlightTracker } from "@/components/ui/fx";

export default function Home() {
  return (
    <>
      <Intro />
      <SpotlightTracker />
      <Nav />
      <CommandMenu />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
