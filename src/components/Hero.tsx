"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import {
  motion,
  useScroll, // 👈 add this
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

const subtitleText = "Frontend Developer";

const subtitleContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const subtitleLetter = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Hero() {
  const [typingStarted, setTypingStarted] = useState(false);

  const { scrollYProgress } = useScroll(); // 👈 add this

  const clipPath = useMotionValue("ellipse(100% 100% at 50% 50%)");

  const clipPathProgress = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["ellipse(100% 100% at 50% 50%)", "ellipse(0% 0% at 50% 50%)"],
  );

  const yAmi = useTransform(scrollYProgress, [0.25, 1], [0, -300]);
  const ySubtitle = useTransform(scrollYProgress, [0.25, 1], [0, -400]);

  useMotionValueEvent(clipPathProgress, "change", (latest) => {
    if (latest === "ellipse(0% 0% at 50% 50%)") {
      clipPath.set("ellipse(0% 0% at 50% 50%)");
      setTypingStarted(true); // 👈 add this
    } else {
      clipPath.set(latest);
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08 });
    return () => lenis.destroy();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Top navigation with smart black/white flip */}
      <nav className="fixed inset-x-0 top-8 z-50 flex justify-center mix-blend-difference">
        <ul className="flex gap-6 text-xs md:text-sm text-white">
          <li>
            <button
              type="button"
              onClick={() => handleScrollTo("about")}
              className="tracking-wide"
            >
              about
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleScrollTo("work")}
              className="tracking-wide"
            >
              work
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleScrollTo("contact")}
              className="tracking-wide"
            >
              contact
            </button>
          </li>
        </ul>
      </nav>

      <section className="relative h-[300vh] bg-white">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
          <motion.div
            className="pointer-events-none z-0 flex h-full w-full items-center justify-center"
            style={{ y: yAmi }}
          >
            <span className="font-unica select-none text-[clamp(6rem,20vw,14rem)] font-normal leading-none text-black">
              ami
            </span>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-black"
            style={{ clipPath }}
          />

          <motion.span
            className="font-sacramento absolute bottom-[15vh] z-20 flex text-2xl text-black md:text-3xl"
            style={{ y: ySubtitle }}
            variants={subtitleContainer}
            initial="hidden"
            animate={typingStarted ? "visible" : "hidden"}
          >
            {subtitleText.split("").map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={subtitleLetter}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </section>
    </>
  );
}
