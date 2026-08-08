"use client";

import { Box } from "@mui/material";

interface PromoItem {
  id: string;
  image: string;
  alt: string;
}

const promoItems: PromoItem[] = [
  { id: "1", image: "/promo/discount1.jpg", alt: "Discount 20%" },
  { id: "2", image: "/promo/discount2.jpg", alt: "New Arrival" },
  { id: "3", image: "/promo/discount3.jpg", alt: "Summer Sale" },
  { id: "4", image: "/promo/discount4.jpg", alt: "Limited Edition" },
];

export const VerticalPromoSwiper = () => {
  const infiniteItems = [...promoItems, ...promoItems];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: "240px" },
        "@media (min-width: 1024px)": {
          maxWidth: "228px",
        },
        height: "486px",
        overflow: "hidden",
        position: { md: "sticky" },
        mt: { xs: 2, md: "40px" },
        display: "block",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          animation: "verticalScroll 15s linear infinite",
          "@keyframes verticalScroll": {
            "0%": { transform: "translateY(0)" },
            "100%": { transform: "translateY(calc(-50% - 8px))" },
          },
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {infiniteItems.map((item, index) => (
          <Box
            key={`${item.id}-${index}`}
            // component="img"
            // src={item.image}
            // alt={item.alt}
            sx={{
              width: "100%",
              height: "140px",
              display: "block",
              borderRadius: 0,
              cursor: "pointer",
              transition: "transform 0.3s ease",
              backgroundColor:
                index % 2 === 0 ? "primary.main" : "secondary.main",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
