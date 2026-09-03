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
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: msg.role === "user" ? "primary.main" : "background.paper",
        color: msg.role === "user" ? "background.default" : "text.primary",
        border: 1,
        borderColor: "divider",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        "& p": { m: 0 },
        "& strong": { fontWeight: 700 },
      }}
    >
      <ReactMarkdown>{msg.text}</ReactMarkdown>
    </Paper>
  </Box>
);