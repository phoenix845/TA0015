import React, { useState } from 'react';
import { FaLeaf, FaGlobe, FaCalendar, FaMapPin, FaSearch, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { cropAPI } from '../api';
import toast from 'react-hot-toast';

const CropPage = () => {
  const [formData, setFormData] = useState({
    soilType: '',
    season: '',
    location: '',
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const soilTypes = ['Black Soil', 'Red Soil', 'Loam', 'Sandy Soil', 'Clay Soil'];
  const seasons = ['Kharif (Monsoon)', 'Rabi (Winter)', 'Summer'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for premium UI feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await cropAPI.getAllCrops();
      setRecommendations(response);
      toast.success('AI Analysis Complete! 🌾');
    } catch (err) {
      toast.error('Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="relative min-h-screen bg-[#fafaf9] pt-24 pb-16 overflow-hidden selection:bg-emerald-200">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] rounded-full bg-teal-100/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-100 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">AI Crop Predictor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight flex items-center justify-center md:justify-start gap-4">
            <FaLeaf className="text-emerald-500" />
            Smart Crop <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Guidance</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium mt-4 max-w-2xl">
            Leverage advanced AI algorithms to determine the optimal crops for your specific soil matrix and microclimate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Analysis Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl shadow-emerald-900/5 relative overflow-hidden group">
              {/* Card Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><FaSearch size={18} /></span>
                Input Parameters
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-5">
                  <div className="group/input">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 transition-colors group-hover/input:text-emerald-600">
                      <FaGlobe className="text-emerald-500" /> Soil Classification
                    </label>
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                    >
                      <option value="">Select primary soil type...</option>
                      {soilTypes.map(type => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="group/input">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 transition-colors group-hover/input:text-emerald-600">
                      <FaCalendar className="text-emerald-500" /> Planting Season
                    </label>
                    <select
                      name="season"
                      value={formData.season}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                    >
                      <option value="">Select target season...</option>
                      {seasons.map(season => (
                        <option key={season} value={season.toLowerCase()}>{season}</option>
                      ))}
                    </select>
                  </div>

                  <div className="group/input">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 transition-colors group-hover/input:text-emerald-600">
                      <FaMapPin className="text-emerald-500" /> Geographical Region
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Punjab, Maharashtra..."
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-700"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative overflow-hidden group/btn flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Computing Optimal Yields...
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Run AI Analysis</span>
                        <FaChevronRight className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Results Area */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!recommendations && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/40 backdrop-blur-sm"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                    <FaLeaf className="text-3xl text-emerald-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 mb-2">Awaiting Parameters</h3>
                  <p className="text-slate-500 max-w-sm">
                    Enter your soil, season, and location details on the left to generate customized high-yield crop recommendations.
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white/40 backdrop-blur-sm"
                >
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">🌱</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 animate-pulse">Analyzing Data Models...</h3>
                </motion.div>
              )}

              {recommendations && !loading && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <FaCheckCircle className="text-emerald-500" /> Priority Matches
                    </h2>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">Top 3 Results</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Render static premium cards when form is submitted */}
                    {[
                      { name: 'Premium Wheat', yield: '50-55 bags/acre', price: '₹2,100/bag', suitability: '98%', image: '🌾', color: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
                      { name: 'Basmati Rice', yield: '40-45 bags/acre', price: '₹3,200/bag', suitability: '94%', image: '🍚', color: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
                      { name: 'Hybrid Corn', yield: '60-65 bags/acre', price: '₹1,500/bag', suitability: '89%', image: '🌽', color: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100' },
                    ].map((crop, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`relative group bg-white rounded-3xl p-6 border ${crop.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                      >
                        <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] ${crop.color} -z-10 transition-transform duration-500 group-hover:scale-125`} />

                        <div className="flex justify-between items-start mb-6">
                          <div className={`w-16 h-16 rounded-2xl ${crop.color} flex items-center justify-center text-4xl shadow-inner`}>
                            {crop.image}
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                              {crop.suitability} Match
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 mb-1">{crop.name}</h3>

                        <div className="space-y-3 mt-5 pt-4 border-t border-slate-100">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-500">Proj. Yield:</span>
                            <span className="text-sm font-bold text-slate-800">{crop.yield}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-500">Market Price:</span>
                            <span className={`text-sm font-bold ${crop.text}`}>{crop.price}</span>
                          </div>
                        </div>

                        <button className="w-full mt-6 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-semibold text-sm hover:bg-slate-900 hover:text-white transition-colors duration-300">
                          View Details
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPage;
