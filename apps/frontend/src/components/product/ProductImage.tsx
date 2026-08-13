import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
  title: string;
  gender?: string;
}

export const ProductImage = ({ imageUrl, title, gender }: ProductImageProps) => (
  <Box sx={{ width: "100%" }}>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "650px",
        aspectRatio: "1/1",
        overflow: "hidden",
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 650px"
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    </Box>
    {gender && (
      <Typography
        variant="overline"
        sx={{
          fontWeight: 900,
          color: "secondary.main",
          letterSpacing: "0.1em",
          display: "block",
          lineHeight: 1,
          mt: 1.5,
        }}
      >
        {gender}
      </Typography>
    )}
  </Box>
);
