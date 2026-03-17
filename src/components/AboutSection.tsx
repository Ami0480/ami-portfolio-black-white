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
        <div className="flex w-full flex-col gap-2 sm:w-1/2 items-end justify-center">
          <motion.h2
            className="font-unica text-3xl md:text-4xl tracking-tight text-right text-black"
            style={{ y: yTitle }}
          >
            about
          </motion.h2>
          <motion.div
            className="font-intertight max-w-lg text-sm font-light leading-relaxed md:text-base text-right text-black flex flex-col gap-4"
            style={{ y: yBody }}
          >
            <p>
              Hi, I’m Ami from Himeji, Japan, now living in Australia for 15
              years.
            </p>
            <p>
              After working in the health industry and management, I discovered
              my passion for technology and problem-solving. I focus on
              front-end development and continue expanding my skills by learning
              back-end development, working toward becoming a full-stack
              developer. Recently, I’ve also been interested in vibe coding —
              experimenting with ideas, tools, and creative workflows to make
              development more intuitive and fun.
            </p>
            <p>
              Outside of coding, I enjoy creating things — baking, DIY projects
              like homemade softener and kids’ bubble mix, and traveling. I love
              experimenting and learning the science behind how things work.
              I’ve visited more than 20 countries and enjoy learning about
              different cultures. I’m always happy to exchange ideas and share
              experiences with people from different backgrounds.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
