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
     * @param {Object} group
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
     * @param {Object} game The current game context.
     * @param {number} colour The colour value.
     * @param {boolean} inputEnabled
     * */
    static createBackgroundOverlay(game, colour = 0x000000, inputEnabled) {
        const overlay = game.add.graphics(0, 0);
        overlay.name = `overlay_${Date.now()}`;
        overlay.beginFill(colour);
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

    /**
     * Add a tween to be played on start launch.
     * @param {Object} game
     * @param {Object} object
     * @param {boolean} vertical Vertical or horizontal tween?
     * @param {boolean} positive Come from bottom/ top or right/ left?
     * @param {Number} duration Tween duration.
     * */
    static addIntroTweenShui(game, object, vertical, positive, duration) {
        object.defaultPosition = object.shui.position.clone();

        if (vertical) {
            if (positive) {
                object.shui.position.y -= object.height * 3;
            } else {
                object.shui.position.y += object.height * 3;
            }
        } else if (!vertical) {
            if (positive) {
                object.shui.position.x -= object.width * 3;
            } else {
                object.shui.position.x += object.width * 3;
            }
        }

        return game.add.tween(object.shui.position).to(
            {x: object.defaultPosition.x, y: object.defaultPosition.y},
            duration, Phaser.Easing.Back.Out, true, 0, 0, false
        );
    }

    /**
     * Add a tween to be played on start launch.
     * @param {Object} game
     * @param {Object} object
     * @param {boolean} vertical Vertical or horizontal tween?
     * @param {boolean} positive Come from bottom/ top or right/ left?
     * @param {Number} duration Tween duration.
     * */
    static addIntroTween(game, object, vertical, positive, duration) {
        object.defaultPosition = object.position.clone();

        if (vertical) {
            if (positive) {
                object.position.y -= object.height * 3;
            } else {
                object.position.y += object.height * 3;
            }
        } else if (!vertical) {
            if (positive) {
                object.position.x -= object.width * 3;
            } else {
                object.position.x += object.width * 3;
            }
        }

        return game.add.tween(object.position).to(
            {x: object.defaultPosition.x, y: object.defaultPosition.y},
            duration, Phaser.Easing.Back.Out, true, 0, 0, false
        );
    }
}
