import Link from "next/link";
import { company, nav } from "@/content/site";
import { getProjects } from "@/lib/projects";

export async function Footer({ home = "" }: { home?: string }) {
  const products = (await getProjects()).filter((p) => p.kind === "Eigenes Produkt" || p.kind === "In Entwicklung");
  return (
    <footer>
      <div className="wrap">
        <div className="fcols">
          <div><h4>{company.name}</h4><p>{company.claim}</p></div>
          <div>
            <h4>Navigation</h4>
            <ul>{nav.map((n) => <li key={n.href}><a href={`${home}${n.href}`}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h4>Produkte</h4>
            <ul>{products.map((p) => <li key={p.slug}><a href={p.url} target="_blank" rel="noopener">{p.name}</a></li>)}</ul>
          </div>
          <div>
            <h4>Unternehmen</h4>
            <p>{company.legalName}<br />{company.street}<br />{company.city}</p>
          </div>
        </div>
        <div className="fbase">
          <span>© {new Date().getFullYear()} {company.legalName}</span>
          <span><Link href="/impressum">Impressum</Link> · <Link href="/datenschutz">Datenschutz</Link></span>
        </div>
      </div>
    </footer>
  );
}
