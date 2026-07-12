import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";

export const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "2px solid black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
            }}
          >
            ENTROPIC
          </Typography>
        </Link>

        <DesktopNav />

        <HeaderActions />
      </Toolbar>
    </AppBar>
  );
};
