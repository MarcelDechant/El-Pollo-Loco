/**
 * Represents a drawable object with specified dimensions and drawing methods.
 * @class
 */
class DrawableObject {
    
    x = 40;
    y = 300;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas context provided.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);
        }
    }

    /**
     * Loads multiple images from an array of paths and caches them.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a frame around the object, useful for debugging collision detection.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    // drawFrame(ctx) {
    //     if (
    //         this instanceof Character ||
    //         this instanceof Chicken ||
    //         this instanceof Chick ||
    //         this instanceof Endboss ||
    //         this instanceof Coins ||
    //         this instanceof Bottle ||
    //         this instanceof ThrowableObject
    //     ) {
    //         ctx.beginPath();
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(
    //             this.x + this.offset.left,
    //             this.y + this.offset.top,
    //             this.width - this.offset.left - this.offset.right,
    //             this.height - this.offset.top - this.offset.bottom
    //         );
    //         ctx.stroke();

    //         ctx.beginPath();
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }
}