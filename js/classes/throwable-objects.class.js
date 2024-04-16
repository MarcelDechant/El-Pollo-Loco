class ThrowableObject extends MovableObject {


    THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        
    ];

    THROW_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        
        
    ];



    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png ')
        this.loadImages(this.THROW_BOTTLE);
        this.loadImages(this.THROW_BOTTLE_SPLASH);
        this.x = x; 
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }
    animate() {

        setInterval(() => {

            this.playAnimation(this.THROW_BOTTLE);
        }, 100/60 );

    }

    throw() {
        this.animate();
        this.speedY = 15;
         this.applayGravity();
        setInterval(() => {
            this.x += 10;
        }, 25)
    }
}