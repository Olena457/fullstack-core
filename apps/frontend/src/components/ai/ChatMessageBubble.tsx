import { Box, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";

export interface Message {
  role: "user" | "assistant";
  text: string;
}

interface ChatMessageBubbleProps {
  msg: Message;
}

export const ChatMessageBubble = ({ msg }: ChatMessageBubbleProps) => (
  <Box
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
);
