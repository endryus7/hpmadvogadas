import { motion } from "framer-motion";
import { SCHEDULE_URL, whatsappUrl } from "@/data/site";
import { Monogram } from "./Monogram";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div className="absolute -right-16 -top-16 text-gold/[0.06]">
        <Monogram className="h-[420px] w-[640px]" strokeWidth={0.8} />
      </div>

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="eyebrow">Vamos conversar</span>
          <h2 className="mt-6 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Descreva sua situação. Retornamos com uma{" "}
            <span className="italic text-gold">análise cuidadosa</span> do próximo
            passo.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={SCHEDULE_URL} target="_blank" rel="noreferrer" className="btn-gold">
              Agendar Atendimento
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-outline-gold">
              Fale no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
