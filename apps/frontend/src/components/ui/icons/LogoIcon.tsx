import { Box } from "@mui/material";

interface LogoIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const LogoIcon = ({
  width = 40,
  height = 40,
  color = "#FF3E00", 
}: LogoIconProps) => {
  return (
    <Box
      sx={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,10 15,60 85,60"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        <polygon
          points="50,28 15,78 85,78"
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />

       
        <polygon
          points="50,46 15,96 85,96"
          fill={color}
          stroke={color}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
