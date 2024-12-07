// Game state management
export const gameState = {
    score: 0,
    timeLeft: 0,
    gameOver: false,
    paused: false,
    currentMoles: [],
    moleInterval: null,
    timerInterval: null,
    config: null
};

export function resetGameState(config) {
    gameState.score = 0;
    gameState.timeLeft = config.timeLimit;
    gameState.gameOver = false;
    gameState.paused = false;
    gameState.currentMoles = [];
    gameState.config = config;
    
    if (gameState.moleInterval) clearInterval(gameState.moleInterval);
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
}