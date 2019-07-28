const R = require("ramda");

const { Drawable } = require("./Drawable");

class Movable extends Drawable {
  constructor(x, y) {
    super();
    this._x = x;
    this._y = y;
  }

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
