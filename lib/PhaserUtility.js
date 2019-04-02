/**
 * A collection of useful Phaser utility functions.
 *
 * @author Raheel Yawar <raheelyawar@gmail.com>
 *
 * @class Utility
 * @static
 * */
export default class PhaserUtility {
    /**
     * @param {Phaser.Group} group
     * @param {boolean} value
     * @return {Object} A random child of the group.
     * */
    static getRandomExistsFromGroup(group, value = true) {
        const list = group.getAll("exists", value, 0, group.children.length);

        return list[this.getRndIntInRange(0, list.length - 1)];
    }

    /**
     * Get first item that has "exists" flag set to value.
     * This is a re-implementation of the function Phaser.Group for use in non-Phaser groups/ arrays.
     *
     * @param {Array} array
     * @param {boolean} value
     * */
    static getFirstExists(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].exists === value) {
                return array[i];
            }
        }// end of for i

        return null;
    }

    /**
     * Create an half transparent overlay.
     * @param {Phaser.Group} game The current game context.
     * @param {number} colour The colour value.
     * @param {number} alpha The alpha value in the range [0, 1].
     * @param {boolean} inputEnabled
     * */
    static createBackgroundOverlay(game, colour = 0x000000, alpha = 0.5, inputEnabled) {
        const overlay = game.add.graphics(0, 0);
        overlay.name = `overlay_${Date.now()}`;
        overlay.beginFill(colour);
        overlay.drawRect(0, 0, game.width, game.height);
        overlay.endFill();
        overlay.alpha = alpha;
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

    /**
     * Add a tween to be played on start launch.
     * @param {Phaser.Group} game
     * @param {Object} object
     * @param {boolean} vertical Vertical or horizontal tween?
     * @param {boolean} positive Come from bottom/ top or right/ left?
     * @param {Number} duration Tween duration.
     * @param {number|Phaser.Easing.Back.Out} easing Phaser's easing function
     * @param {number|0} startDelay
     * */
    static addIntroTweenShui(
        game, object, vertical, positive, duration,
        easing = Phaser.Easing.Back.Out, startDelay = 0
    ) {
        object.defaultPosition = object.shui.position.clone();

        const sign = positive ? -1 : 1;

        if (vertical) {
            object.shui.position.y += sign * object.height * 3;
        } else if (!vertical) {
            object.shui.position.x += sign * object.width * 3;
        }

        return game.add.tween(object.shui.position).to(
            {x: object.defaultPosition.x, y: object.defaultPosition.y},
            duration, easing, true, startDelay, 0, false
        );
    }

    /**
     * Add a tween to be played on start launch.
     * @param {Phaser.Group} game
     * @param {Object} object
     * @param {boolean} vertical Vertical or horizontal tween?
     * @param {boolean} positive Come from bottom/ top or right/ left?
     * @param {Number} duration Tween duration.
     * @param {number|Phaser.Easing.Back.Out} easing Phaser's easing function
     * @param {number|0} startDelay
     * */
    static addIntroTween(
        game, object, vertical, positive, duration,
        easing = Phaser.Easing.Back.Out, startDelay = 0
    ) {
        object.defaultPosition = object.position.clone();

        const sign = positive ? -1 : 1;

        if (vertical) {
            object.position.y += sign * object.height * 3;
        } else if (!vertical) {
            object.position.x += sign * object.width * 3;
        }

        return game.add.tween(object.position).to(
            {x: object.defaultPosition.x, y: object.defaultPosition.y},
            duration, easing, true, startDelay, 0, false
        );
    }
}
