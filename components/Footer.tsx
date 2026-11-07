import Link from "next/link";
import { localePath } from "@/content/i18n";
import { company, nav } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { navHref } from "./navHref";
import type { I18nProps } from "./types";

export async function Footer({ locale, t }: I18nProps) {
  const products = (await getProjects(locale)).filter((p) => p.kind === "Eigenes Produkt" || p.kind === "In Entwicklung");
  return (
    <footer>
      <div className="wrap">
        <div className="fcols">
          <div><h4>{company.name}</h4><p>{t.claim}</p></div>
          <div>
            <h4>{t.footer.navigation}</h4>
            <ul>{nav.map((n) => <li key={n.key}><a href={navHref(n, locale)}>{t.nav[n.key]}</a></li>)}</ul>
          </div>
          <div>
            <h4>{t.footer.products}</h4>
            <ul>
              {products.map((p) => (
                <li key={p.slug}>
                  {p.url ? <a href={p.url} target="_blank" rel="noopener">{p.name}</a> : <Link href={localePath(locale, `/projekte/${p.slug}`)}>{p.name}</Link>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t.footer.company}</h4>
            <p>{company.legalName}<br />{company.street}<br />{company.postalCode} {company.city}</p>
          </div>
        </div>
        <div className="fbase">
          <span>© {new Date().getFullYear()} {company.legalName}</span>
          <span><Link href={localePath(locale, "/impressum")}>{t.footer.imprint}</Link> · <Link href={localePath(locale, "/datenschutz")}>{t.footer.privacy}</Link></span>
        </div>
      </div>
    </footer>
  );
}
