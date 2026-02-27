import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GERMAN_COUNTRIES = ["DE", "AT", "CH"];

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Skip if locale cookie already set
  const existingLocale = request.cookies.get("locale");
  if (existingLocale?.value === "de" || existingLocale?.value === "en") {
    return response;
  }

  // Check Vercel geo header
  const country = request.headers.get("x-vercel-ip-country");
  if (country && GERMAN_COUNTRIES.includes(country.toUpperCase())) {
    response.cookies.set("locale", "de", {
      maxAge: 31536000,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // Fallback to Accept-Language
  const acceptLanguage = request.headers.get("accept-language") || "";
  const prefersDe = acceptLanguage.toLowerCase().startsWith("de");

  response.cookies.set("locale", prefersDe ? "de" : "en", {
    maxAge: 31536000,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
