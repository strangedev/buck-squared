const SVG = require("svg.js");

const { Drawable } = require("./Movable");
const { Movable } = require("./Movable");
const { Bucket } = require("./Bucket");
const { Buckets } = require("./Buckets");
const { exampleConfig, generateSampleData } = require("./example");

module.exports = {
  SVG,
  Drawable,
  Movable,
  Bucket,
  Buckets,
  exampleConfig,
  generateSampleData
};
