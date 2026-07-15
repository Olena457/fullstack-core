// "use client";

// import { useState } from "react";
// import { Box, Typography, TextField, Button, Divider } from "@mui/material";
// import { useCartStore } from "../../store/cartStore";
// import { useAuthStore } from "../../store/authStore";

// export const OrderSidebar = () => {
//   const { items, clearCart } = useCartStore();
//   const user = useAuthStore((state) => state.user);

//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     phone: "",
//     address: "",
//   });

//   const totalPrice = items.reduce(
//     (sum, item) => sum + item.price * item.cartQuantity,
//     0,
//   );

//   const handlePayment = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Placeholder for Monobank API integration
//     console.log("Proceeding to payment...", { items, formData, totalPrice });
//     alert("Redirecting to Monobank payment page...");
//     clearCart();
//   };

//   const inputStyles = {
//     mb: 2,
//     "& .MuiOutlinedInput-root": { borderRadius: 0 },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "black",
//       borderWidth: "1px",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "black",
//       borderWidth: "2px",
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "black",
//       borderWidth: "2px",
//     },
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handlePayment}
//       sx={{
//         width: { xs: "100%", lg: "400px" },
//         flexShrink: 0,
//         p: 4,
//         bgcolor: "#f5f5f5",
//         border: "2px solid black",
//         height: "fit-content",
//       }}
//     >
//       <Typography
//         variant="h5"
//         sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4 }}
//       >
//         Checkout
//       </Typography>

//       <TextField
//         fullWidth
//         label="Full Name"
//         required
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         sx={inputStyles}
//       />
//       <TextField
//         fullWidth
//         label="Email"
//         type="email"
//         required
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         sx={inputStyles}
//       />
//       <TextField
//         fullWidth
//         label="Phone Number"
//         required
//         value={formData.phone}
//         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//         sx={inputStyles}
//       />
//       <TextField
//         fullWidth
//         label="Delivery Address"
//         required
//         multiline
//         rows={3}
//         value={formData.address}
//         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//         sx={inputStyles}
//       />

//       <Divider sx={{ my: 3, borderColor: "black" }} />

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//           TOTAL:
//         </Typography>
//         <Typography variant="h5" sx={{ fontWeight: 900 }}>
//           ${totalPrice.toFixed(2)}
//         </Typography>
//       </Box>

//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         sx={{
//           bgcolor: "black",
//           color: "white",
//           borderRadius: 0,
//           py: 2,
//           fontSize: "1.2rem",
//           fontWeight: 900,
//           letterSpacing: "2px",
//           "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
//         }}
//       >
//         PAY
//       </Button>
//     </Box>
//   );
// };
"use client";

import { Box, Typography, Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";

export const OrderSidebar = () => {
  const router = useRouter();
  const { items } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0,
  );

  const handleProceedToCheckout = () => {
    router.push("/checkout"); // Перенаправляємо на окрему сторінку оформлення
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "400px" },
        flexShrink: 0,
        p: 4,
        bgcolor: "#f5f5f5",
        border: "2px solid black",
        height: "fit-content",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 4 }}
      >
        Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography color="text.secondary">Items count:</Typography>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {items.reduce((sum, item) => sum + item.cartQuantity, 0)} pcs
        </Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: "black" }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          TOTAL:
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Button
        onClick={handleProceedToCheckout}
        fullWidth
        variant="contained"
        disabled={items.length === 0}
        sx={{
          bgcolor: "black",
          color: "white",
          borderRadius: 0,
          py: 2,
          fontSize: "1.1rem",
          fontWeight: 900,
          letterSpacing: "1px",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
          "&.Mui-disabled": { bgcolor: "grey.500", color: "white" },
        }}
      >
        PROCEED TO CHECKOUT
      </Button>
    </Box>
  );
};