// "use client";

// import { Box, Typography, Button } from "@mui/material";
// import Link from "next/link";
// import { useCartStore } from "../../store/cartStore";
// import { OrderItemList } from "../../components/order/OrderItemList";
// import { OrderSidebar } from "../../components/order/OrderSidebar";

// export default function CartPage() {
//   const items = useCartStore((state) => state.items);

//   if (items.length === 0) {
//     return (
//       <Box
//         sx={{
//           p: 4,
//           maxWidth: "1400px",
//           mx: "auto",
//           textAlign: "center",
//           mt: 10,
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{ fontWeight: 900, textTransform: "uppercase", mb: 2 }}
//         >
//           Your cart is empty
//         </Typography>
//         <Link href="/products" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: "black",
//               color: "white",
//               borderRadius: 0,
//               px: 4,
//               py: 1.5,
//               fontWeight: "bold",
//             }}
//           >
//             CONTINUE SHOPPING
//           </Button>
//         </Link>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4, maxWidth: "1400px", mx: "auto" }}>
//       <Typography
//         variant="h4"
//         sx={{ fontWeight: 900, textTransform: "uppercase", mb: 3 }}
//       >
//         Shopping Cart
//       </Typography>

//       <Box
//         sx={{
//           display: "flex",
//           gap: 6,
//           flexDirection: { xs: "column", lg: "row" },
//         }}
//       >
//         <OrderSidebar />
//         <OrderItemList />
//       </Box>
//     </Box>
//   );
// }
"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";
import { OrderItemList } from "../../components/order/OrderItemList";
import { OrderSidebar } from "../../components/order/OrderSidebar";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          maxWidth: "1400px",
          mx: "auto",
          textAlign: "center",
          mt: 10,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, textTransform: "uppercase", mb: 2 }}
        >
          Your cart is empty
        </Typography>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              borderRadius: 0,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            CONTINUE SHOPPING
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", mx: "auto" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, textTransform: "uppercase", mb: 3 }}
      >
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 6,
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <OrderItemList />
        <OrderSidebar />
      </Box>
    </Box>
  );
}