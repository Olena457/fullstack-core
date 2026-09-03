import { Button } from "@mui/material";
import { Bot } from "lucide-react";

interface AiChatButtonProps {
  onClick: () => void;
}

export function AiChatButton({ onClick }: AiChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      startIcon={<Bot size={20} />}
      sx={{
        fontWeight: 600,
        borderRadius: 1, 
        bgcolor: "black",
        color: "white",
        px: 3,
        py: 1,
        textTransform: "uppercase",
        letterSpacing: "1px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          bgcolor: "#333",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      AI help
    </Button>
  );
}
