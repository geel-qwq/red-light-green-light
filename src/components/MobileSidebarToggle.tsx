"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getUnreadCount } from "@/actions/notifications";

export default function MobileSidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    getUnreadCount().then(setUnreadCount);
    const interval = setInterval(() => {
      getUnreadCount().then(setUnreadCount);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const toggle = document.getElementById("mobile-sidebar-toggle");
    const sidebar = document.getElementById("dashboard-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (!toggle || !sidebar || !overlay) return;

    const openSidebar = () => {
      sidebar.classList.remove("-translate-x-full");
      sidebar.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
      setIsOpen(true);
    };

    const closeSidebar = () => {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      overlay.classList.add("hidden");
      setIsOpen(false);
    };

    const handleToggle = (e: MouseEvent) => {
      e.stopPropagation();
      if (sidebar.classList.contains("-translate-x-full")) {
        openSidebar();
      } else {
        closeSidebar();
      }
    };

    toggle.addEventListener("click", handleToggle);
    overlay.addEventListener("click", closeSidebar);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", handleEscape);

    const observer = new MutationObserver(() => {
      const isSidebarOpen = sidebar.classList.contains("translate-x-0");
      setIsOpen(isSidebarOpen);
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });

    return () => {
      toggle.removeEventListener("click", handleToggle);
      overlay.removeEventListener("click", closeSidebar);
      document.removeEventListener("keydown", handleEscape);
      observer.disconnect();
    };
  }, []);

  return (
    <button
      id="mobile-sidebar-toggle"
      className="fixed top-20 left-4 z-50 md:hidden w-10 h-10 rounded-xl bg-[#2f4383] border-2 border-[#dba65d] flex items-center justify-center shadow-lg"
      aria-label="Toggle sidebar"
    >
      {isOpen ? (
        <X className="w-5 h-5 text-[#dba65d]" strokeWidth={2} />
      ) : (
        <>
          <Menu className="w-5 h-5 text-[#dba65d]" strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 shadow-lg">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </>
      )}
    </button>
  );
}
