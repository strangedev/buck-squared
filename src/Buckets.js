const R = require("ramda");
const SVG = require("svg.js");

const { Movable } = require("./Movable");
const { Bucket } = require("./Bucket");

class Buckets extends Movable {
  constructor(
    elementId,
    bucketsConfig,
    bucketConfig,
    {
      x = 0,
      y = 0,
      width = 800,
      bucketSpacing = 10,
      boxSize = 5,
      boxSpacing = 2,
      rowSkip = false,
      headings = true,
      fontFamily = "Helvetica, sans-serif",
      fontSize = 11,
      fontVariant = "normal",
      highlighted = null
    },
    data = []
  ) {
    super(x, y);
    try {
      this._draw = SVG(elementId);
    } catch (e) {
      console.error(
        `Could not create an SVG container at node #${elementId}, aborting!`
      );
      throw e;
    }
    this._width = width;
    this._bucketSpacing = bucketSpacing;
    this._boxSize = boxSize;
    this._boxSpacing = boxSpacing;
    this._rowSkip = rowSkip;
    this._headings = headings;
    this._fontFamily = fontFamily;
    this._fontSize = fontSize;
    this._fontVariant = fontVariant;
    this._highlighted = highlighted;
    this._bucketsConfig = bucketsConfig;
    this._bucketConfig = bucketConfig;
    this._data = data;
  }

  _bucketWidth() {
    const B = this._bucketsConfig.buckets.length;
    const W = this._width;
    const s = this._bucketSpacing;
    return Math.floor((W - (B - 1) * s) / B);
  }

  draw() {
    this.clear();
    const bucketWidth = this._bucketWidth();
    for (
      let iBucket = 0;
      iBucket < this._bucketsConfig.buckets.length;
      iBucket++
    ) {
      const x = iBucket * (bucketWidth + this._bucketSpacing);
      const { label } = this._bucketsConfig.buckets[iBucket];
      // Draw heading
      if (this._headings) {
        let headingText = label;
        let font = {
          family: this._fontFamily,
          size: this._fontSize,
          variant: this._fontVariant
        };
        if (!R.isNil(this._highlighted) && this._highlighted === iBucket) {
          // Highlight the heading
          headingText = headingText + " *";
          font.weight = "bold";
        }
        let heading = this._draw
          .text(headingText)
          .font(font)
          .move(x, this._y);
        this._elements.push(heading);
      }

      const bucket = new Bucket(
        this._draw,
        this._bucketConfig,
        {
          x,
          y:
            this._y +
            this._fontSize +
            0.66 * this._boxSpacing +
            0.33 * this._fontSize,
          width: bucketWidth,
          boxSize: this._boxSize,
          boxSpacing: this._boxSpacing,
          rowSkip: this._rowSkip
        },
        R.filter(
          d => d[this._bucketsConfig.indexProperty] === iBucket,
          this._data
        )
      );
      this._elements.push(bucket);
      bucket.draw();
    }
    this._wasDrawn = true;
  }
}

module.exports = {
  Buckets
};
