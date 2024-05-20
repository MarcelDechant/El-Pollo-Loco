/**
 * Represents a background object with specified dimensions and position.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
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
        this.x = x;
        this.y = 480 - this.height;
    }
}