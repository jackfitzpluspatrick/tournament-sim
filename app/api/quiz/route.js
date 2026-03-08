import { Redis } from "@upstash/redis";
import { v4 as uuid } from "uuid";

// Hard‑coded Redis client (works even if Vercel env vars are broken)
const redis = new Redis({
  url: "https://open-macaw-46260.upstash.io",
  token: "AbS0AAIncDIxZDU3NzEyZmQxMzA0ZGU2YWE3NGFhN2Y0OWEyYzEzOXAyNDYyNjA",
});

// Save quiz answers
export async function POST(req) {
  try {
    const body = await req.json();
    const id = uuid();

    await redis.set(id, body);

    return Response.json({ resultId: id });
  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

// Retrieve quiz answers
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const quizAnswers = await redis.get(id);

    return Response.json({
      quizAnswers: quizAnswers || {}
    });
  } catch (err) {
    console.error("GET ERROR:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
