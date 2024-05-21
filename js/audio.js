
let background_audio = new Audio('./audio/Backgroundmusic.mp3');
let bottlePickup_audio = new Audio('./audio/bottlePickup.mp3');
let chickenWalk_audio = new Audio('audio/chicken.mp3');
let chicksWalk_audio = new Audio('./audio/chicks.mp3');
let coin_audio = new Audio('./audio/coin.mp3');
let bottleBrock_audio = new Audio('./audio/glassbroken.mp3');
let hurt_audio = new Audio('./audio/hurt.mp3');
let jump_audio = new Audio('./audio/jump.mp3');
let lose_audio = new Audio('audio/lose.mp3');
let snoring_audio = new Audio('./audio/snoring.mp3');
let bottleThrow_audio = new Audio('./audio/throw.mp3');
let characterWalk_audio = new Audio('./audio/walking.mp3');
let win_audio = new Audio('audio/win.mp3');
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
let isMuted = false;
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