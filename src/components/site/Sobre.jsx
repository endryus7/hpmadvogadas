import { motion } from "framer-motion";
import { HeartHandshake, Target, Lock, Globe2 } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import styles from "./Sobre.module.css";

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
    <section id="sobre" className={styles.section}>
      <div className={`container-x ${styles.container}`}>
        <SectionTitle
          eyebrow="Sobre o escritório"
          title={
            <>
              Um escritório novo,{" "}
              <span className="italic-gold">construído sobre</span>{" "}
              relações de confiança.
            </>
          }
          description={
            <>
              O Hermann, Piccoli & Montezano é fundado por três advogadas associadas, com atuação centrada no cliente. Mais do que prestar serviços jurídicos, buscamos construir vínculos de confiançaoferecendo escuta cuidadosa, análise técnica e acompanhamento próximo em cada etapa do caso.
            </>
          }
        />

        {/* Grade com cards de pilares, cada um animando a entrada  */}
        <div className={styles.grid}>
          {PILARES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={styles.card}
            >
              <p.icon className={styles.icon} strokeWidth={1.4} />
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.text}>{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
