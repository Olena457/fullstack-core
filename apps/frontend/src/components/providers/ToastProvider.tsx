"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import { useThemeStore } from "@/store/themeStore"; 

export const ToastProvider = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      theme={mode} 
      toastStyle={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "0px", 
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[4],
      }}
    />
  );
};
