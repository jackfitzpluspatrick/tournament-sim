import { applyQuizModifiers } from "../../../lib/applyQuizModifiers";
import { runSimulation } from "../../../lib/runSimulation";
import { TEAMS } from "../../../lib/teams";

export async function POST(req) {
  try {
    let body = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const quizAnswers = body.quizAnswers || {};
    const modifiedTeams = applyQuizModifiers(TEAMS, quizAnswers);
    const result = runSimulation(modifiedTeams);

    return Response.json({
      bracket: {
        teams: result.teams,
        rounds: result.rounds,
        championId: result.championId,
      },
      quizAnswers,
    });
  } catch (err) {
    return Response.json(
      { error: "Simulation failed", details: String(err) },
      { status: 500 }
    );
  }
}
