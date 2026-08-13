
"use client";

import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Phone, X } from "lucide-react";
import Link from "next/link";
import { TelegramIcon } from "./icons/TelegramIcon";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { PhoneIcon } from "./icons/PhoneIcon";

export const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      label: "+38 (038) 000 00 00",
      icon: <PhoneIcon width={24} height={24} />,
      href: "tel:+380380000000",
    },
    {
      label: "WHATSAPP",
      icon: <WhatsAppIcon width={24} height={24} />,
      href: "https://www.whatsapp.com/",
    },
    {
      label: "TELEGRAM",
      icon: <TelegramIcon width={24} height={24} />,
      href: "https://telegram.org/",
    },
  ];

  return (
    <Box
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* menu */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {contacts.map((contact, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                bgcolor: "background.paper",
                color: "text.primary",
                border: 2,
                borderColor: "primary.main",
                px: 2,
                py: 0.5,
                fontWeight: 900,
                textTransform: "uppercase",
                fontSize: "14px",
                whiteSpace: "nowrap",
                boxShadow: (theme) =>
                  theme.palette.mode === "light"
                    ? "4px 4px 0px #000"
                    : "4px 4px 0px #fff",
              }}
            >
              {contact.label}
            </Typography>

            <Link href={contact.href} target="_blank" rel="noopener noreferrer">
              <IconButton
                sx={{
                  bgcolor: "background.paper",
                  color: "text.primary",
                  border: 2,
                  borderColor: "primary.main",
                  borderRadius: 0,
                  width: 52,
                  height: 52,
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "4px 4px 0px #000"
                      : "4px 4px 0px #fff",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "secondary.main",
                    color: "#fff",
                    borderColor: "secondary.main",
                    transform: "translate(2px, 2px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "light"
                        ? "2px 2px 0px #000"
                        : "2px 2px 0px #fff",
                  },
                }}
              >
                {contact.icon}
              </IconButton>
            </Link>
          </Box>
        ))}
      </Box>

      {/*button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          pointerEvents: "auto",

          bgcolor: isOpen ? "secondary.main" : "background.paper",
          color: isOpen ? "#fff" : "text.primary",
          border: 2,
          borderColor: isOpen ? "secondary.main" : "primary.main",
          borderRadius: 0,
          width: { xs: 44, sm: 48 },
          height: { xs: 44, sm: 48 },
          transition: "all 0.3s ease",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "6px 6px 0px #000"
              : "6px 6px 0px #fff",
          "&:hover": {
            bgcolor: "primary.main",
            color: "background.paper",
            borderColor: "primary.main",
            transform: "translate(2px, 2px)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "4px 4px 0px #000"
                : "4px 4px 0px #fff",
          },
        }}
      >
        {isOpen ? (
          <X size={32} strokeWidth={2.5} />
        ) : (
          <Phone size={32} strokeWidth={2.5} />
        )}
      </IconButton>
    </Box>
  );
};