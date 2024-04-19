
/** @type {HTMLCanvasElement} */
let canvas;

/** @type {World} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

/** @type {number[]} */
let intervalIds = [];

/**
 * Initialisiert das Spiel.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

/**
 * Behandelt das Keydown-Ereignis.
 * @param {KeyboardEvent} e - Das ausgelöste Ereignis.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
});

/**
 * Behandelt das Keyup-Ereignis.
 * @param {KeyboardEvent} e - Das ausgelöste Ereignis.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});

/**
 * Fügt eine ID zu den Intervallen hinzu.
 * @param {number} interval - Die ID des Intervalls.
 */
function pushInterval(interval) {
    intervalIds.push(interval);
}

/**
 * Stoppt alle Intervalle.
 */
function stopAllIntervals() {
    intervalIds.forEach(id => clearInterval(id));
}