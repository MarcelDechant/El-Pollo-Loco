/**
 * Represents a background object with specified dimensions and position.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The x-coordinate of the background's position.
     * @param {number} y - The y-coordinate of the background's position.
     */
    constructor(imagePath, x, y) {
        super(); 
        this.loadImage(imagePath); 

        /**
         * The x-coordinate of the background object's position.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate of the background object's position.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
}