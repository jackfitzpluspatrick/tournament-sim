import { Redis } from "@upstash/redis";
import { v4 as uuid } from "uuid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
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
