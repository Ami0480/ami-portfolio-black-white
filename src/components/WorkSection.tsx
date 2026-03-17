"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
  {
    title: "Project One",
    description:
      "A minimal interface for focused workflows and clear hierarchy.",
  },
  {
    title: "Project Two",
    description:
      "Brand and digital experience with strong typography and motion.",
  },
  {
    title: "Project Three",
    description: "Design system and component library for consistent products.",
  },
];

const REPEATED = [...PROJECTS];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);

  const projectsX = useTransform(scrollYProgress, [0, 1], ["50vw", "-200vw"]);

  return (
    <section ref={sectionRef} id="work" className="relative h-[350vh] bg-white">
      {/* Title layer — desktop only overlay */}
      <div className="pointer-events-none sticky top-0 z-50 h-0 mix-blend-difference hidden sm:block">
        <div className="flex h-screen w-[30%] items-center pl-6 md:pl-12">
          <motion.h2
            className="font-unica text-3xl md:text-4xl tracking-tight text-white"
            style={{ opacity: titleOpacity }}
          >
            work
          </motion.h2>
        </div>
      </div>

      {/* Cards layer — own sticky, full height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Mobile title */}
        <motion.h2
          className="sm:hidden font-unica text-3xl tracking-tight text-black pl-6 pt-8"
          style={{ opacity: titleOpacity }}
        >
          work
        </motion.h2>

        <div className="absolute inset-0 flex items-center pt-16 sm:pt-0">
          <motion.div
            className="flex h-[60vh] sm:h-[70vh] items-stretch gap-8 py-8 sm:py-16 will-change-transform"
            style={{ x: projectsX }}
          >
            {REPEATED.map((project, index) => (
              <article
                key={index}
                className="flex h-full w-[80vw] sm:w-[35vw] shrink-0 flex-col justify-between rounded-sm rounded-tr-[80px] bg-black p-6 font-unica text-white"
              >
                <h3 className="text-xl md:text-2xl">{project.title}</h3>
                <p className="text-sm leading-relaxed opacity-90 md:text-base">
                  {project.description}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
