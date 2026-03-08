"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    importance_pace: 5,
    importance_defense: 5,
    importance_experience: 5,
    taylorSwiftPreference: "slow",
  });

  const handleChange = (field, value) =>
    setAnswers((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/results");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Basketball Personality Quiz</h1>

      {/* Example slider inputs */}
      {["pace", "defense", "experience"].map((f) => (
        <div key={f}>
          <label className="block font-medium mb-1">
            How important is {f}?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={answers[`importance_${f}`]}
            onChange={(e) =>
              handleChange(`importance_${f}`, Number(e.target.value))
            }
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            {answers[`importance_${f}`]} / 10
          </div>
        </div>
      ))}

      {/* Taylor Swift question */}
      <div>
        <label className="block font-medium mb-2">
          Which Taylor Swift vibe feels most like you?
        </label>
        {["slow", "fast"].map((v) => (
          <label key={v} className="flex items-center gap-2">
            <input
              type="radio"
              name="ts"
              value={v}
              checked={answers.taylorSwiftPreference === v}
              onChange={() => handleChange("taylorSwiftPreference", v)}
            />
            <span>
              {v === "slow"
                ? "Slower, emotional songs (boosts slow teams)"
                : "Up-tempo bangers (boosts fast teams)"}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
}