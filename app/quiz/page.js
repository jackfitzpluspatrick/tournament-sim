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

  const handleChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });

    const { resultId } = await res.json();
    router.push(`/results/${resultId}`);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Basketball Personality Quiz</h1>

      {/* Importance sliders */}
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-1">
            How important is pace (fast vs slow)?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={answers.importance_pace}
            onChange={(e) => handleChange("importance_pace", Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            {answers.importance_pace} / 10
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            How important is defense?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={answers.importance_defense}
            onChange={(e) =>
              handleChange("importance_defense", Number(e.target.value))
            }
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            {answers.importance_defense} / 10
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            How important is experience / veteran teams?
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={answers.importance_experience}
            onChange={(e) =>
              handleChange("importance_experience", Number(e.target.value))
            }
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            {answers.importance_experience} / 10
          </div>
        </div>

        {/* Taylor Swift pace personality question */}
        <div>
          <label className="block font-medium mb-2">
            Which Taylor Swift vibe feels most like you?
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ts"
                value="slow"
                checked={answers.taylorSwiftPreference === "slow"}
                onChange={() => handleChange("taylorSwiftPreference", "slow")}
              />
              <span>Slower, emotional songs (boosts slow-paced teams)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="ts"
                value="fast"
                checked={answers.taylorSwiftPreference === "fast"}
                onChange={() => handleChange("taylorSwiftPreference", "fast")}
              />
              <span>Up-tempo bangers (boosts fast-paced teams)</span>
            </label>
          </div>
        </div>
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
