import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/content/site";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default function ImpressumPage() {
  return (
    <Shell base="/">
      <div className="legal-page">
        <div className="wrap">
          <Link className="back" href="/">← Zur Startseite</Link>
          <h1>Impressum</h1>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>{company.legalName}<br />{company.street}<br />{company.city}</p>
          <h2>Vertreten durch</h2>
          <p>{company.managingDirector}, Geschäftsführer</p>
          <h2>Kontakt</h2>
          <p>Telefon: {company.phone.display}<br />E-Mail: {company.email}</p>
          <h2>Registereintrag</h2>
          <p>Registergericht: {company.court}<br />Registernummer: {company.register}</p>
          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {company.vatId}</p>
          <p className="note">Vor dem Livegang rechtlich prüfen lassen und um die übrigen Pflichtangaben ergänzen.</p>
        </div>
      </div>
    </Shell>
  );
}
