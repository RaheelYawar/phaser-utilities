export default class PhaserUtility {
    /**
     * @param {Object} group
     * @param {boolean} value
     * @return {Object} A random child of the group.
     * */
    static getRandomExistsFromGroup(group, value = true) {
        const list = group.getAll("exists", value, 0, group.children.length);

        return list[this.getRndIntInRange(0, list.length - 1)];
    }

    /**
     * Create an half transparent overlay.
     * @param {Object} game The current game context.
     * @param {boolean} inputEnabled
     * */
    static createBackgroundOverlay(game, inputEnabled) {
        const overlay = game.add.graphics(0, 0);
        overlay.name = `overlay_${Date.now()}`;
        overlay.beginFill(0x000000);
        overlay.drawRect(0, 0, game.width, game.height);
        overlay.endFill();
        overlay.alpha = 0.5;
        overlay.inputEnabled = inputEnabled;

        return overlay;
    }

    /**
     * @param {number} min Minimum inclusive integer.
     * @param {number} max Maximum inclusive integer.
     * */
    static getRndIntInRange(min, max) {
        return Math.floor((Math.random() * ((max - min) + 1)) + min);
    }
}
