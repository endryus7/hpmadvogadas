import { motion } from "framer-motion";
import { HeartHandshake, Target, Lock, Globe2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

const PILARES = [
  {
    icon: HeartHandshake,
    title: "Atendimento humanizado",
    text: "Escutar antes de aconselhar. Cada caso é conduzido com atenção pessoal, sem intermediários.",
  },
  {
    icon: Target,
    title: "Estratégia personalizada",
    text: "Análise técnica para desenhar o caminho jurídico mais adequado à situação de cada cliente.",
  },
  {
    icon: Lock,
    title: "Sigilo e ética",
    text: "Postura institucional pautada pelo Código de Ética da OAB e pelo respeito à confidencialidade.",
  },
  {
    icon: Globe2,
    title: "Atendimento em todo o Brasil",
    text: "Presencial em Porto Alegre e on-line em qualquer lugar do país, com o mesmo cuidado.",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="relative bg-white py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-start">
        <SectionTitle
          eyebrow="Sobre o escritório"
          title={
            <>
              Um escritório novo,{" "}
              <span className="italic text-gold">construído sobre</span>{" "}
              relações de confiança.
            </>
          }
          description={
            <>
              O Hermann, Piccoli & Montezano é fundado por três advogadas
              associadas, com atuação centrada no cliente. Mais do que prestar
              serviços jurídicos, buscamos construir vínculos de confiança —
              oferecendo escuta cuidadosa, análise técnica e acompanhamento
              próximo em cada etapa do caso.
            </>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {PILARES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-sm border border-border bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-[0_20px_50px_-30px_rgba(17,27,58,0.35)]"
            >
              <p.icon
                className="h-6 w-6 text-gold transition-transform group-hover:scale-110"
                strokeWidth={1.4}
              />
              <h3 className="mt-4 font-serif text-lg text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
