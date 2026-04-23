import type { Metadata } from "next";
import { Unica_One, Sacramento, Inter_Tight } from "next/font/google";
import "./globals.css";

const unica = Unica_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-unica",
});

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-intertight",
});

export const metadata: Metadata = {
  title: "Ami Fukuyama | Frontend Developer",
  description:
    "Ami Fukuyama is a frontend developer based in Australia, specialising in React, Next.js, and modern web development. Explore her portfolio of web and app projects.",
  keywords: [
    "frontend developer",
    "React",
    "Next.js",
    "web developer",
    "Australia",
    "portfolio",
    "Ami Fukuyama",
  ],
  metadataBase: new URL("https://amifukuyama.com"),
  openGraph: {
    title: "Ami Fukuyama | Frontend Developer",
    description:
      "Ami Fukuyama is a frontend developer based in Australia, specialising in React, Next.js, and modern web development. Explore her portfolio of web and app projects.",
    url: "https://amifukuyama.com",
    siteName: "Ami Fukuyama Portfolio",
    images: [
      {
        url: "/images/image-blackandwhite.jpg",
        width: 480,
        height: 320,
        alt: "Ami Fukuyama – Frontend Developer",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ami Fukuyama | Frontend Developer",
    description:
      "Ami Fukuyama is a frontend developer based in Australia, specialising in React, Next.js, and modern web development.",
    images: ["/images/image-blackandwhite.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ami Fukuyama",
  url: "https://amifukuyama.com",
  email: "hello@amifukuyama.com",
  jobTitle: "Frontend Developer",
  description:
    "Frontend developer based in Australia, specialising in React, Next.js, and modern web development.",
  sameAs: [
    "https://www.linkedin.com/in/amifukuyama/",
    "https://github.com/Ami0480",
    "https://x.com/CodeCrafty",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${unica.variable} ${sacramento.variable} ${interTight.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
