import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE, useSectionLink } from "@/data/site";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";

const resetButton = {
  background: "none",
  border: "none",
  font: "inherit",
  textAlign: "left",
  width: "100%",
  cursor: "pointer",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const goTo = useSectionLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled || open ? styles.headerScrolled : ""}`}
    >
      <div className={`container-x ${styles.bar}`}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="Monograma HPM" className={styles.logoImg} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>Hermann, Piccoli & Montezano</span>
            <span className={styles.brandSubtitle}>Advogadas Associadas</span>
          </span>
        </Link>

        <nav className={styles.nav}>
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

        <button
          className={styles.menuButton}
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
            className={styles.mobilePanel}
          >
            <div className={`container-x ${styles.mobileInner}`}>
              {NAV.map((item) => (
                <button
                  key={item.hash}
                  type="button"
                  onClick={(e) => {
                    goTo(item.hash)(e);
                    setOpen(false);
                  }}
                  className={styles.mobileLink}
                  style={resetButton}
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
                style={{ border: "none", cursor: "pointer" }}
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