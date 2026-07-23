import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getSocia, SOCIAS, whatsappUrl, useSectionLink } from "@/data/site";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Monogram } from "@/components/site/Monogram";
import styles from "./SociaDetalhe.module.css";

export const Route = createFileRoute("/socias/$slug")({
  loader: ({ params }) => {
    const socia = getSocia(params.slug);
    if (!socia) throw notFound();
    return { socia };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Sócia não encontrada — HPM Advogadas" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { socia } = loaderData;
    const title = `${socia.nome} — ${socia.papel} | HPM Advogadas`;
    return {
      meta: [
        { title },
        { name: "description", content: socia.bio.slice(0, 160) },
        { property: "og:title", content: title },
        { property: "og:description", content: socia.bio.slice(0, 160) },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/socias/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/socias/${params.slug}` }],
    };
  },
  component: SociaDetalhe,
  notFoundComponent: () => (
    <div className={styles.notFoundWrap}>
      <Navbar />
      <div className={`container-x ${styles.notFoundInner}`}>
        <h1 className={styles.notFoundTitle}>Sócia não encontrada</h1>
        <Link to="/" className={`btn-gold ${styles.notFoundBtn}`}>
          Voltar ao início
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function BigAvatar({ foto, nome }) {
  const initials = nome
    .replace(/^Dra\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  if (foto) {
    return (
      <div className={styles.avatarWrap}>
        <img src={foto} alt={nome} className={styles.avatarPhoto} loading="lazy" />
        <div className={styles.avatarFade} />
      </div>
    );
  }

  return (
    <div className={styles.avatarWrap}>
      <div
        className={styles.avatarPattern}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,166,106,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,166,106,.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className={styles.avatarMonogramWrap}>
        <Monogram className="h-56 w-80" strokeWidth={0.8} />
      </div>
      <div className={styles.avatarInitialsWrap}>
        <span className={styles.avatarInitials}>{initials}</span>
      </div>
      <div className={styles.avatarFade} />
    </div>
  );
}

function SociaDetalhe() {
  const { socia } = Route.useLoaderData();
  const outras = SOCIAS.filter((s) => s.slug !== socia.slug);
  const whatsMsg = `Olá! ${socia.primeiroNome} gostaria de agendar um atendimento.`;
  const goTo = useSectionLink();

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container-x">
          <a href="/#socias" onClick={goTo("socias")} className={styles.backLink}>
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Voltar para as sócias
          </a>

          <div className={styles.profileGrid}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BigAvatar foto={socia.foto} nome={socia.nome} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="eyebrow">{socia.oab}</span>
              <h1 className={styles.name}>{socia.nome}</h1>
              <p className={styles.role}>{socia.papel}</p>
              <span className={`hairline ${styles.hairlineSpacing}`} />

              <p className={styles.bio}>{socia.bio}</p>

              <div className={styles.areasBlock}>
                <h2 className={styles.areasTitle}>Áreas de atuação</h2>
                <div className={styles.tagsList}>
                  {socia.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  href={whatsappUrl(whatsMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  Falar com {socia.nome.replace(/^Dra\.\s*/, "Dra. ").split(" ").slice(0, 2).join(" ")}
                </a>
              </div>
            </motion.div>
          </div>

          <section className={styles.othersSection}>
            <span className="eyebrow">Outras sócias</span>
            <div className={styles.othersGrid}>
              {outras.map((o) => (
                <Link
                  key={o.slug}
                  to="/socias/$slug"
                  params={{ slug: o.slug }}
                  className={styles.otherCard}
                >
                  {o.foto ? (
                    <img src={o.foto} alt={o.nome} className={styles.otherAvatar} />
                  ) : (
                    <div className={styles.otherAvatarFallback}>
                      {o.nome
                        .replace(/^Dra\.\s*/i, "")
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <p className={styles.otherOab}>{o.oab}</p>
                    <h3 className={styles.otherName}>{o.nome}</h3>
                    <p className={styles.otherResumo}>{o.resumo}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}