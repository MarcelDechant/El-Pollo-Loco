/**
 * Represents a cloud object with specified dimensions and animations.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * The y-coordinate of the cloud's position.
     * @type {number}
     */
    y = 20;

    /**
     * The width of the cloud object.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud object.
     * @type {number}
     */
    height = 250;

    /**
     * Creates an instance of Cloud.
     */
    constructor() {
        super(); // Call the superclass constructor
        this.loadImage('img/5_background/layers/4_clouds/1.png'); // Load image
        this.x = Math.random() * (600 + 300) - 300; // Randomize initial x position
        this.animate(); // Start animation
    }

    /**
     * Animates the cloud object.
     */
    animate() {
        setInterval(() => {
            this.moveLeft(); // Move cloud left
        }, 1000 / 60);
    }
}