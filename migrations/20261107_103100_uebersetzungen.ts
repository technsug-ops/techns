import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

/**
 * Datenmigration: englische und türkische Fassungen der vorhandenen Projekte und des Teams.
 * Überschreibt nur Projekte, die es (noch) gibt – gelöschte werden übersprungen.
 * Platzhalter in [eckigen Klammern] werden im CMS pro Sprache ersetzt.
 */

type Block =
  | { blockType: "text"; title: string; body: string }
  | { blockType: "list"; title: string; items: string[] }
  | { blockType: "flow"; title: string; steps: { label: string; highlight?: boolean }[] };

type Tr = { meta: string; description: string; metric?: string; caseStudy?: Block[] };

const projects: Record<string, { en: Tr; tr: Tr }> = {
  bezirga: {
    en: {
      meta: "SaaS · E-commerce",
      description: "ERP for marketplace sellers: orders, stock and returns straight from the marketplace APIs – with the true net profit of every single sale.",
      metric: "Live with a pilot customer · multi-tenant version in progress",
      caseStudy: [
        { blockType: "text", title: "Problem", body: "Sales were entered by hand. A reconciliation showed that the marketplace report listed many times more sales than the system had recorded – so profit and stock figures could not be trusted." },
        { blockType: "text", title: "Decision", body: "Orders, returns and settlements come directly from the marketplace APIs. Every phase starts with a measurement report; no phase is skipped." },
        { blockType: "list", title: "What the system does", items: ["Several marketplaces connected via API", "Net profit per sale after commission, shipping and tax", "FIFO valuation with batch tracking", "Consistency checks before any data is written"] },
      ],
    },
    tr: {
      meta: "SaaS · E-ticaret",
      description: "Pazaryeri satıcıları için ERP: siparişler, stok ve iadeler doğrudan pazaryeri API'lerinden – her bir satışın gerçek net kârıyla birlikte.",
      metric: "Pilot müşteride canlı · çok kiracılı sürüm geliştiriliyor",
      caseStudy: [
        { blockType: "text", title: "Sorun", body: "Satışlar elle giriliyordu. Yapılan karşılaştırma, pazaryeri raporunun sistemde kayıtlı satışların katbekat fazlasını gösterdiğini ortaya koydu – kâr ve stok rakamlarına güvenilemiyordu." },
        { blockType: "text", title: "Karar", body: "Siparişler, iadeler ve hakedişler doğrudan pazaryeri API'lerinden gelir. Her aşama bir ölçüm raporuyla başlar, hiçbir aşama atlanmaz." },
        { blockType: "list", title: "Sistem neler yapıyor", items: ["Birden fazla pazaryeri API ile bağlı", "Komisyon, kargo ve vergi sonrası satış başına net kâr", "Parti takibiyle FIFO değerleme", "Veri yazılmadan önce tutarlılık kontrolleri"] },
      ],
    },
  },
  mentorde: {
    en: { meta: "ERP · Education consulting", description: "ERP for an education consultancy: six portals from students and advisers to sales partners, with roles, permissions and a partner programme." },
    tr: { meta: "ERP · Eğitim danışmanlığı", description: "Bir eğitim danışmanlığı için ERP: öğrencilerden danışmanlara ve satış ortaklarına kadar altı portal; roller, yetkiler ve ortaklık programıyla." },
  },
  pruefdesk: {
    en: { meta: "[Category]", description: "[One or two sentences: which problem PrüfDesk solves and for whom]" },
    tr: { meta: "[Kategori]", description: "[Bir-iki cümle: PrüfDesk kimin için hangi sorunu çözüyor]" },
  },
  hafenx: {
    en: {
      meta: "Process digitalisation · PlentyONE",
      description: "Process management and digitalisation at a multichannel retailer and PlentyONE partner: capturing workflows, structuring them and turning them into systems.",
      metric: "[Figure pending approval]",
      caseStudy: [
        { blockType: "text", title: "Starting point", body: "Many channels, one warehouse, growing coordination effort – knowledge lived in people's heads instead of in processes." },
        { blockType: "text", title: "Approach", body: "A process inventory based on the APQC Process Classification Framework: every process with its trigger, owner, key data and dependencies – the foundation for an AI-supported operations layer." },
      ],
    },
    tr: {
      meta: "Süreç dijitalleştirme · PlentyONE",
      description: "Çok kanallı bir perakendeci ve PlentyONE iş ortağında süreç yönetimi ve dijitalleştirme: iş akışlarını kayıt altına almak, düzenlemek ve sistemlere dönüştürmek.",
      metric: "[Onay sonrası metrik]",
      caseStudy: [
        { blockType: "text", title: "Başlangıç durumu", body: "Çok sayıda kanal, tek depo, giderek artan koordinasyon yükü – bilgi süreçlerde değil, insanların kafasındaydı." },
        { blockType: "text", title: "Yaklaşım", body: "APQC Process Classification Framework'e göre süreç envanteri: her süreç tetikleyicisi, sorumlusu, ana verileri ve bağımlılıklarıyla – yapay zekâ destekli bir operasyon katmanının temeli." },
      ],
    },
  },
  applytogerman: {
    en: {
      meta: "Data platform · Education",
      description: "Studying in Germany on one platform: universities, degree programmes, scholarships and decision tools – fed by official sources, in three languages.",
      metric: "460 universities · 25,103 degree programmes",
      caseStudy: [
        { blockType: "text", title: "Problem", body: "Degree programmes are listed by DAAD, recognition by Anabin, admission details by Hochschulkompass, occupations by BERUFENET. Each source uses its own name for the same university." },
        { blockType: "text", title: "Decision", body: "Every university is identified by its Wikidata ID. This lets the sources be re-imported daily without creating duplicates." },
        { blockType: "flow", title: "Architecture", steps: [
          { label: "Sources: DAAD, Wikidata, BERUFENET, Anabin, Hochschulkompass" },
          { label: "Matching via Wikidata IDs, updated daily" },
          { label: "460 universities · 25,103 degree programmes · 209 cities", highlight: true },
          { label: "Search & comparison pages, tools, public API, AI assistant" },
        ] },
        { blockType: "text", title: "Result", body: "629 answered questions across 14 topics · [+X % organic traffic] · [X indexed pages]" },
      ],
    },
    tr: {
      meta: "Veri platformu · Eğitim",
      description: "Almanya'da okumak tek bir platformda: üniversiteler, bölümler, burslar ve karar araçları – resmî kaynaklardan beslenen, üç dilde.",
      metric: "460 üniversite · 25.103 bölüm",
      caseStudy: [
        { blockType: "text", title: "Sorun", body: "Bölümler DAAD'de, denklik bilgisi Anabin'de, kabul ayrıntıları Hochschulkompass'ta, meslek tanımları BERUFENET'te. Her kaynak aynı üniversite için farklı bir ad kullanıyor." },
        { blockType: "text", title: "Karar", body: "Her üniversite Wikidata kimliğiyle tanımlanıyor. Böylece kaynaklar her gün yeniden içe aktarılabiliyor ve mükerrer kayıt oluşmuyor." },
        { blockType: "flow", title: "Mimari", steps: [
          { label: "Kaynaklar: DAAD, Wikidata, BERUFENET, Anabin, Hochschulkompass" },
          { label: "Wikidata kimlikleriyle eşleştirme, günlük güncelleme" },
          { label: "460 üniversite · 25.103 bölüm · 209 şehir", highlight: true },
          { label: "Arama ve karşılaştırma sayfaları, araçlar, açık API, yapay zekâ asistanı" },
        ] },
        { blockType: "text", title: "Sonuç", body: "14 konuda 629 yanıtlanmış soru · [+%X organik trafik] · [X dizine eklenmiş sayfa]" },
      ],
    },
  },
  kompass: {
    en: { meta: "Web app · Beta", description: "Pulls homework from Schulportal Hessen and WebUntis and plans the afternoon. A separate key per family, optional end-to-end encryption.", metric: "18 languages · servers in Frankfurt" },
    tr: { meta: "Web uygulaması · Beta", description: "Ödevleri Schulportal Hessen ve WebUntis'ten çekip öğleden sonrayı planlar. Her aile için ayrı anahtar, isteğe bağlı uçtan uca şifreleme.", metric: "18 dil · Frankfurt'ta sunucular" },
  },
  foundercheck: {
    en: { meta: "Web app · Starting a business", description: "An honest report on your business idea in Germany: master craftsman requirement, permits, residence status, legal form, break-even and a 30-day launch plan – in one run.", metric: "Free during the beta" },
    tr: { meta: "Web uygulaması · Şirket kuruluşu", description: "Almanya'daki iş fikriniz için dürüst bir rapor: ustalık belgesi şartı, izinler, oturum durumu, şirket türü, başabaş noktası ve 30 günlük başlangıç planı – tek seferde.", metric: "Test sürecinde ücretsiz" },
  },
  "b2b-klar": {
    en: { meta: "[Category]", description: "[One or two sentences: which problem B2B-klar solves and for whom]" },
    tr: { meta: "[Kategori]", description: "[Bir-iki cümle: B2B-klar kimin için hangi sorunu çözüyor]" },
  },
  tokali: {
    en: { meta: "Company website · Law firm", description: "Brand presence and website for a law firm: practice areas, process overview and privacy texts." },
    tr: { meta: "Kurumsal web sitesi · Hukuk bürosu", description: "Bir hukuk bürosu için marka kimliği ve web sitesi: çalışma alanları, süreç anlatımı ve gizlilik metinleri." },
  },
  "produktions-erp": {
    en: { meta: "ERP · Manufacturing", description: "[One or two sentences: for which business and which workflows – e.g. orders, materials, production steps]" },
    tr: { meta: "ERP · Üretim", description: "[Bir-iki cümle: hangi işletme ve hangi süreçler için – ör. siparişler, malzeme, üretim adımları]" },
  },
};

