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
  {
    title: "Project Four",
    description:
      "E-commerce and editorial layouts with a black and white palette.",
  },
];

// Repeat cards 3 times so they keep appearing
const REPEATED = [...PROJECTS, ...PROJECTS, ...PROJECTS];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Start: cards in right 70%, End: all cards have passed fully to the left
  const projectsX = useTransform(scrollYProgress, [0, 1], ["90vw", "-150vw"]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-[600vh] bg-white "
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cards track */}
        <div className="absolute inset-0 z-10 flex items-center">
          <motion.div
            className="flex h-[70vh] w-full items-stretch gap-8 py-16 will-change-transform"
            style={{ x: projectsX }}
          >
            {REPEATED.map((project, index) => (
              <article
                key={index}
                className="flex h-full w-[35vw] shrink-0 flex-col justify-between rounded-sm bg-black p-6 font-unica text-white"
              >
                <h3 className="text-xl md:text-2xl">{project.title}</h3>
                <p className="text-sm leading-relaxed opacity-90 md:text-base">
                  {project.description}
                </p>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Title mask — smart color flip using mix-blend-difference */}
        <div className="pointer-events-none absolute left-0 top-0 z-50 flex h-full w-[30%] items-center pl-6 md:pl-12 mix-blend-difference">
          <h2 className="font-unica text-3xl md:text-4xl tracking-tight text-white">
            work
          </h2>
        </div>
      </div>
    </section>
  );
}
