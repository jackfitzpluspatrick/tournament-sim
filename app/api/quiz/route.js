import { v4 as uuid } from "uuid";

let store = {}; // temporary in-memory store

// Save quiz answers
export async function POST(req) {
  const body = await req.json();
  const id = uuid();

  store[id] = body; // save quiz answers

  return Response.json({ resultId: id });
}

// Retrieve quiz answers
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  return Response.json({
    quizAnswers: store[id] || {}
  });
}
