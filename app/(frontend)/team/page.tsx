import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeam } from "@/lib/team";
import { Accent } from "@/components/Accent";
import { StackTags } from "@/components/ProjectCard";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "Team",
  description: "Die Menschen hinter TechNS – Prozessverständnis und Softwareentwicklung aus Oberursel bei Frankfurt.",
  alternates: { canonical: "/team" },
};

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <Shell base="/">
      <section className="team-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Brotkrumen">
            <Link href="/">Start</Link> <span aria-hidden="true">/</span> <span aria-current="page">Team</span>
          </nav>
          <span className="eyebrow">Team</span>
          <h1><Accent before="Die Menschen hinter" accent="TechNS" /></h1>
          <p className="lede">Prozessverständnis und Entwicklung in einem Team – vom Erstgespräch bis zum laufenden System.</p>
        </div>
      </section>

      <div className="wrap">
        <ul className="team-grid">
          {team.map((m) => (
            <li key={m.id} className="member">
              <div className="member-photo">
                {m.photo ? (
                  <Image src={m.photo.url} alt={m.photo.alt || m.name} fill sizes="(max-width: 700px) 100vw, 360px" style={{ objectFit: "cover" }} />
                ) : (
                  <span className="ini" aria-hidden="true">{initials(m.name)}</span>
                )}
              </div>
              <div className="member-body">
                <h2>{m.name}</h2>
                <p className="role">{m.role}</p>
                {m.bio && <p>{m.bio}</p>}
                <StackTags stack={m.focus} />
                {(m.linkedin || m.email) && (
                  <div className="member-links">
                    {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>}
                    {m.email && <a href={`mailto:${m.email}`}>E-Mail</a>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="join">
          <div>
            <h2>Mit uns arbeiten?</h2>
            <p>Ob Projekt oder Mitarbeit – wir freuen uns über Ihre Nachricht.</p>
          </div>
          <Link className="btn btn-teal" href="/#kontakt">Kontakt aufnehmen</Link>
        </div>
      </div>
    </Shell>
  );
}
