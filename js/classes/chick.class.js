/**
 * Represents a chick enemy object with specified dimensions, animations, and attributes.
 * @class
 * @extends MovableObject
 */
class Chick extends MovableObject {
    /**
     * The y-coordinate of the chick's position.
     * @type {number}
     */
    y = 370;

    /**
     * The height of the chick object.
     * @type {number}
     */
    height = 40;

    /**
     * The width of the chick object.
     * @type {number}
     */
    width = 40;

    /**
     * Flag indicating if the chick enemy is dead.
     * @type {boolean}
     */
    dead_enemy = false;

    /**
     * The vertical speed of the chick.
     * @type {number}
     */
    speedY = 10;

    /**
     * The offset values for the chick object.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 2,
        bottom: 5,
        left: 5,
        right: 5
    };

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     * @description This array contains the image paths for the chick's walking animation.
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for dead animation.
     * @type {string[]}
     * @description This array contains the image path for the chick's dead animation.
     */
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Name of the chick.
     * @type {string}
     */
    name = "Chick";
   

    /**
     * Creates an instance of Chick.
     */
    constructor() {
        super(); 
        this.loadImage(this.IMAGES_WALKING[0]); 
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 1500; 
        this.speed = 0.1 + Math.random() * 0.5; 
        this.animate(); 
    }

    /**
     * Animates the chick object based on its state.
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