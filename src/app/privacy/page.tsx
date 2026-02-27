import { getLocale } from "@/lib/i18n/get-locale";
import { Footer } from "@/components/layout/footer";
import { privacyContent } from "@/lib/privacy-content";

export default async function PrivacyPage() {
  const locale = await getLocale();
  const content = privacyContent[locale];

  return (
    <>
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl border-x-2 border-muted/80">
          <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight mb-8">
            {content.title}
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {content.sections.map((section) => (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl font-medium mb-4">{section.title}</h2>
                <div className="text-muted-foreground space-y-4">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
