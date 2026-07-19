import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, ExternalLink, Loader2 } from "lucide-react";
import { AREAS, EMAILJS, SITE } from "@/data/site";
import { SectionTitle } from "./SectionTitle";
import { whatsappUrl } from "@/data/site";
import styles from "./Contato.module.css";

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
    <section id="contato" className={styles.section}>
      <div className="container-x">
        <SectionTitle
          eyebrow="Contato"
          title={
            <>
              Fale com o escritório. <span className="italic-gold">Nós retornamos.</span>
            </>
          }
          description="Preencha o formulário ou utilize um dos canais diretos. O primeiro retorno é feito por uma das sócias."
          align="center"
        />

        <div className={styles.grid}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
            <div className={styles.fieldsGrid}>
              <Field label="Nome completo" error={errors.nome?.message}>
                <input
                  {...register("nome")}
                  type="text"
                  autoComplete="name"
                  className={styles.input}
                  placeholder="Seu nome"
                />
              </Field>
              <Field label="Telefone" error={errors.telefone?.message}>
                <input
                  {...register("telefone")}
                  value={telefone}
                  onChange={(e) => setValue("telefone", phoneMask(e.target.value), { shouldValidate: true })}
                  inputMode="tel"
                  className={styles.input}
                  placeholder="(51) 90000-0000"
                />
              </Field>
              <Field label="E-mail" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className={styles.input}
                  placeholder="email@hotmail.com"
                />
              </Field>
              <Field label="Assunto" error={errors.assunto?.message}>
                <select {...register("assunto")} defaultValue="" className={styles.input}>
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
              <Field label="Mensagem" error={errors.mensagem?.message} full>
                <textarea
                  {...register("mensagem")}
                  rows={5}
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Descreva brevemente sua situação."
                />
              </Field>
            </div>

            <button type="submit" disabled={loading} className={`btn-gold ${styles.submitButton}`}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                "Enviar mensagem"
              )}
            </button>
            <p className={styles.consentText}>
              Ao enviar, você concorda em ser contatado pelos canais informados.
            </p>
          </form>

          <div className={styles.infoColumn}>
            <InfoRow icon={MapPin} title="Endereço">
              {SITE.address.street}
              <br />
              {SITE.address.district} — {SITE.address.city}
              <br />
              CEP {SITE.address.zip}
            </InfoRow>
            <InfoRow icon={Phone} title="Telefone / WhatsApp">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className={styles.infoLink}>
                {SITE.phone}
              </a>
            </InfoRow>
            <InfoRow icon={Mail} title="E-mail">
              <a href={`mailto:${SITE.email}`} className={styles.infoLink}>
                {SITE.email}
              </a>
            </InfoRow>
            <InfoRow icon={Clock} title="Horário">
              {SITE.hours}
              <br />
              Atendimento on-line em todo o Brasil.
            </InfoRow>

            <div className={styles.mapWrap}>
              <iframe
                title="Localização do escritório"
                src={mapsEmbed}
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a href={mapsHref} target="_blank" rel="noreferrer" className={styles.mapLink}>
                Abrir no Google Maps
                <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children, full = false }) {
  return (
    <label className={`${styles.fieldLabel} ${full ? styles.fieldFull : ""}`}>
      <span className={styles.fieldLabelText}>{label}</span>
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </label>
  );
}

function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.infoIconWrap}>
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <div className={styles.infoText}>
        <div className={styles.infoTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
}
