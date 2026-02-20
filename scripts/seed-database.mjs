#!/usr/bin/env node
/**
 * Database Seed Script
 * Run with: node scripts/seed-database.mjs
 *
 * This script:
 * 1. Creates the projects and project_media tables
 * 2. Seeds the portfolio data from work-items.ts
 */

import { createClient } from "@supabase/supabase-js";

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing environment variables:");
  console.error("- NEXT_PUBLIC_SUPABASE_URL");
  console.error("- SUPABASE_SERVICE_ROLE_KEY");
  console.error("\nMake sure .env.local is set up correctly.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Portfolio data (from work-items.ts)
const workItems = [
  {
    slug: "medical-instruments",
    title: { en: "Medical Instruments", de: "Medizinische Instrumente" },
    subtitle: { en: "Classic designs with modern 3D engineering", de: "Klassische Designs mit moderner 3D-Technik" },
    year: 2024,
    category: "Product Design",
    thumbnail: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "Surgeons in the Medical Valley desire classic instrument designs. We use modern 3D design to realise such projects, combining traditional craftsmanship with cutting-edge engineering.",
      de: "Chirurgen im Medical Valley wünschen sich klassische Instrumentendesigns. Wir setzen moderne 3D-Konstruktion ein, um solche Projekte zu realisieren und traditionelles Handwerk mit modernster Technik zu verbinden.",
    },
  },
  {
    slug: "containers",
    title: { en: "Containers", de: "Behälter" },
    subtitle: { en: "From transport boxes to sterilisation containers", de: "Von Transportboxen bis zu Sterilisationsbehältern" },
    year: 2024,
    category: "Product Design",
    thumbnail: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "Designing containers for safely transporting and storing implants and instruments is essential. Our designs range from simple transport boxes to complex sterilisation containers that ensure proper sterilisation processes.",
      de: "Die Konstruktion von Behältern für den sicheren Transport und die Lagerung von Implantaten und Instrumenten ist essenziell. Unsere Designs reichen von einfachen Transportboxen bis zu komplexen Sterilisationsbehältern.",
    },
  },
  {
    slug: "implants",
    title: { en: "Implants", de: "Implantate" },
    subtitle: { en: "Collaborative development for better solutions", de: "Kollaborative Entwicklung für bessere Lösungen" },
    year: 2024,
    category: "Development",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "Demand for better and more sophisticated implants is growing. We collaborate with customers to develop implants, and due to the complexity of such projects, detailed conversations are often required to achieve optimal results.",
      de: "Die Nachfrage nach besseren und ausgefeilteren Implantaten wächst. Wir arbeiten mit Kunden zusammen, um Implantate zu entwickeln, und aufgrund der Komplexität solcher Projekte sind oft detaillierte Gespräche erforderlich.",
    },
  },
  {
    slug: "3d-printing",
    title: { en: "3D Printing", de: "3D-Druck" },
    subtitle: { en: "Rapid prototyping with FDM technology", de: "Schnelles Prototyping mit FDM-Technologie" },
    year: 2024,
    category: "Prototyping",
    thumbnail: "https://images.unsplash.com/photo-1631376143372-aaac3c9c1a0f?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "We use a state-of-the-art Ultimaker 3D printer. With Fused Deposition Modelling (FDM) technology, we quickly print functional samples of implants, instruments, or containers in various materials such as Nylon (PA), ABS, PET, PLA, PP, PVA, and TPU.",
      de: "Wir verwenden einen hochmodernen Ultimaker 3D-Drucker. Mit Fused Deposition Modelling (FDM) Technologie drucken wir schnell Funktionsmuster von Implantaten, Instrumenten oder Behältern in verschiedenen Materialien wie Nylon (PA), ABS, PET, PLA, PP, PVA und TPU.",
    },
  },
  {
    slug: "mdr-fda-development",
    title: { en: "MDR/FDA Development", de: "MDR/FDA-Entwicklung" },
    subtitle: { en: "Regulatory-compliant design documentation", de: "Regulatorisch konforme Designdokumentation" },
    year: 2024,
    category: "Regulatory",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "We help create and define design history files according to MDR or FDA requirements. Our structured process covers all phases from definition through concept, development, qualification, to prototype.",
      de: "Wir helfen bei der Erstellung und Definition von Design History Files gemäß MDR- oder FDA-Anforderungen. Unser strukturierter Prozess deckt alle Phasen von der Definition über Konzept, Entwicklung, Qualifikation bis zum Prototyp ab.",
    },
  },
  {
    slug: "3d-visualisation",
    title: { en: "3D Visualisation", de: "3D-Visualisierung" },
    subtitle: { en: "Photorealistic images and videos", de: "Fotorealistische Bilder und Videos" },
    year: 2024,
    category: "Visualisation",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "Any imaginable real or unreal scene can be recreated in 3D. This produces images or videos for product documentation and marketing, allowing realistic assessment of final products before production.",
      de: "Jede vorstellbare reale oder unreale Szene kann in 3D nachgebildet werden. Dies erzeugt Bilder oder Videos für Produktdokumentation und Marketing und ermöglicht eine realistische Beurteilung der Endprodukte vor der Produktion.",
    },
  },
  {
    slug: "automation-fixtures",
    title: { en: "Automation & Fixtures", de: "Automation & Vorrichtungen" },
    subtitle: { en: "Apparatus and fixture construction", de: "Apparate- und Vorrichtungsbau" },
    year: 2024,
    category: "Engineering",
    thumbnail: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "Cost-effective production in manufacturing requires optimised automation. We design fixtures that position series or prototypes on machines with reproducible accuracy, supporting cost-effective creation through years of experience.",
      de: "Kosteneffektive Fertigung erfordert optimierte Automatisierung. Wir konstruieren Vorrichtungen, die Serien oder Prototypen mit reproduzierbarer Genauigkeit auf Maschinen positionieren und durch jahrelange Erfahrung eine wirtschaftliche Fertigung unterstützen.",
    },
  },
  {
    slug: "drawing-production",
    title: { en: "Drawing Production", de: "Zeichnungserstellung" },
    subtitle: { en: "From paper to modern CAD", de: "Vom Papier zur modernen CAD-Zeichnung" },
    year: 2024,
    category: "Documentation",
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&auto=format",
    description: {
      en: "Many companies still have drawings on paper. We convert these into modern CAD, 2D or 3D drawings. Our technical illustrators work across metal and plastic processing industries, including appraisal drawings with quality-relevant data.",
      de: "Viele Unternehmen haben noch Zeichnungen auf Papier. Wir wandeln diese in moderne CAD-, 2D- oder 3D-Zeichnungen um. Unsere technischen Zeichner arbeiten in der Metall- und Kunststoffverarbeitung, einschließlich Prüfzeichnungen mit qualitätsrelevanten Daten.",
    },
  },
];

