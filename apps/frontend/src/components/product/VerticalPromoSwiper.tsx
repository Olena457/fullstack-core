
import { Box } from "@mui/material";

interface PromoItem {
  id: string;
  image: string;
  alt: string;
}

const promoItems: PromoItem[] = [
  { id: "2", image: "/images/man.jpg", alt: "New Arrival" },
  { id: "1", image: "/images/white.jpg", alt: "Discount 20%" },
  { id: "3", image: "/images/one.jpg", alt: "Summer Sale" },
  { id: "4", image: "/images/new.jpg", alt: "Limited Edition" },
];

export const VerticalPromoSwiper = () => {
  const infiniteItems = [...promoItems, ...promoItems];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: { xs: "500px", md: "365px", lg: "450px" },
        overflow: "hidden",
        position: { md: "sticky" },
        top: { md: "100px" },
        mt: { xs: 2, md: "38px" },
        display: "block",
      }}
    >
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          animation: "verticalScroll 60s linear infinite",
          willChange: "transform", 
          "@keyframes verticalScroll": {
            "0%": { transform: "translate3d(0, 0, 0)" },
            "100%": { transform: "translate3d(0, calc(-50% - 8px), 0)" }, 
          },
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {infiniteItems.map((item, index) => (
          <Box
            key={`${item.id}-${index}`}
            component="img"
            src={item.image}
            alt={item.alt}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
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
