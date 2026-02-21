const express = require("express");
const router = express.Router();
const { getAllCrops, createCrop, getCropWithWeather } = require("../controllers/cropController");
const protect = require("../middleware/authMiddleware");

// GET /api/crops — get all crops
router.get("/", getAllCrops);

// GET /api/crops/with-weather?city=CityName — get crops with weather and advice
router.get("/with-weather", getCropWithWeather);

// POST /api/crops — create a new crop (protected)
router.post("/", protect, createCrop);

module.exports = router;
