"use client";

import { useEffect, useRef, useState } from "react";

const TAPS_TO_OPEN = 3;
const FLEE_SCALE = 0.55;
const MARGIN = 16;
const hints = ["toque no coração", "ops… tente de novo", "só mais uma vez"];

export default function Home() {
  const heart = useRef(null);
  const taps = useRef(0);
  const [hint, setHint] = useState(hints[0]);
  const [hintHidden, setHintHidden] = useState(false);
  const [open, setOpen] = useState(false);

  function flee() {
    const el = heart.current;
    // Posição original, sem transform, para calcular o deslocamento
    const prev = el.style.transform;
    el.style.transition = "none";
    el.style.transform = "none";
    const base = el.getBoundingClientRect();
    el.style.transform = prev;
    el.offsetHeight; // força reflow antes de reativar a transição
    el.style.transition = "";

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = base.width * FLEE_SCALE;
    const h = base.height * FLEE_SCALE;
    const baseCx = base.left + base.width / 2;
    const baseCy = base.top + base.height / 2;
    const current = el.getBoundingClientRect();
    const curCx = current.left + current.width / 2;
    const curCy = current.top + current.height / 2;

    // Sorteia um ponto longe da posição atual
    let cx, cy;
    for (let i = 0; i < 20; i++) {
      cx = MARGIN + w / 2 + Math.random() * Math.max(0, vw - w - MARGIN * 2);
      cy = MARGIN + h / 2 + Math.random() * Math.max(0, vh - h - MARGIN * 2);
      if (Math.hypot(cx - curCx, cy - curCy) > Math.min(vw, vh) * 0.35) break;
    }

    const rotate = (Math.random() - 0.5) * 30;
    el.style.transform = `translate(${cx - baseCx}px, ${cy - baseCy}px) scale(${FLEE_SCALE}) rotate(${rotate}deg)`;
  }

  function handleClick() {
    if (taps.current < TAPS_TO_OPEN) taps.current++;

    if (taps.current < TAPS_TO_OPEN) {
      flee();
      setHint(hints[taps.current]);
      return;
    }

    heart.current.style.transform = "";
    setOpen((o) => !o);
    setHintHidden(true);
  }

  // No celular a barra de endereço muda a altura; só reposiciona se a largura mudar (ex.: girar a tela)
  useEffect(() => {
    let lastWidth = window.innerWidth;
    function onResize() {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      if (taps.current > 0 && taps.current < TAPS_TO_OPEN) flee();
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className="label tl">Planta 01 — Escala 1:1</div>
      <div className="label tr">
        L.B. &amp; S.
        <br />
        arq. + eng.
      </div>
      <div className="label bl">{"// feito com <3"}</div>
      <div className="label br">rev. 2026</div>

      <button
        ref={heart}
        className={`heart${open ? " open" : ""}`}
        aria-label="Abrir mensagem"
        onClick={handleClick}
      >
        <svg viewBox="0 0 200 185" aria-hidden="true">
          <line className="guide" x1="100" y1="0" x2="100" y2="185" />
          <line className="guide" x1="0" y1="95" x2="200" y2="95" />
          <path
            className="shape"
            d="M100 175 L22 97 A44 44 0 0 1 100 32 A44 44 0 0 1 178 97 Z"
          />
          <text className="dim" x="182" y="40">x: 200</text>
          <text className="dim" x="104" y="183">y: 185</text>
        </svg>
        <div className="names">
          <span>Lucas</span>
          <span className="amp">&amp;</span>
          <span>Sofia</span>
        </div>
      </button>

      <div className={`hint${hintHidden ? " hide" : ""}`}>{hint}</div>

      <div className={`message${open ? " show" : ""}`} aria-live="polite">
        <p>que 2030 chegue logo</p>
        <code>{'const casamento = new Date("2030");'}</code>
      </div>
    </>
  );
}
