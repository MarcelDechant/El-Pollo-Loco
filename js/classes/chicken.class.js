/**
 * Represents a chicken enemy object with specified dimensions, animations, and attributes.
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 355;
    height = 60;
    width = 60;
    offset = {
        top: 2,
        bottom: 5,
        left: 0,
        right: 0
    };
    speedY = 10;
    dead_enemy = false;
    name = "Chicken";
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

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