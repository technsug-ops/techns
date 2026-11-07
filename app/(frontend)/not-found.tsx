import Link from "next/link";

export default function NotFound() {
  return (
    <main id="inhalt" className="legal-page">
      <div className="wrap">
        <h1>Seite nicht gefunden</h1>
        <p>Diese Seite gibt es nicht (mehr).</p>
        <Link className="btn btn-teal" href="/">Zur Startseite</Link>
      </div>
    </main>
  );
}
