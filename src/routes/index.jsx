import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Sobre } from "@/components/site/Sobre";
import { Socias } from "@/components/site/Socias";
import { AreasAtuacao } from "@/components/site/AreasAtuacao";
import { ComoFunciona } from "@/components/site/ComoFunciona";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ property: "og:url", content: "/" }],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Socias />
        <AreasAtuacao />
        <ComoFunciona />
        <FAQ />
        <CTA />
        <Contato />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
