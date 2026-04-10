"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  animate,
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
  const [revealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const typingStartedRef = useRef(false);
  const prevScrollRef = useRef(0);

  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });
  const maskValue = useMotionValue("none");

  const isMobileRef = useRef(false);
  const breatheOffset = useMotionValue(0);
  const breatheControlsRef = useRef<{ stop: () => void } | null>(null);

  const { scrollYProgress } = useScroll();
  const scrollRadius = useTransform(scrollYProgress, [0, 0.5], [40, 3000]);
  // Mobile: start at 10px for a very small initial circle
  const scrollRadiusMobile = useTransform(scrollYProgress, [0, 0.5], [5, 3000]);

  const updateCursorMask = () => {
    const x = springX.get() === -999 ? window.innerWidth / 2 : springX.get();
    const y = springY.get() === -999 ? window.innerHeight / 2 : springY.get();
    const base = isMobileRef.current
      ? scrollRadiusMobile.get()
      : scrollRadius.get();
    const r = isMobileRef.current ? base + breatheOffset.get() : base;
    maskValue.set(
      `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 100%, black 100%)`
    );
  };

  useMotionValueEvent(springX, "change", updateCursorMask);
  useMotionValueEvent(springY, "change", updateCursorMask);
  useMotionValueEvent(breatheOffset, "change", updateCursorMask);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const isScrollingDown = value > prevScrollRef.current;
    prevScrollRef.current = value;

    if (value >= 0.1 && isScrollingDown) {
      if (!typingStartedRef.current) {
        typingStartedRef.current = true;
        setTypingStarted(true);
      }
    }

    // Stop breathing when user starts scrolling
    if (value > 0.03 && breatheControlsRef.current) {
      breatheControlsRef.current.stop();
      breatheOffset.set(0);
      breatheControlsRef.current = null;
    }

    // Restart breathing when user scrolls back to top on mobile
    if (value <= 0.03 && isMobileRef.current && !breatheControlsRef.current) {
      breatheOffset.set(0);
      breatheControlsRef.current = animate(breatheOffset, [0, 3, 0], {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      });
    }

    if (value > 0 && value < 0.5) {
      const x = springX.get() === -999 ? window.innerWidth / 2 : springX.get();
      const y = springY.get() === -999 ? window.innerHeight / 2 : springY.get();
      const r = isMobileRef.current
        ? scrollRadiusMobile.get()
        : scrollRadius.get();
      maskValue.set(
        `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 100%, black
         100%)`
      );
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08 });

    // On touch devices (mobile), initialize mask to a small circle at center
    // since there is no cursor movement to trigger it
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    isMobileRef.current = isTouchDevice && window.innerWidth < 640;
    if (isMobileRef.current) {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      const r = scrollRadiusMobile.get();
      maskValue.set(
        `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 100%, black 100%)`
      );
      // Start breathing animation — oscillates ±30px around base radius
      breatheControlsRef.current = animate(breatheOffset, [0, 3, 0], {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      });
    }

    return () => {
      lenis.destroy();
      breatheControlsRef.current?.stop();
    };
  }, [maskValue, scrollRadius, scrollRadiusMobile, breatheOffset]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ autoRaf: true, lerp: 0.08 });

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      isHoveringRef.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const yAmi = useTransform(scrollYProgress, [0.1, 1], [0, -150]);
  const ySubtitle = useTransform(scrollYProgress, [0.1, 1], [0, -400]);

  return (
    <>
      {!revealed && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 bg-black"
          style={{
            WebkitMaskImage: maskValue,
            maskImage: maskValue,
          }}
        />
      )}

      <nav className="fixed inset-x-0 top-8 z-50 flex justify-center mix-blend-difference">
        <div className="w-full max-w-[1920px] mx-auto flex justify-center">
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
        </div>
      </nav>

      <section className="relative h-[300vh] bg-white">
        <div
          ref={sectionRef}
          className="sticky top-0 flex h-screen w-full items-center justify-center bg-white"
        >
          <div className="relative w-full max-w-480 mx-auto h-full flex items-center justify-center">
            <motion.div
              className="pointer-events-none z-0 flex h-full w-full items-center justify-center"
              style={{ y: yAmi }}
            >
              <span className="font-unica select-none text-[clamp(6rem,20vw,14rem)] font-normal leading-none text-black">
                ami
              </span>
            </motion.div>

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
        </div>
      </section>
    </>
  );
}
