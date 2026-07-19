import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/data/site";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";

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
            <Link key={item.hash} to={item.to} hash={item.hash} className={styles.navLink}>
              {item.label}
            </Link>
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
          <Link to="/" hash="contato" className="btn-gold">
            Entre em Contato
          </Link>
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
                <Link
                  key={item.hash}
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className={styles.mobileLink}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/"
                hash="contato"
                onClick={() => setOpen(false)}
                className={`btn-gold ${styles.mobileSchedule}`}
              >
                Entre em Contato
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}