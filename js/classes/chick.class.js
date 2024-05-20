/**
 * Represents a chick enemy object with specified dimensions, animations, and attributes.
 * @class
 * @extends MovableObject
 */
class Chick extends MovableObject {
    y = 370;
    height = 40;
    width = 40;
    dead_enemy = false;
    speedY = 0;
    name = "Chick";
    offset = {
        top: 2,
        bottom: 5,
        left: 5,
        right: 5
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    /**
     * Creates an instance of Chick.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2100;
        this.speed = 0.1 + Math.random() * 1.2;
        this.applayGravity();
        this.animate();

    }

    /**
     * Animates the chick object based on its state.
     */
    animate() {
        let counter = 0;
        setInterval(() => {
            counter++;
            const randomInterval = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
            if (counter % randomInterval === 0) {
                this.makeJump();
                counter = 0;
            }
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead_enemy) {
                this.playAnimation(this.IMAGES_WALKING);

            }
            if (this.dead_enemy) {
                this.loadImage(this.IMAGE_DEAD);
                this.y -= this.speedY;
            }
        }, 150);
    }

    makeJump() {
        setInterval(() => {
            if (this.y == 375 && !this.dead_enemy) {
                console.log('sprung')
                this.chickJump();
            }
        }, 4000);
    }
}