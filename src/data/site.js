import { Landmark, Gavel, Users, ShoppingBag, ShieldCheck, Briefcase, Car } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import mylennaFoto from "../assets/images/mylenna-montezano-vargas.webp";
import shayaneFoto from "../assets/images/shayane-hermann-pacheco.webp";
import marianaFoto from "../assets/images/mariana-piccoli.webp";

export const SITE = {
  name: "Hermann, Piccoli & Montezano Advogadas Associadas",
  shortName: "HPM Advogadas",
  monogram: "HPM",
  city: "Porto Alegre/RS",
  address: {
    street: "Rua Anita Garibaldi, 1650, sala 1",
    district: "Bairro Boa Vista",
    city: "Porto Alegre/RS",
    zip: "90480-200",
  },
  phone: "(51) 99190-2271",
  phoneRaw: "5551991902271",
  email: "hpmadvogadas@gmail.com",
  instagram: "https://www.instagram.com/hpmadvogadas/",
  instagramHandle: "@hpmadvogadas",
  hours: "Segunda a sexta, 09h às 17h",
  mapsQuery: "Rua Anita Garibaldi, 1650, sala 1, Boa Vista, Porto Alegre - RS, 90480-200",
};

export const WHATSAPP_DEFAULT_MSG = "Olá! Gostaria de agendar um atendimento.";

