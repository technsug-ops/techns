import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

/**
 * Inhalte für die Projekt-Detailseiten (DE/EN/TR): Fallstudien und fehlende Kurzbeschreibungen.
 * Überschreibt nur, was leer ist oder noch ein Platzhalter in eckigen Klammern ist –
 * im CMS bereits gepflegte Texte bleiben unangetastet.
 */

type Locale = "de" | "en" | "tr";
type Block =
  | { blockType: "text"; title: string; body: string }
  | { blockType: "list"; title: string; items: string[] }
  | { blockType: "flow"; title: string; steps: { label: string; highlight?: boolean }[] };
type Entry = {
  meta?: string;
  description?: string;
  metric?: string;
  caseStudy: Block[];
};
type ProjectContent = { stack?: string[]; texts: Record<Locale, Entry> };

const t = (title: string, body: string): Block => ({ blockType: "text", title, body });
const l = (title: string, items: string[]): Block => ({ blockType: "list", title, items });
const f = (title: string, steps: string[], highlight: number[] = []): Block => ({
  blockType: "flow",
  title,
  steps: steps.map((label, i) => ({ label, highlight: highlight.includes(i) })),
});

const content: Record<string, ProjectContent> = {
  pruefdesk: {
    stack: ["Next.js", "PWA", "Offline-Modus"],
    texts: {
      de: {
        meta: "SaaS · Prüfung & Außendienst",
        description: "Planungs- und Außendienst-Software für Prüfbetriebe: Prüftermine planen, Prüfungen vor Ort erfassen – auch ohne Netz – und Ergebnisse sauber dokumentieren.",
        metric: "In Entwicklung · offline-fähig",
        caseStudy: [
          t("Ausgangslage", "Prüfaufträge werden oft über Tabellen, Papierformulare und Telefon koordiniert. Im Außendienst fehlt häufig das Netz, Ergebnisse werden doppelt erfasst und die Dokumentation hinkt hinterher."),
          l("Was PrüfDesk abdeckt", [
            "Planung von Prüfterminen und Einsätzen für das Team",
            "Erfassung der Prüfungen direkt vor Ort auf Smartphone oder Tablet",
            "Offline-Zugriff auf vertrauenswürdigen Geräten für 24 Stunden",
            "Mandantenfähig: Anmeldung mit Firmencode, E-Mail und Passwort",
            "Getrennter Admin-Zugang für die Verwaltung",
            "Als App installierbar (PWA), mehrsprachige Oberfläche",
          ]),
          f("Ablauf", ["Auftrag", "Planung", "Prüfung vor Ort", "Dokumentation"], [2]),
        ],
      },
      en: {
        meta: "SaaS · Inspection & field service",
        description: "Planning and field-service software for inspection companies: schedule inspections, record them on site – even without a connection – and document results cleanly.",
        metric: "In development · works offline",
        caseStudy: [
          t("Starting point", "Inspection jobs are often coordinated through spreadsheets, paper forms and phone calls. In the field there is frequently no connection, results get entered twice and documentation lags behind."),
          l("What PrüfDesk covers", [
            "Scheduling inspections and assignments for the team",
            "Recording inspections on site on a smartphone or tablet",
            "Offline access on trusted devices for 24 hours",
            "Multi-tenant: sign-in with company code, email and password",
            "Separate admin access for management",
            "Installable as an app (PWA), multilingual interface",
          ]),
          f("Workflow", ["Job", "Planning", "On-site inspection", "Documentation"], [2]),
        ],
      },
      tr: {
        meta: "SaaS · Denetim ve saha hizmeti",
        description: "Denetim firmaları için planlama ve saha yazılımı: denetim randevularını planlayın, denetimleri sahada – internet olmasa bile – kaydedin ve sonuçları düzenli belgeleyin.",
        metric: "Geliştiriliyor · çevrimdışı çalışır",
        caseStudy: [
          t("Başlangıç durumu", "Denetim işleri çoğu zaman tablolar, kâğıt formlar ve telefonla koordine ediliyor. Sahada sık sık bağlantı olmuyor, sonuçlar iki kez giriliyor ve belgeleme geride kalıyor."),
          l("PrüfDesk neleri kapsıyor", [
            "Ekip için denetim randevuları ve görev planlaması",
            "Denetimlerin sahada akıllı telefon veya tabletten kaydı",
            "Güvenilir cihazlarda 24 saat çevrimdışı erişim",
            "Çok kiracılı: firma kodu, e-posta ve şifre ile giriş",
            "Yönetim için ayrı yönetici girişi",
            "Uygulama olarak kurulabilir (PWA), çok dilli arayüz",
          ]),
          f("İş akışı", ["İş emri", "Planlama", "Sahada denetim", "Belgeleme"], [2]),
        ],
      },
    },
  },

  "b2b-klar": {
    texts: {
      de: {
        meta: "SaaS · Partnerportal",
        description: "Partnerportal für den indirekten Vertrieb: Tippgeber, Freelancer, Fachpartner und Händler arbeiten in einem Portal – mit Leads, Provisionen, Material und Aufträgen.",
        metric: "4 Partnertypen · 9 Kernmodule · 28 Zusatzmodule",
        caseStudy: [
          t("Ausgangslage", "Unternehmen mit indirektem Vertrieb verwalten Tippgeber und Händler oft über E-Mail, Excel und Einzelabsprachen. Leads gehen verloren, Provisionen sind schwer nachvollziehbar und Partner haben keinen Überblick über ihren Stand."),
          l("Was das Portal bietet", [
            "Ein Portal für vier Partnertypen: Tippgeber, Freelancer, Fachpartner, Händler",
            "Lead-Erfassung und -Verfolgung bis zum Auftrag",
            "Provisionsmodelle mit Stufen und nachvollziehbarer Abrechnung",
            "Material- und Dokumentenbereich für Partner",
            "Dashboard mit Leads, Partnern und Umsatz",
            "White Label: im eigenen Erscheinungsbild des Unternehmens",
            "Vier Sprachen: Deutsch, Türkisch, Englisch, Niederländisch",
          ]),
          t("Modularer Aufbau", "Der Kern mit neun Modulen passt zu jedem Unternehmen; 28 optionale Branchenmodule werden zugeschaltet, wenn sie gebraucht werden. Entwickelt und betrieben von TechNS."),
        ],
      },
      en: {
        meta: "SaaS · Partner portal",
        description: "Partner portal for indirect sales: referrers, freelancers, specialist partners and dealers work in one portal – with leads, commission, assets and orders.",
        metric: "4 partner types · 9 core modules · 28 add-ons",
        caseStudy: [
          t("Starting point", "Companies with indirect sales often manage referrers and dealers through email, Excel and one-off arrangements. Leads get lost, commission is hard to trace and partners have no overview of where they stand."),
          l("What the portal offers", [
            "One portal for four partner types: referrers, freelancers, specialist partners, dealers",
            "Lead capture and tracking through to the order",
            "Tiered commission models with transparent payouts",
            "Asset and document area for partners",
            "Dashboard with leads, partners and revenue",
            "White label: in the company's own branding",
            "Four languages: German, Turkish, English, Dutch",
          ]),
          t("Modular design", "The core of nine modules fits any company; 28 optional industry modules are switched on when needed. Developed and operated by TechNS."),
        ],
      },
      tr: {
        meta: "SaaS · Partner portalı",
        description: "Dolaylı satış için partner portalı: referans verenler, serbest çalışanlar, uzman partnerler ve bayiler tek portalda çalışır – lead'ler, komisyonlar, materyaller ve siparişlerle.",
        metric: "4 partner türü · 9 çekirdek modül · 28 ek modül",
        caseStudy: [
          t("Başlangıç durumu", "Dolaylı satış yapan firmalar referans verenleri ve bayileri çoğu zaman e-posta, Excel ve tek tek anlaşmalarla yönetiyor. Lead'ler kayboluyor, komisyonlar zor takip ediliyor ve partnerler kendi durumlarını göremiyor."),
          l("Portal neler sunuyor", [
            "Dört partner türü için tek portal: referans veren, serbest çalışan, uzman partner, bayi",
            "Lead kaydı ve siparişe kadar takip",
            "Kademeli komisyon modelleri ve şeffaf ödeme",
            "Partnerler için materyal ve doküman alanı",
            "Lead, partner ve ciroyu gösteren pano",
            "White label: firmanın kendi kurumsal kimliğiyle",
            "Dört dil: Almanca, Türkçe, İngilizce, Felemenkçe",
          ]),
          t("Modüler yapı", "Dokuz modülden oluşan çekirdek her firmaya uyar; 28 isteğe bağlı sektör modülü ihtiyaç olduğunda eklenir. TechNS tarafından geliştirilip işletilir."),
        ],
      },
    },
  },

  foundercheck: {
    texts: {
      de: {
        caseStudy: [
          t("Ausgangslage", "Wer in Deutschland gründen will, stößt schnell auf Fragen, die über den Businessplan hinausgehen: Braucht mein Vorhaben einen Meister? Welche Erlaubnisse sind nötig? Passt mein Aufenthaltstitel? Die Antworten sind über viele Stellen verstreut."),
          l("Was der Bericht prüft", [
            "Meisterpflicht und Zulassung im Handwerk",
            "Nötige Erlaubnisse und Genehmigungen",
            "Aufenthaltsrechtliche Voraussetzungen",
            "Passende Rechtsform",
            "Break-even: ab wann sich die Idee trägt",
            "Plan für die ersten 30 Tage nach der Gründung",
          ]),
          f("So funktioniert es", ["Idee beschreiben", "Fragen beantworten", "Ehrlicher Bericht"], [2]),
        ],
      },
      en: {
        caseStudy: [
          t("Starting point", "Anyone who wants to start a business in Germany quickly faces questions beyond the business plan: Does my trade require a master craftsman? Which permits are needed? Does my residence permit allow it? The answers are scattered across many authorities."),
          l("What the report checks", [
            "Master craftsman requirement and trade registration",
            "Required permits and licences",
            "Residence-law requirements",
            "Suitable legal form",
            "Break-even: when the idea pays for itself",
            "Plan for the first 30 days after founding",
          ]),
          f("How it works", ["Describe the idea", "Answer questions", "Honest report"], [2]),
        ],
      },
      tr: {
        caseStudy: [
          t("Başlangıç durumu", "Almanya'da şirket kurmak isteyenler kısa sürede iş planının ötesinde sorularla karşılaşıyor: İşim için ustalık belgesi gerekiyor mu? Hangi izinler lazım? Oturum iznim buna uygun mu? Cevaplar birçok kuruma dağılmış durumda."),
          l("Rapor neleri inceliyor", [
            "Ustalık belgesi zorunluluğu ve esnaf kaydı",
            "Gerekli izin ve ruhsatlar",
            "Oturum hukuku açısından koşullar",
            "Uygun şirket türü",
            "Başabaş noktası: fikir ne zaman kendini taşır",
            "Kuruluştan sonraki ilk 30 günün planı",
          ]),
          f("Nasıl çalışır", ["Fikri anlat", "Soruları yanıtla", "Dürüst rapor"], [2]),
        ],
      },
    },
  },

  kompass: {
    texts: {
      de: {
        caseStudy: [
          t("Ausgangslage", "Eltern fragen jeden Abend nach Hausaufgaben und Klassenarbeiten – die Informationen stecken verteilt in Schulportal, WebUntis, Heft und Tafel. Kinder verlieren den Überblick, Eltern erfahren von Arbeiten oft zu spät."),
          l("Funktionen", [
            "Automatischer Abruf aus Schulportal Hessen und WebUntis (optional)",
            "Manuelle Eingabe für alle anderen Schulen in Sekunden",
            "„Tag starten“: Vorschlag für Reihenfolge und Zeit am Nachmittag",
            "Elternübersicht: heute, nächste Arbeit, was Aufmerksamkeit braucht",
            "Wochenbericht am Sonntag mit Hausaufgaben, Lernzeit, Lesen und Noten",
            "Noten mit Gewichtung und Rechner für die Zielnote",
            "Drei Altersmodi für Klasse 5–6, 7–8 und 9–10",
          ]),
          l("Datenschutz", [
            "Server in Frankfurt am Main",
            "Eigener Schlüssel pro Familie (AES-256)",
            "Optionale Ende-zu-Ende-Verschlüsselung",
            "Keine Werbung, kein Tracking, kein Datenverkauf",
          ]),
          t("Stand", "Kostenlose Beta für Klasse 5–10 in Hessen, Nordrhein-Westfalen, Baden-Württemberg und Niedersachsen; Oberfläche in 18 Sprachen."),
        ],
      },
      en: {
        caseStudy: [
          t("Starting point", "Parents ask about homework and tests every evening – the information is scattered across the school portal, WebUntis, exercise books and the board. Children lose track, and parents often hear about tests too late."),
          l("Features", [
            "Automatic import from Schulportal Hessen and WebUntis (optional)",
            "Manual entry for every other school in seconds",
            "“Start the day”: suggested order and timing for the afternoon",
            "Parent overview: today, next test, what needs attention",
            "Weekly report on Sundays with homework, study time, reading and grades",
            "Weighted grades and a target-grade calculator",
            "Three age modes for grades 5–6, 7–8 and 9–10",
          ]),
          l("Privacy", [
            "Servers in Frankfurt am Main",
            "A separate key per family (AES-256)",
            "Optional end-to-end encryption",
            "No ads, no tracking, no selling of data",
          ]),
          t("Status", "Free beta for grades 5–10 in Hesse, North Rhine-Westphalia, Baden-Württemberg and Lower Saxony; interface in 18 languages."),
        ],
      },
      tr: {
        caseStudy: [
          t("Başlangıç durumu", "Veliler her akşam ödevleri ve sınavları soruyor – bilgiler okul portalı, WebUntis, defter ve tahta arasında dağınık. Çocuklar takibi kaybediyor, veliler sınavlardan çoğu zaman geç haberdar oluyor."),
          l("Özellikler", [
            "Schulportal Hessen ve WebUntis'ten otomatik aktarım (isteğe bağlı)",
            "Diğer tüm okullar için saniyeler içinde elle giriş",
            "„Güne başla“: öğleden sonra için sıra ve süre önerisi",
            "Veli özeti: bugün, sıradaki sınav, dikkat gerektirenler",
            "Pazar günleri ödev, çalışma süresi, okuma ve notları içeren haftalık rapor",
            "Ağırlıklı notlar ve hedef not hesaplayıcı",
            "5–6, 7–8 ve 9–10. sınıflar için üç yaş modu",
          ]),
          l("Veri koruma", [
            "Sunucular Frankfurt am Main'da",
            "Her aileye ayrı anahtar (AES-256)",
            "İsteğe bağlı uçtan uca şifreleme",
            "Reklam yok, takip yok, veri satışı yok",
          ]),
          t("Durum", "Hessen, Kuzey Ren-Vestfalya, Baden-Württemberg ve Aşağı Saksonya'da 5–10. sınıflar için ücretsiz beta; arayüz 18 dilde."),
        ],
      },
    },
  },

  mentorde: {
    stack: ["Laravel", "PHP", "MySQL", "Alpine.js", "Gemini (KI)"],
    texts: {
      de: {
        metric: "7 Portale · 33+ Module",
        caseStudy: [
          t("Ausgangslage", "Bildungsberatungen, die Studierende nach Deutschland begleiten, arbeiten oft mit fünf Excel-Listen, WhatsApp und Kalendern nebeneinander. Bewerber gehen verloren, Fristen werden verpasst und niemand misst, was funktioniert."),
          l("Sieben Portale in einem System", [
            "Bewerber: Antrag, Dokumente, Termine, KI-Assistent",
            "Studierende: Schritte nach Vertragsabschluss bis zur Unterkunft",
            "Berater: zugewiesene Bewerber, Pipeline, Kalender, Kennzahlen",
            "Vertriebspartner: Empfehlungen, gestaffelte Provisionen, UTM-Links",
            "Marketing: Kampagnen, Lead-Pipeline, Attribution",
            "Geschäftsführung: Auswertungen, Finanzen, Personal, DSGVO",
            "Partnerfirmen: eigenes Panel im eigenen Erscheinungsbild",
          ]),
          l("Kernmodule", [
            "CRM und Lead-Pipeline",
            "Verträge und Dokumenten-Pipeline",
            "Termine und Kalender",
            "Studiengangssuche (UniMatch)",
            "Zahlungen und Rechnungen",
            "KI-Assistent auf Basis eigener Inhalte",
            "Analyse-Dashboards",
          ]),
          t("Betrieb", "Mandantenfähig für Partnerfirmen, Daten in Frankfurt, tägliche Backups, Rollen- und Rechtesystem mit Zwei-Faktor-Anmeldung."),
        ],
      },
      en: {
        metric: "7 portals · 33+ modules",
        caseStudy: [
          t("Starting point", "Education consultancies that guide students to Germany often juggle five Excel sheets, WhatsApp and calendars at once. Applicants get lost, deadlines are missed and nobody measures what works."),
          l("Seven portals in one system", [
            "Applicants: application, documents, appointments, AI assistant",
            "Students: steps after signing, through to accommodation",
            "Advisors: assigned applicants, pipeline, calendar, KPIs",
            "Sales partners: referrals, tiered commission, UTM links",
            "Marketing: campaigns, lead pipeline, attribution",
            "Management: analytics, finance, HR, GDPR",
            "Partner firms: their own panel in their own branding",
          ]),
          l("Core modules", [
            "CRM and lead pipeline",
            "Contracts and document pipeline",
            "Appointments and calendar",
            "Programme finder (UniMatch)",
            "Payments and invoicing",
            "AI assistant based on the firm's own content",
            "Analytics dashboards",
          ]),
          t("Operations", "Multi-tenant for partner firms, data in Frankfurt, daily backups, roles and permissions with two-factor sign-in."),
        ],
      },
      tr: {
        metric: "7 portal · 33+ modül",
        caseStudy: [
          t("Başlangıç durumu", "Öğrencileri Almanya'ya yönlendiren eğitim danışmanlıkları çoğu zaman beş Excel listesi, WhatsApp ve takvimle aynı anda çalışıyor. Adaylar kayboluyor, son tarihler kaçıyor ve neyin işe yaradığını kimse ölçmüyor."),
          l("Tek sistemde yedi portal", [
            "Aday: başvuru, belgeler, randevular, yapay zekâ asistanı",
            "Öğrenci: sözleşme sonrası adımlar, konaklamaya kadar",
            "Danışman: atanan adaylar, süreç hattı, takvim, KPI'lar",
            "Satış ortağı: referanslar, kademeli komisyon, UTM linkleri",
            "Pazarlama: kampanyalar, lead hattı, atıf",
            "Yönetim: analizler, finans, İK, KVKK/DSGVO",
            "Partner firmalar: kendi kurumsal kimliğinde kendi paneli",
          ]),
          l("Çekirdek modüller", [
            "CRM ve lead hattı",
            "Sözleşmeler ve belge hattı",
            "Randevu ve takvim",
            "Bölüm bulucu (UniMatch)",
            "Ödemeler ve faturalar",
            "Firmanın kendi içeriğine dayanan yapay zekâ asistanı",
            "Analiz panoları",
          ]),
          t("İşletim", "Partner firmalar için çok kiracılı, veriler Frankfurt'ta, günlük yedekleme, iki adımlı girişle rol ve yetki sistemi."),
        ],
      },
    },
  },

  "produktions-erp": {
    texts: {
      de: {
        description: "ERP zur Produktionssteuerung für einen Fertigungsbetrieb: Aufträge, Material, Fertigungsschritte und Termine in einem System statt in verstreuten Listen.",
        metric: "In Entwicklung",
        caseStudy: [
          t("Ausgangslage", "In vielen Fertigungsbetrieben laufen Aufträge, Materialplanung und Fertigungsstand über Tabellen und Zuruf. Wer wissen will, wo ein Auftrag steht, muss nachfragen."),
          l("Geplanter Umfang", [
            "Auftragserfassung und Auftragsübersicht",
            "Materialbedarf und Bestand",
            "Fertigungsschritte mit Status je Auftrag",
            "Termin- und Kapazitätsplanung",
            "Rollen für Büro, Fertigung und Geschäftsführung",
          ]),
          f("Ablauf", ["Auftrag", "Material", "Fertigung", "Auslieferung"], [2]),
        ],
      },
      en: {
        description: "Production-control ERP for a manufacturing business: orders, materials, production steps and deadlines in one system instead of scattered lists.",
        metric: "In development",
        caseStudy: [
          t("Starting point", "In many manufacturing businesses, orders, material planning and production status are handled through spreadsheets and word of mouth. Anyone who wants to know where an order stands has to ask."),
          l("Planned scope", [
            "Order entry and order overview",
            "Material requirements and stock",
            "Production steps with status per order",
            "Scheduling and capacity planning",
            "Roles for office, shop floor and management",
          ]),
          f("Workflow", ["Order", "Material", "Production", "Delivery"], [2]),
        ],
      },
      tr: {
        description: "Bir üretim işletmesi için üretim yönetimi ERP'si: siparişler, malzeme, üretim adımları ve termin tarihleri dağınık listeler yerine tek sistemde.",
        metric: "Geliştiriliyor",
        caseStudy: [
          t("Başlangıç durumu", "Birçok üretim işletmesinde siparişler, malzeme planlaması ve üretim durumu tablolar ve sözlü bilgiyle yürüyor. Bir siparişin nerede olduğunu öğrenmek isteyen sormak zorunda kalıyor."),
          l("Planlanan kapsam", [
            "Sipariş girişi ve sipariş özeti",
            "Malzeme ihtiyacı ve stok",
            "Sipariş bazında durumlu üretim adımları",
            "Termin ve kapasite planlaması",
            "Ofis, üretim ve yönetim için roller",
          ]),
          f("İş akışı", ["Sipariş", "Malzeme", "Üretim", "Teslimat"], [2]),
        ],
      },
    },
  },

  maide: {
    texts: {
      de: {
        caseStudy: [
          t("Ausgangslage", "Ein neu eröffnetes Restaurant in Köln brauchte schnell eine Website, die Gäste in der Umgebung finden – mit Speisekarte, Öffnungszeiten und Reservierung."),
          l("Umsetzung", [
            "Website mit Speisekarte, Standort und Öffnungszeiten",
            "Anbindung eines externen Reservierungsdienstes",
            "Lokale Suchmaschinenoptimierung für Köln und türkische Küche",
            "Besucherstatistik",
            "Regelmäßige Auswertungen für den Inhaber",
          ]),
          t("Ergebnis", "Live seit Juni 2026; der Inhaber bekommt Berichte, wie Gäste die Website finden und nutzen."),
        ],
      },
      en: {
        caseStudy: [
          t("Starting point", "A newly opened restaurant in Cologne needed a website quickly that local guests would find – with the menu, opening hours and reservations."),
          l("What we built", [
            "Website with menu, location and opening hours",
            "Integration of an external reservation service",
            "Local search engine optimisation for Cologne and Turkish cuisine",
            "Visitor statistics",
            "Regular reports for the owner",
          ]),
          t("Result", "Live since June 2026; the owner receives reports on how guests find and use the website."),
        ],
      },
      tr: {
        caseStudy: [
          t("Başlangıç durumu", "Köln'de yeni açılan bir restoranın, çevredeki misafirlerin bulabileceği bir web sitesine hızla ihtiyacı vardı – menü, çalışma saatleri ve rezervasyonla."),
          l("Neler yaptık", [
            "Menü, konum ve çalışma saatleriyle web sitesi",
            "Harici bir rezervasyon servisinin bağlanması",
            "Köln ve Türk mutfağı için yerel arama motoru optimizasyonu",
            "Ziyaretçi istatistikleri",
            "İşletme sahibi için düzenli raporlar",
          ]),
          t("Sonuç", "Haziran 2026'dan beri yayında; işletme sahibi, misafirlerin siteyi nasıl bulup kullandığına dair raporlar alıyor."),
        ],
      },
    },
  },

  tokali: {
    stack: ["Next.js", "TypeScript"],
    texts: {
      de: {
        caseStudy: [
          t("Aufgabe", "Eine Anwaltskanzlei brauchte einen vollständigen Markenauftritt: Logo, Farbsystem und eine Website, die die Rechtsgebiete klar erklärt und Mandanten den Weg zur Erstberatung zeigt."),
          l("Leistungen", [
            "Logo-Entwicklung („Siegel“ aus Waage und Pult) in vier Farbvarianten",
            "Farbsystem mit geprüften Kontrasten",
            "Website mit fünf Rechtsgebieten: Strafvollzug, Strafrecht, Arbeitsrecht, Verwaltungsrecht, Immobilien- und Mietrecht",
            "Dreistufige Prozessdarstellung: Erstgespräch, Strategie und Vollmacht, Begleitung",
            "Kontakt per Telefon, WhatsApp und E-Mail",
            "Impressum, Datenschutzhinweise und Cookie-Richtlinie",
          ]),
          f("Mandantenweg", ["Erstgespräch", "Strategie & Vollmacht", "Begleitung"], [0]),
        ],
      },
      en: {
        caseStudy: [
          t("The brief", "A law firm needed a complete brand presence: logo, colour system and a website that explains the practice areas clearly and shows clients the way to a first consultation."),
          l("What we delivered", [
            "Logo design (a “seal” combining scales and lectern) in four colourways",
            "Colour system with checked contrast ratios",
            "Website with five practice areas: sentence enforcement, criminal, employment, administrative, real-estate and tenancy law",
            "Three-step process: first meeting, strategy and power of attorney, ongoing support",
            "Contact by phone, WhatsApp and email",
            "Legal notice, privacy notice and cookie policy",
          ]),
          f("Client journey", ["First meeting", "Strategy & mandate", "Ongoing support"], [0]),
        ],
      },
      tr: {
        caseStudy: [
          t("Görev", "Bir hukuk bürosunun eksiksiz bir marka kimliğine ihtiyacı vardı: logo, renk sistemi ve çalışma alanlarını net anlatan, müvekkillere ilk görüşmeye giden yolu gösteren bir web sitesi."),
          l("Neler teslim ettik", [
            "Terazi ve kürsüden oluşan „mühür“ logo, dört renk varyantında",
            "Kontrastları kontrol edilmiş renk sistemi",
            "Beş çalışma alanıyla web sitesi: infaz, ceza, iş, idare, gayrimenkul/kira/tahliye hukuku",
            "Üç adımlı süreç: ilk görüşme, strateji ve vekâlet, takip",
            "Telefon, WhatsApp ve e-posta ile iletişim",
            "Künye, KVKK aydınlatma metni ve çerez politikası",
          ]),
          f("Müvekkil yolculuğu", ["İlk görüşme", "Strateji ve vekâlet", "Takip"], [0]),
        ],
      },
    },
  },

  "preispirat24-app": {
    texts: {
      de: {
        caseStudy: [
          t("Ausgangslage", "Ein Großhändler für Tankstellen-, Kiosk- und Autozubehör beliefert Geschäftskunden in vielen Ländern Europas. Nachbestellungen liefen über Webshop, Telefon und Außendienst."),
          l("Die App", [
            "Komplettes Sortiment auf dem Smartphone",
            "Händlerpreise erst nach Anmeldung als Geschäftskunde",
            "Schnelle Nachbestellung direkt im Laden",
            "Anbindung an den bestehenden Webshop",
          ]),
        ],
      },
      en: {
        caseStudy: [
          t("Starting point", "A wholesaler of petrol station, kiosk and car accessory goods supplies business customers in many European countries. Reorders came in through the web shop, by phone and via field sales."),
          l("The app", [
            "The full product range on the smartphone",
            "Trade prices only after signing in as a business customer",
            "Quick reordering right in the shop",
            "Connection to the existing web shop",
          ]),
        ],
      },
      tr: {
        caseStudy: [
          t("Başlangıç durumu", "Akaryakıt istasyonu, büfe ve oto aksesuarı ürünleri satan bir toptancı, Avrupa'nın birçok ülkesindeki kurumsal müşterilere tedarik sağlıyor. Yeniden siparişler web mağazası, telefon ve saha satışı üzerinden geliyordu."),
          l("Uygulama", [
            "Tüm ürün yelpazesi akıllı telefonda",
            "Bayi fiyatları yalnızca kurumsal müşteri girişinden sonra",
            "Doğrudan dükkândan hızlı yeniden sipariş",
            "Mevcut web mağazasına bağlantı",
          ]),
        ],
      },
    },
  },

  "sunvi-app": {
    texts: {
      de: {
        caseStudy: [
          t("Ausgangslage", "Ein Großhändler aus Schleswig-Holstein beliefert seit 2000 Kioske und Tankstellen im In- und Ausland – schnell, flexibel und zuverlässig. Händlerpreise sind nur für angemeldete Kunden sichtbar."),
          l("Die App", [
            "Sortiment mit Händlerpreisen nach Anmeldung",
            "Nachbestellung unterwegs in wenigen Schritten",
            "Anbindung an den bestehenden Onlineshop",
          ]),
        ],
      },
      en: {
        caseStudy: [
          t("Starting point", "A wholesaler from Schleswig-Holstein has been supplying kiosks and petrol stations at home and abroad since 2000 – fast, flexible and reliable. Trade prices are visible only to signed-in customers."),
          l("The app", [
            "Product range with trade prices after sign-in",
            "Reordering on the go in a few steps",
            "Connection to the existing online shop",
          ]),
        ],
      },
      tr: {
        caseStudy: [
          t("Başlangıç durumu", "Schleswig-Holstein merkezli bir toptancı 2000'den beri yurt içinde ve yurt dışında büfelere ve akaryakıt istasyonlarına hızlı, esnek ve güvenilir şekilde tedarik sağlıyor. Bayi fiyatlarını yalnızca giriş yapan müşteriler görebiliyor."),
          l("Uygulama", [
            "Girişten sonra bayi fiyatlarıyla ürün yelpazesi",
            "Yolda birkaç adımda yeniden sipariş",
            "Mevcut online mağazaya bağlantı",
          ]),
        ],
      },
    },
  },
};

