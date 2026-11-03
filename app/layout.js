import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
});

export const metadata = { title: "Lucas & Sofia" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
