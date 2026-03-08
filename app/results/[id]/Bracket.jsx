export default function Bracket({ bracket }) {
    const { teams, rounds, championId } = bracket;
  
    const getTeam = (id) => teams.find((t) => t.teamId === id);
  
    const east = rounds.filter((r) => r.name.startsWith("East"));
    const west = rounds.filter((r) => r.name.startsWith("West"));
    const south = rounds.filter((r) => r.name.startsWith("South"));
    const midwest = rounds.filter((r) => r.name.startsWith("Midwest"));
  
    const finalFour = rounds.find((r) => r.name === "Final Four");
    const championship = rounds.find((r) => r.name === "Championship");
  
    const roundHeights = [
      "flex-grow-[1]",
      "flex-grow-[2]",
      "flex-grow-[4]",
      "flex-grow-[8]",
    ];
  
    const leftCols = [
      { east: east[0], west: west[0] },
      { east: east[1], west: west[1] },
      { east: east[2], west: west[2] },
      { east: east[3], west: west[3] },
    ];
  
    const rightCols = [
      { south: south[0], midwest: midwest[0] },
      { south: south[1], midwest: midwest[1] },
      { south: south[2], midwest: midwest[2] },
      { south: south[3], midwest: midwest[3] },
    ];
  
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
        <div className="origin-top-left scale-[0.70]">
          <h1 className="text-4xl font-bold text-center mb-6">
            Tournament Bracket
          </h1>
  
          <div className="flex gap-10 items-start">
            <div className="flex gap-10">
              {leftCols.map((col, i) => (
                <div
                  key={i}
                  className={`flex flex-col justify-center ${roundHeights[i]} gap-10 w-[260px]`}
                >
                  <RoundBlock round={col.east} getTeam={getTeam} />
                  <RoundBlock round={col.west} getTeam={getTeam} />
                </div>
              ))}
            </div>
  
            <div className="flex flex-col justify-center items-center gap-16 flex-grow-[8] w-[260px]">
              <div>
                <h2 className="text-xl font-bold text-center mb-2">Final Four</h2>
                <RoundBlock round={finalFour} getTeam={getTeam} />
              </div>
  
              <div>
                <h2 className="text-xl font-bold text-center mb-2">Championship</h2>
                <RoundBlock round={championship} getTeam={getTeam} />
              </div>
  
              <h2 className="text-3xl font-bold text-green-700">
                🏆 {getTeam(championId).name}
              </h2>
            </div>
  
            <div className="flex gap-10">
              {rightCols.map((col, i) => (
                <div
                  key={i}
                  className={`flex flex-col justify-center ${roundHeights[i]} gap-10 w-[260px]`}
                >
                  <RoundBlock round={col.south} getTeam={getTeam} />
                  <RoundBlock round={col.midwest} getTeam={getTeam} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function MatchupCard({ teamA, teamB, winnerId }) {
    const winnerStyle = "font-bold text-green-700";
    const loserStyle = "text-gray-400";
  
    return (
      <div className="border rounded p-2 bg-white shadow-sm text-sm leading-tight w-40">
        <div className={winnerId === teamA.teamId ? winnerStyle : loserStyle}>
          {teamA.seed}. {teamA.name}
        </div>
        <div className={winnerId === teamB.teamId ? winnerStyle : loserStyle}>
          {teamB.seed}. {teamB.name}
        </div>
      </div>
    );
  }
  
  function RoundBlock({ round, getTeam }) {
    if (!round) return null;
  
    return (
      <div className="flex flex-col items-center gap-3">
        {round.matchups.map((m, i) => {
          const A = getTeam(m.teamAId);
          const B = getTeam(m.teamBId);
  
          return (
            <MatchupCard
              key={i}
              teamA={A}
              teamB={B}
              winnerId={m.winnerId}
            />
          );
        })}
      </div>
    );
  }
  