/**
 * Represents a character object with specified dimensions, animations, and attributes.
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * The y-coordinate of the character's position.
     * @type {number}
     */
    y = 220;

    /**
     * The height of the character object.
     * @type {number}
     */
    height = 200;

    /**
     * The width of the character object.
     * @type {number}
     */
    width = 100;

    /**
     * The speed of the character.
     * @type {number}
     */
    speed = 0.1 * 30;

    /**
     * The energy level of the character.
     * @type {number}
     */
    energy = 100;

    /**
     * The offset values for the character object.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offset = {
        top: 80,
        bottom: 10,
        left: 15,
        right: 20
    };

    /**
     * Reference to the world object.
     * @type {World}
     */
    world;

    /**
     * Current time.
     * @type {number}
     */
    currentTime;

    /**
     * Time since last movement.
     * @type {number}
     */
    timeSinceLastMovement;

    /**
     * Timestamp of the last movement.
     * @type {number}
     */
    lastMovement = new Date().getTime();

    /**
    * Array of image paths for idle animation.
    * @type {string[]}
    * @description This array contains the image paths for the character's idle animation.
    */
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

    /**
     * Array of image paths for long idle animation.
     * @type {string[]}
     * @description This array contains the image paths for the character's long idle animation.
     */
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
    ]

    /**
     * Array of image paths for walking animation.
     * @type {string[]}
     * @description This array contains the image paths for the character's walking animation.
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for jumping animation.
     * @type {string[]}
     * @description This array contains the image paths for the character's jumping animation.
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
         * Array of image paths for hurt animation.
         * @type {string[]}
         * @description This array contains the image paths for the character's hurt animation.
         */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'

    ];

    /**
         * Array of image paths for dead animation.
         * @type {string[]}
         * @description This array contains the image paths for the character's dead animation.
         */
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
        super(); // Call the superclass constructor
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'); // Load initial image
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applayGravity(); // Apply gravity
        this.animate(); // Start animation
    }


    /**
 * Animates the character object based on its state and user input.
 * @memberof Character
 * @function animate
 * @this {Character}
 * @description This function handles the animation of the character based on its state and user input.
 */
animate() {
    this.lastMovement = new Date().getTime();

    // Interval for movement animation
    const movementInterval = 10; // Slower than before

    // Interval for state animation
    const stateInterval = 120; // Slower than before

    // Interval for "Idle" animation
    const idleInterval = 200; // You can adjust the speed here

    // Interval for "Long Idle" animation
    const longIdleInterval = 400; // You can adjust the speed here

    // Interval for "Walking" animation
    const walkingInterval = 0; // You can adjust the speed here

    // Interval for "Jumping" animation
    const jumpingInterval = 1000; // You can adjust the speed here

    // Interval for "Hurt" animation
    const hurtInterval = 400; // You can adjust the speed here

    // Interval for "Dead" animation
    const deadInterval = 1000; // You can adjust the speed here

    setInterval(() => {
        // Move the character right if the right arrow key is pressed
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMovement = new Date().getTime();
        }

        // Move the character left if the left arrow key is pressed
        if (this.world.keyboard.LEFT && this.x > -617) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMovement = new Date().getTime();
        }

        // Make the character jump if the up arrow key is pressed and it's not already above ground
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.lastMovement = new Date().getTime();
        }

        // Update the camera position based on the character's position
        this.world.camera_x = -this.x + 100;
    }, movementInterval);

    setInterval(() => {
        this.currentTime = new Date().getTime();
        this.timeSinceLastMovement = (this.currentTime - this.lastMovement) / 1000;

        // Play idle animation if there's no movement for a while
        if (this.timeSinceLastMovement >= 2) {
            this.playAnimation(this.IMAGES_IDLE, idleInterval);
        }

        // Play long idle animation if there's no movement for a longer time
        if (this.timeSinceLastMovement >= 5) {
            this.playAnimation(this.IMAGES_LONG_IDLE, longIdleInterval);
            snoring_audio.play();
            snoring_audio.volume = 0.2;
        }

        // Play dead animation if the character is dead
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD, deadInterval);
            setTimeout(gameOver, 1000);
        } else if (this.isHurt()) {
            // Play hurt animation if the character is hurt
            this.playAnimation(this.IMAGES_HURT, hurtInterval);
            hurt_audio.play();
            hurt_audio.volume = 0.2;
        } else if (this.isAboveGround()) {
            // Play jumping animation if the character is in the air
            this.playAnimation(this.IMAGES_JUMPING, jumpingInterval);
            snoring_audio.pause();
            characterWalk_audio.pause();
        } else {
            // Play walking animation if the character is on the ground and moving
            characterWalk_audio.pause();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING, walkingInterval);
                snoring_audio.pause();
                characterWalk_audio.play();
                characterWalk_audio.volume = 0.1;
            }
        }
    }, stateInterval);
}


}