const team = {
  en: {
    role: "Founder & Managing Director",
    bio: "Economist (Master's) with a background in managing non-profit organisations and in research. Combines process analysis with software development – measure first, then build.",
    focus: ["Process management", "Digitalisation", "ERP systems", "Product development"],
  },
  tr: {
    role: "Kurucu & Genel Müdür",
    bio: "Kâr amacı gütmeyen kurumların yönetiminde ve akademik araştırmada deneyimli iktisatçı (yüksek lisans). Süreç analizini yazılım geliştirmeyle birleştirir – önce ölç, sonra inşa et.",
    focus: ["Süreç yönetimi", "Dijitalleşme", "ERP sistemleri", "Ürün geliştirme"],
  },
};

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [slug, langs] of Object.entries(projects)) {
    const found = await payload.find({ collection: "projects", where: { slug: { equals: slug } }, limit: 1, depth: 0, req });
    const doc = found.docs[0];
    if (!doc) continue;
    for (const locale of ["en", "tr"] as const) {
      const t = langs[locale];
      await payload.update({
        collection: "projects",
        id: doc.id,
        locale,
        req,
        data: { meta: t.meta, description: t.description, metric: t.metric, ...(t.caseStudy ? { caseStudy: t.caseStudy } : {}) },
      });
    }
  }

  const halil = await payload.find({ collection: "team", where: { name: { equals: "Halil Yapralı" } }, limit: 1, depth: 0, req });
  const member = halil.docs[0];
  if (member) {
    for (const locale of ["en", "tr"] as const) {
      await payload.update({ collection: "team", id: member.id, locale, req, data: team[locale] });
    }
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Übersetzungen bleiben bestehen – nichts zurückzunehmen.
}
