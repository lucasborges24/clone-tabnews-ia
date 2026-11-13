import Confetti from "./confetti";

// Página estática regenerada em segundo plano a cada N segundos (ISR)
export const revalidate = 60;

const TABNEWS_URL = "https://www.tabnews.com.br";
const FETCH_TIMEOUT_MS = 3000;

async function getTotalContents() {
  try {
    const res = await fetch(`${TABNEWS_URL}/api/v1/contents?per_page=1`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const total = Number(res.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const total = await getTotalContents();

  return (
    <main className="construction">
      <Confetti />
      <p>
        Estamos neste exato momento reconstruíndo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto.
      </p>

      <div className="count">
        <strong>{total === null ? "—" : total.toLocaleString("pt-BR")}</strong>
        <span>conteúdos publicados no TabNews</span>
      </div>

      <a className="link" href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        visitar o site oficial
      </a>
    </main>
  );
}
