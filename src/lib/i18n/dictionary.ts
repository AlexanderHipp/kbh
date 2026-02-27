export type Locale = "en" | "de";

export const dictionary = {
  en: {
    nav: {
      work: "Portfolio",
      about: "About",
      services: "Services",
      contact: "Contact",
      imprint: "Imprint",
      privacy: "Privacy",
    },
    hero: {
      headline: "From idea to series",
      subheadline:
        "Located in Tuttlingen – the heart of the world centre of medical technology. We accompany your product from concept to series production.",
      cta_primary: "View portfolio",
      cta_secondary: "Contact us",
    },
    imageComparison: {
      title: "From concept to series production",
      subtitle:
        "We accompany your product through every development phase – from the initial idea to series-ready production.",
      labelLeft: "Concept",
      labelRight: "Production",
    },
    work: {
      title: "Portfolio",
      subtitle:
        "A selection of our projects in medical technology, product design and development.",
      openPage: "View details",
      viewProject: "View project",
    },
    services: {
      title: "About Us",
      items: [
        {
          title: "Medical Engineering",
          description:
            "Located in the heart of the world centre of medical technology – our customers benefit from our team's extensive experience.",
        },
        {
          title: "Innovation",
          description:
            "We help you implement promising ideas and turn them into market-ready products.",
        },
        {
          title: "Development",
          description:
            "We have the right tools and know-how to implement your visions with precision.",
        },
        {
          title: "Series Production",
          description:
            "We don't stop at planning – we accompany you from concept through implementation and support your production.",
        },
      ],
    },
    process: {
      title: "Development Process",
      steps: [
        {
          number: "01",
          title: "Definition",
          description: "Defining requirements and specifications",
        },
        {
          number: "02",
          title: "Concept",
          description: "Developing the design concept",
        },
        {
          number: "03",
          title: "Development",
          description: "3D modeling and engineering",
        },
        {
          number: "04",
          title: "Qualification",
          description: "Testing and validation",
        },
        {
          number: "05",
          title: "Prototype",
          description: "Functional samples and production",
        },
      ],
    },
    clients: {
      title: "Trusted Partners",
      subtitle:
        "We collaborate with leading companies in medical technology and manufacturing.",
      list: ["Solidworks", "KeyShot", "AutoCAD", "Ultimaker 3D Printing"],
    },
    contact: {
      title: "Contact",
      subtitle:
        "Interested in our services? Just write or call us for a non-binding enquiry.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell us about your project...",
      privacyConsentPrefix: "I have read the ",
      privacyConsentSuffix:
        " and agree to the processing of my data for this enquiry.",
    },
    imprint: {
      title: "Imprint",
      legalNotice: "Information according to § 5 TMG",
      responsible: "Responsible for content",
      owner: "Owner",
      contact: "Contact",
      liabilityContent: "Liability for content",
      liabilityContentText:
        "The contents of our pages were created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws. We are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.",
      liabilityLinks: "Liability for links",
      liabilityLinksText:
        "Our website contains links to external third-party websites over whose content we have no control. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of a legal violation. Upon becoming aware of legal violations, we will remove such links immediately.",
      euDispute: "EU dispute resolution",
      euDisputeText:
        "The European Commission provides a platform for online dispute resolution (OS): ",
      euDisputeLink: "https://ec.europa.eu/consumers/odr/",
      euDisputeSuffix:
        ". We are not obliged or willing to participate in dispute resolution proceedings before a consumer arbitration board.",
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
  de: {
    nav: {
      work: "Portfolio",
      about: "Über uns",
      services: "Leistungen",
      contact: "Kontakt",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
    hero: {
      headline: "Von der Idee zur Serie",
      subheadline:
        "Im Herzen des Weltzentrums der Medizintechnik – Tuttlingen. Wir begleiten Ihr Produkt vom Konzept bis zur Serienproduktion.",
      cta_primary: "Portfolio ansehen",
      cta_secondary: "Kontakt",
    },
    imageComparison: {
      title: "Vom Entwurf zur Serienreife",
      subtitle:
        "Wir führen Ihr Produkt strukturiert durch jede Phase – vom ersten Konzept über die Entwicklung bis zur serienreifen Fertigung.",
      labelLeft: "Konzept",
      labelRight: "Produktion",
    },
    work: {
      title: "Portfolio",
      subtitle:
        "Eine Auswahl unserer Projekte in Medizintechnik, Produktdesign und Entwicklung.",
      openPage: "Details ansehen",
      viewProject: "Projekt ansehen",
    },
    services: {
      title: "Über uns",
      items: [
        {
          title: "Medizintechnik",
          description:
            "Im Herzen des Weltzentrums der Medizintechnik gelegen – unsere Kunden profitieren von der langjährigen Erfahrung unseres Teams.",
        },
        {
          title: "Innovation",
          description:
            "Wir helfen Ihnen, vielversprechende Ideen umzusetzen und marktreife Produkte daraus zu machen.",
        },
        {
          title: "Entwicklung",
          description:
            "Wir haben die richtigen Werkzeuge und das Know-how, um Ihre Visionen präzise umzusetzen.",
        },
        {
          title: "Serienproduktion",
          description:
            "Wir hören nicht bei der Planung auf – wir begleiten Sie vom Konzept über die Umsetzung bis zur Unterstützung Ihrer Produktion.",
        },
      ],
    },
    process: {
      title: "Entwicklungsprozess",
      steps: [
        {
          number: "01",
          title: "Definition",
          description: "Anforderungen und Spezifikationen definieren",
        },
        {
          number: "02",
          title: "Konzept",
          description: "Designkonzept entwickeln",
        },
        {
          number: "03",
          title: "Entwicklung",
          description: "3D-Modellierung und Engineering",
        },
        {
          number: "04",
          title: "Qualifikation",
          description: "Prüfung und Validierung",
        },
        {
          number: "05",
          title: "Prototyp",
          description: "Funktionsmuster und Produktion",
        },
      ],
    },
    clients: {
      title: "Vertrauensvolle Partner",
      subtitle:
        "Wir arbeiten mit führenden Unternehmen in der Medizintechnik und Fertigung zusammen.",
      list: ["Solidworks", "KeyShot", "AutoCAD", "Ultimaker 3D-Druck"],
    },
    contact: {
      title: "Kontakt",
      subtitle:
        "Interessiert an unseren Leistungen? Schreiben oder rufen Sie uns einfach an für eine unverbindliche Anfrage.",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      send: "Nachricht senden",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "ihre@email.de",
      messagePlaceholder: "Erzählen Sie uns von Ihrem Projekt...",
      privacyConsentPrefix: "Ich habe die ",
      privacyConsentSuffix:
        " gelesen und stimme der Verarbeitung meiner Daten für diese Anfrage zu.",
    },
    imprint: {
      title: "Impressum",
      legalNotice: "Angaben gemäß § 5 TMG",
      responsible: "Verantwortlich für den Inhalt",
      owner: "Inhaber",
      contact: "Kontakt",
      liabilityContent: "Haftung für Inhalte",
      liabilityContentText:
        "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Eine Überwachung der übermittelten oder gespeicherten fremden Informationen oder eine Forschung nach Umständen, die auf eine rechtswidrige Tätigkeit hinweisen, ist uns nicht zumutbar.",
      liabilityLinks: "Haftung für Links",
      liabilityLinksText:
        "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      euDispute: "EU-Streitschlichtung",
      euDisputeText:
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ",
      euDisputeLink: "https://ec.europa.eu/consumers/odr/",
      euDisputeSuffix:
        ". Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    },
    footer: {
      copyright: "Alle Rechte vorbehalten.",
    },
  },
};

// Define Dictionary type based on structure, not literal values
export interface Dictionary {
  nav: {
    work: string;
    about: string;
    services: string;
    contact: string;
    imprint: string;
    privacy: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
  };
  imageComparison: {
    title: string;
    subtitle: string;
    labelLeft: string;
    labelRight: string;
  };
  work: {
    title: string;
    subtitle: string;
    openPage: string;
    viewProject: string;
  };
  services: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    title: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  clients: {
    title: string;
    subtitle: string;
    list: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    privacyConsentPrefix: string;
    privacyConsentSuffix: string;
  };
  imprint: {
    title: string;
    legalNotice: string;
    responsible: string;
    owner: string;
    contact: string;
    liabilityContent: string;
    liabilityContentText: string;
    liabilityLinks: string;
    liabilityLinksText: string;
    euDispute: string;
    euDisputeText: string;
    euDisputeLink: string;
    euDisputeSuffix: string;
  };
  footer: {
    copyright: string;
  };
}
