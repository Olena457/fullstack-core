"use client";

import { motion } from "framer-motion";
import React from "react";

export const FadeInUp = ({
  children,
  delay = 0,
  fullSize = false,
}: {
  children: React.ReactNode;
  delay?: number;
  fullSize?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    style={fullSize ? { width: "100%", height: "100%" } : undefined}
  >
    {children}
  </motion.div>
);
