// import { memo } from "react";
// import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
// import type { Product } from "../../types/product";

// type Props = {
//   product: Product;
//   onAdd: (product: Product) => void;
// };

// export const ProductCard = memo(function ProductCard({ product, onAdd }: Props) {
//   return (
//     <Card
//       sx={{
//         borderRadius: 0,
//         border: "1px solid black",
//         boxShadow: "none",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column"
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="350"
//         image={product.imageUrl}
//         alt={product.title}
//         sx={{ objectFit: "cover" }}
//       />
//       <CardContent
//         sx={{
//           p: 2,
//           flexGrow: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between"
//         }}
//       >
//         <Box>
//           <Typography
//             variant="subtitle2"
//             sx={{ fontWeight: 800, textTransform: "uppercase", mb: 0.5, lineHeight: 1.2 }}
//           >
//             {product.title}
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             ${product.price.toFixed(2)}
//           </Typography>
//         </Box>
//         <Button
//           fullWidth
//           variant="outlined"
//           onClick={() => onAdd(product)}
//           sx={{
//             borderRadius: 0,
//             border: "1px solid black",
//             color: "black",
//             fontWeight: "bold",
//             textTransform: "none",
//             "&:hover": { bgcolor: "black", color: "white", borderColor: "black" }
//           }}
//         >
//           Add to Cart
//         </Button>
//       </CardContent>
//     </Card>
//   );
// });
"use client";

import { memo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import type { Product } from "../../types/product";

type Props = {
  product: Product;
};

export const ProductCard = memo(function ProductCard({ product }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 0,
        border: "1px solid black",
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="350"
          image={product.imageUrl}
          alt={product.title}
          sx={{ objectFit: "cover", cursor: "pointer" }}
        />
      </Link>
      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link
            href={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                textTransform: "uppercase",
                mb: 0.5,
                lineHeight: 1.2,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {product.title}
            </Typography>
          </Link>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Link
          href={`/products/${product.id}`}
          passHref
          style={{ textDecoration: "none" }}
        >
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: 0,
              border: "1px solid black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                borderColor: "black",
              },
            }}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
});