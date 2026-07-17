import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ as ITEMS } from "@/data/site";
import { SectionTitle } from "./SectionTitle";
import styles from "./FAQ.module.css";

export function FAQ() {
  const [open, setOpen] = useState(0);
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
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={styles.itemButton}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{item.q}</span>
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
