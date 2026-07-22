"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});

/**
 * Client wrapper needed because Next.js 16 disallows `ssr: false` in Server Components.
 * This component handles the dynamic import client-side so the cookie consent banner
 * only renders in the browser after hydration.
 */
export default function CookieConsentWrapper() {
  return <CookieConsent />;
}
