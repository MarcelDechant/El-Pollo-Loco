/**
 * Represents a bottle object with specified dimensions and animations.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    height = 70;
    width = 70;

    offset = {
        top: 15,
        bottom: 10,
        left: 25,
        right: 15
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    
    /**
     * Creates an instance of Bottle.
     */
    constructor() {
        super();

        /**
         * The x-coordinate of the bottle object's position.
         * @type {number}
         */
        this.x = 200 + Math.random() * 1200;

        /**
         * The y-coordinate of the bottle object's position.
         * @type {number}
         */
        this.y = 150 + Math.random() * 200;

        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.animate();
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