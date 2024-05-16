/**
 * Represents a level containing various game elements.
 * @class
 */
class Level {
    /**
     * Array containing enemy objects in the level.
     * @type {Array}
     */
    enemies;

    /**
     * Array containing cloud objects in the level.
     * @type {Array}
     */
    clouds;

    /**
     * Array containing background objects in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * Array containing coin objects in the level.
     * @type {Array}
     */
    coins;

    /**
     * Array containing bottle objects in the level.
     * @type {Array}
     */
    bottles;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 700 * 3;

    /**
     * Creates a new level with specified game elements.
     * @param {Array} enemies - Array containing enemy objects.
     * @param {Array} clouds - Array containing cloud objects.
     * @param {Array} backgroundObjects - Array containing background objects.
     * @param {Array} coins - Array containing coin objects.
     * @param {Array} bottles - Array containing bottle objects.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
    
}