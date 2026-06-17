"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";

export default function GuestRedirectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const redirecting = useRef(false);

  const redirect = useCallback(() => {
    if (redirecting.current) return;
    redirecting.current = true;
    router.push("/register");
  }, [router]);

  useEffect(() => {
    if (session?.user) return;

    const isAuthLink = (el: HTMLElement | null) => {
      const link = el?.closest("a");
      if (!link) return false;
      const href = link.getAttribute("href");
      return href === "/login" || href === "/register";
    };

    const handleInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (isAuthLink(target)) return;
      if (target.closest("aside, header")) return;
      if (
        target.closest("a, button, input, textarea, select, [role='button']") ||
        e.type === "keydown"
      ) {
        e.preventDefault();
        e.stopPropagation();
        redirect();
      }
    };

    document.addEventListener("click", handleInteraction, { capture: true });
    document.addEventListener("keydown", handleInteraction, { capture: true });
    return () => {
      document.removeEventListener("click", handleInteraction, { capture: true });
      document.removeEventListener("keydown", handleInteraction, { capture: true });
    };
  }, [session, redirect]);

  return <>{children}</>;
}
