import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/** Zwei Kundenprojekte im neuen Bereich „Mobile Apps“: PreisPirat24 und Sun-Vi (DE/EN/TR). */

type Texts = { meta: string; description: string };
const apps: { slug: string; name: string; url: string; displayDomain: string; order: string; texts: Record<"de" | "en" | "tr", Texts> }[] = [
  {
    slug: "preispirat24-app",
    name: "PreisPirat24 App",
    url: "https://www.preispirat24.com",
    displayDomain: "preispirat24.com",
    order: "aB",
    texts: {
      de: {
        meta: "Mobile App · Großhandel",
        description: "Bestell-App für die Geschäftskunden eines Großhändlers für Tankstellen-, Kiosk- und Autozubehör: Sortiment und Händlerpreise nach Login, Bestellung direkt vom Smartphone.",
      },
      en: {
        meta: "Mobile app · Wholesale",
        description: "Ordering app for the business customers of a wholesaler of petrol station, kiosk and car accessory goods: product range and trade prices after login, ordering straight from the smartphone.",
      },
      tr: {
        meta: "Mobil uygulama · Toptan ticaret",
        description: "Akaryakıt istasyonu, büfe ve oto aksesuarı ürünleri satan bir toptancının kurumsal müşterileri için sipariş uygulaması: girişten sonra ürün yelpazesi ve bayi fiyatları, sipariş doğrudan akıllı telefondan.",
      },
    },
  },
  {
    slug: "sunvi-app",
    name: "Sun-Vi App",
    url: "https://www.sunvi.de",
    displayDomain: "sunvi.de",
    order: "aC",
    texts: {
      de: {
        meta: "Mobile App · Großhandel",
        description: "Bestell-App für einen Großhändler aus Schleswig-Holstein, der Kioske und Tankstellen beliefert: Sortiment mit Händlerpreisen nach Login und schnelle Nachbestellung unterwegs.",
      },
      en: {
        meta: "Mobile app · Wholesale",
        description: "Ordering app for a wholesaler from Schleswig-Holstein supplying kiosks and petrol stations: product range with trade prices after login and quick reordering on the go.",
      },
      tr: {
        meta: "Mobil uygulama · Toptan ticaret",
        description: "Büfelere ve akaryakıt istasyonlarına ürün tedarik eden Schleswig-Holstein merkezli bir toptancı için sipariş uygulaması: girişten sonra bayi fiyatlarıyla ürün yelpazesi ve yolda hızlı yeniden sipariş.",
      },
    },
  },
];

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  for (const app of apps) {
    const existing = await payload.find({ collection: "projects", where: { slug: { equals: app.slug } }, limit: 1, depth: 0, req });
    if (existing.totalDocs > 0) continue;
    const doc = await payload.create({
      collection: "projects",
      req,
      locale: "de",
      data: {
        name: app.name,
        slug: app.slug,
        group: "apps",
        kind: "Kundenprojekt",
        url: app.url,
        displayDomain: app.displayDomain,
        stack: [],
        visible: true,
        ...app.texts.de,
      },
    });
    for (const locale of ["en", "tr"] as const) {
      await payload.update({ collection: "projects", id: doc.id, locale, req, data: app.texts[locale] });
    }
    await db.execute(sql`UPDATE "projects" SET "_order" = ${app.order} WHERE "slug" = ${app.slug};`);
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const app of apps) {
    await payload.delete({ collection: "projects", where: { slug: { equals: app.slug } }, req });
  }
}
