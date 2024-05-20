/**
 * Represents a chicken enemy object with specified dimensions, animations, and attributes.
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /**
     * The y-coordinate of the chicken's position.
     * @type {number}
     */
    y = 355;

    /**
     * The height of the chicken object.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the chicken object.
     * @type {number}
     */
    width = 60;

    /**
     * The offset values for the chicken object.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 2,
        bottom: 5,
        left: 0,
        right: 0
    };

    /**
     * The vertical speed of the chicken.
     * @type {number}
     */
    speedY = 10;

    /**
     * Flag indicating if the chicken enemy is dead.
     * @type {boolean}
     */
    dead_enemy = false;

    /**
     * Name of the chicken.
     * @type {string}
     */
    name = "Chicken";

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     * @description This array contains the image paths for the chicken's walking animation.
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     * @description This array contains the image path for the chicken's dead animation.
     */
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];


    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2100;
        this.speed = 0.1 + Math.random() * 1.2;
        this.animate();
    }

    /**
     * Animates the chicken object based on its state.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(); 
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead_enemy) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.dead_enemy) {
                this.loadImage(this.IMAGE_DEAD);
                this.y += this.speedY;
                
            }
        }, 150);
    }
}