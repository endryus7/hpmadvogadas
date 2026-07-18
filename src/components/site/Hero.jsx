import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Scale,
  Lock,
} from "lucide-react";
import { SCHEDULE_URL, whatsappUrl } from "@/data/site";
import { Monogram } from "./Monogram";
import styles from "./Hero.module.css";
import heroFoto from "../../assets/images/hero-foto.png";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Atendimento Personalizado" },
  { icon: Scale, label: "Excelência Técnica" },
  { icon: Lock, label: "Sigilo e Confiança" },
];

export function Hero() {
  return (
    <section id="inicio" className={styles.section}>
      {/* Camada de fundo: gradiente escuro que cobre o Hero inteiro */}
      <div className={styles.bgWrap}>
        <div className={styles.gradient} />
        <div className={styles.gridPattern} />
        <div className={styles.bottomFade} />
      </div>

      {/* Banner de foto: ocupa 100% da altura do Hero, do lado direito,
          igual a uma foto de capa. Independente da altura do texto. */}
      <div className={styles.photoBanner} aria-hidden="true">
        {heroFoto ? (
          <img src={heroFoto} alt="" className={styles.photoImg} />
        ) : (
          <div className={styles.photoFallback}>
            <Monogram className="h-[420px] w-[640px]" strokeWidth={0.7} />
          </div>
        )}
        <div className={styles.photoFade} />
      </div>

      <div className={`container-x ${styles.layout}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.content}
        >
          <span className="eyebrow">Advocacia · Porto Alegre / RS</span>
          <h1 className={styles.title}>
            Hermann, Piccoli &{" "}
            Montezano
            <br />
            <span className="italic-gold">Advogadas Associadas</span>
          </h1>
          <span className={`hairline ${styles.hairlineSpacing}`} />

          <p className={styles.tagline}>
            Estratégia, experiência e compromisso em defesa dos{" "}
            <span className="italic-gold">seus direitos</span>.
          </p>

          <p className={styles.description}>
            Atuamos com atendimento humanizado, estratégia jurídica personalizada
            e discrição em cada etapa — para clientes em Porto Alegre e em todo o Brasil, presencialmente ou on-line.
          </p>

          <div className={styles.buttons}>
            <a href={SCHEDULE_URL} target="_blank" rel="noreferrer" className="btn-gold">
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              Agendar Atendimento
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-outline-gold">
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Fale no WhatsApp
            </a>
          </div>

          <div className={styles.badges}>
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className={styles.badge}>
                <Icon className={styles.badgeIcon} strokeWidth={1.4} />
                <span className={styles.badgeLabel}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className={styles.scrollLink}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" strokeWidth={1.4} />
      </motion.a>
    </section>
  );
}