"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import {
  motion,
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
    "radial-gradient(circle 3000px at 50% 50%, white 100%, transparent 100%)",
  );

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollRadius = useTransform(scrollYProgress, [0.3, 1], [3000, 40]);
  const smoothRadius = useSpring(scrollRadius, { stiffness: 50, damping: 100 });

  const updateMask = () => {
    const r = scrollRadius.get();
    const x = isHoveringRef.current ? springX.get() : window.innerWidth / 2;
    const y = isHoveringRef.current ? springY.get() : window.innerHeight / 2;
    maskValue.set(
      `radial-gradient(circle ${r}px at ${x}px ${y}px, white 100%, transparent 100%)`,
    );
  };

  useMotionValueEvent(springX, "change", updateMask);
  useMotionValueEvent(springY, "change", updateMask);
  useMotionValueEvent(scrollRadius, "change", updateMask);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value < 0.4) {
      const x = isHoveringRef.current ? springX.get() : window.innerWidth / 2;
      const y = isHoveringRef.current ? springY.get() : window.innerHeight / 2;
      maskValue.set(
        `radial-gradient(circle 3000px at ${x}px ${y}px, white 100%, transparent 100%)`,
      );
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      isHoveringRef.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative h-[200vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Content */}
        <div className="relative z-30 flex h-full items-stretch mix-blend-difference">
          <div className="flex w-[85%] items-center justify-start pl-6 md:pl-12">
            <h2 className="font-unica text-3xl md:text-4xl tracking-tight text-white">
              contact
            </h2>
          </div>
          <div className="flex w-[15%] items-center justify-end pr-6 md:pr-12">
            <div className="flex w-full max-w-md flex-col gap-6 text-right">
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
