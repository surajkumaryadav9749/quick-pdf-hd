const logMemory = (stage, extra = {}) => {
  const usage = process.memoryUsage();
  console.log(JSON.stringify({
    kind: "pdf-to-jpg-mem",
    stage,
    rssMb: +(usage.rss / 1048576).toFixed(1),
    heapUsedMb: +(usage.heapUsed / 1048576).toFixed(1),
    heapTotalMb: +(usage.heapTotal / 1048576).toFixed(1),
    externalMb: +(usage.external / 1048576).toFixed(1),
    arrayBuffersMb: +((usage.arrayBuffers || 0) / 1048576).toFixed(1),
    ...extra,
  }));
};

module.exports = { logMemory };
