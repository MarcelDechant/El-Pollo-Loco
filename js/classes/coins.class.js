/**
 * Represents a coins object with specified animations and attributes.
 * @class
 * @extends MovableObject
 */
class Coins extends MovableObject {
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 50,
        bottom: 50,
        left: 35,
        right: 35
    };

    /**
     * Creates an instance of Coins.
     */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = -510 + Math.random() * (1200 + 510);
        this.y = 150 + Math.random() * 150;
        this.animate(); 
    }

    /**
     * Animates the coins object.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 150);
    }
    
}