"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Basketball Personality Quiz</h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        Find out your basketball bracket personality based on your preferences.
      </p>
      <button
        onClick={() => router.push("/quiz")}
        className="px-8 py-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}