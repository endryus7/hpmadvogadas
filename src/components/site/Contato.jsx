import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, ExternalLink, Loader2 } from "lucide-react";
import { AREAS, EMAILJS, SITE } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

const phoneMask = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

const schema = yup.object({
  nome: yup.string().trim().required("Informe seu nome completo").min(3, "Nome muito curto").max(120),
  telefone: yup
    .string()
    .required("Informe seu telefone")
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
  email: yup.string().trim().email("E-mail inválido").required("Informe seu e-mail").max(200),
  assunto: yup.string().required("Selecione um assunto"),
  mensagem: yup.string().trim().required("Escreva uma breve mensagem").min(10, "Mensagem muito curta").max(1500),
});

export function Contato() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const telefone = watch("telefone") ?? "";

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          nome: data.nome,
          telefone: data.telefone,
          email: data.email,
          assunto: data.assunto,
          mensagem: data.mensagem,
          to_email: SITE.email,
        },
        { publicKey: EMAILJS.publicKey },
      );
      toast.success("Mensagem enviada. Retornaremos em breve.");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar agora. Tente pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`;

  return (
    <section id="contato" className="relative bg-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle
          eyebrow="Contato"
          title={
            <>
              Fale com o escritório. <span className="italic text-gold">Nós retornamos.</span>
            </>
          }
          description="Preencha o formulário ou utilize um dos canais diretos. O primeiro retorno é feito por uma das sócias."
          align="center"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-sm bg-white p-8 shadow-[0_20px_60px_-40px_rgba(17,27,58,0.35)] sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome completo" error={errors.nome?.message}>
                <input
                  {...register("nome")}
                  type="text"
                  autoComplete="name"
                  className="input"
                  placeholder="Seu nome"
                />
              </Field>
              <Field label="Telefone" error={errors.telefone?.message}>
                <input
                  {...register("telefone")}
                  value={telefone}
                  onChange={(e) => setValue("telefone", phoneMask(e.target.value), { shouldValidate: true })}
                  inputMode="tel"
                  className="input"
                  placeholder="(51) 90000-0000"
                />
              </Field>
              <Field label="E-mail" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className="input"
                  placeholder="voce@email.com"
                />
              </Field>
              <Field label="Assunto" error={errors.assunto?.message}>
                <select {...register("assunto")} defaultValue="" className="input">
                  <option value="" disabled>
                    Selecione uma área
                  </option>
                  {AREAS.map((a) => (
                    <option key={a.slug} value={a.title}>
                      {a.title}
                    </option>
                  ))}
                  <option value="Outro">Outro</option>
                </select>
              </Field>
              <Field label="Mensagem" error={errors.mensagem?.message} className="sm:col-span-2">
                <textarea
                  {...register("mensagem")}
                  rows={5}
                  className="input resize-none"
                  placeholder="Descreva brevemente sua situação."
                />
              </Field>
            </div>

            <button type="submit" disabled={loading} className="btn-gold mt-8 w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Enviar mensagem"
              )}
            </button>
            <p className="mt-4 text-xs text-ink/60">
              Ao enviar, você concorda em ser contatado pelos canais informados.
            </p>
          </form>

          <div className="space-y-6">
            <InfoRow icon={MapPin} title="Endereço">
              {SITE.address.street}
              <br />
              {SITE.address.district} — {SITE.address.city}
              <br />
              CEP {SITE.address.zip}
            </InfoRow>
            <InfoRow icon={Phone} title="Telefone / WhatsApp">
              <a href={`tel:+${SITE.phoneRaw}`} className="hover:text-gold">
                {SITE.phone}
              </a>
            </InfoRow>
            <InfoRow icon={Mail} title="E-mail">
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
            </InfoRow>
            <InfoRow icon={Clock} title="Horário">
              {SITE.hours}
              <br />
              Atendimento on-line em todo o Brasil.
            </InfoRow>

            <div className="overflow-hidden rounded-sm border border-border bg-white">
              <iframe
                title="Localização do escritório"
                src={mapsEmbed}
                className="h-56 w-full grayscale-[40%] contrast-[0.95]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border-t border-border px-5 py-3 text-sm text-navy hover:text-gold"
              >
                Abrir no Google Maps
                <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--border);
          background: white;
          padding: 0.75rem 0.9rem;
          font-size: 0.9rem;
          color: var(--ink);
          border-radius: 2px;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(200,166,106,.18); }
      `}</style>
    </section>
  );
}

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-navy/70">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4 rounded-sm border border-border bg-white p-5">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-gold">
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div className="text-sm leading-relaxed text-ink/85">
        <div className="mb-1 text-[0.7rem] font-medium uppercase tracking-widest text-gold">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
