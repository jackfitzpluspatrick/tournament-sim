export function runSimulation(teams) {
    // Group teams by region
    const regions = ["East", "West", "Midwest", "South"];
    const rounds = [];
    const allTeams = [...teams];
  
    function playGame(teamA, teamB) {
      const ratingA = teamA.rating;
      const ratingB = teamB.rating;
      const probA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 25));
      const winner = Math.random() < probA ? teamA : teamB;
      const loser = winner === teamA ? teamB : teamA;
  
      return {
        teamAId: teamA.teamId,
        teamBId: teamB.teamId,
        winnerId: winner.teamId,
        loserId: loser.teamId,
      };
    }
  
    // Build rounds for each region
    for (const region of regions) {
      const regionTeams = allTeams.filter((t) => t.region === region);
  
      // Round of 64
      const r64 = [];
      for (let i = 0; i < 16; i += 2) {
        r64.push(playGame(regionTeams[i], regionTeams[i + 1]));
      }
  
      // Round of 32
      const r32 = [];
      for (let i = 0; i < r64.length; i += 2) {
        const tA = allTeams.find((t) => t.teamId === r64[i].winnerId);
        const tB = allTeams.find((t) => t.teamId === r64[i + 1].winnerId);
        r32.push(playGame(tA, tB));
      }
  
      // Sweet 16
      const s16 = [];
      for (let i = 0; i < r32.length; i += 2) {
        const tA = allTeams.find((t) => t.teamId === r32[i].winnerId);
        const tB = allTeams.find((t) => t.teamId === r32[i + 1].winnerId);
        s16.push(playGame(tA, tB));
      }
  
      // Elite 8
      const e8 = [];
      for (let i = 0; i < s16.length; i += 2) {
        const tA = allTeams.find((t) => t.teamId === s16[i].winnerId);
        const tB = allTeams.find((t) => t.teamId === s16[i + 1].winnerId);
        e8.push(playGame(tA, tB));
      }
  
      rounds.push(
        { name: `${region} R64`, matchups: r64 },
        { name: `${region} R32`, matchups: r32 },
        { name: `${region} S16`, matchups: s16 },
        { name: `${region} E8`, matchups: e8 }
      );
    }
  
    // Final Four
    const ff = [];
    const winners = rounds.filter((r) => r.name.endsWith("E8"));
    const ffTeams = winners.map((r) => {
      const last = r.matchups[r.matchups.length - 1];
      return allTeams.find((t) => t.teamId === last.winnerId);
    });
  
    ff.push(playGame(ffTeams[0], ffTeams[1]));
    ff.push(playGame(ffTeams[2], ffTeams[3]));
  
    rounds.push({ name: "Final Four", matchups: ff });
  
    // Championship
    const champTeams = ff.map((m) =>
      allTeams.find((t) => t.teamId === m.winnerId)
    );
    const champ = playGame(champTeams[0], champTeams[1]);
  
    rounds.push({ name: "Championship", matchups: [champ] });
  
    return {
      teams: allTeams,
      rounds,
      championId: champ.winnerId,
    };
  }
  