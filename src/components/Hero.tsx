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

  return (
    <>
      {/* Top navigation with smart black/white flip */}
      <nav className="fixed inset-x-0 top-8 z-50 flex justify-center mix-blend-difference">
        <ul
          className="flex gap-6 text-sm md:text-base text-white"
          style={{ fontFamily: "var(--font-unica)" }}
        >
          <li>
            <button type="button" className="uppercase tracking-wide">
              about
            </button>
          </li>
          <li>
            <button type="button" className="uppercase tracking-wide">
              work
            </button>
          </li>
          <li>
            <button type="button" className="uppercase tracking-wide">
              contact
            </button>
          </li>
        </ul>
      </nav>

      <section className="relative h-[300vh] bg-white">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
          <div className="pointer-events-none z-0 flex h-full w-full items-center justify-center">
            <span
              className="select-none text-[clamp(6rem,20vw,14rem)] font-normal leading-none text-black"
              style={{ fontFamily: "var(--font-unica)" }}
            >
              ami
            </span>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-black"
            style={{ clipPath }}
          />

          <motion.span
            className="absolute bottom-[15vh] z-20 flex text-2xl text-black md:text-3xl"
            style={{ fontFamily: "var(--font-sacramento)" }}
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
