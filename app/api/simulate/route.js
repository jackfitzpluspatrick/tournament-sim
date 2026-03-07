import { applyQuizModifiers } from "@/lib/applyQuizModifiers";
import { runSimulation } from "@/lib/runSimulation";
import { TEAMS } from "@/lib/teams";

export async function POST(req) {
  try {
    // Safely parse JSON body
    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const quizAnswers = body.quizAnswers || {};

    // Apply modifiers
    const modifiedTeams = applyQuizModifiers(TEAMS, quizAnswers);

    // Run simulation
    const result = runSimulation(modifiedTeams);

    // result MUST contain: teams, rounds, championId
    return Response.json({
      bracket: {
        teams: result.teams,
        rounds: result.rounds,
        championId: result.championId,
      },
      quizAnswers,
    });
  } catch (err) {
    console.error("SIM ERROR:", err);
    return Response.json(
      { error: "Simulation failed", details: String(err) },
      { status: 500 }
    );
  }
}
