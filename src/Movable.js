const R = require("ramda");

const { Drawable } = require("./Drawable");

/**
 * A movable drawable.
 */
class Movable extends Drawable {
  /**
   * Creates the thing.
   * @param {Number} x The x translation of the thing.
   * @param {Number} y The y translation of the thing.
   */
  constructor(x, y) {
    super();
    this._x = x;
    this._y = y;
  }

  /**
   * Moves the thing somewhere else.
   * @param {Number} x The x translation of the thing.
   * @param {Number} y The y translation of the thing.
   */
  moveTo({ x = null, y = null }) {
    if (R.isNil(x)) x = this._x;
    if (R.isNil(y)) y = this._y;
    this._x = x;
    this._y = y;
    if (this._wasDrawn) this.draw();
  }
}

module.exports = {
  Movable
};
