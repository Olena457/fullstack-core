
"use client";

import { styled, keyframes, useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const animateText = keyframes`
  0%, 100% {
    clip-path: polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
  }
  50% {
    clip-path: polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
  }
`;

const TextContainer = styled(Box)({
  position: "relative",
  display: "inline-block",
});

const BaseText = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 900,
  textTransform: "uppercase",
  color: "transparent",
  WebkitTextStroke: `1px ${theme.palette.mode === "dark" ? "rgba(160, 160, 160, 0.3)" : "rgba(117, 117, 117, 0.3)"}`,
  letterSpacing: "2px",
  lineHeight: 1.2,
}));

const FillingText = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 900,
  textTransform: "uppercase",
  color:
    theme.palette.mode === "dark"
      ? "rgba(160, 160, 160, 0.7)"
      : "rgba(117, 117, 117, 0.6)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  animation: `${animateText} 3s ease-in-out infinite`,
  letterSpacing: "2px",
  lineHeight: 1.2,
}));

export const AnimatedGreyText = ({
  text = "DATABASE WAKING UP",
  subText = "PLEASE WAIT A MOMENT...",
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        textAlign: "center",
        pointerEvents: "none",
        background: isDark
          ? "radial-gradient(circle, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 70%)"
          : "radial-gradient(circle, rgba(245,248,254,0.9) 0%, rgba(245,248,254,0) 70%)",
        padding: "40px",
        borderRadius: "50%",
      }}
    >
      <TextContainer>
        <BaseText>{text}</BaseText>
        <FillingText>{text}</FillingText>
      </TextContainer>

      {subText && (
        <Typography
          sx={{
            mt: 1,
            color: isDark
              ? "rgba(160, 160, 160, 0.7)"
              : "rgba(117, 117, 117, 0.7)",
            fontWeight: 500,
            fontSize: "0.8rem",
            letterSpacing: "1px",
          }}
        >
          {subText}
        </Typography>
      )}
    </Box>
  );
};