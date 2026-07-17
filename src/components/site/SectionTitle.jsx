import { motion } from "framer-motion";

export function SectionTitle({ eyebrow, title, description, align = "left" }) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 font-serif text-3xl leading-tight text-navy sm:text-4xl">
        {title}
      </h2>
      <span className={`hairline mt-6 ${isCenter ? "mx-auto" : ""}`} />
      {description && (
        <p className="mt-6 text-base leading-relaxed text-ink/80">{description}</p>
      )}
    </motion.div>
  );
}
