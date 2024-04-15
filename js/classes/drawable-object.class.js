class DrawableObject {
    x = 40;
    y = 300;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image(); //this.img =document.getElementById('image') <img id='image' src>
        this.img.src = path;
    }
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;

        });
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof Coins || this instanceof Bottle || this instanceof ThrowableObject) {
            ctx.beginPath(); // Start a new path
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left -
                this.offset.right, this.height - this.offset.top - this.offset.bottom); // Add a rectangle to the current path
            ctx.stroke(); // Render the path
            ctx.beginPath(); // Start a new path
            ctx.strokeStyle = 'Blue';
            ctx.rect(this.x, this.y, this.width, this.height); // Add a rectangle to the current path
            ctx.stroke(); // Render the path
        }
    }
}