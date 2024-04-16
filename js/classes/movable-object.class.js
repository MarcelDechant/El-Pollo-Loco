class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 1; //fallgeschwindigkeit
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    jump_sound = new Audio('audio/jump.mp3');
    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 220;
        }
    }

    isOnGround() {
        return this.y >= 220;
    }


    isColliding(mo) {
        const leftCollision = this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        const rightCollision = this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        const topCollision = this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
        const bottomCollision = this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        return (leftCollision || rightCollision) && (topCollision || bottomCollision);

    }


//     isColliding(mo) {
// // funktion aus dem video 'funktion is colliding() einfach erklärt'
//         return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
//             this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
//             this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
//             this.y + this.offset.top < mo.height - mo.offset.bottom;
//     }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let  i =7 % 6; => 1 ,Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed;

    }

    jump() {
        this.speedY = 15;
        this.jump_sound.play();
        this.jump_sound.volume = 0.05;
    }
}