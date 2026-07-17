import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

const STEPS = [
  {
    n: "01",
    title: "Contato",
    text: "Primeiro contato por WhatsApp, telefone, formulário ou agenda on-line.",
  },
  {
    n: "02",
    title: "Análise do caso",
    text: "Reunião para entender a situação, avaliar documentos e identificar caminhos.",
  },
  {
    n: "03",
    title: "Estratégia",
    text: "Definição da abordagem jurídica adequada, com transparência sobre prazos e honorários.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    text: "Condução do caso com comunicação próxima em cada etapa do processo.",
  },
];

export function ComoFunciona() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle
          eyebrow="Como funciona"
          title="Do primeiro contato ao desfecho do caso"
          align="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl italic text-gold">{s.n}</span>
                <span className="h-px flex-1 bg-gold/40" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
