import React, { useState } from 'react';
import { FaTachometerAlt, FaCog, FaTrash, FaEdit } from 'react-icons/fa';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'Raj Kumar', email: 'raj@example.com', crops: 5, status: 'Active' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', crops: 3, status: 'Active' },
    { id: 3, name: 'Arun Patel', email: 'arun@example.com', crops: 2, status: 'Inactive' },
  ]);

  const [orders] = useState([
    { id: 1, farmer: 'Raj Kumar', product: 'Wheat', amount: '₹50,000', date: '2026-02-15' },
    { id: 2, farmer: 'Priya Singh', product: 'Rice', amount: '₹35,000', date: '2026-02-14' },
    { id: 3, farmer: 'Arun Patel', product: 'Seeds', amount: '₹15,000', date: '2026-02-13' },
  ]);

  const [stats] = useState([
    { label: 'Total Users', value: '2,345', icon: '👥' },
    { label: 'Active Crops', value: '8,950', icon: '🌾' },
    { label: 'Total Sales', value: '₹45,67,000', icon: '💹' },
    { label: 'Transactions', value: '12,458', icon: '📊' },
  ]);

  const [chartData] = useState([
    { name: 'Jan', users: 400, crops: 300 },
    { name: 'Feb', users: 600, crops: 500 },
    { name: 'Mar', users: 800, crops: 700 },
    { name: 'Apr', users: 1200, crops: 1000 },
  ]);

  const [pieData] = useState([
    { name: 'Wheat', value: 35 },
    { name: 'Rice', value: 25 },
    { name: 'Corn', value: 20 },
    { name: 'Others', value: 20 },
  ]);

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success('User deleted');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 pt-20 md:pt-24 pb-12 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-emerald-500/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-3 rounded-full bg-emerald-500/10 border border-emerald-400/40 px-4 py-2 text-sm text-emerald-100 mb-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/40 text-xs">
              <FaTachometerAlt />
            </span>
            Admin control center
          </div>
          <h1 className="heading-lg flex items-center gap-3 text-white">
            <FaTachometerAlt className="text-emerald-400" /> Admin Dashboard
          </h1>
          <p className="text-slate-200/80 mt-2">
            Manage users, orders, and platform analytics with a real-time overview.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card bg-white/10 backdrop-blur border border-emerald-500/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100/80 text-xs uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs - floating bar */}
        <div className="sticky top-20 md:top-24 z-30 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 px-2 md:px-0">
            <div className="inline-flex gap-2 rounded-full bg-white/5 backdrop-blur border border-emerald-500/40 px-1 py-1 shadow-lg">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'users', label: 'Users', icon: '👥' },
                { id: 'orders', label: 'Orders', icon: '🛒' },
                { id: 'settings', label: 'Settings', icon: '⚙️' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full font-semibold text-xs md:text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="card bg-white/10 backdrop-blur border border-emerald-500/30">
                <h3 className="text-xl font-bold text-white mb-6">User &amp; Crop Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" />
                    <Bar dataKey="crops" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="card bg-white/10 backdrop-blur border border-emerald-500/30">
                <h3 className="text-xl font-bold text-white mb-6">Crop Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card bg-white/10 backdrop-blur border border-emerald-500/30">
            <h3 className="text-xl font-bold text-white mb-6">Manage Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Email</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Crops</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-3 text-slate-50">{user.name}</td>
                      <td className="px-6 py-3 text-slate-200/80">{user.email}</td>
                      <td className="px-6 py-3 text-slate-50">{user.crops}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <button className="p-2 bg-emerald-500/20 text-emerald-300 rounded hover:bg-emerald-500/30">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card bg-white/10 backdrop-blur border border-emerald-500/30">
            <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Order ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Farmer</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Product</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold text-emerald-100 text-xs uppercase tracking-wide">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-3 font-semibold text-slate-50">#{order.id}</td>
                      <td className="px-6 py-3 text-slate-50">{order.farmer}</td>
                      <td className="px-6 py-3 text-slate-200/80">{order.product}</td>
                      <td className="px-6 py-3 font-semibold text-emerald-300">{order.amount}</td>
                      <td className="px-6 py-3 text-slate-200/80">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card bg-white/10 backdrop-blur border border-emerald-500/30">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaCog /> Platform Settings
            </h3>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5">
                <div>
                  <p className="font-semibold text-slate-50">Maintenance Mode</p>
                  <p className="text-sm text-slate-200/80">Enable to put platform in maintenance</p>
                </div>
                <input type="checkbox" className="w-6 h-6 rounded border-emerald-400/60 bg-transparent" />
              </div>
              <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5">
                <div>
                  <p className="font-semibold text-slate-50">Email Notifications</p>
                  <p className="text-sm text-slate-200/80">Send notifications to users</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 rounded border-emerald-400/60 bg-transparent" />
              </div>
              <button className="btn-primary mt-2">Save Settings</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
