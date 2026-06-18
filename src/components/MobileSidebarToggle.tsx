"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { getUnreadCount } from "@/actions/notifications";

const CLICK_THRESHOLD = 5;
const STORAGE_KEY = "mobile-sidebar-pos";

function loadPosition() {
  if (typeof window === "undefined") return { x: 16, y: 80 };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        return parsed;
      }
    }
  } catch {}
  return { x: 16, y: 80 };
}

function savePosition(pos: { x: number; y: number }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  } catch {}
}

export default function MobileSidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pos, setPos] = useState({ x: 16, y: 80 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = loadPosition();
    setPos(p);
    dragRef.current.currentX = p.x;
    dragRef.current.currentY = p.y;
    setReady(true);
  }, []);

  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    hasMoved: false,
    currentX: 16,
    currentY: 80,
  });
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getUnreadCount().then(setUnreadCount);
    const interval = setInterval(() => {
      getUnreadCount().then(setUnreadCount);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = useCallback(() => {
    const sidebar = document.getElementById("dashboard-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !overlay) return;
    if (sidebar.classList.contains("-translate-x-full")) {
      sidebar.classList.remove("-translate-x-full");
      sidebar.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
      setIsOpen(true);
    } else {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      overlay.classList.add("hidden");
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const overlay = document.getElementById("sidebar-overlay");
    if (!overlay) return;
    const handleOverlayClick = () => {
      const sidebar = document.getElementById("dashboard-sidebar");
      if (!sidebar) return;
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      overlay.classList.add("hidden");
      setIsOpen(false);
    };
    overlay.addEventListener("click", handleOverlayClick);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const sidebar = document.getElementById("dashboard-sidebar");
      const overlayEl = document.getElementById("sidebar-overlay");
      if (!sidebar || !overlayEl) return;
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
      overlayEl.classList.add("hidden");
      setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);

    const sidebar = document.getElementById("dashboard-sidebar");
    if (sidebar) {
      const observer = new MutationObserver(() => {
        const isSidebarOpen = sidebar.classList.contains("translate-x-0");
        setIsOpen(isSidebarOpen);
      });
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
      return () => {
        overlay.removeEventListener("click", handleOverlayClick);
        document.removeEventListener("keydown", handleEscape);
        observer.disconnect();
      };
    }

    return () => {
      overlay.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: rect.left,
      originY: rect.top,
      hasMoved: false,
      currentX: rect.left,
      currentY: rect.top,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) {
      d.hasMoved = true;
    }
    if (!d.hasMoved) return;
    const newX = Math.max(0, Math.min(window.innerWidth - 48, d.originX + dx));
    const newY = Math.max(0, Math.min(window.innerHeight - 48, d.originY + dy));
    d.currentX = newX;
    d.currentY = newY;
    setPos({ x: newX, y: newY });
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    d.dragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    if (d.hasMoved) {
      savePosition({ x: d.currentX, y: d.currentY });
    } else {
      toggleSidebar();
    }
  }, [toggleSidebar]);

  return (
    <button
      ref={toggleRef}
      id="mobile-sidebar-toggle"
      className="fixed z-50 md:hidden w-10 h-10 rounded-xl bg-[#2f4383] border-2 border-[#dba65d] flex items-center justify-center shadow-lg touch-none select-none"
      style={{ top: pos.y, left: pos.x }}
      aria-label="Toggle sidebar"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
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
