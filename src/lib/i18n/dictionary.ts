export type Locale = "en" | "de";

export const dictionary = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      services: "Services",
      contact: "Contact",
      imprint: "Imprint",
    },
    hero: {
      headline: "Minimal production. Maximum clarity.",
      subheadline: "From concept to a coherent series of visuals.",
      cta_primary: "View work",
      cta_secondary: "Contact",
    },
    imageComparison: {
      title: "From idea to series",
      labelLeft: "Idea",
      labelRight: "Series",
    },
    work: {
      title: "Selected Work",
      openPage: "Open page",
      viewProject: "View project",
    },
    services: {
      title: "What we do",
      items: [
        {
          title: "Photography",
          description: "High-end product and editorial photography with meticulous attention to detail.",
        },
        {
          title: "Film Production",
          description: "Cinematic video content from concept development to final delivery.",
        },
        {
          title: "Creative Direction",
          description: "Strategic visual concepts that align with your brand identity.",
        },
      ],
    },
    process: {
      title: "How it works",
      steps: [
        { number: "01", title: "Discovery", description: "Understanding your vision and objectives" },
        { number: "02", title: "Concept", description: "Developing the creative direction" },
        { number: "03", title: "Production", description: "Bringing the vision to life" },
        { number: "04", title: "Delivery", description: "Final assets ready for use" },
      ],
    },
    clients: {
      title: "Selected Clients",
      list: ["Brand Co.", "Studio X", "Design Agency", "Tech Startup", "Fashion House"],
    },
    contact: {
      title: "Get in touch",
      subtitle: "Have a project in mind? Let's talk.",
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
      work: "Arbeiten",
      about: "Über uns",
      services: "Leistungen",
      contact: "Kontakt",
      imprint: "Impressum",
    },
    hero: {
      headline: "Minimale Produktion. Maximale Klarheit.",
      subheadline: "Vom Konzept zur stimmigen Bildserie.",
      cta_primary: "Arbeiten ansehen",
      cta_secondary: "Kontakt",
    },
    imageComparison: {
      title: "Von der Idee zur Serie",
      labelLeft: "Idee",
      labelRight: "Serie",
    },
    work: {
      title: "Ausgewählte Arbeiten",
      openPage: "Seite öffnen",
      viewProject: "Projekt ansehen",
    },
    services: {
      title: "Was wir machen",
      items: [
        {
          title: "Fotografie",
          description: "High-End Produkt- und Editorial-Fotografie mit akribischer Liebe zum Detail.",
        },
        {
          title: "Filmproduktion",
          description: "Filmischer Videocontent von der Konzeptentwicklung bis zur finalen Lieferung.",
        },
        {
          title: "Creative Direction",
          description: "Strategische visuelle Konzepte, die mit Ihrer Markenidentität harmonieren.",
        },
      ],
    },
    process: {
      title: "So arbeiten wir",
      steps: [
        { number: "01", title: "Kennenlernen", description: "Verstehen Ihrer Vision und Ziele" },
        { number: "02", title: "Konzept", description: "Entwicklung der kreativen Richtung" },
        { number: "03", title: "Produktion", description: "Die Vision zum Leben erwecken" },
        { number: "04", title: "Lieferung", description: "Finale Assets bereit zur Nutzung" },
      ],
    },
    clients: {
      title: "Ausgewählte Kunden",
      list: ["Brand Co.", "Studio X", "Design Agency", "Tech Startup", "Fashion House"],
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle: "Haben Sie ein Projekt im Sinn? Lassen Sie uns sprechen.",
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
