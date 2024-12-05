export const GAME_MODES = {
    EASY: {
        name: 'facil',
        timeLimit: 30,
        moleInterval: 1000,
        maxMoles: 1,
        pointsPerHit: 1
    },
    NORMAL: {
        name: 'normal',
        timeLimit: 20,
        moleInterval: 700,
        maxMoles: 2,
        pointsPerHit: 2
    },
    HARD: {
        name: 'dificil',
        timeLimit: 15,
        moleInterval: 500,
        maxMoles: 3,
        pointsPerHit: 3
    }
};

export const BOARD_SIZE = 9;
export const MOLE_APPEAR_TIME = 1000;