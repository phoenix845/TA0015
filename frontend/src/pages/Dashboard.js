import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaLeaf, FaDollarSign, FaThermometerHalf, FaChartBar, FaArrowUp, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <FaThermometerHalf className="text-2xl text-blue-500" />,
      label: 'Today\'s Temp',
      value: '32°C',
      trend: '+2°C',
      trendIcon: <FaArrowUp className="text-xs" />,
      trendColor: 'text-red-500 bg-red-50/50',
      gradient: 'from-blue-500/10 to-transparent',
      borderColor: 'border-blue-100/50'
    },
    {
      icon: <FaLeaf className="text-2xl text-emerald-500" />,
      label: 'Crops Tracked',
      value: '5',
      trend: '2 healthy',
      trendIcon: <FaCheckCircle className="text-xs" />,
      trendColor: 'text-emerald-500 bg-emerald-50/50',
      gradient: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-100/50'
    },
    {
      icon: <FaDollarSign className="text-2xl text-yellow-500" />,
      label: 'Market Value',
      value: '₹2,45,000',
      trend: '+12%',
      trendIcon: <FaArrowUp className="text-xs" />,
      trendColor: 'text-emerald-500 bg-emerald-50/50',
      gradient: 'from-yellow-500/10 to-transparent',
      borderColor: 'border-yellow-100/50'
    },
    {
      icon: <FaCheckCircle className="text-2xl text-teal-500" />,
      label: 'Health Status',
      value: 'Good',
      trend: 'All clear',
      trendIcon: <FaCheckCircle className="text-xs" />,
      trendColor: 'text-teal-500 bg-teal-50/50',
      gradient: 'from-teal-500/10 to-transparent',
      borderColor: 'border-teal-100/50'
    },
  ];

  const chartData = [
    { name: 'Mon', production: 400, revenue: 1400 },
    { name: 'Tue', production: 600, revenue: 1610 },
    { name: 'Wed', production: 450, revenue: 1290 },
    { name: 'Thu', production: 700, revenue: 2000 },
    { name: 'Fri', production: 550, revenue: 1681 },
    { name: 'Sat', production: 800, revenue: 2500 },
    { name: 'Sun', production: 650, revenue: 2100 },
  ];

  const quickActions = [
    { label: 'View Crops', path: '/crops', icon: '📊', color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/20' },
    { label: 'Check Weather', path: '/weather', icon: '🌤️', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/20' },
    { label: 'Market Prices', path: '/market', icon: '💹', color: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-500/20' },
    { label: 'Disease Check', path: '/disease', icon: '🦠', color: 'from-red-400 to-red-600', shadow: 'shadow-red-500/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] overflow-hidden selection:bg-emerald-200 selection:text-emerald-900">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-100/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-yellow-50/40 blur-[100px]" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="container-responsive relative z-10 pt-24 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200/60 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Live System Status</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">{user?.name?.split(' ')[0] || 'Shivansh'}</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Today’s snapshot of your farm performance and risks.
          </p>
        </motion.div>

        {/* Actionable Insights / Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative overflow-hidden group bg-white rounded-2xl p-6 border ${stat.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Card Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.gradient} rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110`} />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-xl">
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${stat.trendColor}`}>
                  {stat.trendIcon}
                  <span>{stat.trend}</span>
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><FaChartBar /></span>
                  Production & Revenue
                </h2>
                <p className="text-sm text-slate-500 mt-1">Weekly performance metrics overview</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Production
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Revenue
                </div>
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      padding: '12px 16px',
                      fontWeight: 600
                    }}
                    itemStyle={{ color: '#1e293b', fontSize: '14px', padding: '2px 0' }}
                    cursor={{ stroke: '#e2e8f0', strokeWidth: 2, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="production" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProduction)" />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right Column: Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                  <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">⚡</span>
                  Quick Actions
                </h2>
                <p className="text-sm text-slate-500">Fast access to essential farm tools</p>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-1">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.path}
                    className="group relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Hover Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    <span className={`text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md`}>
                      {action.icon}
                    </span>
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 text-center">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

