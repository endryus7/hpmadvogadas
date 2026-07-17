import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SCHEDULE_URL, whatsappUrl } from "@/data/site";
import { Monogram } from "./Monogram";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy text-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-2" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(200,166,106,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,166,106,.25) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="absolute -right-24 top-1/3 -translate-y-1/2 text-gold/[0.05]">
          <Monogram className="h-[520px] w-[820px]" strokeWidth={0.8} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
      </div>

      <div className="container-x relative py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="eyebrow">Advocacia · Porto Alegre / RS</span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Hermann, Piccoli &{" "}
            <span className="italic text-gold">Montezano</span>
            <br />
            Advogadas Associadas
          </h1>
          <span className="hairline mt-8" />
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Atuamos com atendimento humanizado, estratégia jurídica personalizada
            e discrição em cada etapa — para clientes em Porto Alegre e em todo o
            Brasil, presencialmente ou on-line.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={SCHEDULE_URL} target="_blank" rel="noreferrer" className="btn-gold">
              Agendar Atendimento
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-outline-gold">
              Fale no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" strokeWidth={1.4} />
      </motion.a>
    </section>
  );
}
