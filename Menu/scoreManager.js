const HIGH_SCORES_KEY = 'whackAMoleHighScores';
const MAX_HIGH_SCORES = 5;

export function saveScore(score) {
    const highScores = loadHighScores();
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    
    if (highScores.length > MAX_HIGH_SCORES) {
        highScores.length = MAX_HIGH_SCORES;
    }
    
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores));
    updateHighScoresDisplay();
}

export function loadHighScores() {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
}

export function getHighScore() {
    const scores = loadHighScores();
    return scores.length > 0 ? scores[0] : 0;
}

export function updateHighScoresDisplay() {
    const highScoresList = document.getElementById('highScoresList');
    if (!highScoresList) return;

    const scores = loadHighScores();
    highScoresList.innerHTML = scores
        .map((score, index) => `<li>${index + 1}. ${score}</li>`)
        .join('');
}