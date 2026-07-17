import CommandPalette from "@/components/nav/CommandPalette";
import HeroIntro from "@/components/sections/HeroIntro";
import Statement from "@/components/sections/Statement";
import Impact from "@/components/sections/Impact";
import Services from "@/components/sections/Services";
import Principles from "@/components/sections/Principles";
import Journey from "@/components/sections/Journey";
import Talks from "@/components/sections/Talks";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <CommandPalette />
      <main>
        <HeroIntro />
        <Statement />
        <Impact />
        <Services />
        <Principles />
        <Journey />
        <Talks />
        <Footer />
      </main>
    </>
  );
}
