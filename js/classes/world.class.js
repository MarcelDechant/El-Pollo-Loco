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
    satusBarEndboss = new StatusBarEndboss();
    bottle_counter = 0;
    coin_counter = 0;
    throwableObject = [];
    collect_coin_sound = new Audio('audio/coin.mp3');
    collect_bottle_sound = new Audio('audio/bottlePickup.mp3');

    constructor(canvas, keyboard) {

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsWithItems();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottleWithEnemy()
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 80);
            this.throwableObject.push(bottle);
        }
    }

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

    checkCollisionBottleWithEnemy() {
        this.throwableObject.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    enemy.dead_enemy = true;
                    throwableObject.wasHit = true;

                }
            });
        });
    }

    addbottle(index) {
        this.level.bottles.splice(index, 1);
        this.bottle_counter++;
        this.statusBarBottle.setPercentage(this.bottle_counter);
        this.collect_bottle_sound.play();
        this.collect_bottle_sound.volume = 0.03;

    }

    addCoin(index) {
        this.level.coins.splice(index, 1);
        this.coin_counter++;
        this.statusBarCoins.setPercentage(this.coin_counter);
        this.collect_coin_sound.play();
        this.collect_coin_sound.volume = 0.2;
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        //------- Space for fixed Objects --------
        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.satusBarEndboss);
        //----------------------------------------
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}