import Bracket from "./Bracket";

export default async function ResultsPage(props) {
  const params = await props.params;

  // Fetch quiz answers (internal call)
  const quizRes = await fetch(`/api/quiz?id=${params.id}`, {
    cache: "no-store",
  });

  const quizData = await quizRes.json();
  const quizAnswers = quizData.quizAnswers || {};

  // Run simulation (internal call)
  const simRes = await fetch(`/api/simulate`, {
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
