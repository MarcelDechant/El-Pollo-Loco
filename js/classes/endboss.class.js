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
     * Name of the end boss.
     * @type {string}
     */
     name = "Endboss";

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

    /**
     * Flag indicating if the alert animation has been played.
     * @type {boolean}
     */
    alertPlayed = false;

    /**
     * Constructs a new Endboss object.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        // Load images for animations
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        // Set initial position
        this.x = 700 * 3;
        // Start animation
        this.animate();
    }

    /**
     * Initiates the animation for the end boss.
     */
    animate() {
        setInterval(() => {
            if (this.energy === 0) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(gameVictory, 1000);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.isMove();
            }
        }, 160);
        setInterval(() => {
            this.isAttacking();
        }, 160);
    }

/**
     * Determines if the end boss is attacking and initiates attack animation.
     */
    isAttacking() {
        if (world.checkSeeBoss() < 300  && this.energy > 0) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.speed = 25;
            this.offset = {
                top: 65,
                bottom: 50,
                left: 30,
                right: 30
            };
        } 
    }

    
/**
     * Determines if the end boss is moving and initiates movement animation.
     */
    isMove() {
        const distanceToBoss = world.checkSeeBoss();
        if (distanceToBoss < 400 && distanceToBoss > 300 && !this.alertPlayed) {
            
            this.playAnimation(this.IMAGES_ALERT);
            this.alertPlayed = true;
        } else if (distanceToBoss <= 850) {
            this.speed = 8;
            
            this.playAnimation(this.IMAGES_WALKING);
            this.x -= this.speed;
            this.alertPlayed = false;
        }
    }
}