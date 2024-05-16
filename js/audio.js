/**
 * Represents the background audio element.
 * @type {HTMLAudioElement}
 */
let background_audio = new Audio('./audio/Backgroundmusic.mp3');

/**
 * Represents the bottle pickup audio element.
 * @type {HTMLAudioElement}
 */
let bottlePickup_audio = new Audio('./audio/bottlePickup.mp3');

/**
 * Represents the chicken walk audio element.
 * @type {HTMLAudioElement}
 */
let chickenWalk_audio = new Audio('audio/chicken.mp3');

/**
 * Represents the chicks walk audio element.
 * @type {HTMLAudioElement}
 */
let chicksWalk_audio = new Audio('./audio/chicks.mp3');

/**
 * Represents the coin audio element.
 * @type {HTMLAudioElement}
 */
let coin_audio = new Audio('./audio/coin.mp3');

/**
 * Represents the bottle broken audio element.
 * @type {HTMLAudioElement}
 */
let bottleBrock_audio = new Audio('./audio/glassbroken.mp3');

/**
 * Represents the hurt audio element.
 * @type {HTMLAudioElement}
 */
let hurt_audio = new Audio('./audio/hurt.mp3');

/**
 * Represents the jump audio element.
 * @type {HTMLAudioElement}
 */
let jump_audio = new Audio('./audio/jump.mp3');

/**
 * Represents the lose audio element.
 * @type {HTMLAudioElement}
 */
let lose_audio = new Audio('audio/lose.mp3');

/**
 * Represents the snoring audio element.
 * @type {HTMLAudioElement}
 */
let snoring_audio = new Audio('./audio/snoring.mp3');

/**
 * Represents the bottle throw audio element.
 * @type {HTMLAudioElement}
 */
let bottleThrow_audio = new Audio('./audio/throw.mp3');

/**
 * Represents the character walk audio element.
 * @type {HTMLAudioElement}
 */
let characterWalk_audio = new Audio('./audio/walking.mp3');

/**
 * Represents the win audio element.
 * @type {HTMLAudioElement}
 */
let win_audio = new Audio('audio/win.mp3');

/**
 * Represents the dead chicken audio element.
 * @type {HTMLAudioElement}
 */
let dead_Chicken = new Audio('audio/dead_chicken.mp3');

/**
 * Array containing all audio effects.
 * @type {HTMLAudioElement[]}
 */
let audioEffects = [
    background_audio,
    bottlePickup_audio,
    chickenWalk_audio,
    chicksWalk_audio,
    coin_audio,
    bottleBrock_audio,
    hurt_audio,
    jump_audio,
    lose_audio,
    snoring_audio,
    bottleThrow_audio,
    characterWalk_audio,
    win_audio,
    dead_Chicken,
];

/**
 * Represents the mute status of audio.
 * @type {boolean}
 */
let isMuted = false;

/**
 * Button for toggling audio.
 * @type {HTMLElement}
 */
let BtnAudioToggle = document.getElementById('soundToggle');

/**
 * Initializes the muted status of audio on page load.
 */
function soundMutedOnload() {
    toggleSound(!isMuted);
}

/**
 * Toggles the audio mute status.
 */
function toggleSound() {
    if (isMuted) {
        soundEffectsOn();
    } else {
        soundEffectsOff();
        isMuted = true;
    }
}

/**
 * Turns on sound effects.
 */
function soundEffectsOn() {
    BtnAudioToggle.style.backgroundImage = 'url(./img/otherimgs/icons/sound_on_64.png)';
    for (let audio of audioEffects) {
        audio.muted = false;
    }
    playBackgroundMusic();
    isMuted = false;
}

/**
 * Turns off sound effects.
 */
function soundEffectsOff() {
    BtnAudioToggle.style.backgroundImage = 'url(./img/otherimgs/icons/sound_off_64.png)';
    for (let audio of audioEffects) {
        audio.muted = true;
    }
}

/**
 * Plays the background music.
 */
function playBackgroundMusic() {
    background_audio.play();
    background_audio.volume = 0.03;
    background_audio.loop = true;
}

/**
 * Number of chicken entities in the game.
 * @type {number}
 */
let numbersOfChicken = 0;

/**
 * Plays the chicken audio effect based on the number of chicken entities.
 */
function playChickenAudio() {
    if (numbersOfChicken <= 0) {
        chickenWalk_audio.pause();
    } else if (numbersOfChicken > 0) {
        chickenWalk_audio.play();
        chickenWalk_audio.volume = 0.2;
        chickenWalk_audio.loop = true;
    }
}

/**
 * Number of chick entities in the game.
 * @type {number}
 */
let numbersOfChicks = 0;

/**
 * Plays the chicks audio effect based on the number of chick entities.
 */
function playChicksAudio() {
    if (numbersOfChicks <= 0) {
        chicksWalk_audio.pause();
    } else if (numbersOfChicken > 0) {
        chicksWalk_audio.play();
        chicksWalk_audio.volume = 0.2;
        chicksWalk_audio.loop = true;
    }
}