/**
 * Represents the game world.
 * @class
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusBarLife();
    statusBarCoins = new StatusBarCoins();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    bottle_counter = 0;
    coin_counter = 0;
    throwableObject = [];
    throwbottle = false;
    immune = false;
    endbossImmune = false;
    endbossCountdown = 0;


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
            this.checkChicken();
            this.checkChick();
            playChickenAudio();
            playChicksAudio();
        }, 1000 / 60);
    }

    /**
     * Checks for throw actions and creates throwable objects.
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.bottle_counter > 0 && !this.throwbottle) {
            this.throwbottle = true;
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 80);
            this.throwableObject.push(bottle);
            this.bottle_counter--
            this.statusBarBottle.setPercentage(this.bottle_counter);
            setTimeout(() => {
                this.throwbottle = false;


            }, 1000);
        }

    }

    /**
     * Checks for collisions between character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY <= 0 && !(enemy instanceof Endboss)) {
                    enemy.dead_enemy = true;
                    this.makeImmune();
                    this.character.jump();
                    dead_Chicken.play();
                    dead_Chicken.volume = 0.2;
                    setTimeout(() => {
                        this.removeDeadChicken(index);
                        this.removeDeadChick(index);
                    }, 1000);
                } else if (!this.immune) {
                    this.character.hit();
                    this.statusBarLife.setPercentage(this.character.energy);
                    this.makeImmune();
                }
            }
        });
    }

    /**
     * Makes the character immune to enemy attacks for a short period.
     */
    makeImmune() {
        this.immune = true;
        setTimeout(() => {
            this.immune = false;
        }, 300);
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
            this.level.enemies.forEach((enemy, index) => {
                if (throwableObject.isColliding(enemy) && !this.endbossImmune) {
                    if (enemy instanceof Endboss && !throwableObject.wasHit && !this.endbossImmune) {
                        enemy.hit();
                        this.statusBarEndboss.setPercentage(enemy.energy);
                        enemy.x += 50;
                        this.makeEndbossImmune();
                    } else {
                        enemy.dead_enemy = true;
                        dead_Chicken.play();
                        dead_Chicken.volume = 0.2;
                        setTimeout(() => {
                            this.removeDeadChicken(index);
                            this.removeDeadChick(index);
                        }, 1000);
                    }
                    throwableObject.wasHit = true;
                }
            });
        });
    }

    /**
 * Makes the end boss immune to attacks for a short period.
 */
    makeEndbossImmune() {
        this.endbossCountdown = 5;
        this.endbossImmune = true;
        this.countdown();
        setTimeout(() => {
            this.endbossCountdown = 0;
            this.endbossImmune = false;
        }, 5000);
    }

    /**
     * Draws the countdown timer on the canvas.
     * @param {string} countdownValue - The value of the countdown timer.
     * @param {number} x - The x-coordinate where the countdown timer should be drawn.
     * @param {number} y - The y-coordinate where the countdown timer should be drawn.
     */
    drawTimer(countdownValue, x, y) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px zabars';
        this.ctx.fillText(countdownValue, x, y);
    }

    /**
     * Starts the countdown timer.
     */
    countdown() {
        this.endbossCountdown = 5;
        const interval = setInterval(() => {
            this.endbossCountdown -= 0.1;
            const roundedCountdown = this.endbossCountdown.toFixed(1);
            this.drawTimer(roundedCountdown, 530, 30);
            if (this.endbossCountdown <= 0.1) {
                clearInterval(interval);
            }
        }, 100);
    }

    /**
     * Adds a bottle to the inventory upon collection.
     * @param {number} index - The index of the collected bottle.
     */
    addbottle(index) {
        this.level.bottles.splice(index, 1);
        this.bottle_counter++;
        this.statusBarBottle.setPercentage(this.bottle_counter);
        bottlePickup_audio.play();
        bottlePickup_audio.volume = 0.03;
    }

    /**
     * Adds a coin to the inventory upon collection.
     * @param {number} index - The index of the collected coin.
     */
    addCoin(index) {
        this.level.coins.splice(index, 1);
        this.coin_counter++;
        this.statusBarCoins.setPercentage(this.coin_counter);
        coin_audio.play();
        coin_audio.volume = 0.4;

    }

    /**
     * Checks if the end boss is within range of the character.
     */
    checkSeeBoss() {
        for (let enemy of this.level.enemies) {
            if (enemy.name === 'Endboss') {
                let seeBoss = Math.abs(this.character.x - enemy.x);
                if (seeBoss < 550) {
                    this.addToMap(this.statusBarEndboss);
                    this.drawTimer(this.endbossCountdown.toFixed(1), 530, 30);
                }
                return seeBoss;
            }
        }
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
        this.addObjectsToMap(this.throwableObject)
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        //------- Space for fixed Objects --------
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoins);
        this.drawCoinCounter(this.ctx);
        this.addToMap(this.statusBarBottle);
        this.drawBottleCounter(this.ctx);
        this.checkSeeBoss();
        //----------------------------------------
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);

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
        // mo.drawFrame(this.ctx);

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

    /**
     * Draws the length of the bottle_counter array on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawBottleCounter(ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '20px zabars';
        ctx.fillText(` ${this.bottle_counter}`, 160, 99);
    }

    /**
    * Draws the length of the bottle_counter array on the canvas.
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawCoinCounter(ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '20px zabars';
        ctx.fillText(` ${this.coin_counter}`, 160, 65);
    }

    /**
     * Counts the number of chicken enemies in the level.
     */
    checkChicken() {
        let numberOfChicken = world.level.enemies.filter(enemies => enemies.name === "Chicken").length;
        numbersOfChicken = numberOfChicken;
    }

    /**
     * Counts the number of chick enemies in the level.
     */
    checkChick() {
        let numberOfChick = world.level.enemies.filter(enemies => enemies.name === "Chick").length;
        numbersOfChicks = numberOfChick
    }

    /**
    * Removes a dead chicken from the level when its y-coordinate reaches 480.
    * @param {number} index - The index of the dead chicken.
    */
    removeDeadChicken(index) {
        const enemy = this.level.enemies[index];
        if (enemy.y >= 400) {
            this.level.enemies.splice(index, 1);

        }
    }

    /**
     * Removes a dead chick from the level when its y-coordinate reaches 480.
     * @param {number} index - The index of the dead chick.
     */
    removeDeadChick(index) {
        const enemy = this.level.enemies[index];
        if (enemy.y >= 400) {
            this.level.enemies.splice(index, 1);

        }
    }
}
