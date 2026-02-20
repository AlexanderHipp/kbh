"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useWorkModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeSlug = useMemo(
    () => searchParams.get("work"),
    [searchParams]
  );

  const openWork = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("work", slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const closeWork = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("work");
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchParams, router, pathname]);

  return { activeSlug, openWork, closeWork };
}
