// ------------------------------
// applyQuizModifiers.js
// ------------------------------

export function applyQuizModifiers(teams, quizAnswers) {
    let modified = [...teams];
  
    // Example modifier: slow Taylor Swift songs → boost slow-paced teams
    if (quizAnswers?.slowSongs === "yes") {
      modified = modified.map(team => {
        if (team.playStyle === "slow") {
          return { ...team, rating: team.rating + 3 };
        }
        return team;
      });
    }
  
    // Example modifier: chaos preference → increase upset probability
    if (quizAnswers?.chaos === "high") {
      modified = modified.map(team => ({
        ...team,
        chaosFactor: 1.15, // increases randomness
      }));
    }
  
    return modified;
  }
  