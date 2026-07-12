// "use client";

// import { useEffect, useState } from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import { PaginationControls } from "../../components/product/PaginationControls";
// import { FilterSidebar } from "../../components/product/FilterSidebar";
// // import { SortSelect } from "../../components/product/SortSelect";
// import { ProductCard } from "../../components/product/ProductCard";
// import { useCartStore } from "../../store/cartStore";
// import type { Product } from "../../types/product";

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const addToCart = useCartStore((state) => state.addToCart);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=8`,
//         );
//         const data = await res.json();
//         setProducts(data.data);
//         setTotalPages(data.meta.totalPages);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//       }
//     };
//     fetchProducts();
//   }, [page]);

//   return (
//     <Box sx={{ p: 4, maxWidth: "1400px", margin: "0 auto" }}>
//       <Typography
//         variant="h3"
//         sx={{
//           fontWeight: 800,
//           mb: 4,
//           textTransform: "uppercase",
//           letterSpacing: "-0.05em",
//         }}
//       >

//         Find Your Style
//       </Typography>

//       <Box sx={{ display: "flex", gap: 4 }}>
//         <FilterSidebar />

//         <Box sx={{ flexGrow: 1 }}>
//           <Grid container spacing={3}>
//             {products.map((product) => (
//               <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
//                 <ProductCard product={product} onAdd={addToCart} />
//               </Grid>
//             ))}
//           </Grid>

//           <PaginationControls
//             page={page}
//             count={totalPages}
//             onChange={setPage}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { PaginationControls } from "../../components/product/PaginationControls";
import { FilterSidebar } from "../../components/product/FilterSidebar";
import { ProductCard } from "../../components/product/ProductCard";
import { useCartStore } from "../../store/cartStore";
import type { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sort, setSort] = useState("newest");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=8`;

        if (sort) url += `&sort=${sort}`;
        if (gender) url += `&gender=${gender}`;
        if (color) url += `&color=${color}`;
        if (size) url += `&size=${size}`;

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [page, sort, gender, color, size]); 
  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    setter(value);
    setPage(1);
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", margin: "0 auto" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}
      >
        Find Your Style
      </Typography>

      {/* Змінили відображення на мобільних пристроях на стовпчик (flexDirection) */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* 3. ФІКСУЄМО ШИРИНУ САЙДБАРУ, щоб селекти не стрибали */}
        <Box sx={{ width: { xs: "100%", md: "260px" }, flexShrink: 0 }}>
          <FilterSidebar
            selectedSort={sort}
            selectedGender={gender}
            selectedColor={color}
            selectedSize={size}
            onSortChange={(val) => handleFilterChange(setSort, val)}
            onGenderChange={(val) => handleFilterChange(setGender, val)}
            onColorChange={(val) => handleFilterChange(setColor, val)}
            onSizeChange={(val) => handleFilterChange(setSize, val)}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={product.id}>
                <ProductCard product={product} onAdd={addToCart} />
              </Grid>
            ))}
          </Grid>

          {/* Показуємо пагінацію тільки якщо є хоча б 1 сторінка */}
          {totalPages > 0 && (
            <Box sx={{ mt: 4 }}>
              <PaginationControls
                page={page}
                count={totalPages}
                onChange={setPage}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}