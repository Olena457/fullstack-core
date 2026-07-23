import { create } from "zustand";
import { PaletteMode } from "@mui/material";

interface ThemeState {
  mode: PaletteMode;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "light", 
  toggleTheme: () =>
    set((state) => ({
      mode: state.mode === "light" ? "dark" : "light",
    })),
}));