const isPlaceholder = (v: unknown) => typeof v !== "string" || v.trim() === "" || v.trim().startsWith("[");

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const [slug, project] of Object.entries(content)) {
    const found = await payload.find({ collection: "projects", where: { slug: { equals: slug } }, limit: 1, depth: 0, req, locale: "de" });
    const doc = found.docs[0];
    if (!doc) continue;

    if (project.stack && (!doc.stack || doc.stack.length === 0)) {
      await payload.update({ collection: "projects", id: doc.id, req, data: { stack: project.stack } });
    }

    for (const locale of ["de", "en", "tr"] as const) {
      const current = await payload.findByID({ collection: "projects", id: doc.id, req, locale, fallbackLocale: false, depth: 0 });
      const entry = project.texts[locale];
      const data: Record<string, unknown> = {};
      if (entry.meta && isPlaceholder(current.meta)) data.meta = entry.meta;
      if (entry.description && isPlaceholder(current.description)) data.description = entry.description;
      if (entry.metric && isPlaceholder(current.metric)) data.metric = entry.metric;
      if (!current.caseStudy || current.caseStudy.length === 0) data.caseStudy = entry.caseStudy;
      if (Object.keys(data).length) await payload.update({ collection: "projects", id: doc.id, req, locale, data });
    }
  }
  await applyCorrections({ payload, req });
}

