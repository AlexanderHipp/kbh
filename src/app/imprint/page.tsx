import { getLocale } from "@/lib/i18n/get-locale";
import { dictionary } from "@/lib/i18n";
import { Footer } from "@/components/layout/footer";

export default async function ImprintPage() {
  const locale = await getLocale();
  const t = dictionary[locale];

  return (
    <>
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight mb-8">
            {t.imprint.title}
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.responsible}</h2>
              <address className="not-italic text-muted-foreground">
                <p>Kreativbüro Hipp</p>
                <p>Untere Vorstadt 29</p>
                <p>78532 Tuttlingen</p>
                <p>Germany</p>
              </address>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.contact}</h2>
              <div className="text-muted-foreground">
                <p>Email: info@kbh-hipp.de</p>
                <p>Phone: +49 7461 / 1716103</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.disclaimer}</h2>
              <p className="text-muted-foreground">{t.imprint.disclaimerText}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
