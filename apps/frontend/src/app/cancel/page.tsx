"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          border: 1,
          borderColor: "divider",
          borderRadius: 0,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <XCircle size={80} color="#EF4444" strokeWidth={1.5} />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            mb: 2,
            color: "text.primary",
          }}
        >
          Payment Cancelled
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
          It looks like you cancelled the payment process. Don &#39;t worry, your
          cart is safe and you have not been charged.
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            component={Link}
            href="/checkout"
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 0,
              py: 1.5,
              fontWeight: "bold",
              bgcolor: "primary.main",
              color: "background.paper",
              "&:hover": { bgcolor: "action.hover", color: "text.primary" },
            }}
          >
            Try Again
          </Button>
          <Button
            component={Link}
            href="/products"
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: 0,
              py: 1.5,
              fontWeight: "bold",
              borderColor: "text.primary",
              color: "text.primary",
              "&:hover": {
                borderColor: "text.primary",
                bgcolor: "action.hover",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
