"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Carrega a lib só depois da hidratação, fora do bundle inicial
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const PIECES = 250;

export default function Confetti() {
  const [size, setSize] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!size || done) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      numberOfPieces={PIECES}
      recycle={false}
      // desmonta o canvas ao terminar, liberando o loop de animação
      onConfettiComplete={() => setDone(true)}
      style={{ position: "fixed", pointerEvents: "none" }}
    />
  );
}
