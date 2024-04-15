class Endboss extends MovableObject {
    y = 55;
    height = 400;
    width = 250;
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    };
    dead_enemy = false;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700*2;
        this.animate();


    }
    animate() {

        setInterval(() => {

            this.playAnimation(this.IMAGES_WALKING);
        }, 150);

    }
}