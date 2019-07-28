const exampleConfig = {
  Buckets: {
    indexProperty: "b",
    buckets: [
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
  Bucket: {
    indexProperty: "b2",
    buckets: [
      { label: "Poor student", color: "#f5a442" },
      { label: "Regular student", color: "#fff07a" },
      { label: "Good student", color: "#7aff92" }
    ]
  }
};

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
