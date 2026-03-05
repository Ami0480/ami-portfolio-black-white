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

  const yTitle = useTransform(scrollYProgress, [0.15, 1], [-50, -150]);
  const yBody = useTransform(scrollYProgress, [0.15, 1], [50, -200]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-[120vh] bg-white text-black flex flex-col justify-center"
    >
      <div className="flex h-full items-stretch px-6 md:px-12 py-16 gap-8">
        {/* Left — image, same height as the right content */}
        <motion.div
          className="hidden sm:flex w-1/2 items-center"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/images/portfolio-blackandwhite.png"
            alt="About"
            width={600}
            height={400}
            className="w-full object-contain max-h-[400px]"
            style={{ height: "100%" }}
          />
        </motion.div>

        {/* Right — title and paragraph */}
        <motion.div
          className="flex w-full flex-col gap-12 sm:w-1/2 items-end justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div style={{ y: yTitle }}>
            <motion.h2 className="font-unica text-3xl md:text-4xl tracking-tight text-right">
              about
            </motion.h2>
          </motion.div>
          <motion.div style={{ y: yBody }}>
            <motion.p className="font-intertight max-w-md text-sm leading-relaxed md:text-base text-right">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
