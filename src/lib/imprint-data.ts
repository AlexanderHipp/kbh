/**
 * Business data for the legal imprint (Impressum).
 * Update these values to match your company's legal information.
 *
 * Required for German law (§ 5 TMG/DDG):
 * - owner: Full name of the person responsible (Inhaber for sole proprietorship)
 * - address, contact: Must be complete and accurate
 *
 * Optional (add if applicable):
 * - vatId: VAT identification number (USt-IdNr.)
 * - registerCourt, registerNumber: Commercial register (Handelsregister) details
 */
export const imprintData = {
  companyName: "Kreativbüro Hipp",
  owner: "Alexander Hipp", // Full name of owner/Inhaber - required for sole proprietorship
  address: {
    street: "Untere Vorstadt 29",
    postalCode: "78532",
    city: "Tuttlingen",
    country: "Germany",
  },
  contact: {
    email: "info@kbh-hipp.de",
    phone: "+49 7461 / 1716103",
  },
  // Optional: Add if registered for VAT
  vatId: "" as string | undefined,
  // Optional: Add if registered in Handelsregister (e.g. GmbH, UG)
  registerCourt: "" as string | undefined,
  registerNumber: "" as string | undefined,
};
