const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Evidence = mongoose.models.Evidence || mongoose.model('Evidence', evidenceSchema);

module.exports = {
  Evidence,
};
