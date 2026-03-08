import Bracket from "./Bracket";

export default async function ResultsPage({ params }) {
  const id = params.id;
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch quiz answers
  const quizRes = await fetch(`${base}/api/quiz?id=${id}`, {
    cache: "no-store",
  });

  if (!quizRes.ok) {
    return <div>Failed to load quiz data.</div>;
  }

  const quizData = await quizRes.json();

  // Run simulation
  const simRes = await fetch(`${base}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quizAnswers: quizData.quizAnswers }),
    cache: "no-store",
  });

  if (!simRes.ok) {
    return <div>Failed to run simulation.</div>;
  }

  const simData = await simRes.json();

  return (
    <div className="p-4">
      <Bracket bracket={simData.bracket} />
    </div>
  );
}
