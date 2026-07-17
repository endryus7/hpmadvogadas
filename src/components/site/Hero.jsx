import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SCHEDULE_URL, whatsappUrl } from "@/data/site";
import { Monogram } from "./Monogram";
import styles from "./Hero.module.css";

// Se quiser usar a logo real (PNG/SVG transparente) como marca d'água do
// banner, em vez do SVG genérico do Monogram, descomente a linha abaixo e
// troque o bloco indicado mais adiante.
// import logoTransparente from "../../assets/images/logo-hpm-transparente.png";

export function Hero() {
  return (
    <section id="inicio" className={styles.section}>
      <div className={styles.bgWrap}>
        <div className={styles.gradient} />
        <div className={styles.gridPattern} />

        {/* Marca d'água atual (SVG genérico) */}
        <div className={styles.monogramWrap}>
          <Monogram className="h-[520px] w-[820px]" strokeWidth={0.8} />
        </div>

        {/* Para usar a logo real no lugar do SVG acima, troque o bloco de
            cima por este e importe a imagem no topo do arquivo:

        <img
          src={logoTransparente}
          alt=""
          aria-hidden="true"
          className={styles.logoWatermarkImg}
        />
        */}

        <div className={styles.bottomFade} />
      </div>

      <div className={`container-x ${styles.inner}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.content}
        >
          <span className="eyebrow">Advocacia · Porto Alegre / RS</span>
          <h1 className={styles.title}>
            Hermann, Piccoli &{" "}
            <span className="italic-gold">Montezano</span>
            <br />
            Advogadas Associadas
          </h1>
          <span className={`hairline ${styles.hairlineSpacing}`} />
          <p className={styles.description}>
            Atuamos com atendimento humanizado, estratégia jurídica personalizada
            e discrição em cada etapa — para clientes em Porto Alegre e em todo o
            Brasil, presencialmente ou on-line.
          </p>

          <div className={styles.buttons}>
            <a href={SCHEDULE_URL} target="_blank" rel="noreferrer" className="btn-gold">
              Agendar Atendimento
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-outline-gold">
              Fale no WhatsApp
            </a>
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
