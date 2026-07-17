import { motion } from "framer-motion";
import { AREAS } from "@/data/site";
import { SectionTitle } from "./SectionTitle";
import styles from "./AreasAtuacao.module.css";

export function AreasAtuacao() {
  return (
    <section id="areas" className={styles.section}>
      <div className="container-x">
        <SectionTitle
          eyebrow="Áreas de atuação"
          title={
            <>
              Sete áreas do direito, com{" "}
              <span className="italic-gold">profundidade técnica</span> em
              cada uma.
            </>
          }
          description="Atuamos nas áreas em que reunimos formação, experiência e leitura estratégica das particularidades de cada demanda."
        />

        <div className={styles.grid}>
          {AREAS.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={styles.card}
            >
              <a.icon className={styles.icon} strokeWidth={1.3} />
              <h3 className={styles.title}>{a.title}</h3>
              <p className={styles.text}>{a.short}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
