import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Tournament Simulator</h1>
      <p>Welcome! Start the quiz to generate your bracket.</p>

      <Link href="/quiz">
        <button
          style={{
            padding: "12px 20px",
            marginTop: 20,
            fontSize: 18,
            cursor: "pointer",
            borderRadius: 6,
            background: "#0070f3",
            color: "white",
            border: "none"
          }}
        >
          Begin Quiz
        </button>
      </Link>
    </main>
  );
}
