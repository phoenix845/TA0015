const Crop = require("../models/crop");
const axios = require("axios");

// Get all crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create crop
exports.createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, user: req.user?._id });
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCropWithWeather = async (req, res) => {
  const { city } = req.query;
  try {
    // 1️⃣ Fetch all crops
    const crops = await Crop.find();

    // 2️⃣ Fetch weather for the city
    let weatherData = null;
    if (city) {
      const apiKey = process.env.OPENWEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      weatherData = {
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description
      };
    }

    // 3️⃣ Add simple advice based on temperature
    const cropAdvice = crops.map(crop => {
      let advice = "Normal care";
      if (weatherData) {
        if (weatherData.temperature > 35) advice = "Increase irrigation";
        else if (weatherData.temperature < 15) advice = "Protect crops from cold";
      }
      return { ...crop.toObject(), weather: weatherData, advice };
    });

    res.json(cropAdvice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching crops with weather" });
  }
};
