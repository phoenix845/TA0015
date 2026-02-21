import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';
import { authAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        login(response.data.token, response.data);
        toast.success('Login successful! 🎉');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      setErrors({ submit: err.response?.data?.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 flex items-center justify-center px-4 py-12 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-emerald-500 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-400 opacity-30 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Card */}
          <div>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 py-10 text-center bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 mb-4">
                  <span className="text-3xl" aria-hidden="true">🌾</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">KrishiMitra</h1>
                <p className="text-emerald-100 text-sm">Premium farming intelligence, tailored to you</p>
              </div>

              {/* Form */}
              <div className="px-8 py-8 bg-white">
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="label-base">
                      <FaEnvelope className="inline mr-2" /> Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`input-base ${errors.email ? 'input-error' : ''}`}
                      aria-label="Email address"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-error mt-2">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="label-base">
                      <FaLock className="inline mr-2" /> Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: '' });
                      }}
                      className={`input-base ${errors.password ? 'input-error' : ''}`}
                      aria-label="Password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    {errors.password && (
                      <p id="password-error" className="text-error mt-2">{errors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3 mt-6"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">New to KrishiMitra?</span>
                  </div>
                </div>

                {/* Register Link */}
                <p className="text-center text-gray-700">
                  <Link to="/register" className="link-primary">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Side content for hackathon judges / value props */}
          <div className="hidden lg:block text-emerald-50 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200/80">
              Why KrishiMitra AI
            </p>
            <h2 className="text-3xl font-bold leading-snug">
              Turn raw farm data into <span className="text-emerald-300">actionable decisions</span> in minutes.
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50/90">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>Real-time crop, weather, and market intelligence on a single dashboard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>AI-driven crop and disease insights designed for Indian farming conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                <span>Built to be hackathon-ready: modular APIs, clean UI, and demo data.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center lg:text-left text-emerald-100 text-sm mt-8">
          Built for Indian farmers | 🌾 Smart Farming Companion
        </p>
      </div>
    </div>
  );
};

export default Login;
