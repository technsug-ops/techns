import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

/**
 * Produktions-ERP bekommt seine Live-Seite (Profiq) und konkrete Inhalte.
 * Texte werden nur ersetzt, solange noch die allgemeinen Platzhaltertexte aus 20261108_100000_fallstudien drinstehen.
 */

type Locale = "de" | "en" | "tr";
type Block =
  | { blockType: "text"; title: string; body: string }
  | { blockType: "list"; title: string; items: string[] }
  | { blockType: "flow"; title: string; steps: { label: string; highlight?: boolean }[] };

const t = (title: string, body: string): Block => ({ blockType: "text", title, body });
const l = (title: string, items: string[]): Block => ({ blockType: "list", title, items });
const f = (title: string, steps: string[], hi: number[] = []): Block => ({ blockType: "flow", title, steps: steps.map((label, i) => ({ label, highlight: hi.includes(i) })) });

const genericStart: Record<Locale, string> = {
  de: "ERP zur Produktionssteuerung für einen Fertigungsbetrieb",
  en: "Production-control ERP for a manufacturing business",
  tr: "Bir üretim işletmesi için üretim yönetimi ERP'si",
};

const texts: Record<Locale, { meta: string; description: string; metric: string; caseStudy: Block[] }> = {
  de: {
    meta: "ERP · Fertigung (Configure-to-Order)",
    description: "Durchgängige Produktionssteuerung für Hersteller von Terrassendächern, Carports und Wintergärten aus Aluminium – vom Kundenauftrag bis zur Verladung auf den LKW.",
    metric: "In Entwicklung · Deutsch/Türkisch",
    caseStudy: [
      t("Ausgangslage", "Jeder Auftrag ist ein Unikat aus Maßen, Verglasung und Farbe. Stücklisten, Zuschnitt, Lager und Versand liefen getrennt – mit Rückfragen, Fehlteilen und Ausschuss als Folge."),
      l("Funktionen", [
        "Parametrische, versionierte Rezepturen: Maße, Verglasung und RAL-Farbe erzeugen die Stückliste automatisch",
        "Bestandsprüfung bei Auftragseingang – automatische Bestätigung oder Aufgabe an den Einkauf",
        "Echtzeit-Bestand mit festen Lagerplätzen und digitalem Hallenplan",
        "Zuschnitt-Aufträge für die Säge mit Restverwertung und Ausschusserfassung",
        "Dreiteilige Kommissionierliste je Zone, abgehakt am Tablet",
        "Vollständigkeitsprüfung am Tor, Lieferschein und Rechnung aus demselben Datensatz",
        "Rückverfolgbarkeit vom ersten Schnitt bis zum Kundenauftrag",
        "Fremdfertiger (Pulverbeschichtung, Glaszuschnitt) als virtuelle Lagerorte",
        "Kennzahlen: Durchlaufzeit, Ausschuss und Leistung je Station",
        "B2B-Portal für Fachkunden mit Kundenpreisen, Auftragsstatus und Nachbestellung",
      ]),
      f("Ablauf", ["Auftrag", "Bestandsprüfung", "Zuschnitt", "Kommissionierung", "Verladung"], [2]),
      t("Einführung", "Ein Tablet pro Station, große Schaltflächen und Umschaltung Deutsch/Türkisch per Knopfdruck. Einführung in Phasen (A0–A4 plus B2B), jede Phase für sich nutzbar; klickbare Demo mit fünf Szenarien."),
    ],
  },
  en: {
    meta: "ERP · Manufacturing (configure-to-order)",
    description: "End-to-end production control for manufacturers of aluminium terrace roofs, carports and winter gardens – from the customer order to loading the truck.",
    metric: "In development · German/Turkish",
    caseStudy: [
      t("Starting point", "Every order is unique in dimensions, glazing and colour. Parts lists, cutting, stock and dispatch ran separately – causing queries, missing parts and scrap."),
      l("Features", [
        "Parametric, versioned recipes: dimensions, glazing and RAL colour generate the parts list automatically",
        "Stock check on order entry – automatic confirmation or a task for purchasing",
        "Real-time stock with fixed storage locations and a digital hall plan",
        "Cutting orders for the saw with remnant reuse and scrap recording",
        "Three-part picking list per zone, checked off on a tablet",
        "Completeness check at the gate; delivery note and invoice from the same record",
        "Traceability from the first cut to the customer order",
        "Subcontractors (powder coating, glass cutting) as virtual storage locations",
        "KPIs: lead time, scrap and output per station",
        "B2B portal for trade customers with customer prices, order status and reordering",
      ]),
      f("Workflow", ["Order", "Stock check", "Cutting", "Picking", "Loading"], [2]),
      t("Rollout", "One tablet per station, large buttons and German/Turkish at the touch of a button. Phased rollout (A0–A4 plus B2B), each phase usable on its own; clickable demo with five scenarios."),
    ],
  },
  tr: {
    meta: "ERP · Üretim (siparişe göre yapılandırma)",
    description: "Alüminyum veranda çatısı, carport ve kış bahçesi üreticileri için uçtan uca üretim yönetimi – müşteri siparişinden kamyona yüklemeye kadar.",
    metric: "Geliştiriliyor · Almanca/Türkçe",
    caseStudy: [
      t("Başlangıç durumu", "Her sipariş ölçü, cam ve renk açısından tektir. Ürün ağaçları, kesim, depo ve sevkiyat ayrı yürüyordu – sonuç: geri dönüşler, eksik parçalar ve fire."),
      l("Özellikler", [
        "Parametrik, sürümlü reçeteler: ölçü, cam ve RAL rengi ürün ağacını otomatik oluşturur",
        "Sipariş girişinde stok kontrolü – otomatik onay ya da satın almaya görev",
        "Sabit raf yerleri ve dijital hol planıyla gerçek zamanlı stok",
        "Artık kullanımı ve fire kaydıyla testere için kesim emirleri",
        "Bölge bazında üç parçalı toplama listesi, tablette işaretlenir",
        "Kapıda eksiksizlik kontrolü; irsaliye ve fatura aynı kayıttan",
        "İlk kesimden müşteri siparişine kadar izlenebilirlik",
        "Fason üreticiler (toz boya, cam kesim) sanal depo yeri olarak",
        "Göstergeler: istasyon başına süre, fire ve verim",
        "Bayi müşteriler için B2B portal: müşteriye özel fiyat, sipariş durumu, yeniden sipariş",
      ]),
      f("İş akışı", ["Sipariş", "Stok kontrolü", "Kesim", "Toplama", "Yükleme"], [2]),
      t("Devreye alma", "Her istasyona bir tablet, büyük düğmeler ve tek dokunuşla Almanca/Türkçe. Aşamalı devreye alma (A0–A4 ve B2B), her aşama tek başına kullanılabilir; beş senaryolu tıklanabilir demo."),
    ],
  },
};

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const found = await payload.find({ collection: "projects", where: { slug: { equals: "produktions-erp" } }, limit: 1, depth: 0, req, locale: "de" });
  const doc = found.docs[0];
  if (!doc) return;

  await payload.update({
    collection: "projects",
    id: doc.id,
    req,
    data: {
      url: doc.url || "https://profiq-erp.vercel.app",
      displayDomain: doc.displayDomain || "profiq-erp.vercel.app",
      ...(doc.name === "Produktions-ERP" ? { name: "Profiq – Produktions-ERP" } : {}),
    },
  });

  for (const locale of ["de", "en", "tr"] as const) {
    const current = await payload.findByID({ collection: "projects", id: doc.id, req, locale, fallbackLocale: false, depth: 0 });
    const desc = current.description ?? "";
    const untouched = !desc.trim() || desc.trim().startsWith("[") || desc.startsWith(genericStart[locale]);
    if (!untouched) continue;
    await payload.update({ collection: "projects", id: doc.id, req, locale, data: texts[locale] });
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
