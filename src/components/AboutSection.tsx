"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen bg-white text-black flex flex-col justify-center"
    >
      <div className="flex h-full items-end justify-end">
        <motion.div
          className="flex w-full flex-col gap-4 px-6 py-16 sm:w-1/2 md:px-12 items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 className="font-unica text-3xl md:text-4xl tracking-tight">
            about
          </motion.h2>
          <motion.p className="font-unica max-w-md text-sm leading-relaxed md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
