/**
 * Represents a movable object in the game.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * The speed of the object.
     * @type {number}
     */
    speed = 0.1;

    /**
     * Flag indicating the direction of the object.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration due to gravity.
     * @type {number}
     */
    acceleration = 1;

    /**
     * The timestamp of the last hit received by the object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The offset values for collision detection.
     * @type {object}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
     * Applies gravity to the object, making it fall if not on the ground.
     */
    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 220 && this instanceof Character) {
                this.y = 220;
            }
            if (this.y > 375 && this instanceof Chick && !this.dead_enemy) {
                this.y = 375;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Character) {
            return this.y < 220;
        } else if (this instanceof Chick) {
            return this.y < 375;
        }

    }


    /**
     * Checks if the object is on the ground.
     * @returns {boolean} True if the object is on the ground, otherwise false.
     */
    isOnGround() {
        return this.y >= 220;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} mo - The object to check collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's energy and updates the last hit timestamp.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hurt.
     * @returns {boolean} True if the object was hurt recently, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the animation for the object.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage > 10) {
            this.currentImage = 0;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;

    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 15;
        jump_audio.play();
        jump_audio.volume = 0.2;

    }
    chickJump() {
        this.speedY = 15;
        this.speed + 4;
    }
}