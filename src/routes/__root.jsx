import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-navy">404</h1>
        <h2 className="mt-4 font-serif text-xl text-navy">Página não encontrada</h2>
        <p className="mt-2 text-sm text-ink/70">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-xl text-navy">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-ink/70">
          Algo deu errado. Você pode tentar recarregar ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-ghost-navy">
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hermann, Piccoli & Montezano Advogadas Associadas — Porto Alegre/RS" },
      {
        name: "description",
        content:
          "Escritório de advocacia em Porto Alegre/RS com atuação em Direito do Consumidor, Bancário, Previdenciário, Trabalhista, Família, Criminal e Trânsito. Atendimento presencial e on-line em todo o Brasil.",
      },
      { name: "author", content: "Hermann, Piccoli & Montezano Advogadas Associadas" },
      { property: "og:site_name", content: "HPM Advogadas" },
      { property: "og:title", content: "Hermann, Piccoli & Montezano Advogadas Associadas" },
      {
        property: "og:description",
        content:
          "Advocacia com atendimento humanizado em Porto Alegre e on-line em todo o Brasil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Attorney",
          name: "Hermann, Piccoli & Montezano Advogadas Associadas",
          telephone: "+55 51 99190-2271",
          email: "hpmadvogadas@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua Anita Garibaldi, 1650, sala 1",
            addressLocality: "Porto Alegre",
            addressRegion: "RS",
            postalCode: "90480-200",
            addressCountry: "BR",
          },
          openingHours: "Mo-Fr 09:00-17:00",
          areaServed: "BR",
          sameAs: ["https://www.instagram.com/hpmadvogadas/"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
