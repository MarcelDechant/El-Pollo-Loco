class Chicken extends MovableObject {
    y=325;
    height= 100;
    width = 90;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        
    ];
    

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
            
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
        
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}