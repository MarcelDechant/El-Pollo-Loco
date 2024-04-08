class Character extends MovableObject {
    y = 130;
    height = 300;
    width = 160;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3')
    

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.walking_sound.volume=0.05; //lautstäcke des sounds einstellen 
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed * 30;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > -617) {
                this.x -= this.speed * 30;
                this.otherDirection = true;
                this.walking_sound.play();
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);



        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {


                //Walk Animation
                this.playAnimation(this.IMAGES_WALKING);

            }
        }, 150);

    }

    jump() {

    }

}