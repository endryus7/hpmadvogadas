import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import styles from "./ComoFunciona.module.css";

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
    <section className={styles.section}>
      <div className="container-x">
        <SectionTitle
          eyebrow="Como funciona"
          title="Do primeiro contato ao desfecho do caso"
          align="center"
        />

        <div className={styles.grid}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={styles.step}
            >
              <div className={styles.numberRow}>
                <span className={styles.number}>{s.n}</span>
                <span className={styles.rule} /> {/* Linha fina dourada */}
              </div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
