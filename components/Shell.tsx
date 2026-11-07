import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

/** Gemeinsamer Rahmen: Sidebar (Desktop) bzw. Kopfleiste (Mobil), Inhalt, Footer. */
export function Shell({ children, base = "" }: { children: React.ReactNode; base?: string }) {
  return (
    <div className="shell">
      <Sidebar base={base} />
      <div className="content">
        <Header base={base} />
        <main id="inhalt">{children}</main>
        <Footer home={base} />
      </div>
    </div>
  );
}
