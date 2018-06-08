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
     * @param {number} min Minimum inclusive integer.
     * @param {number} max Maximum inclusive integer.
     * */
    static getRndIntInRange(min, max) {
        return Math.floor((Math.random() * ((max - min) + 1)) + min);
    }
}
