/**
 * Represents an end boss object with specific attributes and behaviors.
 * @class
 */
class Endboss extends MovableObject {
    y = 55;
    height = 400;
    width = 250;
    name = "Endboss";
    energy = 100;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

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

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    alertPlayed = false;

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
        this.x = 700 * 3;
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
            this.speed = 35;
            this.offset = {
                top: 65,
                bottom: 50,
                left: 50,
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
            this.speed = 18;
            this.playAnimation(this.IMAGES_WALKING);
            this.x -= this.speed;
            this.alertPlayed = false;
        }
    }
}