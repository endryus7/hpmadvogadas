import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOCIAS } from "@/data/site";
import { SectionTitle } from "./SectionTitle";
import styles from "./Socias.module.css";

function AvatarPlaceholder({ nome }) {
  const initials = nome
    .replace(/^Dra\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div className={styles.avatarWrap}>
      <div className={styles.avatarPattern} />
      <div className={styles.avatarInitialsWrap}>
        <span className={styles.avatarInitials}>{initials}</span>
      </div>
      <div className={styles.avatarFade} />
    </div>
  );
}

export function Socias() {
  return (
    <section id="socias" className={styles.section}>
      <div className="container-x">
        <SectionTitle
          eyebrow="As sócias"
          title={
            <>
              Três advogadas, três áreas de{" "}
              <span className="italic-gold">atuação técnica</span>{" "}
              complementares.
            </>
          }
          description="Conheça as advogadas responsáveis pelo atendimento. Cada uma conduz pessoalmente os casos das suas áreas de especialidade."
        />

        <div className={styles.grid}>
          {SOCIAS.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link
                to="/socias/$slug"
                params={{ slug: s.slug }}
                className={styles.card}
              >
                <AvatarPlaceholder nome={s.nome} />
                <div className={styles.content}>
                  <span className={styles.oab}>{s.oab}</span>
                  <h3 className={styles.name}>{s.nome}</h3>
                  <p className={styles.resumo}>{s.resumo}</p>
                  <span className={styles.verPerfil}>
                    Ver perfil completo
                    <ArrowUpRight className={styles.arrowIcon} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
