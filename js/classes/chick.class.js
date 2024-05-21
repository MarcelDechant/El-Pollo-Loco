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
    otherDirection = false;

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
        this.direction = this.x < 0 ? 'right' : 'left';
        this.speed = 0.1 + Math.random() * 1.2;
        this.applayGravity();
        this.animate();
        this.otherDirection = this.direction === 'right';
    }

    /**
     * Animates the chick object based on its state.
     */
    animate() {
        this.startWalkingAnimation();
        this.startJumpingAnimation();
    }

    /**
 * Starts the animation for walking.
 * This function controls the walking animation of the object.
 */
    startWalkingAnimation() {
        let counter = 0;
        setInterval(() => {
            counter++;
            const randomInterval = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
            if (counter % randomInterval === 0) {
                this.makeJump();
                counter = 0;
            }
            this.checkDirection();
            this.move();
        }, 1000 / 60);
    }

    /**
     * Checks and updates the movement direction of the object based on its current position.
     * If the object reaches the predefined boundaries, its direction is updated accordingly.
     */
    checkDirection() {
        if (this.x >= 1700) {
            this.direction = 'left';
            this.otherDirection = false;
        } else if (this.x <= -710) {
            this.direction = 'right';
            this.otherDirection = true;
        }
    }

    /**
     * Moves the object based on its current direction.
     * This function executes the movement of the object based on its current direction.
     */
    move() {
        if (this.direction === 'left') {
            this.moveLeft();
        } else if (this.direction === 'right') {
            this.moveRight();
        }
    }

    /**
        * Starts the animation for jumping.
        */
    startJumpingAnimation() {
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

    /**
 * Sets up a periodic interval to make the character jump if conditions are met.
 * The character jumps if its y-coordinate is 375 and it's not a dead enemy.
 */
    makeJump() {
        setInterval(() => {
            if (this.y == 375 && !this.dead_enemy) {

                this.chickJump();
            }
        }, 4000);
    }
}