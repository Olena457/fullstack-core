import { Paper, Box, Typography, Divider } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

interface DeliveryDetailsProps {
  city?: string;
  branch?: string;
}

export const DeliveryDetailsCard = ({ city, branch }: DeliveryDetailsProps) => (
  <Paper
    variant="outlined"
    sx={{ p: 3, borderRadius: 0, borderColor: "divider" }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <LocalShippingOutlinedIcon />
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, textTransform: "uppercase" }}
      >
        Nova Poshta Delivery
      </Typography>
    </Box>
    <Divider sx={{ mb: 2 }} />
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
        <Typography color="text.secondary">City:</Typography>
        <Typography sx={{ fontWeight: 600 }}>{city || "—"}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
        <Typography color="text.secondary">Branch:</Typography>
        <Typography sx={{ fontWeight: 600 }}>{branch || "—"}</Typography>
      </Box>
    </Box>
  </Paper>
);
