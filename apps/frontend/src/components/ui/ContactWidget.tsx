
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
                border: 1,
                borderColor: "divider",
                px: 2,
                py: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
                boxShadow: 2, 
              }}
            >
              {contact.label}
            </Typography>

            <Link href={contact.href} target="_blank" rel="noopener noreferrer">
              <IconButton
                sx={(theme) => ({
                  bgcolor: "background.paper",
                  color: "text.primary",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 0,
                  width: { xs: 46, sm: 52 },
                  height: { xs: 46, sm: 52 },
                  boxShadow: 2, 
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "action.hover"
                        : "primary.main",
                    color: "secondary.main",
                    borderColor: "primary.main",
                    boxShadow: 4, 
                  },
                })}
              >
                {contact.icon}
              </IconButton>
            </Link>
          </Box>
        ))}
      </Box>

      {/* main button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={(theme) => ({
          pointerEvents: "auto",
          bgcolor: isOpen ? "secondary.main" : "background.paper",
          color: isOpen ? "#fff" : "text.primary",
          border: 1,
          borderColor: isOpen ? "secondary.main" : "divider",
          borderRadius: 0,
          width: { xs: 46, sm: 52 },
          height: { xs: 46, sm: 52 },
          transition: "all 0.3s ease",
          boxShadow: 2, 
          "&:hover": {
            bgcolor: isOpen
              ? "secondary.main"
              : theme.palette.mode === "light"
                ? "action.hover"
                : "primary.main",
            color: isOpen ? "#fff" : "secondary.main",
            borderColor: isOpen ? "secondary.main" : "primary.main",
            boxShadow: 4, 
          },
        })}
      >
        {isOpen ? (
          <X size={28} strokeWidth={2.5} />
        ) : (
          <Phone size={28} strokeWidth={2.5} />
        )}
      </IconButton>
    </Box>
  );
};