const R = require("ramda");

const { Movable } = require("./Movable");

class Bucket extends Movable {
  constructor(
    draw,
    bucketConfig,
    { x = 0, y = 0, width = 100, boxSize = 5, boxSpacing = 2, rowSkip = false },
    data = []
  ) {
    super(x, y);
    this._draw = draw;
    this._width = width;
    this._bucketConfig = bucketConfig;
    this._boxSize = boxSize;
    this._boxSpacing = boxSpacing;
    this._rowSkip = rowSkip;
    this._data = data;
  }

  _boxesPerRow() {
    return Math.floor(this._width / (this._boxSize + this._boxSpacing));
  }

  draw() {
    this.clear();
    let iRow = 0;
    let iCol = 0;
    const cols = this._boxesPerRow();
    console.debug(`Drawing with ${cols} many columns.`);
    for (
      let iBucket = 0;
      iBucket < this._bucketConfig.buckets.length;
      iBucket++
    ) {
      console.debug(`Starting to draw Bucket #${iBucket}.`);
      const { color } = this._bucketConfig.buckets[iBucket];
      const bucketLength = R.filter(
        R.propEq(this._bucketConfig.indexProperty, iBucket),
        this._data
      ).length;
      console.debug(`Bucket has ${bucketLength} many points in it.`);
      for (let iBox = 0; iBox < bucketLength; iBox++, iCol++) {
        if (iCol === cols) {
          console.debug(
            `Column limit for row #${iRow} reached, moving to the next row.`
          );
          iCol = 0;
          iRow++;
        }
        const x = this._x + iCol * (this._boxSize + this._boxSpacing);
        const y = this._y + iRow * (this._boxSize + this._boxSpacing);
        console.debug(`Drawing box #${iBox} @ (${x}|${y})px`);
        this._elements.push(
          this._draw
            .rect(this._boxSize, this._boxSize)
            .fill(color)
            .move(x, y)
        );
      }
      if (this._rowSkip) {
        console.debug(
          `Bucket #${iBucket} finished drawing, moving to the next row.`
        );
        iRow++;
        iCol = 0;
      }
    }
    this._wasDrawn = true;
  }
}

module.exports = {
  Bucket
};
