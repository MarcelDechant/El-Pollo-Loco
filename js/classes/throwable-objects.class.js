/**
 * Represents a throwable object in the game.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    wasHit = false;
    ground = 370;
    offset = {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
    };
    
    THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    THROW_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png ')
        this.loadImages(this.THROW_BOTTLE);
        this.loadImages(this.THROW_BOTTLE_SPLASH);
        this.x = x - 40;
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
            if (this.y < this.ground && !this.wasHit) {
                this.playAnimation(this.THROW_BOTTLE);
            } else if (this.y == this.ground || this.wasHit) {
                this.playAnimation(this.THROW_BOTTLE_SPLASH);
                if (!this.breakSoundPlayed) {
                    bottleBrock_audio.play();
                    bottleBrock_audio.volume = 0.03;
                    this.breakSoundPlayed = true;
                }
                setTimeout(() => {
                    this.wasHit = false;
                    this.breakSoundPlayed = false;
                }, this.THROW_BOTTLE_SPLASH.length * 500);
            }
        }, 5000 / 60);
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        this.animate()
        this.speedY = 15;
        this.applayGravity();
        this.getMovementBottle();

        const checkBottleStatus = setInterval(
            () => this.getBottleStatus(checkBottleStatus),
            1000 / 60
        );
        bottleThrow_audio.play();
        bottleThrow_audio.volume = 0.2;
    }

    /**
    * Controls the horizontal movement of the thrown bottle.
    */
    getMovementBottle() {
        if (!world.character.otherDirection) {
            let Bottle = setInterval(() => {
                this.x += 6;
                if (this.y == this.ground) {
                    clearInterval(Bottle);
                }
            }, 25);
        } else if (world.character.otherDirection) {
            setInterval(() => {
                this.x -= 6;
                if (this.y == this.ground) {
                    clearInterval(Bottle);
                }
            }, 25);
        }
    }

    /**
     * Checks the status of the thrown bottle.
     * @param {number} checkBottleStatus - The interval ID for checking the bottle status.
     */
    getBottleStatus(checkBottleStatus) {
        if ((this.y == this.ground) || this.wasHit) {
            this.currImg = 0;
            clearInterval(checkBottleStatus);
            if (this.speedY > 0) {
                this.speedY = 0;
            }
        }
    }
}