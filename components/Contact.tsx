import { company } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";

export function Contact() {
  const mapQuery = encodeURIComponent(`${company.street}, ${company.city}`);
  return (
    <section id="kontakt">
      <div className="wrap contact">
        <div>
          <span className="eyebrow">Kontakt</span>
          <h2><Accent before="Lassen Sie uns über Ihre" accent="Abläufe" after="sprechen." /></h2>
          <p className="lede">Erzählen Sie uns, wo es hakt – wir melden uns zeitnah zurück.</p>
        </div>
        <div className="cbox">
          <a href={company.phone.href}>
            <span className="ic"><Icon name="phone" /></span>
            <span><small>Telefon</small>{company.phone.display}</span>
          </a>
          <a href={`mailto:${company.email}`}>
            <span className="ic"><Icon name="mail" /></span>
            <span><small>E-Mail</small>{company.email}</span>
          </a>
          <a href={company.bookingUrl}>
            <span className="ic"><Icon name="calendar" /></span>
            <span><small>Termin</small>30-Minuten-Gespräch buchen</span>
          </a>
          <a href={`https://www.openstreetmap.org/search?query=${mapQuery}`} target="_blank" rel="noopener">
            <span className="ic"><Icon name="pin" /></span>
            <span><small>Adresse</small>{company.street}, {company.city}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
