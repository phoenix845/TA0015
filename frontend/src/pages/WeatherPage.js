import React, { useState } from 'react';
import { FaCloud, FaWind, FaTint, FaEye, FaSearch, FaMapMarkerAlt, FaThermometerHalf, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { weatherAPI } from '../api';
import toast from 'react-hot-toast';

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      // Add slight delay for premium feeling transition
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = await weatherAPI.getWeather(city);
      setWeather(data);
      toast.success('Live weather data synchronized 🌤️');
    } catch (err) {
      toast.error('Location unverified or offline');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] pt-24 pb-16 overflow-hidden selection:bg-sky-200">
      {/* Dynamic Weather Background Elements based on state */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000">
        {!weather ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-100/40 blur-[120px]" />
            <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-100/30 blur-[100px]" />
          </>
        ) : weather.temperature > 30 ? (
          <>
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100/50 blur-[120px]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-yellow-100/40 blur-[100px]" />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-slate-200/40 blur-[100px]" />
          </>
        )}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* Header - Dynamically shifts up if searched */}
        <motion.div
          animate={{
            y: hasSearched ? 0 : '10vh',
            scale: hasSearched ? 1 : 1.05
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Global Met-Data</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-4 mb-4">
              Atmospheric <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-500">Radar</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Access real-time meteorological telemetry to optimize your farming schedules.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-2xl mx-auto mt-10"
          >
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-xl border border-white p-2 rounded-2xl shadow-xl shadow-sky-900/5">
                <div className="pl-4 pr-2 text-sky-500">
                  <FaMapMarkerAlt size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter global coordinates or city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="flex-1 bg-transparent px-2 py-3 md:py-4 text-lg font-medium text-slate-700 focus:outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={loading || !city.trim()}
                  className="ml-2 flex items-center justify-center gap-2 bg-slate-900 hover:bg-sky-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95 shadow-lg"
                >
                  {loading ? (
                    <FaCloud className="animate-bounce" size={20} />
                  ) : (
                    <>
                      <FaSearch />
                      <span className="hidden sm:inline">Scan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Weather Results Dashboard */}
        <AnimatePresence mode="wait">
          {weather && !loading && (
            <motion.div
              key={weather.city}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4"
            >
              {/* Primary Telemetry Card */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-8 relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl transition-all duration-500 group"
              >
                {/* Dynamic Background Gradient based on Temp */}
                <div className={`absolute inset-0 z-0 transition-all duration-1000 ${weather.temperature > 30 ? 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600' :
                    weather.temperature < 15 ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600' :
                      'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500'
                  }`} />

                {/* Visual texture overlay */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

                {/* Glass reflections */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 z-0" />

                <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                        <FaMapMarkerAlt className="text-white/80" size={28} />
                        {weather.city}
                      </h2>
                      <p className="text-white/70 font-medium mt-2 text-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Live Telemetry Active
                      </p>
                    </div>

                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {weather.temperature > 30 ? <FaSun size={50} className="text-amber-300 drop-shadow-lg" /> : <FaCloud size={50} className="text-white drop-shadow-lg" />}
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="text-8xl md:text-[140px] font-black tracking-tighter leading-none drop-shadow-2xl">
                        {weather.temperature}°
                      </div>
                      <p className="text-2xl md:text-3xl font-bold capitalize mt-2 text-white/90 tracking-wide">
                        {weather.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Metrics Column */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-4 flex flex-col gap-6"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-sky-900/5 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <FaTint size={24} />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Atmospheric Moisture</p>
                  </div>
                  <p className="text-4xl font-black text-slate-800 ml-16">{weather.humidity}<span className="text-2xl text-slate-400">%</span></p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-sky-900/5 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-teal-50 text-teal-500 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                      <FaWind size={24} />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Wind Velocity</p>
                  </div>
                  <p className="text-4xl font-black text-slate-800 ml-16">12<span className="text-2xl text-slate-400 text-xl font-bold ml-1">km/h</span></p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-sky-900/5 group hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      <FaEye size={24} />
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Visibility Range</p>
                  </div>
                  <p className="text-4xl font-black text-slate-800 ml-16">10<span className="text-2xl text-slate-400 text-xl font-bold ml-1">km</span></p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {!weather && !loading && hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-400 mb-4">
                <FaMapMarkerAlt size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-700">Location Offline</h3>
              <p className="text-slate-500 mt-2">We couldn't connect to met-stations in that area. Please check spelling.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeatherPage;
