const axios = require("axios");

exports.getWeather = async (req, res) => {
  const { city } = req.query;  // city will come from frontend
  if (!city) return res.status(400).json({ message: "City is required" });

  try {
    const apiKey = process.env.OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await axios.get(url);

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Weather data not found",
      error: error.response?.data || error.message
    });
  }
};
