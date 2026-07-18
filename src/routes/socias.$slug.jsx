import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getSocia, SOCIAS, whatsappUrl } from "@/data/site";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Monogram } from "@/components/site/Monogram";

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
    <div className="min-h-screen">
      <Navbar />
      <div className="container-x pt-40 pb-24 text-center">
        <h1 className="font-serif text-3xl text-navy">Sócia não encontrada</h1>
        <Link to="/" className="btn-gold mt-8 inline-flex">Voltar ao início</Link>
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
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-navy">
        <img
          src={foto}
          alt={nome}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-navy">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,166,106,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,166,106,.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -right-6 -top-6 text-gold/10">
        <Monogram className="h-56 w-80" strokeWidth={0.8} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif italic text-8xl text-gold/80">{initials}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
    </div>
  );
}

function SociaDetalhe() {
  const { socia } = Route.useLoaderData();
  const outras = SOCIAS.filter((s) => s.slug !== socia.slug);
  const whatsMsg = `Olá! Gostaria de falar com a ${socia.nome} sobre um atendimento.`;

  return (
    <>
      <Navbar />
      <main className="bg-white pt-32">
        <div className="container-x">
          <Link
            to="/"
            hash="socias"
            className="inline-flex items-center gap-2 text-sm text-navy/70 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Voltar para as sócias
          </Link>

          <div className="mt-10 grid gap-12 pb-24 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
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
              <h1 className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">
                {socia.nome}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-gold">
                {socia.papel}
              </p>
              <span className="hairline mt-8" />

              <p className="mt-8 text-base leading-relaxed text-ink/85">{socia.bio}</p>

              <div className="mt-10">
                <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-navy/70">
                  Áreas de atuação
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socia.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-navy/15 bg-paper px-3.5 py-1.5 text-xs text-navy"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl(whatsMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  Falar com {socia.nome.replace(/^Dra\.\s*/, "Dra. ").split(" ").slice(0, 2).join(" ")}
                </a>
                <a href="/#contato" className="btn-ghost-navy">
                  Entre em Contato
                </a>
              </div>
            </motion.div>
          </div>

          <section className="border-t border-border py-20">
            <span className="eyebrow">Outras sócias</span>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {outras.map((o) => {
                return (
                  <Link
                    key={o.slug}
                    to="/socias/$slug"
                    params={{ slug: o.slug }}
                    className="group flex items-start gap-5 rounded-sm border border-border p-6 transition-all hover:border-gold hover:shadow-md"
                  >
                    {o.foto ? (
                      <img
                        src={o.foto}
                        alt={o.nome}
                        className="h-16 w-16 shrink-0 rounded-sm object-cover object-top"
                      />
                    ) : (
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-sm bg-navy font-serif italic text-2xl text-gold">
                        {o.nome
                          .replace(/^Dra\.\s*/i, "")
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                        {o.oab}
                      </p>
                      <h3 className="mt-1 font-serif text-lg text-navy group-hover:text-gold">
                        {o.nome}
                      </h3>
                      <p className="mt-2 text-sm text-ink/70">{o.resumo}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}