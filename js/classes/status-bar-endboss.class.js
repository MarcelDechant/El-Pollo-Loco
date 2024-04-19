/**
 * Represents a status bar for the end boss in the game.
 * @class
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {

    /**
     * Array of image paths representing the status bar at different percentages.
     * @type {string[]}
     */
    IMAGES_LIVE = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    /**
     * The current percentage of the status bar.
     * @type {number}
     */
    percentage = 100;


    /**
     * Creates an instance of StatusBarEndboss.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIVE);
        this.x = 550;
        this.y = 0;
        this.width = 150;
        this.height = 40;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar and updates the image accordingly.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_LIVE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES_LIVE array based on the current percentage.
     * @returns {number} The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}