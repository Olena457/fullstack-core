// "use client";

// import { useEffect, useState, use } from "react";
// import { Box, Typography, Grid, Button, Alert } from "@mui/material";
// import Image from "next/image";
// import Link from "next/link";
// import { useCartStore } from "../../../store/cartStore";
// import { ProductOptions } from "../../../components/product/ProductOptions";
// import type { Product } from "../../../types/product";

// interface ProductPageProps {
//   params: Promise<{ id: string }>;
// }

// export default function ProductDetailPage({ params }: ProductPageProps) {
//   const { id } = use(params);
//   const addToCart = useCartStore((state) => state.addToCart);

//   const [product, setProduct] = useState<Product | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const [selectedColor, setSelectedColor] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
//         );
//         if (res.ok) {
//           const productData = await res.json();
//           setProduct(productData);
//         }
//       } catch (error) {
//         console.error("Failed to fetch product data", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!selectedSize || !selectedColor) {
//       setErrorMsg("Please select both size and color before adding to cart.");
//       return;
//     }

//     setErrorMsg("");
//     if (product) {
//       addToCart(product, selectedSize, selectedColor);
//     }
//   };

//   if (isLoading) {
//     return (
//       <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
//         LOADING PRODUCT DETAILS...
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box sx={{ p: 3, textAlign: "center", mt: 10 }}>PRODUCT NOT FOUND.</Box>
//     );
//   }

//   const isReadyToCart = selectedSize !== "" && selectedColor !== "";

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
//       <Box sx={{ mb: 1 }}>
//         <Link
//           href="/products"
//           style={{ textDecoration: "none", color: "black" }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 900,
//               fontSize: "0.7rem",
//               textTransform: "uppercase",
//               display: "inline-block",
//               "&:hover": { textDecoration: "underline" },
//             }}
//           >
//             ← Back to Catalog
//           </Typography>
//         </Link>
//       </Box>

//       <Grid container spacing={6}>
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Image
//             src={product.imageUrl}
//             alt={product.title}
//             width={500}
//             height={500}
//             style={{
//               width: "100%",
//               height: "600px",
//               objectFit: "cover",
//               border: "1px solid black",
//             }}
//           />
//         </Grid>

//         <Grid
//           size={{ xs: 12, md: 6 }}
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//         >
//           <Box>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 900,
//                 textTransform: "uppercase",
//                 letterSpacing: "-0.03em",
//                 mb: 4,
//               }}
//             >
//               {product.title}
//             </Typography>
//             <Typography
//               variant="h4"
//               sx={{ fontWeight: "bold", color: "black", mb: 1 }}
//             >
//               ${product.price.toFixed(2)}
//             </Typography>
//           </Box>

//           <Typography
//             variant="body1"
//             sx={{ lineHeight: 1.7, color: "text.primary" }}
//           >
//             {product.description ||
//               "No description provided for this exclusive piece."}
//           </Typography>

//           <ProductOptions
//             sizes={product.sizes}
//             colors={product.colors}
//             selectedSize={selectedSize}
//             selectedColor={selectedColor}
//             onSizeChange={setSelectedSize}
//             onColorChange={setSelectedColor}
//           />

//           {errorMsg && (
//             <Alert severity="error" sx={{ mt: 1, borderRadius: 0 }}>
//               {errorMsg}
//             </Alert>
//           )}

//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleAddToCart}
//             sx={{
//               borderRadius: 0,
//               bgcolor: isReadyToCart ? "black" : "grey.400",
//               color: "white",
//               py: 2,
//               fontWeight: "bold",
//               fontSize: "1.1rem",
//               textTransform: "uppercase",
//               mt: 2,
//               "&:hover": {
//                 bgcolor: isReadyToCart ? "rgba(0,0,0,0.8)" : "grey.400",
//               },
//             }}
//           >
//             {isReadyToCart ? "Add to Cart" : "Select Options"}
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
"use client";

import { useEffect, useState, use } from "react";
// ВАЖЛИВО: Видалили Grid з імпортів, використовуємо тільки Box
import { Box, Typography, Button, Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../../store/cartStore";
import { ProductOptions } from "../../../components/product/ProductOptions";
import type { Product } from "../../../types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        );
        if (res.ok) {
          const productData = await res.json();
          setProduct(productData);
        }
      } catch (error) {
        console.error("Failed to fetch product data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setErrorMsg("Please select both size and color before adding to cart.");
      return;
    }

    setErrorMsg("");
    if (product) {
      addToCart(product, selectedSize, selectedColor);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
        LOADING PRODUCT DETAILS...
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 3, textAlign: "center", mt: 10 }}>PRODUCT NOT FOUND.</Box>
    );
  }

  const isReadyToCart = selectedSize !== "" && selectedColor !== "";

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
      <Box sx={{ mb: 1 }}>
        <Link
          href="/products"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              display: "inline-block",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            ← Back to Catalog
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          gap: 8, 
        }}
      >
        {/* left photo*/}
        <Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "650px",
              aspectRatio: "1/1", 
              border: "1px solid black",
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority 
              sizes="(max-width: 768px) 100vw, 650px"
              style={{
                objectFit: "cover",
                objectPosition: "top", 
              }}
            />
          </Box>
        </Box>

        {/* right side details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                mb: 4,
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "black", mb: 1 }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, color: "text.primary" }}
          >
            {product.description ||
              "No description provided for this exclusive piece."}
          </Typography>

          <ProductOptions
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 1, borderRadius: 0 }}>
              {errorMsg}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{
              borderRadius: 0,
              bgcolor: isReadyToCart ? "black" : "grey.400",
              color: "white",
              py: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              mt: 2,
              "&:hover": {
                bgcolor: isReadyToCart ? "rgba(0,0,0,0.8)" : "grey.400",
              },
            }}
          >
            {isReadyToCart ? "Add to Cart" : "Select Options"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}