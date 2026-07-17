import { Instagram } from "lucide-react";
import { AREAS, NAV, SITE } from "@/data/site";
import { Monogram } from "./Monogram";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy text-white/80">
      <div className="absolute -bottom-24 -right-16 text-gold/[0.05]">
        <Monogram className="h-[360px] w-[560px]" strokeWidth={0.8} />
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 text-gold">
            <Monogram className="h-12 w-20" strokeWidth={1.25} />
          </div>
          <p className="mt-4 font-serif text-lg text-white leading-tight">
            Hermann, Piccoli & Montezano
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            Advogadas Associadas
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/60">
            Advocacia com atendimento humanizado em Porto Alegre e on-line em
            todo o Brasil.
          </p>
        </div>

        <div>
          <h4 className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">
            Navegação
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-white/70 hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">
            Áreas
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {AREAS.map((a) => (
              <li key={a.slug} className="text-white/70">
                {a.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">
            Contato
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              {SITE.address.street}
              <br />
              {SITE.address.district}, {SITE.address.city}
            </li>
            <li>
              <a href={`tel:+${SITE.phoneRaw}`} className="hover:text-gold">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
            </li>
            <li>{SITE.hours}</li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                {SITE.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <span>© {year} Hermann, Piccoli & Montezano Advogadas Associadas.</span>
          <span>
            Conteúdo meramente informativo, em conformidade com o Código de Ética
            da OAB.
          </span>
        </div>
      </div>
    </footer>
  );
}
