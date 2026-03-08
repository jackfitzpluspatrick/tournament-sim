import { Redis } from "@upstash/redis";
import { v4 as uuid } from "uuid";

const redis = new Redis({
  url: "https://open-macaw-46260.upstash.io",
  token: "AbS0AAIncDIxZDU3NzEyZmQxMzA0ZGU2YWE3NGFhN2Y0OWEyYzEzOXAyNDYyNjA",
});


// Save quiz answers
export async function POST(req) {
  const body = await req.json();
  const id = uuid();

  await redis.set(id, body);

  return Response.json({ resultId: id });
}

// Retrieve quiz answers
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const quizAnswers = await redis.get(id);

  return Response.json({
    quizAnswers: quizAnswers || {}
  });
}
