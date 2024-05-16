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
    y = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

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
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * (2100 + 300) - 300;
        this.speed = 0.01 + Math.random() * 0.1;
        this.animate();
    }

    /**
     * Animates the cloud object.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
