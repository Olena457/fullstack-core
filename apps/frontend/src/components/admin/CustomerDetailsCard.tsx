import { Paper, Box, Typography, Divider } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

interface CustomerDetailsProps {
  name: string;
  email: string;
  phone?: string;
}

export const CustomerDetailsCard = ({
  name,
  email,
  phone,
}: CustomerDetailsProps) => (
  <Paper
    variant="outlined"
    sx={{ p: 3, borderRadius: 0, borderColor: "divider" }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <PersonOutlinedIcon />
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, textTransform: "uppercase" }}
      >
        Customer Details
      </Typography>
    </Box>
    <Divider sx={{ mb: 2 }} />
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
        <Typography color="text.secondary">Name:</Typography>
        <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
        <Typography color="text.secondary">Email:</Typography>
        <Typography sx={{ fontWeight: 600 }}>{email}</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
        <Typography color="text.secondary">Phone:</Typography>
        <Typography sx={{ fontWeight: 600 }}>{phone || "—"}</Typography>
      </Box>
    </Box>
  </Paper>
);
