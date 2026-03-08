import Bracket from "./Bracket";

export default async function ResultsPage(props) {
  const params = await props.params;

  const base = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch quiz answers (absolute URL)
  const quizRes = await fetch(`${base}/api/quiz?id=${params.id}`, {
    cache: "no-store",
  });

  const quizData = await quizRes.json();
  const quizAnswers = quizData.quizAnswers || {};

  // Run simulation (absolute URL)
  const simRes = await fetch(`${base}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quizAnswers }),
    cache: "no-store",
  });

  const data = await simRes.json();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Your Tournament Results</h1>
      <Bracket bracket={data.bracket} />
    </div>
  );
}
