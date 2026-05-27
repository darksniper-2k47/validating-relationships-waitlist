import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Hook from "@/components/hook";
import Framework from "@/components/framework";
import Chapters from "@/components/chapters";
import Showcase from "@/components/showcase";
import LevelAudit from "@/components/level-audit";
import Author from "@/components/author";
import PullQuote from "@/components/pull-quote";
import WaitlistForm from "@/components/waitlist-form";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";
import MobileCTA from "@/components/mobile-cta";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Hook />
        <Framework />
        <Chapters />
        <Showcase />
        <LevelAudit />
        <Author />
        <PullQuote />
        <WaitlistForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
