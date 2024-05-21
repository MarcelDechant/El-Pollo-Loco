/**
 * Represents a character object with specified dimensions, animations, and attributes.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    y = 220;
    height = 200;
    width = 100;
    speed = 0.1 * 30;
    energy = 100;
    offset = {
        top: 80,
        bottom: 10,
        left: 20,
        right: 25
    };
    world;
    currentTime;
    timeSinceLastMovement;
    lastMovement = new Date().getTime();
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING_START = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png'
    ];

    IMAGES_JUMPING_FALL = [
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'

    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    /**
     * Creates an instance of Character.
     * @constructor
     * @memberof Character
     * @this {Character}
     */
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_FALL);
        this.loadImages(this.IMAGES_JUMPING_START);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = -520;
        this.applayGravity();
        this.animate();
    }



    /**
 * Main function to control the character's animation.
 */
    animate() {
        this.lastMovement = new Date().getTime();
        const movementInterval = 10;
        const stateInterval = 120;

        setInterval(() => {
            this.moveCharacter();
        }, movementInterval);

        setInterval(() => {
            this.checkCharacterState();
        }, stateInterval);
    }

    /**
     * Helper function to handle the right movement of the character.
     */
    moveCharacterRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.enemies.filter(enemy => enemy instanceof Endboss)[0].x + 40) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMovement = new Date().getTime();
        }
    }

    /**
     * Helper function to handle the left movement of the character.
     */
    moveCharacterLeft() {
        if (this.world.keyboard.LEFT && this.x > -617) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMovement = new Date().getTime();
        }
    }

    /**
     * Helper function to handle the jump action of the character.
     */
    handleCharacterJump() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.lastMovement = new Date().getTime();
        }
    }

    /**
     * Helper function to handle the space action of the character.
     */
    handleCharacterSpace() {
        if (this.world.keyboard.SPACE && (this.timeSinceLastMovement >= 5 || this.timeSinceLastMovement >= 2)) {
            this.lastMovement = new Date().getTime();
            this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        }
    }

    /**
     * Helper function to update the camera position based on the character's position.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Helper function to control the movement of the character.
     */
    moveCharacter() {
        this.moveCharacterRight();
        this.moveCharacterLeft();
        this.handleCharacterJump();
        this.handleCharacterSpace();
        this.updateCamera();
    }

    /**
  * Helper function to check and play idle animations.
  */
    checkIdleState() {
        const idleInterval = 200;
        const longIdleInterval = 400;
        if (this.timeSinceLastMovement >= 2) {
            this.playAnimation(this.IMAGES_IDLE, idleInterval);
        }

        if (this.timeSinceLastMovement >= 5) {
            this.playAnimation(this.IMAGES_LONG_IDLE, longIdleInterval);
            snoring_audio.play();
            snoring_audio.volume = 0.2;
        }
    }

    /**
     * Helper function to check and play dead animation.
     */
    checkDeadState() {
        const deadInterval = 1000;
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD, deadInterval);
            setTimeout(gameOver, 1000);
        }
    }

    /**
     * Helper function to check and play hurt animation.
     */
    checkHurtState() {
        const hurtInterval = 400;
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT, hurtInterval);
            hurt_audio.play();
            hurt_audio.volume = 0.2;
        }
    }

    /**
     * Helper function to check and play jumping animations.
     */
    checkJumpingState() {
        const jumpingInterval = 5;
        if (this.isAboveGround()) {
            if (this.speedY >= 0) {
                this.playAnimation(this.IMAGES_JUMPING_START, jumpingInterval);
            } else if (this.speedY <= 0) {
                this.playAnimation(this.IMAGES_JUMPING_FALL, jumpingInterval);
            }
            snoring_audio.pause();
            characterWalk_audio.pause();
        }
    }

    /**
     * Helper function to check and play walking animation.
     */
    checkWalkingState() {
        const walkingInterval = 0;
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING, walkingInterval);
            snoring_audio.pause();
            characterWalk_audio.play();
            characterWalk_audio.volume = 0.1;
        }
    }

    /**
     * Helper function to check the current state of the character and play the corresponding animation.
     */
    checkCharacterState() {
        this.currentTime = new Date().getTime();
        this.timeSinceLastMovement = (this.currentTime - this.lastMovement) / 1000;

        this.checkIdleState();
        this.checkDeadState();
        this.checkHurtState();
        if (!this.isDead() && !this.isHurt()) {
            this.checkJumpingState();
            if (!this.isAboveGround()) {
                characterWalk_audio.pause();
                this.checkWalkingState();
            }
        }
    }
}