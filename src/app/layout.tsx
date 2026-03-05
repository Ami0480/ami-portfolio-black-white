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
      <body>{children}</body>
    </html>
  );
}
