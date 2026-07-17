import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gold-soft"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/40" />
    </a>
  );
}
