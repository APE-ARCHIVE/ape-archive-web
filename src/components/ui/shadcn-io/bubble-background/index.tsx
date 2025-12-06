"use client";

import * as React from "react";
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

type BubbleBackgroundProps = React.ComponentProps<"div"> & {
  interactive?: boolean;
  transition?: SpringOptions;
};

function BubbleBackground({
  ref,
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  ...props
}: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref as any,
    () => containerRef.current as HTMLDivElement
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  React.useEffect(() => {
    if (!interactive) return;

    const current = containerRef.current;
    if (!current) return;

    const handleMove = (e: MouseEvent) => {
      const rect = current.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };

    current.addEventListener("mousemove", handleMove);
    return () => current.removeEventListener("mousemove", handleMove);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      data-slot="bubble-background"
      className={cn(
        "relative size-full overflow-hidden bg-background", // now uses theme bg
        className
      )}
      {...props}
    >
      {/* COLOR VARIABLES MAPPED TO YOUR THEME */}
      <style>
        {`
          :root {
            --first-color: var(--primary);
            --second-color: var(--primary);
            --third-color: var(--primary);
            --fourth-color: var(--primary);
            --fifth-color: var(--primary);
            --sixth-color: var(--primary);
          }
        `}
      </style>

      {/* Gooey Filter */}
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Bubbles Layer */}
      <div className="absolute inset-0" style={{ filter: "url(#goo) blur(40px)" }}>
        {/* Bubble 1 */}
        <motion.div
          className="
            absolute rounded-full size-[80%] top-[10%] left-[10%] mix-blend-hard-light 
            bg-[radial-gradient(circle_at_center,hsl(var(--first-color)/0.8)_0%,hsl(var(--first-color)/0)_50%)]
          "
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
        />



        {/* Bubble 3 */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%+400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <div
            className="
              absolute rounded-full size-[80%] mix-blend-hard-light 
              bg-[radial-gradient(circle_at_center,hsl(var(--third-color)/0.8)_0%,hsl(var(--third-color)/0)_50%)]
              top-[calc(50%+200px)] left-[calc(50%-500px)]
            "
          />
        </motion.div>

        {/* Bubble 4 */}
        <motion.div
          className="
            absolute rounded-full size-[80%] top-[10%] left-[10%] mix-blend-hard-light 
            bg-[radial-gradient(circle_at_center,hsl(var(--fourth-color)/0.8)_0%,hsl(var(--fourth-color)/0)_50%)]
            opacity-70
          "
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Bubble 5 */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%_-_800px)_calc(50%_+_200px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          <div
            className="
              absolute rounded-full size-[160%] mix-blend-hard-light 
              bg-[radial-gradient(circle_at_center,hsl(var(--fifth-color)/0.8)_0%,hsl(var(--fifth-color)/0)_50%)]
              top-[calc(50%-80%)] left-[calc(50%-80%)]
            "
          />
        </motion.div>

        {/* Interactive bubble */}
        {interactive && (
          <motion.div
            className="
              absolute rounded-full size-full mix-blend-hard-light
              bg-[radial-gradient(circle_at_center,hsl(var(--sixth-color)/0.8)_0%,hsl(var(--sixth-color)/0)_50%)]
              opacity-70
            "
            style={{ x: springX, y: springY }}
          />
        )}
      </div>

      {children}
    </div>
  );
}

export { BubbleBackground };
