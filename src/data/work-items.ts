export interface WorkMedia {
  type: "image" | "video";
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
    slug: "apparatebau",
    title: {
      en: "Apparatebau",
      de: "Apparatebau",
    },
    subtitle: {
      en: "Visual documentation of precision engineering",
      de: "Visuelle Dokumentation von Präzisionstechnik",
    },
    role: "Lead Photographer",
    client: "Industrial Corp.",
    year: 2024,
    category: "Industrial Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=800&fit=crop&auto=format",
        alt: "Industrial machinery",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&auto=format",
        alt: "Factory detail",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=800&fit=crop&auto=format",
        alt: "Manufacturing process",
      },
    ],
    description: {
      en: "A comprehensive visual documentation of precision engineering and industrial craftsmanship. This series captures the beauty of mechanical components and manufacturing excellence.",
      de: "Eine umfassende visuelle Dokumentation von Präzisionstechnik und industrieller Handwerkskunst. Diese Serie fängt die Schönheit mechanischer Komponenten und Fertigungsexzellenz ein.",
    },
  },
  {
    slug: "nordic-essence",
    title: {
      en: "Nordic Essence",
      de: "Nordische Essenz",
    },
    subtitle: {
      en: "Celebrating Scandinavian design principles",
      de: "Eine Hommage an skandinavische Designprinzipien",
    },
    role: "Creative Director",
    client: "Design Studio",
    year: 2024,
    category: "Product Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&auto=format",
        alt: "Minimalist interior",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop&auto=format",
        alt: "Design furniture",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop&auto=format",
        alt: "Product detail",
      },
    ],
    description: {
      en: "Celebrating Scandinavian design principles through carefully composed imagery. Clean lines, natural materials, and thoughtful simplicity define this product series.",
      de: "Eine Hommage an skandinavische Designprinzipien durch sorgfältig komponierte Bilder. Klare Linien, natürliche Materialien und durchdachte Schlichtheit definieren diese Produktserie.",
    },
  },
  {
    slug: "urban-rhythm",
    title: {
      en: "Urban Rhythm",
      de: "Urbaner Rhythmus",
    },
    client: "Architecture Firm",
    year: 2023,
    category: "Architecture",
    thumbnail:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop&auto=format",
        alt: "Modern building facade",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1545324418-cc6a8b25d7b4?w=1200&h=800&fit=crop&auto=format",
        alt: "Architectural detail",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&h=800&fit=crop&auto=format",
        alt: "Urban landscape",
      },
    ],
    description: {
      en: "Exploring the intersection of architecture and daily life in urban environments. This series documents the visual rhythm created by modern structures and the spaces between them.",
      de: "Eine Erkundung der Schnittstelle von Architektur und Alltag in urbanen Umgebungen. Diese Serie dokumentiert den visuellen Rhythmus moderner Strukturen und der Räume zwischen ihnen.",
    },
  },
  {
    slug: "natural-forms",
    title: {
      en: "Natural Forms",
      de: "Natürliche Formen",
    },
    client: "Botanical Garden",
    year: 2023,
    category: "Nature Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&h=800&fit=crop&auto=format",
        alt: "Botanical detail",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=800&fit=crop&auto=format",
        alt: "Flower macro",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1462275646964-a0e3571f4f77?w=1200&h=800&fit=crop&auto=format",
        alt: "Plant texture",
      },
    ],
    description: {
      en: "A study of organic patterns and textures found in nature. Through macro photography, this series reveals the intricate beauty hidden in botanical subjects.",
      de: "Eine Studie organischer Muster und Texturen in der Natur. Durch Makrofotografie enthüllt diese Serie die verborgene Schönheit botanischer Motive.",
    },
  },
  {
    slug: "quiet-moments",
    title: {
      en: "Quiet Moments",
      de: "Stille Momente",
    },
    client: "Lifestyle Brand",
    year: 2024,
    category: "Lifestyle",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&auto=format",
        alt: "Morning coffee",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&auto=format",
        alt: "Cafe scene",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&auto=format",
        alt: "Coffee detail",
      },
    ],
    description: {
      en: "Capturing the beauty in everyday rituals and moments of pause. This lifestyle series celebrates the art of slowing down and finding peace in simple pleasures.",
      de: "Die Schönheit alltäglicher Rituale und Momente der Ruhe einfangen. Diese Lifestyle-Serie feiert die Kunst des Verlangsamens und das Finden von Frieden in einfachen Freuden.",
    },
  },
  {
    slug: "material-study",
    title: {
      en: "Material Study",
      de: "Materialstudie",
    },
    client: "Textile Company",
    year: 2023,
    category: "Product Photography",
    thumbnail:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop&auto=format",
    media: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&h=800&fit=crop&auto=format",
        alt: "Fabric texture",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&h=800&fit=crop&auto=format",
        alt: "Material detail",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=1200&h=800&fit=crop&auto=format",
        alt: "Textile close-up",
      },
    ],
    description: {
      en: "An exploration of textiles and materials through close-up photography. This series highlights the tactile qualities and craftsmanship behind premium fabrics.",
      de: "Eine Erkundung von Textilien und Materialien durch Nahaufnahmen. Diese Serie hebt die haptischen Qualitäten und Handwerkskunst hochwertiger Stoffe hervor.",
    },
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return workItems.find((item) => item.slug === slug);
}
