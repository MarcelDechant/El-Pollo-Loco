
let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let isFullscreen = false;
let restartBtn = document.getElementById("startGame");
let startScreenBtn = document.getElementById('startScreenBtn');
let gameOverElement = document.getElementById('game-over');
let victoryElement = document.getElementById('game-victory');

/**
 * Initialisiert das Spiel.
 */
function init() {
    canvas = document.getElementById('canvas');
    checkMobileDevice();
    initStartScreen();
    toggleSound();
    checkDeviceMode();
    startMobileDeviceCheck();
    
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);


/**
 * Handles the key down event and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The key down event object.
 */
function handleKeyDown(event) {
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.key == " ") {
        keyboard.SPACE = true;
    }
}

/**
 * Handles the key up event and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The key up event object.
 * @return {void} This function does not return anything.
 */
function handleKeyUp(event) {
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.key == " ") {
        keyboard.SPACE = false;
    }
}

/**
 * Handles the button click event.
 * @param {string} action - The action associated with the button.
 */
function handleButtonClick(action) {
    switch (action) {
        case "left":
            keyboard.LEFT = true;
            break;
        case "right":
            keyboard.RIGHT = true;
            break;
        case "jump":
            keyboard.UP = true;
            break;
        case "shoot":
            keyboard.SPACE = true;
            break;
        default:
            break;
    }
}

/**
 * Add event listener to each mobile control button
 */
const controlButtons = document.querySelectorAll('.mobile-control-btn');
controlButtons.forEach(button => {
    let action = button.textContent.toLowerCase();
    function handleButtonPress() {
        handleButtonClick(action);
        button.classList.add('active');
    }
    function handleButtonRelease() {
        switch (action) {
            case "left":
                keyboard.LEFT = false;
                break;
            case "right":
                keyboard.RIGHT = false;
                break;
            case "jump":
                keyboard.UP = false;
                break;
            case "shoot":
                keyboard.SPACE = false;
                break;
            default:
                break;
        }
        button.classList.remove('active');
    }
    button.addEventListener('mousedown', handleButtonPress);
    button.addEventListener('mouseup', handleButtonRelease);
    button.addEventListener('touchstart', function (event) {
        if (event.cancelable) event.preventDefault();
        handleButtonPress();
    });
    button.addEventListener('touchend', function () {
        handleButtonRelease();
    });
    button.addEventListener('touchcancel', function () {
        handleButtonRelease();
    });
});

/**
 * Handles the fullscreen button click event.
 */
fullscreenButton.addEventListener('click', function () {
    if (!isFullscreen) {
        enterFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/otherimgs/icons/minimize_64.png)';
    } else {
        exitFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/otherimgs/icons/fullscreen_64.png)';
    }
});

/**
 * Enters fullscreen mode.
 */
function enterFullscreen() {
    let element = document.documentElement;
    let requestFullScreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen || element.msRequestFullscreen;
    requestFullScreen.call(element);
    isFullscreen = true;
}


/**
 * Exits full screen mode.
 */
function exitFullscreen() {
    let exitFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    exitFullScreen.call(document);
    isFullscreen = false;
}


/**
 * Checks if the current device is a mobile device based on touch capability.
 * @returns {boolean} True if the device is a mobile device, otherwise false.
 */
function isMobileDevice() {
    return 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0;
}

/**
 * Checks if the user agent is a mobile device.
 * @returns {boolean} True if the user agent is a mobile device, otherwise false.
 */
function checkMobileDevice() {
    if (isMobileDevice() && !isLandscapeOrientation()) {
        rotateDevice.style.display = 'flex';
    }else{
        rotateDevice.style.display = 'none';
    }
}

function startMobileDeviceCheck() {
    setInterval(checkMobileDevice, 500); 
}

function checkDeviceMode() {
    let isMobile = isMobileDevice();
    let mobileButtons = document.getElementById('mobile-controls');
    let rotateDevice = document.getElementById('rotateDevice')
    if (isMobile) {
        mobileButtons.style.display = 'flex';
        
    } else {
        mobileButtons.style.display = 'none';
        
    }
}

/**
 * Checks if the window is in landscape orientation.
 * @return {boolean} True if the window is in landscape orientation, otherwise false.
 */
function isLandscapeOrientation() {
    return window.matchMedia("(orientation: landscape)").matches;
}

/**
 * Starts the game.
 */
function startingGame() {
    restartBtn.style.backgroundImage = 'url(./img/otherimgs/icons/restart.png)';
    let controlsElement = document.getElementById('mobile-controls');
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    let gameOverElement = document.getElementById('game-over');
    clearAllIntervals();
    initLevel();
    world = new World(canvas, keyboard);
    setTimeout(() => {
        startScreenBtn.classList.remove('d-none');
        canvasElement.classList.remove('d-none');
        gameOverElement.classList.add('d-none');
        startElement.classList.add('d-none');
        controlsElement.classList.remove('d-none'); 
    }, 200);
}

/**
 * Initializes the start screen.
 */
function initStartScreen() {
    let controlsElement = document.getElementById('mobile-controls');
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    canvasElement.classList.add('d-none');
    startElement.classList.remove('d-none');
    controlsElement.classList.remove('d-none');

}

/**
 * Goes back to the start screen.
 */
function backStartScreen() {
    let controlsElement = document.getElementById('mobile-controls');
    initStartScreen();
    startScreenBtn.classList.add('d-none');
    restartBtn.style.backgroundImage = 'url(./img/otherimgs/icons/play_64.png)';
    controlsElement.classList.remove('d-none');
    gameOverElement.classList.add('d-none');
    victoryElement.classList.add('d-none');
    clearAllIntervals();
    soundEffectsOff();

}

/**
 * Displays the game over screen.
 */
function gameOver() {
    let canvasElement = document.querySelector('canvas');
    let controlsElement = document.getElementById('mobile-controls');
    let gameOverElement = document.getElementById('game-over');
    let victoryElement = document.getElementById('game-victory');
    victoryElement.classList.add('d-none');
    canvasElement.classList.add('d-none');
    controlsElement.classList.add('d-none');
    gameOverElement.classList.remove('d-none');
    lose_audio.volume = 0.2;
    lose_audio.play();
    clearAllIntervals();
}

/**
 * Displays the game victory screen.
 */
function gameVictory() {
    let canvasElement = document.querySelector('canvas');
    let controlsElement = document.getElementById('mobile-controls');
    let victoryElement = document.getElementById('game-victory');
    let gameOverElement = document.getElementById('game-over');
    gameOverElement.classList.add('d-none');
    canvasElement.classList.add('d-none');
    controlsElement.classList.add('d-none');
    victoryElement.classList.remove('d-none');
    win_audio.volume = 0.2;
    win_audio.play();
    clearAllIntervals();
}

/**
 * Clears all intervals up to 99999.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/** Removes the focus from the clicked button */
let buttons = document.querySelectorAll('.button');
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        this.blur();
    });
});

/**
 * Opens the information box.
 */
function openInfo() {
    let openInfo = document.getElementById('infobox')
    openInfo.classList.remove('d-none');
}

/**
 * Closes the information box.
 */
function closeInfo() {
    let closeInfo = document.getElementById('infobox')
    closeInfo.classList.add('d-none');
}