// SQL to create tables
const createTablesSql = `
-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_de TEXT NOT NULL,
  subtitle_en TEXT,
  subtitle_de TEXT,
  description_en TEXT,
  description_de TEXT,
  role TEXT,
  client TEXT,
  year INTEGER,
  category TEXT,
  thumbnail TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_media table
CREATE TABLE IF NOT EXISTS project_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('image', 'gif', 'video')),
  file_path TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function createTables() {
  console.log("Creating tables...");

  // Use raw SQL via rpc or just try to insert and see if tables exist
  // Since we can't run arbitrary SQL easily, let's check if tables exist by querying
  const { error: projectsError } = await supabase.from("projects").select("id").limit(1);

  if (projectsError && projectsError.code === "PGRST204") {
    console.error("\n⚠️  Tables don't exist yet!");
    console.error("\nPlease run the following SQL in Supabase Dashboard → SQL Editor:");
    console.error("https://supabase.com/dashboard/project/ulkkofclswqyidnzxvjg/sql/new");
    console.error("\n--- Copy everything below this line ---\n");
    console.error(createTablesSql);
    console.error("\n--- End of SQL ---\n");
    return false;
  }

  console.log("✓ Tables exist");
  return true;
}

async function seedProjects() {
  console.log("Checking for existing projects...");

  const { data: existing, error: checkError } = await supabase
    .from("projects")
    .select("slug")
    .limit(1);

  if (checkError) {
    console.error("Error checking projects:", checkError);
    return false;
  }

  if (existing && existing.length > 0) {
    console.log("⚠️  Projects already exist. Skipping seed to avoid duplicates.");
    console.log("   To re-seed, delete existing projects first.");
    return true;
  }

  console.log("Seeding projects...");

  const projectsToInsert = workItems.map((item, index) => ({
    slug: item.slug,
    title_en: item.title.en,
    title_de: item.title.de,
    subtitle_en: item.subtitle?.en || null,
    subtitle_de: item.subtitle?.de || null,
    description_en: item.description.en,
    description_de: item.description.de,
    role: item.role || null,
    client: item.client || null,
    year: item.year,
    category: item.category,
    thumbnail: item.thumbnail,
    position: index,
    is_published: true,
  }));

  const { error } = await supabase.from("projects").insert(projectsToInsert);

  if (error) {
    console.error("Error seeding projects:", error);
    return false;
  }

  console.log(`✓ Seeded ${workItems.length} projects`);
  return true;
}

async function main() {
  console.log("=================================");
  console.log("Kreativbüro Hipp Database Seeder");
  console.log("=================================\n");

  const tablesOk = await createTables();
  if (!tablesOk) {
    process.exit(1);
  }

  const seedOk = await seedProjects();
  if (!seedOk) {
    process.exit(1);
  }

  console.log("\n✓ Database setup complete!");
  console.log("  - Visit /admin to manage projects");
  console.log("  - Homepage will now load from Supabase");
}

main().catch(console.error);
