/**
 * Represents a bottle object with specified dimensions and animations.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /**
     * The height of the bottle object.
     * @type {number}
     */
    height = 70;

    /**
     * The width of the bottle object.
     * @type {number}
     */
    width = 70;

    /**
     * The offset values for the bottle object.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 4,
        bottom: 5,
        left: 5,
        right: 5
    };

    /**
     * The array of image paths for bottle animation.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    /**
     * Creates an instance of Bottle.
     */
    constructor() {
        super(); // Call the superclass constructor
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Load initial image
        this.loadImages(this.IMAGES_BOTTLE); // Load all images for animation
        this.x = 200 + Math.random() * 1200;
        this.y = 150 + Math.random() * 200;
        this.animate(); // Start animation
    }

    /**
     * Animates the bottle object by cycling through its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 350);
    }
}