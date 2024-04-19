/**
 * Represents a throwable object in the game.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * Indicates whether the object was hit or not.
     * @type {boolean}
     */
    wasHit = false;

    /**
     * Array of image paths representing the throwable object when thrown.
     * @type {string[]}
     */
    THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths representing the throwable object when it splashes after hitting something.
     * @type {string[]}
     */
    THROW_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Audio object for the sound of breaking bottle.
     * @type {HTMLAudioElement}
     */
    break_bottle_sound = new Audio('audio/glassbroken.mp3');

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png ')
        this.loadImages(this.THROW_BOTTLE);
        this.loadImages(this.THROW_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Animates the throwable object.
     */
    animate() {
        setInterval(() => {
            if (!this.wasHit) {
                this.playAnimation(this.THROW_BOTTLE);
            } else {
                this.playAnimation(this.THROW_BOTTLE_SPLASH);
                if (!this.breakSoundPlayed) {
                    this.break_bottle_sound.play();
                    this.break_bottle_sound.volume = 0.03;
                    this.breakSoundPlayed = true;
                }
                setTimeout(() => {
                    this.wasHit = false;
                    this.breakSoundPlayed = false;

                }, this.THROW_BOTTLE_SPLASH.length * 5000);
            }
        }, 100 / 60);
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        this.animate();
        this.speedY = 15;
        this.applayGravity();
        setInterval(() => {
            this.x += 6;
        }, 25)
    }
}