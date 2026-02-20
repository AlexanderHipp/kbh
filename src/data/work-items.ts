export interface WorkMedia {
  type: "image" | "gif" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export interface WorkItem {
  slug: string;
  title: {
    en: string;
    de: string;
  };
  subtitle?: {
    en: string;
    de: string;
  };
  role?: string;
  client?: string;
  year: number;
  category: string;
  thumbnail: string;
  media: WorkMedia[];
  description: {
    en: string;
    de: string;
  };
}

export const workItems: WorkItem[] = [
  {
    slug: "medical-instruments",
    title: {
      en: "Medical Instruments",
      de: "Medizinische Instrumente",
    },
    subtitle: {
      en: "Classic designs with modern 3D engineering",
      de: "Klassische Designs mit moderner 3D-Technik",
    },
    year: 2024,
    category: "Product Design",
    thumbnail:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&h=800&fit=crop&auto=format",
        alt: "Medical instruments",
      },
    ],
    description: {
      en: "Surgeons in the Medical Valley desire classic instrument designs. We use modern 3D design to realise such projects, combining traditional craftsmanship with cutting-edge engineering.",
      de: "Chirurgen im Medical Valley wünschen sich klassische Instrumentendesigns. Wir setzen moderne 3D-Konstruktion ein, um solche Projekte zu realisieren und traditionelles Handwerk mit modernster Technik zu verbinden.",
    },
  },
  {
    slug: "containers",
    title: {
      en: "Containers",
      de: "Behälter",
    },
    subtitle: {
      en: "From transport boxes to sterilisation containers",
      de: "Von Transportboxen bis zu Sterilisationsbehältern",
    },
    year: 2024,
    category: "Product Design",
    thumbnail:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=800&fit=crop&auto=format",
        alt: "Medical containers",
      },
    ],
    description: {
      en: "Designing containers for safely transporting and storing implants and instruments is essential. Our designs range from simple transport boxes to complex sterilisation containers that ensure proper sterilisation processes.",
      de: "Die Konstruktion von Behältern für den sicheren Transport und die Lagerung von Implantaten und Instrumenten ist essenziell. Unsere Designs reichen von einfachen Transportboxen bis zu komplexen Sterilisationsbehältern.",
    },
  },
  {
    slug: "implants",
    title: {
      en: "Implants",
      de: "Implantate",
    },
    subtitle: {
      en: "Collaborative development for better solutions",
      de: "Kollaborative Entwicklung für bessere Lösungen",
    },
    year: 2024,
    category: "Development",
    thumbnail:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=800&fit=crop&auto=format",
        alt: "Medical implants",
      },
    ],
    description: {
      en: "Demand for better and more sophisticated implants is growing. We collaborate with customers to develop implants, and due to the complexity of such projects, detailed conversations are often required to achieve optimal results.",
      de: "Die Nachfrage nach besseren und ausgefeilteren Implantaten wächst. Wir arbeiten mit Kunden zusammen, um Implantate zu entwickeln, und aufgrund der Komplexität solcher Projekte sind oft detaillierte Gespräche erforderlich.",
    },
  },
  {
    slug: "3d-printing",
    title: {
      en: "3D Printing",
      de: "3D-Druck",
    },
    subtitle: {
      en: "Rapid prototyping with FDM technology",
      de: "Schnelles Prototyping mit FDM-Technologie",
    },
    year: 2024,
    category: "Prototyping",
    thumbnail:
      "https://images.unsplash.com/photo-1631376143372-aaac3c9c1a0f?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1631376143372-aaac3c9c1a0f?w=1200&h=800&fit=crop&auto=format",
        alt: "3D printing",
      },
    ],
    description: {
      en: "We use a state-of-the-art Ultimaker 3D printer. With Fused Deposition Modelling (FDM) technology, we quickly print functional samples of implants, instruments, or containers in various materials such as Nylon (PA), ABS, PET, PLA, PP, PVA, and TPU.",
      de: "Wir verwenden einen hochmodernen Ultimaker 3D-Drucker. Mit Fused Deposition Modelling (FDM) Technologie drucken wir schnell Funktionsmuster von Implantaten, Instrumenten oder Behältern in verschiedenen Materialien wie Nylon (PA), ABS, PET, PLA, PP, PVA und TPU.",
    },
  },
  {
    slug: "mdr-fda-development",
    title: {
      en: "MDR/FDA Development",
      de: "MDR/FDA-Entwicklung",
    },
    subtitle: {
      en: "Regulatory-compliant design documentation",
      de: "Regulatorisch konforme Designdokumentation",
    },
    year: 2024,
    category: "Regulatory",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop&auto=format",
        alt: "Documentation",
      },
    ],
    description: {
      en: "We help create and define design history files according to MDR or FDA requirements. Our structured process covers all phases from definition through concept, development, qualification, to prototype.",
      de: "Wir helfen bei der Erstellung und Definition von Design History Files gemäß MDR- oder FDA-Anforderungen. Unser strukturierter Prozess deckt alle Phasen von der Definition über Konzept, Entwicklung, Qualifikation bis zum Prototyp ab.",
    },
  },
  {
    slug: "3d-visualisation",
    title: {
      en: "3D Visualisation",
      de: "3D-Visualisierung",
    },
    subtitle: {
      en: "Photorealistic images and videos",
      de: "Fotorealistische Bilder und Videos",
    },
    year: 2024,
    category: "Visualisation",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop&auto=format",
        alt: "3D visualisation",
      },
    ],
    description: {
      en: "Any imaginable real or unreal scene can be recreated in 3D. This produces images or videos for product documentation and marketing, allowing realistic assessment of final products before production.",
      de: "Jede vorstellbare reale oder unreale Szene kann in 3D nachgebildet werden. Dies erzeugt Bilder oder Videos für Produktdokumentation und Marketing und ermöglicht eine realistische Beurteilung der Endprodukte vor der Produktion.",
    },
  },
  {
    slug: "automation-fixtures",
    title: {
      en: "Automation & Fixtures",
      de: "Automation & Vorrichtungen",
    },
    subtitle: {
      en: "Apparatus and fixture construction",
      de: "Apparate- und Vorrichtungsbau",
    },
    year: 2024,
    category: "Engineering",
    thumbnail:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=800&fit=crop&auto=format",
        alt: "Automation equipment",
      },
    ],
    description: {
      en: "Cost-effective production in manufacturing requires optimised automation. We design fixtures that position series or prototypes on machines with reproducible accuracy, supporting cost-effective creation through years of experience.",
      de: "Kosteneffektive Fertigung erfordert optimierte Automatisierung. Wir konstruieren Vorrichtungen, die Serien oder Prototypen mit reproduzierbarer Genauigkeit auf Maschinen positionieren und durch jahrelange Erfahrung eine wirtschaftliche Fertigung unterstützen.",
    },
  },
  {
    slug: "drawing-production",
    title: {
      en: "Drawing Production",
      de: "Zeichnungserstellung",
    },
    subtitle: {
      en: "From paper to modern CAD",
      de: "Vom Papier zur modernen CAD-Zeichnung",
    },
    year: 2024,
    category: "Documentation",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop&auto=format",
        alt: "Technical drawings",
      },
    ],
    description: {
      en: "Many companies still have drawings on paper. We convert these into modern CAD, 2D or 3D drawings. Our technical illustrators work across metal and plastic processing industries, including appraisal drawings with quality-relevant data.",
      de: "Viele Unternehmen haben noch Zeichnungen auf Papier. Wir wandeln diese in moderne CAD-, 2D- oder 3D-Zeichnungen um. Unsere technischen Zeichner arbeiten in der Metall- und Kunststoffverarbeitung, einschließlich Prüfzeichnungen mit qualitätsrelevanten Daten.",
    },
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}
