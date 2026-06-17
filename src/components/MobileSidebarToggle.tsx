"use client";

import { useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function MobileSidebarToggle() {
  useEffect(() => {
    const toggle = document.getElementById("mobile-sidebar-toggle");
    const sidebar = document.getElementById("dashboard-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (!toggle || !sidebar || !overlay) return;

    const openSidebar = () => {
      sidebar.classList.remove("-translate-x-full");
      sidebar.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
    };

    const closeSidebar = () => {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      overlay.classList.add("hidden");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains("-translate-x-full")) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });

    overlay.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSidebar();
    });

    return () => {
      toggle.removeEventListener("click", openSidebar);
      overlay.removeEventListener("click", closeSidebar);
    };
  }, []);

  return (
    <button
      id="mobile-sidebar-toggle"
      className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 rounded-xl bg-[#2f4383] border-2 border-[#dba65d] flex items-center justify-center shadow-lg"
      aria-label="Toggle sidebar"
    >
      <Menu className="w-5 h-5 text-[#dba65d]" strokeWidth={2} />
    </button>
  );
}
