import { Box, Typography, Button } from "@mui/material";

const filters = {
  gender: ["Men's", "Women's", "Unisex"],
  color: ["White", "Black", "Blue", "Green", "Grey", "Red", "Navy"],
  size: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
};

export const FilterSidebar = () => {
  return (
    <Box sx={{ minWidth: 200, pr: 4 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 3 }}
      >
        Find Your Style:
      </Typography>

      {/* Gender Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Gender:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          {filters.gender.map((g) => (
            <Button
              key={g}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 0,
                borderColor: "black",
                color: "black",
                textTransform: "none",
                px: 2,
                "&:hover": { bgcolor: "black", color: "white" },
              }}
            >
              {g}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Color Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Color:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          {filters.color.map((c) => (
            <Button
              key={c}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 0,
                borderColor: "black",
                color: "black",
                textTransform: "none",
                px: 2,
                "&:hover": { bgcolor: "black", color: "white" },
              }}
            >
              {c}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Size Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Size:
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          {filters.size.map((s) => (
            <Button
              key={s}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 0,
                borderColor: "black",
                color: "black",
                textTransform: "none",
                px: 2,
                minWidth: "60px",
                "&:hover": { bgcolor: "black", color: "white" },
              }}
            >
              {s}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
