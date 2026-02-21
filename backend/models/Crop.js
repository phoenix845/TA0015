const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    soilType: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    recommendedCrops: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);
