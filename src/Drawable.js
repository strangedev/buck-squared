/**
 * A drawable thing.
 */
class Drawable {
  constructor() {
    this._elements = [];
    this._wasDrawn = false;
  }

  /**
   * Draws the thing.
   */
  draw() {
    throw Error("Not implemented!");
  }

  /**
   * Un-draws the thing.
   */
  clear() {
    this._elements.forEach(e => e.node.remove());
    this._elements = [];
  }

  /**
   * Same as clear().
   * For compatibility with svg.js Element.
   */
  remove() {
    this.clear();
  }
}

module.exports = { Drawable };
