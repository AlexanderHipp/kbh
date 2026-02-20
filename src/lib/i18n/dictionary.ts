export type Locale = "en" | "de";

export const dictionary = {
  en: {
    nav: {
      work: "Portfolio",
      about: "About",
      services: "Services",
      contact: "Contact",
      imprint: "Imprint",
    },
    hero: {
      headline: "Solutions for innovative medical technology products of tomorrow.",
      subheadline: "Located in Tuttlingen – the heart of the world centre of medical technology.",
      cta_primary: "View portfolio",
      cta_secondary: "Contact us",
    },
    imageComparison: {
      title: "From concept to series production",
      labelLeft: "Concept",
      labelRight: "Production",
    },
    work: {
      title: "Portfolio",
      openPage: "View details",
      viewProject: "View project",
    },
    services: {
      title: "About Us",
      items: [
        {
          title: "Medical Engineering",
          description: "Located in the heart of the world centre of medical technology – our customers benefit from our team's extensive experience.",
        },
        {
          title: "Innovation",
          description: "We help you implement promising ideas and turn them into market-ready products.",
        },
        {
          title: "Development",
          description: "We have the right tools and know-how to implement your visions with precision.",
        },
        {
          title: "Series Production",
          description: "We don't stop at planning – we accompany you from concept through implementation and support your production.",
        },
      ],
    },
    process: {
      title: "Development Process",
      steps: [
        { number: "01", title: "Definition", description: "Defining requirements and specifications" },
        { number: "02", title: "Concept", description: "Developing the design concept" },
        { number: "03", title: "Development", description: "3D modeling and engineering" },
        { number: "04", title: "Qualification", description: "Testing and validation" },
        { number: "05", title: "Prototype", description: "Functional samples and production" },
      ],
    },
    clients: {
      title: "Our Tools",
      list: ["Solidworks", "KeyShot", "AutoCAD", "Ultimaker 3D Printing"],
    },
    contact: {
      title: "Contact",
      subtitle: "Interested in our services? Just write or call us for a non-binding enquiry.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell us about your project...",
    },
    imprint: {
      title: "Imprint",
      responsible: "Responsible for content",
      contact: "Contact",
      disclaimer: "Disclaimer",
      disclaimerText: "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
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
    },
    hero: {
      headline: "Lösungen für innovative Medizintechnik-Produkte von Morgen.",
      subheadline: "Im Herzen des Weltzentrums der Medizintechnik – Tuttlingen.",
      cta_primary: "Portfolio ansehen",
      cta_secondary: "Kontakt",
    },
    imageComparison: {
      title: "Vom Konzept zur Serienproduktion",
      labelLeft: "Konzept",
      labelRight: "Produktion",
    },
    work: {
      title: "Portfolio",
      openPage: "Details ansehen",
      viewProject: "Projekt ansehen",
    },
    services: {
      title: "Über uns",
      items: [
        {
          title: "Medizintechnik",
          description: "Im Herzen des Weltzentrums der Medizintechnik gelegen – unsere Kunden profitieren von der langjährigen Erfahrung unseres Teams.",
        },
        {
          title: "Innovation",
          description: "Wir helfen Ihnen, vielversprechende Ideen umzusetzen und marktreife Produkte daraus zu machen.",
        },
        {
          title: "Entwicklung",
          description: "Wir haben die richtigen Werkzeuge und das Know-how, um Ihre Visionen präzise umzusetzen.",
        },
        {
          title: "Serienproduktion",
          description: "Wir hören nicht bei der Planung auf – wir begleiten Sie vom Konzept über die Umsetzung bis zur Unterstützung Ihrer Produktion.",
        },
      ],
    },
    process: {
      title: "Entwicklungsprozess",
      steps: [
        { number: "01", title: "Definition", description: "Anforderungen und Spezifikationen definieren" },
        { number: "02", title: "Konzept", description: "Designkonzept entwickeln" },
        { number: "03", title: "Entwicklung", description: "3D-Modellierung und Engineering" },
        { number: "04", title: "Qualifikation", description: "Prüfung und Validierung" },
        { number: "05", title: "Prototyp", description: "Funktionsmuster und Produktion" },
      ],
    },
    clients: {
      title: "Unsere Werkzeuge",
      list: ["Solidworks", "KeyShot", "AutoCAD", "Ultimaker 3D-Druck"],
    },
    contact: {
      title: "Kontakt",
      subtitle: "Interessiert an unseren Leistungen? Schreiben oder rufen Sie uns einfach an für eine unverbindliche Anfrage.",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      send: "Nachricht senden",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "ihre@email.de",
      messagePlaceholder: "Erzählen Sie uns von Ihrem Projekt...",
    },
    imprint: {
      title: "Impressum",
      responsible: "Verantwortlich für den Inhalt",
      contact: "Kontakt",
      disclaimer: "Haftungsausschluss",
      disclaimerText: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
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
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
  };
  imageComparison: {
    title: string;
    labelLeft: string;
    labelRight: string;
  };
  work: {
    title: string;
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
  };
  imprint: {
    title: string;
    responsible: string;
    contact: string;
    disclaimer: string;
    disclaimerText: string;
  };
  footer: {
    copyright: string;
  };
}
