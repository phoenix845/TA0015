import React, { useState } from 'react';
import { FaDollarSign, FaArrowUp, FaArrowDown, FaChartLine, FaCalendarAlt, FaFire } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { motion } from 'framer-motion';

const MarketPricePage = () => {
  const [priceData] = useState([
    { date: 'Jan', wheat: 2000, rice: 1800, corn: 1500, cotton: 5000 },
    { date: 'Feb', wheat: 2100, rice: 1850, corn: 1600, cotton: 5100 },
    { date: 'Mar', wheat: 2050, rice: 1900, corn: 1550, cotton: 5050 },
    { date: 'Apr', wheat: 2200, rice: 1950, corn: 1700, cotton: 5200 },
    { date: 'May', wheat: 2300, rice: 2000, corn: 1800, cotton: 5300 },
    { date: 'Jun', wheat: 2250, rice: 1950, corn: 1750, cotton: 5250 },
  ]);

  const [volumeData] = useState([
    { date: 'Jan', wheat: 4500, rice: 3200, corn: 2800, cotton: 1200 },
    { date: 'Feb', wheat: 5200, rice: 3800, corn: 3500, cotton: 1500 },
    { date: 'Mar', wheat: 4800, rice: 3500, corn: 3100, cotton: 1300 },
    { date: 'Apr', wheat: 6200, rice: 4100, corn: 3900, cotton: 1800 },
    { date: 'May', wheat: 5800, rice: 3700, corn: 3400, cotton: 1600 },
    { date: 'Jun', wheat: 5500, rice: 3600, corn: 3200, cotton: 1400 },
  ]);

  const crops = [
    { name: 'Wheat', price: '₹2,250', change: '+5.0%', trend: 'up', icon: '🌾', demand: 'High', season: 'Apr-Jun', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
    { name: 'Rice', price: '₹1,950', change: '+8.2%', trend: 'up', icon: '🍚', demand: 'Peak', season: 'Oct-Dec', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
    { name: 'Corn', price: '₹1,750', change: '-2.1%', trend: 'down', icon: '🌽', demand: 'Stable', season: 'Jul-Sep', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100' },
    { name: 'Cotton', price: '₹5,250', change: '+3.4%', trend: 'up', icon: '🧵', demand: 'High', season: 'Dec-Mar', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100' },
    { name: 'Soybean', price: '₹4,500', change: '+6.8%', trend: 'up', icon: '🟢', demand: 'Rising', season: 'Oct-Jan', bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-100' },
    { name: 'Mustard', price: '₹5,000', change: '-1.2%', trend: 'down', icon: '💛', demand: 'Low', season: 'Jan-Apr', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100' },
  ];

  const marketNews = [
    { headline: 'Wheat indices surge 5% following unexpected monsoon crop damage reports across northern sector.', time: '2 hours ago', impact: '+5.0%', type: 'bullish' },
    { headline: 'Rice export volume increases 15% this quarter, driving domestic prices to a 6-month high.', time: '5 hours ago', impact: '+8.2%', type: 'bullish' },
    { headline: 'Cotton prices stabilize amid steady global demand and expected bumper harvests.', time: '1 day ago', impact: '+3.4%', type: 'bullish' },
    { headline: 'Corn futures face slight correction as international tariffs cool down.', time: '2 days ago', impact: '-2.1%', type: 'bearish' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] pt-24 pb-16 overflow-hidden selection:bg-amber-200">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-100/40 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-100/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-amber-100 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Live Market Terminal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            Commodity <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Exchange</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium mt-3">
            Real-time pricing analytics and high-frequency trading data for agricultural commodities.
          </p>
        </motion.div>

        {/* Current Commodity Prices */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-slate-100 text-slate-600 rounded-lg"><FaFire size={18} /></span>
              Spot Prices
            </h2>
            <span className="text-sm font-semibold text-slate-400">/ Quintal</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {crops.map((crop, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative bg-white rounded-3xl p-6 border ${crop.border} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${crop.bg} -z-10 transition-transform duration-500 group-hover:scale-110 opacity-50`} />

                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${crop.bg} border ${crop.border} flex items-center justify-center text-3xl shadow-sm`}>
                    {crop.icon}
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm ${crop.trend === 'up' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {crop.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                    {crop.change}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-500 mb-1">{crop.name}</h3>
                  <div className="text-4xl font-black text-slate-800 tracking-tight">
                    {crop.price}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Demand</p>
                    <p className={`font-bold ${crop.text}`}>{crop.demand}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Peak Season</p>
                    <p className="font-bold text-slate-700">{crop.season}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Price Trends Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><FaChartLine /></span>
                6-Month Price Index
              </h2>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => [`₹${value}`, undefined]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="wheat" name="Wheat" stroke="#f59e0b" strokeWidth={3} fill="url(#colorWheat)" />
                  <Area type="monotone" dataKey="rice" name="Rice" stroke="#10b981" strokeWidth={3} fill="url(#colorRice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Market News Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col h-full"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-lg"><FaCalendarAlt /></span>
              Market Intelligence
            </h2>

            <div className="space-y-5 flex-1 overflow-y-auto pr-2">
              {marketNews.map((news, index) => (
                <div key={index} className="group relative pl-4 border-l-2 border-slate-100 hover:border-slate-300 transition-colors">
                  <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${news.type === 'bullish' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <h4 className="font-bold text-slate-700 text-sm leading-snug group-hover:text-amber-600 transition-colors">
                    {news.headline}
                  </h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${news.type === 'bullish' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {news.type === 'bullish' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                      {news.impact}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{news.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-900 hover:text-white transition-all duration-300 text-sm">
              View All Intelligence Reports
            </button>
          </motion.div>
        </div>

        {/* Trade Volume Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FaChartLine /></span>
              Trading Volume Distribution
            </h2>
            <span className="text-sm font-semibold text-slate-400">Values in Metric Tons (MT)</span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="wheat" name="Wheat" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="rice" name="Rice" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="corn" name="Corn" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketPricePage;
