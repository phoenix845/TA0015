import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCloud, FaDollarSign, FaVirus, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const features = [
    {
      icon: <FaLeaf className="text-4xl text-emerald-600" />,
      title: 'Crop Guidance',
      description: 'Get AI-powered recommendations for better crop yield',
    },
    {
      icon: <FaCloud className="text-4xl text-blue-500" />,
      title: 'Live Weather',
      description: 'Real-time weather updates for your location',
    },
    {
      icon: <FaDollarSign className="text-4xl text-yellow-600" />,
      title: 'Market Prices',
      description: 'Check current market prices and trends',
    },
    {
      icon: <FaVirus className="text-4xl text-red-600" />,
      title: 'Disease Detection',
      description: 'Identify crop diseases using AI technology',
    },
    {
      icon: <FaChartLine className="text-4xl text-indigo-600" />,
      title: 'Analytics',
      description: 'Track your farm performance and insights',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-100 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-10 h-72 w-72 rounded-full bg-emerald-200 opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-sky-200 opacity-40 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="heading-lg leading-tight">
              Smart Farming for Modern Farmers
            </h1>
            <p className="text-xl text-gray-600">
              KrishiMitra AI is your intelligent farming companion, providing real-time insights on crop health, weather, market prices, and disease detection.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-200 opacity-60 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sky-200 opacity-60 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase">
                    Farm health index
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">92%</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Based on real-time crop &amp; weather signals
                  </p>
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-2xl">
                  🌾
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-emerald-50 px-4 py-3">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                    Yield boost
                  </p>
                  <p className="mt-1 text-xl font-bold text-gray-900">+18%</p>
                  <p className="mt-1 text-xs text-emerald-700/80">
                    with data-driven crop plans
                  </p>
                </div>
                <div className="rounded-xl bg-sky-50 px-4 py-3">
                  <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide">
                    Water saved
                  </p>
                  <p className="mt-1 text-xl font-bold text-gray-900">-27%</p>
                  <p className="mt-1 text-xs text-sky-700/80">
                    using smart irrigation insights
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                    KM
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 ring-2 ring-white">
                    AI
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Trusted by 50,000+ progressive farmers
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-md">Powerful Features for Better Farming</h2>
            <p className="text-gray-600 mt-4">Everything you need to manage your farm efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center bg-white/80 backdrop-blur border border-emerald-50 hover:border-emerald-200 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <p className="text-5xl font-bold">50K+</p>
              <p className="text-sm mt-2">Active Farmers</p>
            </div>
            <div>
              <p className="text-5xl font-bold">95%</p>
              <p className="text-sm mt-2">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-5xl font-bold">24/7</p>
              <p className="text-sm mt-2">Support</p>
            </div>
            <div>
              <p className="text-5xl font-bold">₹5L+</p>
              <p className="text-sm mt-2">Revenue Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="heading-md mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of farmers already using KrishiMitra AI to increase their productivity and income.
          </p>
          <Link to="/register" className="btn-primary text-lg inline-block">
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 KrishiMitra AI. All rights reserved. | Empowering Farmers with AI</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
