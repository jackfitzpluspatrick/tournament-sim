import { getQuizAnswers } from "@/app/api/quiz/route";
import Bracket from "./Bracket";

export default async function ResultsPage(props) {
  const params = await props.params;

  const quizAnswers = getQuizAnswers(params.id) || {};

  const simRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/simulate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quizAnswers }),
      cache: "no-store",
    }
  );

  const data = await simRes.json();
  console.log("RESULT DATA:", JSON.stringify(data, null, 2));

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">Your Tournament Results</h1>
      <Bracket bracket={data.bracket} />
    </div>
  );
}
