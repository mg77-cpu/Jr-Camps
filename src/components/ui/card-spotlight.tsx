"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  spotlightColor,
  ...props
}: {
  radius?: number;
  color?: string;
  spotlightColor?: number[][];
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Helper to convert hex to rgb if needed, but for now we'll just accept that 
  // users might want to customize the internal effect colors separately.
  // Ideally we'd parse `color` but simple is better. 
  // Let's create a derived RGB for the default effect if specific effect colors aren't provided.
  // For this specific task, I'll just hardcode the logic to use the color prop if it's a valid hex, 
  // or default to the purple if not easily parseable? 
  // Actually, better to just let the consumer pass the RGB values for the effect.
  
  // Wait, I can't easily change the signature without potentially breaking other usages 
  // if I don't provide a default.
  
  // Let's modify the component to accept a prop for the effect colors.

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-200 dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-40"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={spotlightColor || [
              [239, 173, 255],
              [239, 173, 255],
            ]}
            dotSize={3}
            showGradient={false}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
};
