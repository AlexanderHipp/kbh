import type { Locale } from "@/lib/i18n";

export type PrivacySection = {
  title: string;
  paragraphs: string[];
};

export const privacyContent: Record<Locale, { title: string; sections: PrivacySection[] }> = {
  en: {
    title: "Privacy Policy",
    sections: [
      {
        title: "Controller and contact",
        paragraphs: [
          "The controller responsible for data processing on this website is Kreativbüro Hipp. You can find our contact details in the imprint.",
          "For questions regarding data protection, please contact us at the email address given in the imprint.",
        ],
      },
      {
        title: "Contact form",
        paragraphs: [
          "When you submit the contact form, we process your name, email address, and message. We use this data solely to respond to your enquiry.",
          "Legal basis: Your consent (Art. 6(1)(a) GDPR) and our legitimate interest in processing enquiries (Art. 6(1)(f) GDPR).",
          "Your data is transmitted to Resend (Resend Inc., USA) for email delivery. Resend processes data on our behalf. Data may be transferred to the USA; Resend relies on standard contractual clauses for such transfers.",
          "We retain contact form submissions only as long as necessary to process your enquiry and, where applicable, for follow-up correspondence. Emails are typically deleted after the matter is resolved, unless we are required to retain them for legal reasons.",
        ],
      },
      {
        title: "Cookies and local storage",
        paragraphs: [
          "We use a cookie to store your language preference (German or English). This cookie is strictly necessary for the bilingual operation of our website and does not require your consent under § 25(2) TTDSG.",
          "The admin area uses sessionStorage to maintain your login state during your visit. This data is deleted when you close your browser.",
          "We do not use analytics, tracking, or marketing cookies.",
        ],
      },
      {
        title: "Third-party services",
        paragraphs: [
          "Our website uses the following third-party services:",
          "• Hosting: The site may be hosted on Vercel. Server logs (IP address, access time, etc.) may be processed. See Vercel's privacy policy for details.",
          "• Fonts: We use the Inter font via Next.js, which may load from Google Fonts. Google may process your IP address when fonts are requested.",
          "• Content: Portfolio content and media are stored and served via Supabase. Supabase does not process personal data from website visitors for our purposes.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          "You have the right to access your personal data (Art. 15 GDPR), to have it rectified (Art. 16 GDPR), erased (Art. 17 GDPR), or restricted (Art. 18 GDPR), and to data portability (Art. 20 GDPR).",
          "Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of processing before withdrawal.",
          "You have the right to object to processing based on legitimate interests (Art. 21 GDPR).",
          "You have the right to lodge a complaint with a supervisory authority. The competent authority for data protection in Baden-Württemberg is the Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.",
        ],
      },
      {
        title: "Data security",
        paragraphs: [
          "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or alteration. Communication via the contact form is transmitted over HTTPS.",
        ],
      },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    sections: [
      {
        title: "Verantwortlicher und Kontakt",
        paragraphs: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist Kreativbüro Hipp. Unsere Kontaktdaten finden Sie im Impressum.",
          "Bei Fragen zum Datenschutz wenden Sie sich bitte an die im Impressum angegebene E-Mail-Adresse.",
        ],
      },
      {
        title: "Kontaktformular",
        paragraphs: [
          "Wenn Sie das Kontaktformular absenden, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage.",
          "Rechtsgrundlage: Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie unser berechtigtes Interesse an der Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO).",
          "Ihre Daten werden zur E-Mail-Zustellung an Resend (Resend Inc., USA) übermittelt. Resend verarbeitet die Daten in unserem Auftrag. Eine Übermittlung in die USA ist möglich; Resend stützt sich hierfür auf Standardvertragsklauseln.",
          "Wir speichern Kontaktanfragen nur so lange, wie zur Bearbeitung Ihrer Anfrage und ggf. zur Nachverfolgung erforderlich. E-Mails werden in der Regel nach Abschluss der Angelegenheit gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.",
        ],
      },
      {
        title: "Cookies und lokale Speicherung",
        paragraphs: [
          "Wir setzen ein Cookie zur Speicherung Ihrer Sprachpräferenz (Deutsch oder Englisch). Dieses Cookie ist für den zweisprachigen Betrieb unserer Website unbedingt erforderlich und bedarf gemäß § 25 Abs. 2 TTDSG keiner Einwilligung.",
          "Der Admin-Bereich nutzt sessionStorage zur Aufrechterhaltung Ihres Anmeldestatus während Ihres Besuchs. Diese Daten werden beim Schließen des Browsers gelöscht.",
          "Wir verwenden keine Analyse-, Tracking- oder Marketing-Cookies.",
        ],
      },
      {
        title: "Dienste Dritter",
        paragraphs: [
          "Unsere Website nutzt folgende Dienste Dritter:",
          "• Hosting: Die Website wird ggf. bei Vercel gehostet. Dabei können Server-Logs (IP-Adresse, Zugriffszeit etc.) verarbeitet werden. Details entnehmen Sie der Datenschutzerklärung von Vercel.",
          "• Schriftarten: Wir nutzen die Schriftart Inter über Next.js, die ggf. von Google Fonts geladen wird. Google kann dabei Ihre IP-Adresse verarbeiten.",
          "• Inhalte: Portfolio-Inhalte und Medien werden über Supabase gespeichert und ausgeliefert. Supabase verarbeitet für unsere Zwecke keine personenbezogenen Daten von Website-Besuchern.",
        ],
      },
      {
        title: "Ihre Rechte",
        paragraphs: [
          "Sie haben das Recht auf Auskunft über Ihre personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO) oder Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie auf Datenübertragbarkeit (Art. 20 DSGVO).",
          "Sofern die Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit widerrufen, ohne dass die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung berührt wird.",
          "Sie haben das Recht, der Verarbeitung aus Gründen unseres berechtigten Interesses zu widersprechen (Art. 21 DSGVO).",
          "Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Zuständig ist die Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg.",
        ],
      },
      {
        title: "Datensicherheit",
        paragraphs: [
          "Wir setzen geeignete technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Verfälschung zu schützen. Die Übermittlung über das Kontaktformular erfolgt per HTTPS.",
        ],
      },
    ],
  },
};
