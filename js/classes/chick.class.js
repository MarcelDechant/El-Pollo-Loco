class Chick extends MovableObject {
    y = 370;
    height = 40;
    width = 40;
    dead_enemy = false;
    speedY = 10;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'

    ];
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    walking_sound = new Audio('audio/chicks.mp3')

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 1200; //Zahl zwischen 200 und 1400
        this.speed = 0.1 + Math.random() * 0.5;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);



        setInterval(() => {
            if (!this.dead_enemy) {
                this.walking_sound.volume = 0.05;
                 this.walking_sound.play();
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.dead_enemy) {
                this.loadImage(this.IMAGE_DEAD)
                this.y += this.speedY;
            }
        }, 150);
    }

   
}