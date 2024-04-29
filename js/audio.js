let background_audio = new Audio('./audio/Backgroundmusic.mp3');
let bottlePickup_audio = new Audio('./audio/bottlePickup.mp3');
let chickenWalk_audio = new Audio('./audio/chicken.wav');
let chicksWalk_audio = new Audio('./audio/chicks.mp3');
let coin_audio = new Audio('./audio/coin.mp3');
let bottleBrock_audio = new Audio('./audio/glassbroken.mp3');
let hurt_audio = new Audio('./audio/hurt.mp3');
let jump_audio = new Audio('./audio/jump.mp3');
let lose_audio = new Audio('./audio/lose.wav');
let snoring_audio = new Audio('./audio/snoring.mp3');
let bottleThrow_audio = new Audio('./audio/throw.mp3');
let characterWalk_audio = new Audio('./audio/walking.mp3');
let win_audio = new Audio('./audio/win.wav');

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
];
let isMuted = false;
let BtnAudioToggle = document.getElementById('soundToggle');


function soundMutedOnload() {
    toggleSound(!isMuted);
}

function toggleSound() {
    volumeSlider.classList.remove('d-none');
    if (isMuted) {
        soundEffectsOn();
    } else {
        soundEffectsOff();
        isMuted = true;
    }
}
function soundEffectsOn() {
    BtnAudioToggle.style.backgroundImage = 'url(./img/otherimgs/icons/sound_on_64.png)';
    for (let audio of  audioEffects) {
        audio.muted = false;
    }
    playBackgroundMusic();
    isMuted = false;
}
function soundEffectsOff() {
    volumeSlider.classList.add('d-none');
    BtnAudioToggle.style.backgroundImage = 'url(./img/otherimgs/icons/sound_off_64.png)';
    for (let audio of  audioEffects) {
        audio.muted = true;
    }
}
function playBackgroundMusic() {
    background_audio.play();
    background_audio.loop = true;
}

function changeVolume(volume) {
    let normalizedVolume = volume / 100;
    for (let audio of audioEffects) {
        audio.volume = normalizedVolume;
    }
}

function initVolume() {
    let volumeSlider = document.getElementById('volumeSlider');
    changeVolume(volumeSlider.value);
}