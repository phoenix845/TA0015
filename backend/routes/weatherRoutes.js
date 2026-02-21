const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

// Example: GET /api/weather?city=Nagpur
router.get("/", getWeather);

module.exports = router;
