import { motion } from "framer-motion";
import { AREAS } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function AreasAtuacao() {
  return (
    <section id="areas" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle
          eyebrow="Áreas de atuação"
          title={
            <>
              Sete áreas do direito, com{" "}
              <span className="italic text-gold">profundidade técnica</span> em
              cada uma.
            </>
          }
          description="Atuamos nas áreas em que reunimos formação, experiência e leitura estratégica das particularidades de cada demanda."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-sm border border-border bg-white p-8 transition-all duration-500 hover:border-navy hover:bg-navy"
            >
              <a.icon
                className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110"
                strokeWidth={1.3}
              />
              <h3 className="mt-6 font-serif text-lg text-navy transition-colors group-hover:text-white">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 transition-colors group-hover:text-white/80">
                {a.short}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
