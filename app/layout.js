import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
});

export const metadata = { title: "TabNews em construção" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
