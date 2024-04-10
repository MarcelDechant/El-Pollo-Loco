class Coins extends MovableObject {


    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COINS);
        this.x = 200 + Math.random() * 1200;
        this.y = 150 + Math.random() * 200;
        this.animate();


    }

    animate() {

        setInterval(() => {

            this.playAnimation(this.IMAGES_COINS);
        }, 150);

    }




}