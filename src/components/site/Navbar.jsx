import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SCHEDULE_URL, SITE } from "@/data/site";
import { Monogram } from "./Monogram";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="text-gold">
            <Monogram className="h-10 w-16" strokeWidth={1.25} />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-base">Hermann, Piccoli & Montezano</span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Advogadas Associadas
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/85 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram do escritório"
            className="text-white/80 transition-colors hover:text-gold"
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a href={SCHEDULE_URL} target="_blank" rel="noreferrer" className="btn-gold">
            Agendar Atendimento
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-navy/98 backdrop-blur-md"
          >
            <div className="container-x flex flex-col gap-4 py-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white/85 hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={SCHEDULE_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-gold mt-2 self-start"
              >
                Agendar Atendimento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
