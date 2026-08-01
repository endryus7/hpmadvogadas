import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { NAV, SITE, useSectionLink } from "@/data/site";

import logo from "../../assets/images/logo.webp";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  const goTo = useSectionLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      closeButtonRef.current?.focus();
    } else {
      menuButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleMobileClick = (hash) => (e) => {
    setOpen(false);
    document.body.style.overflow = "";
    goTo(hash)(e);
  };

  return (
    <>
      <motion.header
        initial={{ y: -35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className={`${styles.header} ${scrolled || open ? styles.headerScrolled : ""}`}
      >
        <div className={styles.inner}>
          {/* Logo */}

          <Link to="/" className={styles.logoLink}>
            <img
              src={logo}
              alt="Hermann, Piccoli & Montezano Advogadas Associadas"
              className={styles.logo}
            />
          </Link>

          {/* Menu Desktop */}

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

          {/* Direita */}

          <div className={styles.right}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={styles.instagram}
            >
              <Instagram size={20} strokeWidth={1.7} />
            </a>

            <a href="/#contato" onClick={goTo("contato")} className={styles.cta}>
              <Mail size={16} strokeWidth={1.8} />
              Entre em Contato
            </a>
          </div>

          {/* Mobile */}

          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir Menu"
            aria-expanded={open}
            aria-controls="hpm-mobile-menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <div className={styles.mobileWrapper}>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              id="hpm-mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className={styles.mobileDrawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 220,
              }}
            >
              <div className={styles.mobileHeader}>
                <img src={logo} alt="" className={styles.mobileLogo} />

                <button
                  ref={closeButtonRef}
                  onClick={() => setOpen(false)}
                  className={styles.closeButton}
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className={styles.mobileDescription}>
                Atendimento jurídico especializado em Direito Civil, Previdenciário, Trabalhista,
                Família e demais áreas de atuação do escritório.
              </div>

              <nav className={styles.mobileNav}>
                {NAV.map((item) => (
                  <button
                    key={item.hash}
                    className={styles.mobileLink}
                    onClick={handleMobileClick(item.hash)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className={styles.mobileFooter}>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.mobileInstagram}
                >
                  <Instagram size={18} />
                  Instagram
                </a>

                <button
                  className={styles.mobileButton}
                  onClick={handleMobileClick("contato")}
                >
                  <Mail size={17} strokeWidth={1.8} />
                  Entre em Contato
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}