// Se phone não for informado, usa o número principal do escritório.
export function whatsappUrl(message = WHATSAPP_DEFAULT_MSG, phone = SITE.phoneRaw) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// // TanStack Router pra navegar entre páginas
export function useSectionLink() {
  const navigate = useNavigate();
  return (hash) => (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      // rola manualmente, sempre, não importa se a URL já tem esse hash ou não.
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${hash}`);
    } else {
      navigate({ to: "/", hash });
    }
  };
}

// EmailJS
export const EMAILJS = {
  serviceId: "service_q8sjo5o",
  templateId: "template_gzy88yp",
  publicKey: "jdoV8f0wKGGy3lEvR",
};

export const AREAS = [
  {
    slug: "direito-bancario",
    title: "Direito Bancário",
    short: "Revisional de contratos, ações de fraude, superendividamento e gestão de passivos.",
    icon: Landmark,
  },
  {
    slug: "direito-criminal",
    title: "Direito Criminal",
    short: "Defesa técnica em inquéritos e ações penais, com atenção a medidas protetivas.",
    icon: Gavel,
  },
  {
    slug: "direito-familia",
    title: "Direito de Família",
    short: "Alimentos, guarda, divórcio, união estável, inventário e curatela.",
    icon: Users,
  },
  {
    slug: "direito-consumidor",
    title: "Direito do Consumidor",
    short:
      "Relações de consumo, cobranças indevidas e reparação por falhas na prestação de serviços.",
    icon: ShoppingBag,
  },
  {
    slug: "direito-previdenciario",
    title: "Direito Previdenciário",
    short: "Benefícios do INSS e RPPS, aposentadorias, incapacidade, pensão, BPC/LOAS e revisões.",
    icon: ShieldCheck,
  },
  {
    slug: "direito-trabalhista",
    title: "Direito Trabalhista",
    short: "Atuação para trabalhadores e empresas, com foco em gestão trabalhista preventiva.",
    icon: Briefcase,
  },
  {
    slug: "direito-transito",
    title: "Direito de Trânsito",
    short: "Defesas administrativas, recursos e ações relacionadas à habilitação e infrações.",
    icon: Car,
  },
];

export const SOCIAS = [
  {
    slug: "shayane-hermann-pacheco",
    nome: "Dra. Shayane Hermann Pacheco",
    primeiroNome: "Dra. Shayane",
    oab: "OAB/RS 129.194",
    papel: "Direito do Consumidor e Bancário",
    foto: shayaneFoto,
    // whatsapp: "5551900000000",
    // número pessoal da Dra. Shayane
    resumo:
      "Especialista em Direito do Consumidor e Bancário, com atuação em revisional de contratos e superendividamento.",
    bio: "Especialista em Direito do Consumidor. Atua em Direito Bancário com ações de fraude, gestão de passivos empresariais, revisional de contrato e superendividamento. Pós-graduanda em Direito do Trabalho, com foco em Gestão Trabalhista para Empresas.",
    tags: [
      "Direito do Consumidor",
      "Direito Bancário",
      "Ações de Fraude",
      "Gestão de Passivos Empresariais",
      "Revisional de Contrato",
      "Superendividamento",
      "Gestão Trabalhista",
    ],
  },
  {
    slug: "mariana-piccoli",
    nome: "Dra. Mariana Piccoli",
    primeiroNome: "Dra. Mariana",
    oab: "OAB/RS 129.157",
    papel: "Direito Previdenciário",
    foto: marianaFoto,
    // whatsapp: "5551900000000",
    // número pessoal da Dra. Mariana
    resumo:
      "Advogada previdenciarista com atuação no INSS e no RPPS, incluindo demandas do IPE Prev.",
    bio: "Advogada previdenciarista, especialista em Direito Previdenciário, com atuação em benefícios do INSS e no RPPS (Regime Próprio de Previdência), incluindo demandas relacionadas ao IPE Prev. Atua em concessão de aposentadorias, benefícios por incapacidade, pensão por morte, BPC/LOAS, salário maternidade, auxílio reclusão e revisões de benefícios. Pós-graduanda em Direito do Consumidor.",
    tags: [
      "INSS",
      "RPPS",
      "IPE Prev",
      "Aposentadorias",
      "Benefícios por Incapacidade",
      "Pensão por Morte",
      "BPC/LOAS",
      "Salário Maternidade",
      "Auxílio Reclusão",
      "Revisões de Benefícios",
    ],
  },
  {
    slug: "mylenna-montezano-vargas",
    nome: "Dra. Mylenna Montezano Vargas",
    primeiroNome: "Dra. Mylenna",
    oab: "OAB/RS 131.018",
    papel: "Direito de Família e Violência Doméstica",
    foto: mylennaFoto,
    whatsapp: "555193191967",
    // número pessoal da Dra. Mylenna
    resumo:
      "Advogada familiarista com atuação em alimentos, guarda, divórcio, inventário e medidas de violência doméstica.",
    bio: "Advogada familiarista, com atuação em demandas de alimentos, guarda e convivência, alienação parental, divórcio, união estável, dissolução de união estável, inventário judicial e extrajudicial e curatela. Atua em conjunto com a advocacia criminal em medidas e defesas relacionadas à violência doméstica.",
    tags: [
      "Alimentos",
      "Guarda e Convivência",
      "Alienação Parental",
      "Divórcio",
      "União Estável",
      "Dissolução de União Estável",
      "Inventário Judicial e Extrajudicial",
      "Curatela",
      "Violência Doméstica",
    ],
  },
];

export function getSocia(slug) {
  return SOCIAS.find((s) => s.slug === slug);
}

export const FAQ = [
  {
    q: "Como funciona o primeiro contato?",
    a: "O atendimento inicial pode ser feito por WhatsApp, telefone ou pelo formulário de contato do site. A partir daí, é feita uma análise preliminar do caso e agendada uma conversa presencial em Porto Alegre ou por vídeo para entender a situação em detalhes.",
  },
  {
    q: "O atendimento é apenas em Porto Alegre?",
    a: "Não. Além do atendimento presencial no escritório em Porto Alegre, atendemos on-line em qualquer lugar do Brasil, com o mesmo cuidado e acompanhamento do atendimento presencial.",
  },
  {
    q: "Como funcionam os honorários e a consulta inicial?",
    a: "Os honorários seguem o Código de Ética e a Tabela da OAB/RS e são combinados de forma transparente após a análise do caso. [Placeholder confirmar política de consulta inicial do escritório antes de publicar.]",
  },
  {
    q: "Quais documentos devo levar na primeira reunião?",
    a: "Os documentos variam conforme a área e a natureza do caso. Após o primeiro contato, orientamos exatamente quais documentos são úteis para a análise. [Placeholder se o escritório quiser uma lista base por área, incluir aqui.]",
  },
  {
    q: "Em quais áreas o escritório atua?",
    a: "Atuamos em Direito Bancário, Direito Criminal, Direito de Família, Direito do Consumidor, Direito Previdenciário, Direito Trabalhista e Direito de Trânsito. Veja mais detalhes na seção Áreas de Atuação.",
  },
];

export const NAV = [
  { label: "Início", to: "/", hash: "inicio" },
  { label: "Sobre", to: "/", hash: "sobre" },
  { label: "Sócias", to: "/", hash: "socias" },
  { label: "Áreas de Atuação", to: "/", hash: "areas" },
  { label: "Contato", to: "/", hash: "contato" },
];
