class Chick extends MovableObject {
    y=365;
    height= 60;
    width = 50;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
        
    ];
    walking_sound = new Audio('audio/chicks.mp3')

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500; //Zahl zwischen 200 und 700
        this.speed = 0.1 + Math.random() *0.5;
        this.animate();
        
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            this.walking_sound.volume=0.05;
            //  this.walking_sound.play();
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
        
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}