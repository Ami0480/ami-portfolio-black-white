"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
  {
    title: "Spa Booking Website",
    description:
      "Booking platform with customer and staff workflows, powered by Supabase.",
    link: "https://naturespa-website.netlify.app/",
    label: "Booking Website",
    link2: "https://naturespa-website.netlify.app/dashboard/bookings",
    label2: "Staff Dashboard",
  },
  {
    title: "Personal Diary",
    description:
      "Personal diary app with date-based entries, photo uploads, and secure authentication.",
    link: "https://dear-today.netlify.app/",
    label: "Dear Today",
  },
  {
    title: "Weather for the Laundry",
    description:
      "A laundry-focused weather app that helps decide the best day to dry clothes, powered by real-time global data.",
    link: "https://laundry-app-vscode.netlify.app/",
    label: "Laundry Weather App",
  },
];

const REPEATED = [...PROJECTS];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const titleOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);
  // Mobile: fade out earlier, before contact's white overlay covers it
  const titleOpacityMobile = useTransform(scrollYProgress, [0.65, 0.8], [1, 0]);

  // Mobile: 3 cards × 80vw = 240vw total, needs more travel to scroll through completely
  const projectsXDesktop = useTransform(
    scrollYProgress,
    [0, 1],
    ["50vw", "-200vw"]
  );
  const projectsXMobile = useTransform(
    scrollYProgress,
    [0, 1],
    ["10rem", "-400vw"]
  );
  const projectsX = isMobile ? projectsXMobile : projectsXDesktop;

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
          className="sm:hidden font-unica text-3xl tracking-tight text-black pl-6 pt-24"
          style={{ opacity: titleOpacityMobile }}
        >
          work
        </motion.h2>

        <div className="absolute inset-0 flex items-center pt-28 sm:pt-0">
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
                <div className="flex flex-col flex-1 justify-end gap-2">
                  <p className="font-intertight font-extralight text-sm leading-relaxed opacity-90 md:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-intertight text-sm opacity-90 md:text-base underline decoration-[0.5px] underline-offset-4 hover:opacity-60 transition-opacity"
                    >
                      {project.label}
                    </a>
                    {"link2" in project && (
                      <a
                        href={
                          (project as typeof project & { link2: string }).link2
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="font-intertight text-sm opacity-90 md:text-base underline decoration-[0.5px] underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        {
                          (project as typeof project & { label2: string })
                            .label2
                        }
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
