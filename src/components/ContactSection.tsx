"use client";

import Link from "next/link";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-white text-black flex items-stretch"
    >
      {/* Left: title with smart color flip */}
      <div className="relative flex w-[85%] items-center justify-start pl-6 md:pl-12">
        <div className="pointer-events-none mix-blend-difference">
          <h2 className="font-unica text-3xl md:text-4xl tracking-tight text-white">
            contact
          </h2>
        </div>
      </div>

      {/* Right: links */}
      <div className="flex w-[15%] items-center justify-end pr-6 md:pr-12">
        <div className="flex w-full max-w-md flex-col gap-6 text-right md:text-right">
          <Link
            href="mailto:amifuku80@gmail.com"
            className="font-unica text-2xl md:text-3xl tracking-tight text-black transition-all duration-200 hover:translate-x-2 hover:opacity-80"
          >
            Email
          </Link>
          <Link
            href="https://www.linkedin.com/in/amifukuyama/"
            target="_blank"
            rel="noreferrer"
            className="font-unica text-2xl md:text-3xl tracking-tight text-black transition-all duration-200 hover:translate-x-2 hover:opacity-80"
          >
            LinkedIn
          </Link>
          <Link
            href="https://x.com/CodeCrafty"
            target="_blank"
            rel="noreferrer"
            className="font-unica text-2xl md:text-3xl tracking-tight text-black transition-all duration-200 hover:translate-x-2 hover:opacity-80"
          >
            X
          </Link>
        </div>
      </div>
    </section>
  );
}
