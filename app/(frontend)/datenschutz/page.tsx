import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = { title: "Datenschutz", alternates: { canonical: "/datenschutz" }, robots: { index: false } };

export default function DatenschutzPage() {
  return (
    <Shell base="/">
      <div className="legal-page">
        <div className="wrap">
          <Link className="back" href="/">← Zur Startseite</Link>
          <h1>Datenschutzerklärung</h1>
          <p className="note">Platzhalter: Die Datenschutzerklärung ist gesetzlich vorgeschrieben und muss vor dem Livegang ergänzt und rechtlich geprüft werden (Hosting-Anbieter, Server-Logs, Kontaktaufnahme, ggf. Analyse-Tool).</p>
        </div>
      </div>
    </Shell>
  );
}
