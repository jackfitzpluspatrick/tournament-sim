import Bracket from "./Bracket";

export default async function ResultsPage({ params }) {
  const id = params.id; // <-- THIS FIXES EVERYTHING
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch quiz answers
  const quizRes = await fetch(`${base}/api/quiz?id=${id}`, {
    cache: "no-store",
  });

  if (!quizRes.ok) {
    return <div>Failed to load quiz data.</div>;
  }

  const quizData = await quizRes.json();
  const quizAnswers = quizData.quizAnswers || {};

  // Run simulation
  const simRes = await fetch(`${base}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quizAnswers }),
    cache: "no-store",
  });

  if (!simRes.ok) {
    return <div>Failed to run simulation.</div>;
  }

  const data = await simRes.json();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Your Tournament Results</h1>
      <Bracket bracket={data.bracket} />
    </div>
  );
}
