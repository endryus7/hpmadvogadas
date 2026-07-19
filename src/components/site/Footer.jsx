import { Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AREAS, NAV, SITE, scrollToSection } from "@/data/site";
import { Monogram } from "./Monogram";
import logo from "../../assets/images/logo.png";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.monogramWrap}>
        <Monogram className="h-[360px] w-[560px]" strokeWidth={0.8} />
      </div>

      <div className={`container-x ${styles.grid}`}>
        <div className={styles.gridCol}>
          <div className={styles.logoRow}>
            <img src={logo} alt="Monograma HPM" className={styles.logoImg} />
          </div>
          <p className={styles.brandName}>Hermann, Piccoli & Montezano</p>
          <p className={styles.brandSubtitle}>Advogadas Associadas</p>
          <p className={styles.brandText}>
            Advocacia com atendimento humanizado em Porto Alegre e on-line em
            todo o Brasil.
          </p>
        </div>

        <div className={styles.gridCol}>
          <h4 className={styles.heading}>Navegação</h4>
          <ul className={styles.list}>
            {NAV.map((n) => (
              <li key={n.hash}>
                <Link to={n.to} hash={n.hash} onClick={scrollToSection(n.hash)} className={styles.link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.gridCol}>
          <h4 className={styles.heading}>Áreas</h4>
          <ul className={`${styles.list} ${styles.muted}`}>
            {AREAS.map((a) => (
              <li key={a.slug}>{a.title}</li>
            ))}
          </ul>
        </div>

        <div className={styles.gridCol}>
          <h4 className={styles.heading}>Contato</h4>
          <ul className={`${styles.list} ${styles.muted}`}>
            <li>
              {SITE.address.street}
              <br />
              {SITE.address.district}, {SITE.address.city}
            </li>
            <li>
              <a href={`tel:+${SITE.phoneRaw}`} className={styles.link}>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={styles.link}>
                {SITE.email}
              </a>
            </li>
            <li>{SITE.hours}</li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className={styles.instagramLink}
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container-x ${styles.bottomInner}`}>
          <span>© {year} Hermann, Piccoli & Montezano Advogadas Associadas.</span>
        </div>
      </div>
    </footer>
  );
}