import { motion } from "framer-motion";
import { whatsappUrl, useSectionLink } from "@/data/site";
import { Monogram } from "./Monogram";
import styles from "./CTA.module.css";

export function CTA() {
  const goTo = useSectionLink();

  return (
    <section className={styles.section}>
      <div className={styles.monogramWrap}>
        <Monogram className="h-[420px] w-[640px]" strokeWidth={0.8} />
      </div>

      <div className={`container-x ${styles.inner}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          <span className="eyebrow">Vamos conversar</span>
          <h2 className={styles.title}>
            Descreva sua situação. Retornamos com uma{" "}
            <span className="italic-gold">análise cuidadosa</span> do próximo
            passo.
          </h2>
          <div className={styles.buttons}>
            <a href="/#contato" onClick={goTo("contato")} className="btn-gold">
              Entre em Contato
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