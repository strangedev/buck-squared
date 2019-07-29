const R = require("ramda");
const SVG = require("svg.js");

const { Movable } = require("./Movable");
const { Bucket } = require("./Bucket");

/**
 * A set of Buckets which are labeled and each contain some data points.
 * The buckets are themselves grouped and colored by some criterium.
 * See also: Bucket
 */
class Buckets extends Movable {
  /**
   * @param {String} elementId The id attribute of some DOM element this will render to.
   * @param {*} bucketsConfig A bucket configuration telling the renderer how the data points should be distributed into the buckets and how the buckets should be labeled.
   * @param {*} bucketConfig  A bucket configuration telling the renderer how to group the data points inside each bucket and what color each group has.
   * @param {Number} x [optional] The x translation of the Bucket in px.
   * @param {Number} y [optional] The x translation of the Bucket in px.
   * @param {Number} width [optional] The width of the Bucket in px.
   * @param {Number} boxSize [optional] The length of one side of a single box in px.
   * @param {Number} boxSpacing [optional] The space between two boxes in px.
   * @param {Boolean} rowSkip [optional] If rowSkip true, a group will always start on a new row.
   * @param {Boolean} headings [optional] If headings is true, the `bucketsConfig.buckets[#].label` will be rendered above each bucket.
   * @param {String} fontFamily [optional] The CSS font family to use for the headings.
   * @param {Number} fontSize [optional] The font size in px to use for the headings.
   * @param {String} fontVariant [optional] The CSS font variant to use for the headings.
   * @param {Number} highlighted [optional] If highlighted is not null, the `bucketsConfig.buckets[highlighted]` will be highlighted in the visualization.
   * @param {Array<Record<String, Number>>} data An Array of data points, where `bucketConfig.indexProperty` denotes which group in `bucketConfig.buckets` a point belongs to and `bucketsConfig.indexProperty` denotes which bucket in `bucketsConfig.buckets` a point belongs to.
   * @throws When the renderer could not be initialized.
   */
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

  /**
   * Helper to determine the width of a single bucket.
   */
  _bucketWidth() {
    const B = this._bucketsConfig.buckets.length;
    const W = this._width;
    const s = this._bucketSpacing;
    return Math.floor((W - (B - 1) * s) / B);
  }

  /**
   * Inherited from Drawable.
   */
  draw() {
    this.clear();
    const bucketWidth = this._bucketWidth();
    for (
      let iBucket = 0;
      iBucket < this._bucketsConfig.buckets.length;
      iBucket++
    ) {
      const x = this._x + iBucket * (bucketWidth + this._bucketSpacing);
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
