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
  const yImage = useTransform(scrollYProgress, [0, 1], [20, -20]); // slow
  const yTitle = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const yBody = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const yJa = useTransform(scrollYProgress, [0, 1], [140, -100]); // fast

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-[120vh] bg-white text-black flex flex-col justify-center overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row h-full w-full max-w-480 mx-auto items-start sm:items-center px-6 md:px-12 py-24 gap-8">
        {/* Image + Japanese — order 1 on desktop (left), order 3 on mobile (after english) */}
        <div className="order-3 sm:order-1 w-full sm:w-1/2 flex flex-col gap-4 my-8 sm:my-0">
          <motion.div
            className="relative z-10 flex items-center justify-center"
            style={{ y: yImage }}
          >
            <Image
              src="/images/image-blackandwhite.jpg"
              alt="About"
              width={480}
              height={320}
              className="w-full object-contain max-h-64 sm:max-h-80"
              priority
            />
          </motion.div>
          <motion.p
            className="relative z-0 font-intertight text-xs font-light leading-relaxed text-black opacity-65 sm:max-w-3xs mt-8"
            style={{ y: yJa }}
          >
            美容、健康業界のマネジメント業務を経た後、プログラミングの世界に興味を持つ。
            <br />
            現在はウェブ、アプリ制作を中心に、データ管理やマーケティングにも幅を広げている。お菓子作りやDIYなど「実験、形にすること」が好き。旅行も好き。
          </motion.p>
        </div>

        {/* Title + English — order 2 on desktop (right), order 1 on mobile (first) */}
        <div className="order-1 sm:order-2 flex w-full sm:w-1/2 flex-col gap-2 items-start sm:items-end justify-center">
          <motion.h2
            className="font-unica text-3xl md:text-4xl tracking-tight text-left text-black"
            style={{ y: yTitle }}
          >
            about
          </motion.h2>
          <motion.div
            className="font-intertight max-w-md text-sm font-light leading-relaxed md:text-base text-left sm:text-right sm:max-w-3/4 text-black flex flex-col gap-4"
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