/** Bekannte veraltete Formulierung (6 → 7 Portale) gezielt korrigieren, nur wenn der Text noch unverändert ist. */
const corrections: { slug: string; locale: Locale; field?: "description" | "metric"; from: string; to: string }[] = [
  { slug: "mentorde", locale: "de", from: "sechs Portale", to: "sieben Portale" },
  { slug: "mentorde", locale: "en", from: "six portals", to: "seven portals" },
  { slug: "mentorde", locale: "tr", from: "altı portal", to: "yedi portal" },
  // Zahlen der Live-Seite schwanken täglich – gerundet statt tagesgenau.
  { slug: "applytogerman", locale: "de", field: "metric", from: "460 Hochschulen · 25.103 Studiengänge", to: "440+ Hochschulen · 24.000+ Studiengänge" },
  { slug: "applytogerman", locale: "en", field: "metric", from: "460 universities · 25,103 degree programmes", to: "440+ universities · 24,000+ degree programmes" },
  { slug: "applytogerman", locale: "tr", field: "metric", from: "460 üniversite · 25.103 bölüm", to: "440+ üniversite · 24.000+ bölüm" },
];

async function applyCorrections({ payload, req }: Pick<MigrateUpArgs, "payload" | "req">) {
  for (const c of corrections) {
    const found = await payload.find({ collection: "projects", where: { slug: { equals: c.slug } }, limit: 1, depth: 0, req, locale: c.locale, fallbackLocale: false });
    const doc = found.docs[0];
    const field = c.field ?? "description";
    const value = doc?.[field];
    if (doc && typeof value === "string" && value.includes(c.from)) {
      await payload.update({ collection: "projects", id: doc.id, req, locale: c.locale, data: { [field]: value.replace(c.from, c.to) } });
    }
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Inhaltsmigration – kein automatisches Zurücknehmen, damit im CMS nachbearbeitete Texte nicht verloren gehen.
}
