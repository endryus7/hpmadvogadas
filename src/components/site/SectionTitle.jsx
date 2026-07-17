import { motion } from "framer-motion";
import styles from "./SectionTitle.module.css";

export function SectionTitle({ eyebrow, title, description, align = "left" }) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`${styles.wrap} ${isCenter ? styles.center : ""}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      <span className={`hairline ${styles.hairlineSpacing} ${isCenter ? styles.center : ""}`} />
      {description && <p className={styles.description}>{description}</p>}
    </motion.div>
  );
}
