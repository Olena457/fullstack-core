// "use client";

// import { Box, Typography, Paper, Divider } from "@mui/material";
// import { useCartStore } from "../../store/cartStore";
// import type { CartStore } from "../../store/cartStore";

// export const CheckoutSummary = () => {
//   const items = useCartStore((state: CartStore) => state.items);
//   const getTotalPrice = useCartStore((state: CartStore) => state.getTotalPrice);

//   return (
//     <Box>
//       <Paper
//         variant="outlined"
//         sx={{
//           p: 3,
//           borderRadius: 0,
//           borderColor: "divider",
//           bgcolor: "background.paper",
//           position: "sticky",
//           top: "100px",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 900,
//             textTransform: "uppercase",
//             mb: 3,
//             color: "text.primary",
//           }}
//         >
//           Order Summary
//         </Typography>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
//           {items.map((item) => (
//             <Box
//               key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               <Box>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontWeight: "bold", color: "text.primary" }}
//                 >
//                   {item.title}{" "}
//                   <Typography component="span" color="text.secondary">
//                     × {item.cartQuantity}
//                   </Typography>
//                 </Typography>
//                 {(item.selectedSize || item.selectedColor) && (
//                   <Typography variant="caption" color="text.secondary">
//                     {[item.selectedSize, item.selectedColor]
//                       .filter(Boolean)
//                       .join(" | ")}
//                   </Typography>
//                 )}
//               </Box>
//               <Typography
//                 variant="body2"
//                 sx={{ fontWeight: "bold", color: "text.primary" }}
//               >
//                 ${(item.price * item.cartQuantity).toFixed(2)}
//               </Typography>
//             </Box>
//           ))}
//         </Box>

//         <Divider sx={{ my: 2, borderColor: "divider" }} />

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//           <Typography color="text.secondary">Subtotal</Typography>
//           <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
//             ${getTotalPrice().toFixed(2)}
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography color="text.secondary">Shipping</Typography>
//           <Typography sx={{ color: "success.main", fontWeight: "bold" }}>
//             FREE
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mt: 2,
//             pt: 2,
//             borderTop: 2,
//             borderColor: "divider",
//           }}
//         >
//           <Typography
//             sx={{ fontWeight: 900, fontSize: "1.2rem", color: "text.primary" }}
//           >
//             TOTAL
//           </Typography>
//           <Typography
//             sx={{
//               fontWeight: 900,
//               fontSize: "1.2rem",
//               color: "secondary.main",
//             }}
//           >
//             ${getTotalPrice().toFixed(2)}
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };
"use client";

import { Box, Typography, Paper, Divider } from "@mui/material";
import { useCartStore } from "../../store/cartStore";
import type { CartStore } from "../../store/cartStore";

export const CheckoutSummary = () => {
  const items = useCartStore((state: CartStore) => state.items);
  const getTotalPrice = useCartStore((state: CartStore) => state.getTotalPrice);

  const subtotal = getTotalPrice();

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 0,
          borderColor: "divider",
          bgcolor: "background.paper",
          position: "sticky",
          top: "100px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            mb: 3,
            color: "text.primary",
          }}
        >
          Order Summary
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          {items.map((item) => (
            <Box
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {item.title}{" "}
                  <Typography component="span" color="text.secondary">
                    × {item.cartQuantity}
                  </Typography>
                </Typography>
                {(item.selectedSize || item.selectedColor) && (
                  <Typography variant="caption" color="text.secondary">
                    {[item.selectedSize, item.selectedColor]
                      .filter(Boolean)
                      .join(" | ")}
                  </Typography>
                )}
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                ${(item.price * item.cartQuantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2, borderColor: "divider" }} />

        {/* SUBTOTAL */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>

        {/* SHIPPING INFO */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary">Shipping</Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "text.secondary",
              fontSize: "0.8rem",
              textAlign: "right",
            }}
          >
            Paid upon receipt <br /> (Carrier rates)
          </Typography>
        </Box>

        {/* TOTAL (тільки за товари) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            pt: 2,
            borderTop: 2,
            borderColor: "divider",
          }}
        >
          <Typography
            sx={{ fontWeight: 900, fontSize: "1.2rem", color: "text.primary" }}
          >
            TOTAL
          </Typography>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "1.2rem",
              color: "secondary.main",
            }}
          >
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};