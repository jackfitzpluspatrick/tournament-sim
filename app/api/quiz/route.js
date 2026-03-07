import { v4 as uuid } from "uuid";

let store = {}; // temporary in-memory store

export async function POST(req) {
  const body = await req.json();
  const id = uuid();

  store[id] = body; // save quiz answers

  return Response.json({ resultId: id });
}

export function getQuizAnswers(id) {
  return store[id];
}
