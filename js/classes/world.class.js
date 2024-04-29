/**
 * Represents the game world.
 * @class
 */
class World {
    /**
     * The character in the world.
     * @type {Character}
     */
    character = new Character();

    /**
     * The current level.
     * @type {Level}
     */
    level = level1;

    /**
     * The canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The rendering context of the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The x-coordinate of the camera.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The status bar for character life.
     * @type {StatusBarLife}
     */
    statusBarLife = new StatusBarLife();

    /**
     * The status bar for collected coins.
     * @type {StatusBarCoins}
     */
    statusBarCoins = new StatusBarCoins();

    /**
     * The status bar for collected bottles.
     * @type {StatusBarBottle}
     */
    statusBarBottle = new StatusBarBottle();

    /**
     * The status bar for the end boss.
     * @type {StatusBarEndboss}
     */
    statusBarEndboss = new StatusBarEndboss();

    /**
     * The counter for collected bottles.
     * @type {number}
     */
    bottle_counter = 0;

    /**
     * The counter for collected coins.
     * @type {number}
     */
    coin_counter = 0;

    /**
     * Array of throwable objects in the world.
     * @type {ThrowableObject[]}
     */
    throwableObject = [];

    /**
     * Audio for collecting coins.
     * @type {HTMLAudioElement}
     */
    collect_coin_sound = new Audio('audio/coin.mp3');

    /**
     * Audio for collecting bottles.
     * @type {HTMLAudioElement}
     */
    collect_bottle_sound = new Audio('audio/bottlePickup.mp3');

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets up the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottleWithEnemy();
            this.checkCollisionsWithItems();
            this.checkSeeBoss();
        }, 200);
    }

    /**
     * Checks for throw actions and creates throwable objects.
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 80);
            this.throwableObject.push(bottle);
        }
    }

    /**
     * Checks for collisions between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    enemy.dead_enemy = true;
                    this.character.jump();
                } else
                    this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between character and items (bottles, coins).
     */
    checkCollisionsWithItems() {
        [this.level.bottles, this.level.coins].forEach(items => {
            items.forEach((item, index) => {
                if (this.character.isColliding(item)) {
                    if (item instanceof Bottle) {
                        this.addbottle(index);
                    } if (item instanceof Coins) {
                        this.addCoin(index);
                    }
                }
            });
        });
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    checkCollisionBottleWithEnemy() {
        this.throwableObject.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    if (enemy instanceof Endboss && !throwableObject.wasHit) {
                        enemy.hit();
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        enemy.x += 50;
                    } else {
                        enemy.dead_enemy = true;

                    }
                    throwableObject.wasHit = true;
                }
            });
        });
    }

    /**
     * Adds a bottle to the inventory upon collection.
     * @param {number} index - The index of the collected bottle.
     */
    addbottle(index) {
        this.level.bottles.splice(index, 1);
        this.bottle_counter++;
        this.statusBarBottle.setPercentage(this.bottle_counter);
        this.collect_bottle_sound.play();
        this.collect_bottle_sound.volume = 0.03;
    }

    /**
     * Adds a coin to the inventory upon collection.
     * @param {number} index - The index of the collected coin.
     */
    addCoin(index) {
        this.level.coins.splice(index, 1);
        this.coin_counter++;
        this.statusBarCoins.setPercentage(this.coin_counter);
        this.collect_coin_sound.play();
        this.collect_coin_sound.volume = 0.2;
    }

    checkSeeBoss() {
        let seeBoss = Math.abs(this.character.x - this.level.enemies[1].x);
        if (seeBoss < 550) {
            this.addToMap(this.statusBarEndboss);
            console.log('see endboss')
        }
        return seeBoss;
    }


    /**
     * Renders the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        //------- Space for fixed Objects --------
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.checkSeeBoss();
        //----------------------------------------
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.throwableObject)
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map.
     * @param {DrawableObject[]} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Adds an object to the map.
     * @param {DrawableObject} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {DrawableObject} mo - The object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image's original orientation.
     * @param {DrawableObject} mo - The object whose image to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    

}