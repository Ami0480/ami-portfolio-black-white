"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import {
  motion,
  animate,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isHoveringRef = useRef(false);
  const maskValue = useMotionValue(
    "radial-gradient(circle 3000px at 50% 50%, white 100%, transparent 100%)"
  );

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const scrollRadius = useTransform(scrollYProgress, [0, 0.6], [3700, 40]);
  // Mobile: start at 600px so shrinking is immediately visible on small screens
  const scrollRadiusMobile = useTransform(scrollYProgress, [0, 0.6], [950, 0]);

  const isMobileRef = useRef(false);
  const breatheOffset = useMotionValue(0);
  const breatheControlsRef = useRef<{ stop: () => void } | null>(null);

  const updateMask = () => {
    const base = isMobileRef.current
      ? scrollRadiusMobile.get()
      : scrollRadius.get();
    const r = isMobileRef.current ? base + breatheOffset.get() : base;
    // Mobile: always shrink to center using CSS percentages
    const x = isMobileRef.current
      ? "50%"
      : `${isHoveringRef.current ? springX.get() : window.innerWidth / 2}px`;
    const y = isMobileRef.current
      ? "50%"
      : `${isHoveringRef.current ? springY.get() : window.innerHeight / 2}px`;
    maskValue.set(
      `radial-gradient(circle ${r}px at ${x} ${y}, white 100%, transparent 100%)`
    );
  };

  useMotionValueEvent(springX, "change", updateMask);
  useMotionValueEvent(springY, "change", updateMask);
  useMotionValueEvent(scrollRadius, "change", updateMask);
  useMotionValueEvent(scrollRadiusMobile, "change", updateMask);
  useMotionValueEvent(breatheOffset, "change", updateMask);

  // Stop breathing once user starts scrolling
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > 0.05 && breatheControlsRef.current) {
      breatheControlsRef.current.stop();
      breatheOffset.set(0);
      breatheControlsRef.current = null;
    }
  });

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 640;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Start breathing animation on mobile
    if (isMobileRef.current) {
      breatheControlsRef.current = animate(breatheOffset, [0, 18, 0], {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      isHoveringRef.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      breatheControlsRef.current?.stop();
    };
  }, [breatheOffset, cursorX, cursorY]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative h-[280vh] bg-black -mt-[100vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Content */}
        <div className="relative z-30 flex h-full flex-col sm:flex-row sm:items-stretch mix-blend-difference justify-start sm:justify-normal gap-20 sm:gap-0 px-6 sm:px-0 pt-24 sm:pt-0">
          <div className="flex sm:w-[85%] items-start sm:items-center justify-start sm:pl-6 md:pl-12">
            <h2 className="font-unica text-3xl md:text-4xl tracking-tight text-white">
              contact
            </h2>
          </div>
          <div className="flex sm:w-[15%] items-start sm:items-center sm:justify-end sm:pr-6 md:pr-12">
            <div className="flex w-full max-w-md flex-col gap-6 text-left sm:text-right">
              <Link
                href="mailto:amifuku80@gmail.com"
                className="font-unica text-2xl md:text-3xl tracking-tight text-white transition-all duration-200 hover:translate-x-2 hover:opacity-80"
              >
                Email
              </Link>
              <Link
                href="https://www.linkedin.com/in/amifukuyama/"
                target="_blank"
                rel="noreferrer"
                className="font-unica text-2xl md:text-3xl tracking-tight text-white transition-all duration-200 hover:translate-x-2 hover:opacity-80"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/Ami0480"
                target="_blank"
                rel="noreferrer"
                className="font-unica text-2xl md:text-3xl tracking-tight text-white transition-all duration-200 hover:translate-x-2 hover:opacity-80"
              >
                Github
              </Link>
              <Link
                href="https://x.com/CodeCrafty"
                target="_blank"
                rel="noreferrer"
                className="font-unica text-2xl md:text-3xl tracking-tight text-white transition-all duration-200 hover:translate-x-2 hover:opacity-80"
              >
                X
              </Link>
            </div>
          </div>
        </div>

        {/* White overlay with cursor-following circle */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-white"
          style={{
            WebkitMaskImage: maskValue,
            maskImage: maskValue,
          }}
        />
      </div>
    </section>
  );
}
