import { company } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

export function Contact({ t }: I18nProps) {
  const c = t.contact;
  const address = `${company.street}, ${company.postalCode} ${company.city}`;
  return (
    <section id="kontakt">
      <div className="wrap contact">
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2><Accent {...c.heading} /></h2>
          <p className="lede">{c.lede}</p>
        </div>
        <div className="cbox">
          <a href={company.phone.href}>
            <span className="ic"><Icon name="phone" /></span>
            <span><small>{c.phone}</small>{company.phone.display}</span>
          </a>
          <a href={`mailto:${company.email}`}>
            <span className="ic"><Icon name="mail" /></span>
            <span><small>{c.email}</small>{company.email}</span>
          </a>
          <a href={company.bookingUrl}>
            <span className="ic"><Icon name="calendar" /></span>
            <span><small>{c.appointment}</small>{c.appointmentText}</span>
          </a>
          <a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(address)}`} target="_blank" rel="noopener">
            <span className="ic"><Icon name="pin" /></span>
            <span><small>{c.address}</small>{address}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
