"use client";

import { useState, useEffect } from "react";
import { Box, BoxProps } from "@mui/material";

interface ImageWithFallbackProps extends BoxProps<"img"> {
  src: string;
  alt: string;
  index?: number;
}

const FALLBACK_IMAGES = [
  "/images/buckup-1.jpg",
  "/images/buckup-2.jpg",
  "/images/buckup-3.jpg",
];

export const ImageWithFallback = ({
  src,
  alt,
  index = 0,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImgSrc(src);
    }, 0);
    return () => clearTimeout(timer);
  }, [src]);

  const handleError = () => {
    const fallbackSrc = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Box
      component="img"
      src={imgSrc || FALLBACK_IMAGES[0]}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};
