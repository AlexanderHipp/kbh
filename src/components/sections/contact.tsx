"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { imprintData } from "@/lib/imprint-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Contact() {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.currentTarget.reset();
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-6">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              {t.contact.subtitle}
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${imprintData.contact.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                {imprintData.contact.email}
              </a>
              <a
                href={`tel:${imprintData.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5" />
                {imprintData.contact.phone}
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                {imprintData.address.city}, {imprintData.address.country}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-background rounded-lg border border-muted p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t.contact.namePlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <label
                htmlFor="privacy-consent"
                className="flex items-start gap-3 cursor-pointer text-sm text-muted-foreground leading-relaxed"
              >
                <input
                  type="checkbox"
                  id="privacy-consent"
                  name="privacyConsent"
                  required
                  disabled={isSubmitting}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-input accent-foreground"
                />
                <span>
                  {t.contact.privacyConsentPrefix}
                  <Link
                    href="/privacy"
                    className="text-foreground underline hover:no-underline"
                  >
                    {t.nav.privacy}
                  </Link>
                  {t.contact.privacyConsentSuffix}
                </span>
              </label>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitted
                  ? "Sent!"
                  : isSubmitting
                    ? "Sending..."
                    : t.contact.send}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
