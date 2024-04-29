/**
 * Represents an end boss object with specific attributes and behaviors.
 * @class
 */
class Endboss extends MovableObject {
    /**
     * The y-coordinate of the end boss's position.
     * @type {number}
     */
    y = 55;

    /**
     * The height of the end boss.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the end boss.
     * @type {number}
     */
    width = 250;

    /**
     * The offset values for collision detection.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 65,
        bottom: 50,
        left: 30,
        right: 30
    };

    /**
     * The energy level of the end boss.
     * @type {number}
     */
    energy = 100;
 

    /**
     * The array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * The array of image paths for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * The array of image paths for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * The array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * The array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    world;
    /**
     * Constructs a new Endboss object.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 * 2;
        this.animate();
    }

    /**
     * Initiates the animation for the end boss.
     */
    animate() {
        setInterval(() => {
            if (this.energy === 0) {
                console.log('Endboss is dead');
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                console.log('Endboss is hurt');
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.isMove();
            }
        }, 160);
        setInterval(() => {
            this.isAttacking();
        }, 100);
    }


   

    isAttacking() {
        if (world.checkSeeBoss() < 300) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.speed = 25;
            this.offset = {
                right: 45,
                left: -100,
                bottom: 90,
                top: 80
            };
        } else {
            this.speed = 8;
            this.offset = {
                right: 45,
                left: 70,
                bottom: 90,
                top: 80
            };
        }
    }
    isMove() {
        if (world.checkSeeBoss() <= 850) {
            this.playAnimation(this.IMAGES_WALKING);
            this.x -= this.speed;
        } else if (world.checkSeeBoss() < 550) {
            this.playAnimation(this.IMAGES_ALERT);
        }
    }


}