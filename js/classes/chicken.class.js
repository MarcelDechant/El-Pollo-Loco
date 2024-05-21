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
    otherDirection = false;

    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2100;
        this.direction = this.x < 0 ? 'right' : 'left';
        this.speed = 0.1 + Math.random() * 1.2;
        this.animate();
        this.otherDirection = this.direction === 'right';
    }

   /**
 * Animates the chicken object based on its state.
 * This function controls the animation of the chicken, including its movement and visual state.
 */
animate() {
    setInterval(() => {
        this.checkDirection();
        this.move();
    }, 1000 / 60);

    setInterval(() => {
        this.animateState();
    }, 150);
}

/**
 * Checks the direction of the chicken's movement based on its current position.
 * If the chicken reaches the predefined boundaries, its direction is updated accordingly.
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
 * Moves the chicken based on its current direction.
 * This function executes the movement of the chicken based on its current direction.
 */
move() {
    if (this.direction === 'left') {
        this.moveLeft();
    } else if (this.direction === 'right') {
        this.moveRight();
    }
}

/**
 * Controls the visual state of the chicken.
 * This function manages the visual state of the chicken, including walking animation and death animation.
 */
animateState() {
    if (!this.dead_enemy) {
        this.playAnimation(this.IMAGES_WALKING);
    }
    if (this.dead_enemy) {
        this.loadImage(this.IMAGE_DEAD);
        this.y += this.speedY;
    }
}
}