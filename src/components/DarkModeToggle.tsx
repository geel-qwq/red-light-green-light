"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-[42px] h-[42px] flex items-center justify-center" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-[42px] h-[42px] flex items-center justify-center hover:bg-[#dba65d] rounded-lg transition-colors group cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-[#dba65d] group-hover:text-white transition-colors" />
      ) : (
        <Moon className="w-6 h-6 text-[#dba65d] group-hover:text-white transition-colors" />
      )}
    </button>
  );
}
