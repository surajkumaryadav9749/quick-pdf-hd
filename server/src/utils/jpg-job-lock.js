let activeJpgJobs = 0;
const JPG_CONCURRENCY = 1;

const acquireJpgSlot = () => {
  if (activeJpgJobs >= JPG_CONCURRENCY) {
    const error = new Error("The converter is busy with another file. Please try again in a moment.");
    error.status = 503;
    throw error;
  }
  activeJpgJobs += 1;
};

const releaseJpgSlot = () => {
  activeJpgJobs = Math.max(0, activeJpgJobs - 1);
};

module.exports = { acquireJpgSlot, releaseJpgSlot, JPG_CONCURRENCY };
