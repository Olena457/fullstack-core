"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Paper,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { X, Send, CircleX, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AiChatModalProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export const AiChatModal: React.FC<AiChatModalProps> = ({ open, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text: userText },
    ];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const historyForBackend = messages.map((msg) => ({
        role: msg.role,
        content: msg.text,
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            question: userText,
            history: historyForBackend,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Connection error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
      sx={{ "& .MuiDialog-paper": { borderRadius: 2, height: "80vh" } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: 2,
          borderColor: "divider",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          <Box
            component="img"
            src="/icon.svg"
            alt="Alterego Icon"
            sx={{
              width: { xs: 20, sm: 26 },
              height: { xs: 20, sm: 26 },
              display: "block",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: { xs: "0.75rem", sm: "1.1rem", md: "1.2rem" },
              color: "text.primary",
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            ALTEREGO AI ASSISTANT
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: { xs: 0, sm: 1 } }}>
          {messages.length > 0 && (
            <IconButton
              onClick={() => setMessages([])}
              sx={{
                borderRadius: 0,
                "&:hover": { bgcolor: "action.hover" },
                p: { xs: 0.5, sm: 1 },
              }}
            >
              <Trash2 size={20} />
            </IconButton>
          )}
          <IconButton
            onClick={onClose}
            sx={{
              borderRadius: 0,
              "&:hover": { bgcolor: "action.hover" },
              p: { xs: 0.5, sm: 1 },
            }}
          >
            <X size={24} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          bgcolor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          p: 0,
        }}
      >
        <Box
          ref={scrollRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          {messages.length === 0 && (
            <Box
              sx={{
                mt: 4,
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, mb: 1, textTransform: "uppercase" }}
              >
                Welcome to the store
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: { xs: "100%", sm: "80%" } }}
              >
                Looking for an oversized fit? Need to find something on SALE? Or
                just want recommendations for a new drop? Ask me anything.
              </Typography>
            </Box>
          )}
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: msg.role === "user" ? "black" : "white",
                  color: msg.role === "user" ? "white" : "text.primary",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  "& p": { m: 0 },
                  "& strong": { fontWeight: 700 },
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </Paper>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #eee", gap: 1 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Ask about sizes, trends, or discounts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          slotProps={{
            input: {
              endAdornment: input && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setInput("")}>
                    <CircleX size={16} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          variant="contained"
          sx={{
            minWidth: 52,
            height: 40,
            borderRadius: 1,
            bgcolor: "black",
            color: "white",
            "&:hover": { bgcolor: "#333" },
            "&.Mui-disabled": { bgcolor: "#e0e0e0" },
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
