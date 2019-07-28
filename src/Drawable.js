class Drawable {
  constructor() {
    this._elements = [];
    this._wasDrawn = false;
  }

  draw() {
    throw Error("Not implemented!");
  }

  clear() {
    this._elements.forEach(e => e.node.remove());
    this._elements = [];
  }

  remove() {
    // For compatibility with svg.js Element
    this.clear();
  }
}

module.exports = { Drawable };
