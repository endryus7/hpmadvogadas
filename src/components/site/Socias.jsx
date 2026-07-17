import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOCIAS } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

function AvatarPlaceholder({ nome }) {
  const initials = nome
    .replace(/^Dra\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(200,166,106,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,166,106,.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif italic text-6xl text-gold/80 sm:text-7xl">
          {initials}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy to-transparent" />
    </div>
  );
}

export function Socias() {
  return (
    <section id="socias" className="relative bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle
          eyebrow="As sócias"
          title={
            <>
              Três advogadas, três áreas de{" "}
              <span className="italic text-gold">atuação técnica</span>{" "}
              complementares.
            </>
          }
          description="Conheça as advogadas responsáveis pelo atendimento. Cada uma conduz pessoalmente os casos das suas áreas de especialidade."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SOCIAS.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link
                to="/socias/$slug"
                params={{ slug: s.slug }}
                className="group block overflow-hidden rounded-sm bg-white shadow-[0_20px_60px_-40px_rgba(17,27,58,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(17,27,58,0.5)]"
              >
                <AvatarPlaceholder nome={s.nome} />
                <div className="p-6">
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">
                    {s.oab}
                  </span>
                  <h3 className="mt-3 font-serif text-xl leading-tight text-navy">
                    {s.nome}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">
                    {s.resumo}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-navy transition-colors group-hover:text-gold">
                    Ver perfil completo
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
