import { cookies, headers } from "next/headers";
import type { Locale } from "./dictionary";

const GERMAN_COUNTRIES = ["DE", "AT", "CH"];

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // 1. Check cookie first (user preference)
  const localeCookie = cookieStore.get("locale");
  if (localeCookie?.value === "de" || localeCookie?.value === "en") {
    return localeCookie.value;
  }

  // 2. Check Vercel geo header
  const country = headerStore.get("x-vercel-ip-country");
  if (country && GERMAN_COUNTRIES.includes(country.toUpperCase())) {
    return "de";
  }

  // 3. Fallback to Accept-Language header
  const acceptLanguage = headerStore.get("accept-language") || "";
  if (acceptLanguage.toLowerCase().startsWith("de")) {
    return "de";
  }

  // 4. Default to English
  return "en";
}
