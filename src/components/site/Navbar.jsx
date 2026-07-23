import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE, useSectionLink } from "@/data/site";
import logo from "../../assets/images/logo.webp";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // menu hambúrguer está aberto ou fechado.
  const goTo = useSectionLink(); // Hook que cuida da rolagem até seção

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20); // Muda o estado "scrolled" quando a pessoa passa de 20px de rolagem
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true }); // Remove o listener quando o componente sai da tela
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // A navbar fica sólida, quando o menu mobile está aberto o menu nunca fica com fundo transparente por cima do conteúdo da página.
    <header className={`${styles.header} ${scrolled || open ? styles.headerScrolled : ""}`}>
      <div className={`container-x ${styles.bar}`}>
        {/* Logo */}
        <Link to="/" className={styles.logoLink}>
          <img
            src={logo}
            alt="Hermann, Piccoli & Montezano Advogadas Associadas"
            className={styles.logoImg}
          />
        </Link>

        {/* Menu de navegação */}
        <nav className={styles.nav}>
          {/* array NAV (data/site.js) para não repetir código pra cada link */}
          {NAV.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              onClick={goTo(item.hash)}
              className={styles.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.rightGroup}>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram do escritório"
            className={styles.instagramLink}
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a href="/#contato" onClick={goTo("contato")} className="btn-gold">
            Entre em Contato
          </a>
        </div>

        {/* Botão menu hambúrguer */}
        <button
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* AnimatePresence permite animar a saida de um elemento do DOM (o Framer Motion sozinho só anima entrada por padrão) */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mobilePanel}
          >
            <div className={`container-x ${styles.mobileInner}`}>
              {NAV.map((item) => (
                <button
                  key={item.hash}
                  type="button"
                  onClick={(e) => {
                    // Fecha o menu primeiro, depois de 300ms faz a rolagem até a seção. O atraso evita que a rolagem aconteça enquanto o painel ainda está encolhendo,
                    setOpen(false);
                    setTimeout(() => {
                      goTo(item.hash)(e);
                    }, 300);
                  }}
                  className={styles.mobileLink}
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={(e) => {
                  goTo("contato")(e);
                  setOpen(false);
                }}
                className={`btn-gold ${styles.mobileSchedule}`}
              >
                Entre em Contato
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
