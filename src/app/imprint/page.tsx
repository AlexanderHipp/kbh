import { getLocale } from "@/lib/i18n/get-locale";
import { dictionary } from "@/lib/i18n";
import { Footer } from "@/components/layout/footer";
import { imprintData } from "@/lib/imprint-data";

export default async function ImprintPage() {
  const locale = await getLocale();
  const t = dictionary[locale];

  const { companyName, owner, address, contact, vatId, registerCourt, registerNumber } =
    imprintData;

  return (
    <>
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl border-x-2 border-muted/80">
          <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight mb-8">
            {t.imprint.title}
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-sm text-muted-foreground mb-8">
              {t.imprint.legalNotice}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.responsible}</h2>
              <address className="not-italic text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{companyName}</p>
                <p>
                  {t.imprint.owner}: {owner}
                </p>
                <p>{address.street}</p>
                <p>
                  {address.postalCode} {address.city}
                </p>
                <p>{address.country}</p>
              </address>
            </section>

            {(registerCourt || registerNumber) && (
              <section className="mb-8">
                <h2 className="text-xl font-medium mb-4">
                  {locale === "de" ? "Handelsregister" : "Commercial Register"}
                </h2>
                <div className="text-muted-foreground space-y-1">
                  {registerCourt && <p>{registerCourt}</p>}
                  {registerNumber && <p>{registerNumber}</p>}
                </div>
              </section>
            )}

            {vatId && (
              <section className="mb-8">
                <h2 className="text-xl font-medium mb-4">
                  {locale === "de" ? "Umsatzsteuer-ID" : "VAT ID"}
                </h2>
                <p className="text-muted-foreground">{vatId}</p>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.contact}</h2>
              <div className="text-muted-foreground space-y-1">
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-foreground hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-foreground hover:underline"
                  >
                    {contact.phone}
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">
                {t.imprint.liabilityContent}
              </h2>
              <p className="text-muted-foreground">{t.imprint.liabilityContentText}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.liabilityLinks}</h2>
              <p className="text-muted-foreground">{t.imprint.liabilityLinksText}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-medium mb-4">{t.imprint.euDispute}</h2>
              <p className="text-muted-foreground">
                {t.imprint.euDisputeText}
                <a
                  href={t.imprint.euDisputeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline break-all"
                >
                  {t.imprint.euDisputeLink}
                </a>
                {t.imprint.euDisputeSuffix}
              </p>
            </section>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
