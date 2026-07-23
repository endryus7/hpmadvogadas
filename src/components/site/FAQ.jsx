import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
// Importa o array FAQ e renomeia para ITEMS
import { FAQ as ITEMS } from "@/data/site";
import { SectionTitle } from "./SectionTitle";
import styles from "./FAQ.module.css";

export function FAQ() {
  const [open, setOpen] = useState(0); // Guarda o ÍNDICE da pergunta aberta
  return (
    <section className={styles.section}>
      <div className={`container-x ${styles.grid}`}>
        <SectionTitle
          eyebrow="Dúvidas frequentes"
          title="O que costumam nos perguntar antes do primeiro contato"
        />

        <div className={styles.list}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)} // Clicar na pergunta já aberta fecha ela (vira null) e fechada abre ela (vira o índice i);
                  className={styles.itemButton}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{item.q}</span> {/* + gira 45° (virando um x visualmente) quando a pergunta ta aberta */}
                  <span className={`${styles.iconWrap} ${isOpen ? styles.iconOpen : ""}`}>
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.answerWrap}
                    >
                      <p className={styles.answer}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
