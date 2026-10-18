"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { ease } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
