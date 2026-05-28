import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Pillars from "@/components/sections/Pillars";
import Services from "@/components/sections/Services";
import CallToAction from "@/components/sections/CallToAction";
import Community from "@/components/sections/Community";
import Leadership from "@/components/sections/Leadership";
import ChurchDirectory from "@/components/sections/ChurchDirectory";
import Donate from "@/components/sections/Donate";
import StayUpdated from "@/components/sections/StayUpdated";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Pillars />
        <Services />
        <CallToAction />
        <Community />
        <Leadership />
        <ChurchDirectory />
        <Donate />
        <StayUpdated />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
