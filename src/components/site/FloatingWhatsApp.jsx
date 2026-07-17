import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/site";
import styles from "./FloatingWhatsApp.module.css";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={styles.button}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
      <span className={styles.ping} />
    </a>
  );
}
