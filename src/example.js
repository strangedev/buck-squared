const exampleConfig = {
  // This is an example bucketsConfig for the Buckets class.
  Buckets: {
    // indexProperty determines which property of a data point is used to determine which bucket the points belongs to.
    // Example: {b: 0} -> "Very Bad", {b: 3} -> "Good"
    indexProperty: "b",
    buckets: [
      // The buckets. This needs to be ordered! Currently, they only have labels.
      {
        label: "Very bad"
      },
      {
        label: "Bad"
      },
      {
        label: "Neutral"
      },
      {
        label: "Good"
      },
      {
        label: "Very good"
      }
    ]
  },
  // This is an example bucketConfig for the Bucket class.
  Bucket: {
    // indexProperty determines which property of a data point is used to determine which group the points belongs to.
    // Example: {b: 0} -> "Poor student" (will be colored orange), {b: 2} -> "Good student" (will be colored green)
    indexProperty: "b2",
    buckets: [
      // The groups. This needs to be ordered! The data points will be colored according to the group they're in.
      { label: "Poor student", color: "#f5a442" },
      { label: "Regular student", color: "#fff07a" },
      { label: "Good student", color: "#7aff92" }
    ]
  }
};

/**
 * Generates sample data to demo the visualization.
 * @param {Number} n The number of data points to generate.
 * @param {*} bucketsConfig A bucketsConfig so that the points can be generated in the correct format.
 * @param {*} bucketConfig A bucketConfig so that the points can be generated in the correct format.
 * @returns {Array<Record<String, Number>>} Sample data.
 */
function generateSampleData(n, bucketsConfig, bucketConfig) {
  const data = [];
  for (let i = 0; i < n; i++) {
    const b1 = Math.floor(
      Math.random() * Math.floor(bucketsConfig.buckets.length)
    );
    const b2 = Math.floor(
      Math.random() * Math.floor(bucketConfig.buckets.length)
    );
    let dataPoint = {};
    dataPoint[bucketsConfig.indexProperty] = b1;
    dataPoint[bucketConfig.indexProperty] = b2;
    data.push(dataPoint);
  }
  return data;
}
module.exports = {
  exampleConfig,
  generateSampleData
};
