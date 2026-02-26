import { Unica_One, Sacramento } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unica.variable} ${sacramento.variable}`}>
      <body>{children}</body>
    </html>
  );
}
