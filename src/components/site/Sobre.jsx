import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import sobreFoto from "../../assets/images/sobre-foto.webp";
import styles from "./Sobre.module.css";

export function Sobre() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={`container-x ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.left}>
            <SectionTitle
              eyebrow="Sobre o escritório"
              title={
                <>
                  Um escritório novo,{" "}
                  <span className="italic-gold">
                    construído sobre
                  </span>{" "}
                  relações de confiança.
                </>
              }
              description={
                <>
                  O <strong>Hermann, Piccoli & Montezano Advogadas Associadas</strong> nasceu
                  da união de três advogadas comprometidas com uma atuação técnica,
                  ética e próxima de seus clientes.
                  <br />
                  <br />
                  Acreditamos que cada caso exige uma análise individualizada,
                  comunicação transparente e estratégias jurídicas construídas de
                  acordo com a realidade de cada pessoa ou empresa.
                  <br />
                  <br />
                  Com atendimento presencial em Porto Alegre e atuação on-line em
                  todo o Brasil, buscamos oferecer segurança jurídica,
                  confiança e acompanhamento durante todas as etapas do processo.
                </>
              }
            />
          </div>

          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >
            <img
              src={sobreFoto}
              alt="Sócias do escritório Hermann, Piccoli & Montezano Advogadas Associadas"
              className={styles.image}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}