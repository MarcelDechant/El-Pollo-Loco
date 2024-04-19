/**
 * Represents a coins object with specified animations and attributes.
 * @class
 * @extends MovableObject
 */
class Coins extends MovableObject {
    /**
     * Array of image paths for coin animation.
     * @type {string[]}
     * @description This array contains the image paths for the coin animation.
     */
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * The offset values for the coins object.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 50,
        bottom: 50,
        left: 30,
        right: 30
    };

    /**
     * Creates an instance of Coins.
     */
    constructor() {
        super(); // Call the superclass constructor
        this.loadImage('img/8_coin/coin_1.png'); // Load initial image
        this.loadImages(this.IMAGES_COINS); // Load coin animation images
        this.x = 200 + Math.random() * 1200; // Randomize initial x position
        this.y = 150 + Math.random() * 150; // Randomize initial y position
        this.animate(); // Start animation
    }

    /**
     * Animates the coins object.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS); // Play coin animation
        }, 150);
    }
}