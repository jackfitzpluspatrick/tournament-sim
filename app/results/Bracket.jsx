"use client";
import { runSimulation } from "../../lib/runSimulation";
import { applyQuizModifiers } from "../../lib/applyQuizModifiers";
import { teams } from "../../lib/teams";

export default function Bracket({ bracket }) {
  if (!bracket) return <div>No bracket data available.</div>;

  // Apply quiz modifiers to teams
  const modifiedTeams = applyQuizModifiers(teams, bracket);

  // Run full 64-team simulation
  const simData = runSimulation(modifiedTeams); 
  // simData.bracket should be an array of rounds: [round1, round2, ..., final]

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your 64-Team Bracket</h2>
      <div className="flex gap-4">
        {simData.bracket.map((round, roundIdx) => (
          <div key={roundIdx} className="flex flex-col gap-2 min-w-[150px]">
            <h3 className="text-lg font-semibold text-center">
              Round {roundIdx + 1}
            </h3>
            {round.map((match, matchIdx) => (
              <div
                key={matchIdx}
                className="border rounded p-2 bg-white shadow-sm text-center"
              >
                {match.winner}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}