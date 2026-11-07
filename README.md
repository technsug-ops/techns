# TechNS – Website mit Verwaltung

Firmenwebsite der TechNS UG mit eingebautem Verwaltungsbereich.

- **Next.js 16 (App Router)**, **React 19**, **TypeScript (strict)**
- **Payload CMS 3** unter `/admin` – Projekte anlegen, bearbeiten, ausblenden, löschen und per Drag & Drop sortieren
- **PostgreSQL** als Datenbank, Bilder lokal oder in **Vercel Blob**

## Projekte verwalten

1. `/admin` öffnen und anmelden. Beim allerersten Aufruf legt man dort das erste Benutzerkonto an.
2. **Projekte** → Liste. Reihenfolge über den Griff (⋮⋮) links verschieben.
3. **Neues Projekt:** „Neu erstellen“ → Name, Bereich (ERP oder Websites), Art, Kurzbeschreibung, Live-URL. Optional Screenshot, Technologien und Fallstudien-Abschnitte für die Detailseite.
4. **Ausblenden statt löschen:** Haken „Auf der Website anzeigen“ entfernen.

Änderungen erscheinen sofort auf der Website – Startseite, Detailseite `/projekte/<kürzel>` und Sitemap werden automatisch neu erzeugt.
Die Sprache der Verwaltung (Deutsch, Türkisch, Englisch) lässt sich im eigenen Konto umstellen.

Alle **übrigen Texte** (Leistungen, FAQ, Kontakt, Gründer usw.) stehen weiterhin in `content/site.ts`.

## Lokal starten

Voraussetzungen: Node.js 20.9+ (empfohlen 22) und eine Postgres-Datenbank (am einfachsten die Neon-Datenbank aus Vercel).

```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env  – danach Werte eintragen
npm run migrate           # Tabellen anlegen (nur beim ersten Mal / nach Schema-Änderungen)
npm run seed              # optional: die 9 Startprojekte importieren
npm run dev               # http://localhost:3000  und  http://localhost:3000/admin
```

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklung |
| `npm run build` / `npm run start` | Produktions-Build lokal |
| `npm run migrate` | Ausstehende Datenbank-Migrationen ausführen |
| `npm run migrate:create -- <name>` | Nach Änderungen an `collections/` eine neue Migration erzeugen |
| `npm run generate:types` | `payload-types.ts` neu erzeugen |
| `npm run seed` | Startprojekte aus `scripts/seed-projects.json` importieren (überspringt vorhandene) |

**Wichtig:** Das Datenbankschema ändert sich nur über Migrationen (`push: false`). Wer ein Feld in `collections/` ergänzt, erzeugt danach mit `migrate:create` eine Migration und committet sie mit.

## Struktur

```
app/(frontend)/       Website: Startseite, /projekte/[slug], Impressum, Datenschutz
app/(payload)/        Verwaltung /admin und API /api – von Payload vorgegeben
collections/          Datenmodell: Projects, Media, Users
migrations/           Datenbank-Migrationen
lib/projects.ts       Liest Projekte aus der Datenbank für die Website
content/site.ts       Alle übrigen Texte, typisiert
components/           Eine Datei je Sektion; Shell = Sidebar (Desktop) + Kopfleiste (Mobil)
scripts/seed.ts       Import der Startprojekte
payload.config.ts     CMS-Konfiguration
```

## Deployment auf Vercel

1. Repository mit Vercel verbinden (Next.js wird erkannt).
2. Unter **Storage** eine **Neon (Postgres)**-Datenbank und einen **Blob**-Speicher anlegen und mit dem Projekt verbinden – `DATABASE_URL` und `BLOB_READ_WRITE_TOKEN` werden dabei gesetzt.
3. `PAYLOAD_SECRET` als Umgebungsvariable ergänzen.
4. Deployen. Migrationen laufen beim Start automatisch (`prodMigrations`).
5. `/admin` öffnen, erstes Konto anlegen, optional lokal mit der Neon-URL `npm run seed` ausführen.
6. Domain `techns.de` im Projekt hinterlegen.

## Datenschutz (DSGVO)

- Schriften selbst gehostet, keine Tracker, keine Cookies auf der öffentlichen Website (das Admin-Login setzt nur für angemeldete Nutzer ein technisch notwendiges Cookie).
- Die **Datenschutzerklärung fehlt noch** und muss vor dem Livegang ergänzt werden (Hosting, Datenbank, Server-Logs, Kontaktaufnahme).
