/**
 * Represents a status bar for the player's life in the game.
 * @class
 * @extends DrawableObject
 */
class StatusBarLife extends DrawableObject {
    IMAGES_LIVE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    percentage = 100;


    /**
     * Creates an instance of StatusBarLife.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_LIVE);
        this.x = 10;
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
        this.percentage = percentage;
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
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
    
}
