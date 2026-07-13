// "use client";

// import { Box, Typography, Button, Stack } from "@mui/material";
// import Link from "next/link";
// import { Plus, List } from "lucide-react";

// export default function Home() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         minHeight: "100vh",
//         textAlign: "center",
//         p: 3,
//       }}
//     >
//       <Typography
//         variant="h2"
//         component="h1"
//         gutterBottom
//         sx={{ fontWeight: "bold" }}
//       >
//         Welcome to Quiz Builder
//       </Typography>

//       <Typography
//         variant="h6"
//         color="text.secondary"
//         sx={{ mb: 6, maxWidth: 600 }}
//       >
//         Create, manage, and take interactive quizzes effortlessly. Get started
//         by creating a new quiz or exploring available ones.
//       </Typography>

//       <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
//         <Button
//           component={Link}
//           href="/quizzes"
//           variant="contained"
//           size="large"
//           startIcon={<List />}
//         >
//           View All Quizzes
//         </Button>

//         <Button
//           component={Link}
//           href="/create"
//           variant="outlined"
//           size="large"
//           startIcon={<Plus />}
//         >
//           Create New Quiz
//         </Button>
//       </Stack>
//     </Box>
//   );
// }
"use client";

import { Box, Typography } from "@mui/material";
import { DesktopNav } from "../components/navigation/DesktopNav"; 

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          py: 1,
          borderBottom: "2px solid black",
        }}
      >
        <DesktopNav isHome={true} />
      </Box>

      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h3">WELCOME TO OUR BRAND</Typography>
      </Box>
    </Box>
  );
}