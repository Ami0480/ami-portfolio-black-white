"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax — each element moves at different speeds
  const yImage = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const yBody = useTransform(scrollYProgress, [0, 1], [120, -80]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-[120vh] bg-white text-black flex flex-col justify-center overflow-hidden"
    >
      <div className="flex h-full w-full items-center px-6 md:px-12 py-24 gap-8">
        {/* Left — image with parallax */}
        <motion.div
          className="hidden sm:flex w-1/2 items-center"
          style={{ y: yImage }}
        >
          <Image
            src="/images/image-blackandwhite.jpg"
            alt="About"
            width={400}
            height={200}
            className="w-full object-contain max-h-[300px]"
            priority
          />
        </motion.div>

        {/* Right — title and paragraph with different parallax speeds */}
        <div className="flex w-full flex-col gap-12 sm:w-1/2 items-end justify-center">
          <motion.h2
            className="font-unica text-3xl md:text-4xl tracking-tight text-right text-black"
            style={{ y: yTitle }}
          >
            about
          </motion.h2>
          <motion.p
            className="font-intertight max-w-md text-sm leading-relaxed md:text-base text-right text-black"
            style={{ y: yBody }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
