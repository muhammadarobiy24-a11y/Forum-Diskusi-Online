"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ColorTheme = "frosted" | "midnight" | "slate";

interface ColorThemeContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextValue>({
  colorTheme: "frosted",
  setColorTheme: () => {},
});

const STORAGE_KEY = "forum-color-theme";

export const COLOR_THEME_CONFIG: Record<ColorTheme, {
  label: string;
  swatch: string;
  bg: string;
  orb1: string;
  orb2: string;
  orb3: string;
  border: string;
}> = {
  frosted: {
    label: "Frosted Glass",
    swatch: "#0f0a1e",
    bg: "linear-gradient(135deg, #0d0d1a 0%, #0f0a1e 40%, #0a1020 100%)",
    orb1: "#7c3aed",
    orb2: "#3b82f6",
    orb3: "#a855f7",
    border: "border-violet-500",
  },
  midnight: {
    label: "Midnight Blue",
    swatch: "#020d28",
    bg: "linear-gradient(135deg, #020818 0%, #030d2e 40%, #030c28 100%)",
    orb1: "#1d4ed8",
    orb2: "#0ea5e9",
    orb3: "#6366f1",
    border: "border-blue-500",
  },
  slate: {
    label: "Forest Dark",
    swatch: "#0a150a",
    bg: "linear-gradient(135deg, #0a0f0a 0%, #0d1a10 40%, #091208 100%)",
    orb1: "#059669",
    orb2: "#10b981",
    orb3: "#34d399",
    border: "border-emerald-500",
  },
};

function applyColorTheme(t: ColorTheme) {
  if (typeof document === "undefined") return;
  const cfg = COLOR_THEME_CONFIG[t];
  const root = document.documentElement;
  root.style.setProperty("--app-bg", cfg.bg);
  root.style.setProperty("--orb-color-1", cfg.orb1);
  root.style.setProperty("--orb-color-2", cfg.orb2);
  root.style.setProperty("--orb-color-3", cfg.orb3);
  root.setAttribute("data-color-theme", t);
}

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("frosted");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorTheme | null;
    const validThemes: ColorTheme[] = ["frosted", "midnight", "slate"];
    const initial: ColorTheme = saved && validThemes.includes(saved) ? saved : "frosted";
    setColorThemeState(initial);
    applyColorTheme(initial);
  }, []);

  function setColorTheme(t: ColorTheme) {
    setColorThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    applyColorTheme(t);
  }

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ColorThemeContext);
}
