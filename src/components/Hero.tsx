"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useSpring,
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
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const typingStartedRef = useRef(false);
  const prevScrollRef = useRef(0);

  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });
  const maskValue = useMotionValue("none");

  const { scrollYProgress } = useScroll();
  const scrollRadius = useTransform(scrollYProgress, [0, 0.5], [40, 3000]);

  const updateCursorMask = () => {
    if (!isHoveringRef.current) return;
    const x = springX.get();
    const y = springY.get();
    const r = scrollRadius.get();
    maskValue.set(
      `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 100%, black 100%)`,
    );
  };

  useMotionValueEvent(springX, "change", updateCursorMask);
  useMotionValueEvent(springY, "change", updateCursorMask);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const isScrollingDown = value > prevScrollRef.current;
    prevScrollRef.current = value;

    if (value >= 0.2 && isScrollingDown) {
      if (!typingStartedRef.current) {
        typingStartedRef.current = true;
        setTypingStarted(true);
      }
    }

    if (value > 0 && value < 0.5) {
      const x = springX.get() === -999 ? window.innerWidth / 2 : springX.get();
      const y = springY.get() === -999 ? window.innerHeight / 2 : springY.get();
      const r = scrollRadius.get();
      maskValue.set(
        `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 100%, black 100%)`,
      );
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08 });
    return () => lenis.destroy();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (scrollYProgress.get() === 0) {
      maskValue.set("none");
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const yAmi = useTransform(scrollYProgress, [0.2, 1], [0, -150]);
  const ySubtitle = useTransform(scrollYProgress, [0.2, 1], [0, -400]);

  return (
    <>
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

      <section className="relative h-[400vh] bg-white">
        <div
          ref={sectionRef}
          className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="pointer-events-none z-0 flex h-full w-full items-center justify-center"
            style={{ y: yAmi }}
          >
            <span className="font-unica select-none text-[clamp(6rem,20vw,14rem)] font-normal leading-none text-black">
              ami
            </span>
          </motion.div>

          {!revealed && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 bg-black"
              style={{
                WebkitMaskImage: maskValue,
                maskImage: maskValue,
              }}
            />
          )}

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
