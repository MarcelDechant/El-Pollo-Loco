class Chicken extends MovableObject {
    y = 355;
    height = 60;
    width = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];
    walking_sound = new Audio('audio/chicken.wav')

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 1200; //Zahl zwischen 200 und 700
        this.speed = 0.1 + Math.random() * 0.5;
        this.animate();

    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        

        setInterval(() => {
            
            //  this.walking_sound.play();
             this.walking_sound.volume=0.03;
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);

    }

    
}