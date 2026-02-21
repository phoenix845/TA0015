import React, { useState } from 'react';
import { FaVirus, FaUpload, FaExclamationTriangle, FaLeaf, FaShieldAlt, FaClipboardList, FaCamera, FaSpinner, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const DiseasePage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const diseases = [
    {
      name: 'Powdery Mildew',
      crop: 'Wheat, Barley',
      severity: 'High',
      icon: '🦠',
      treatment: 'Use sulfur fungicide (weekly spray)',
      prevention: 'Ensure good air circulation, avoid overhead watering',
      recovery: '7-10 days',
      symptoms: 'White powder-like coating on leaves',
      color: 'bg-zinc-100', text: 'text-zinc-600', border: 'border-zinc-200'
    },
    {
      name: 'Leaf Spot',
      crop: 'Rice, Corn',
      severity: 'Medium',
      icon: '🍂',
      treatment: 'Apply copper fungicide',
      prevention: 'Remove infected leaves, rotate crops',
      recovery: '10-14 days',
      symptoms: 'Brown spots with yellow halos on leaves',
      color: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200'
    },
    {
      name: 'Late Blight',
      crop: 'Potato, Tomato',
      severity: 'Critical',
      icon: '🥀',
      treatment: 'Remove infected plants immediately, apply fungicide',
      prevention: 'Use disease-resistant varieties, proper spacing',
      recovery: '14-21 days',
      symptoms: 'Water-soaked lesions on stems and leaves',
      color: 'bg-red-100', text: 'text-red-700', border: 'border-red-200'
    },
    {
      name: 'Yellow Mosaic Virus',
      crop: 'Beans, Okra',
      severity: 'High',
      icon: '🍁',
      treatment: 'Use resistant varieties, control aphid vectors',
      prevention: 'Control aphids with neem oil',
      recovery: 'No cure - preventive only',
      symptoms: 'Yellow mottling and mosaic pattern on leaves',
      color: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200'
    },
    {
      name: 'Fruit Rot',
      crop: 'Cotton, Chili',
      severity: 'Medium',
      icon: '🫐',
      treatment: 'Improve soil drainage, reduce humidity',
      prevention: 'Mulching, avoid waterlogging',
      recovery: '7-10 days',
      symptoms: 'Soft, watery lesions on fruits',
      color: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200'
    },
    {
      name: 'Root Rot',
      crop: 'Tomato, Pepper',
      severity: 'Critical',
      icon: '🌱',
      treatment: 'Sterilize soil, drench with fungicide',
      prevention: 'Use well-drained soil, avoid overwatering',
      recovery: '21+ days',
      symptoms: 'Plant wilting, dark roots, stunted growth',
      color: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200'
    },
  ];

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setResult(null); // Reset result when new image is selected
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image sequence first');
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate AI disease detection with processing delays
    setTimeout(() => {
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResult({
        disease: randomDisease.name,
        confidence: (89 + Math.random() * 9.9).toFixed(1) + '%',
        treatment: randomDisease.treatment,
        prevention: randomDisease.prevention,
        recovery: randomDisease.recovery,
        symptoms: randomDisease.symptoms,
        severity: randomDisease.severity,
      });
      toast.success('Pathology sequence analyzed successfully 🧬');
      setLoading(false);
    }, 2500);
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
    <div className="relative min-h-screen bg-[#fafaf9] pt-24 pb-16 overflow-hidden selection:bg-rose-200">
      {/* Bio-Themed Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-100/40 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-emerald-100/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjI1LCAyOSwgNzIsIDAuMDIpIi8+PC9zdmc+')] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">AI Vision Diagnostics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-4">
            Plant <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600">Pathology</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium mt-4 max-w-2xl mx-auto">
            Upload high-resolution imagery of compromised crops for instant neural-network disease identification and remediation protocols.
          </p>
        </motion.div>

        {/* Diagnostic Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Scanner Input Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl shadow-rose-900/5 relative overflow-hidden flex-1 flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full pointer-events-none" />

              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-rose-50 text-rose-600 rounded-xl"><FaCamera size={18} /></span>
                Optical Scanner
              </h2>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
                <div
                  className={`relative flex-1 min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${dragActive ? 'border-rose-500 bg-rose-50/50' :
                    preview ? 'border-emerald-200 bg-emerald-50/30' :
                      'border-slate-200 hover:border-rose-300 hover:bg-slate-50/50'
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageInput"
                  />

                  <label htmlFor="imageInput" className="cursor-pointer w-full h-full flex flex-col items-center justify-center absolute inset-0 z-10">
                    <AnimatePresence mode="wait">
                      {preview ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="w-full h-full p-2 flex items-center justify-center relative group"
                        >
                          <img src={preview} alt="Crop Sample" className="max-h-full max-w-full rounded-xl object-contain shadow-md" />
                          <div className="absolute inset-0 bg-slate-900/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-sm m-2">
                            <span className="bg-white/90 text-slate-800 px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
                              <FaUpload /> Reselect Image
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center"
                        >
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${dragActive ? 'bg-rose-100 text-rose-500 scale-110' : 'bg-slate-100 text-slate-400'}`}>
                            <FaUpload size={28} />
                          </div>
                          <p className="text-slate-700 font-bold text-lg">Drag & Drop visual sample</p>
                          <p className="text-slate-400 mt-2 font-medium">or click to browse local files</p>
                          <div className="mt-4 px-3 py-1 bg-slate-100 text-slate-500 rounded text-xs font-semibold">
                            Supports: JPG, PNG, HEIC
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>
                </div>

                <div className="pt-6 mt-auto relative z-20">
                  <button
                    type="submit"
                    disabled={loading || !image}
                    className={`w-full relative overflow-hidden group/btn flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 transform ${loading ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' :
                      !image ? 'bg-slate-100 text-slate-400 cursor-not-allowed' :
                        'bg-slate-900 text-white hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5'
                      }`}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin text-xl text-rose-200" />
                        <span className="relative z-10">Running Neural Net Detection...</span>
                      </>
                    ) : (
                      <>
                        <FaVirus className="relative z-10 text-rose-400 group-hover/btn:text-rose-200 transition-colors" size={18} />
                        <span className="relative z-10">Initiate Analysis</span>
                        {image && <FaChevronRight className="absolute right-6 opacity-0 group-hover/btn:opacity-100 translate-x-4 group-hover/btn:translate-x-0 transition-all duration-300" />}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Results Analysis Panel */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/40 backdrop-blur-sm"
                >
                  <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                    <FaVirus className="text-4xl text-rose-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-700 mb-2">Awaiting Visual Input</h3>
                  <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Upload a clear, focused image of the affected plant area to generate a comprehensive pathology report and treatment plan.
                  </p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-white/60 backdrop-blur-md border border-white shadow-xl shadow-rose-900/5"
                >
                  <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                    {/* Radar scanning effect */}
                    <div className="absolute inset-0 rounded-full border border-rose-200"></div>
                    <div className="absolute inset-4 rounded-full border border-rose-300"></div>
                    <div className="absolute inset-8 rounded-full border border-rose-400"></div>

                    {/* Rotating scanner */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-t-2 border-rose-500"
                    />

                    {/* Scanning indicator */}
                    <div className="w-full h-0.5 bg-rose-500 absolute top-1/2 left-0 shadow-[0_0_15px_3px_rgba(244,63,94,0.5)] z-20 animate-[scan_1.5s_ease-in-out_infinite_alternate]" />

                    {preview && (
                      <div className="w-24 h-24 rounded-full overflow-hidden absolute inset-0 m-auto z-10 opacity-70">
                        <img src={preview} alt="Scanning" className="w-full h-full object-cover grayscale" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Analyzing Biomarkers</h3>
                  <p className="text-rose-500 font-medium animate-pulse">Cross-referencing database with 10k+ known pathogens...</p>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl overflow-hidden border border-white shadow-2xl shadow-rose-900/10 h-full flex flex-col"
                >
                  {/* Result Header */}
                  <div className={`p-8 bg-gradient-to-br ${result.severity === 'Critical' ? 'from-red-500 to-rose-700' :
                    result.severity === 'High' ? 'from-orange-500 to-red-600' :
                      'from-amber-400 to-orange-500'
                    } text-white relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider border border-white/30">
                          <FaCheckCircle /> Analysis Complete
                        </span>
                        <div className="text-right">
                          <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Match Confidence</p>
                          <p className="text-3xl font-black tracking-tighter">{result.confidence}</p>
                        </div>
                      </div>

                      <h2 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
                        {result.disease}
                      </h2>
                      <div className="flex gap-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/20 text-sm font-semibold">
                          Severity: {result.severity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Result Details */}
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                            <FaExclamationTriangle size={14} />
                          </div>
                          <h4 className="font-bold text-slate-800">Visual Symptoms</h4>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">{result.symptoms}</p>
                      </div>

                      <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-200 text-rose-700 flex items-center justify-center">
                            <FaClipboardList size={14} />
                          </div>
                          <h4 className="font-bold text-slate-800">Action Plan</h4>
                        </div>
                        <p className="text-slate-700 font-semibold leading-relaxed">{result.treatment}</p>
                      </div>
                    </div>

                    <div className="space-y-6 flex flex-col">
                      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 hover:shadow-md transition-shadow flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-700 flex items-center justify-center">
                            <FaShieldAlt size={14} />
                          </div>
                          <h4 className="font-bold text-slate-800">Future Prevention</h4>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">{result.prevention}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center flex flex-col justify-center">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Recovery timeline</p>
                          <p className="text-xl font-black text-blue-700">{result.recovery}</p>
                        </div>
                        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center flex flex-col justify-center cursor-pointer hover:bg-slate-800 hover:text-white transition-colors group">
                          <p className="font-bold text-slate-600 group-hover:text-white transition-colors">Download Full Report</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pathology Database */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-slate-100 text-slate-600 rounded-lg"><FaLeaf size={18} /></span>
              Pathology Encyclopedia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                {/* Decorative Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[100px] ${disease.color} opacity-40 -z-10 transition-transform duration-500 group-hover:scale-125`} />

                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${disease.color} ${disease.border} border flex items-center justify-center text-3xl shadow-inner`}>
                    {disease.icon}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold shadow-sm ${disease.severity === 'Critical' ? 'bg-red-50 text-red-700 border border-red-100' :
                    disease.severity === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                      'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                    {disease.severity} Risk
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1">{disease.name}</h3>
                <p className="text-sm font-semibold text-slate-400 mb-4 tracking-wide">AFFECTS: {disease.crop}</p>

                <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
                  <div>
                    <p className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <FaExclamationTriangle className="text-orange-500" size={12} /> Symptoms
                    </p>
                    <p className="text-slate-500 pl-4">{disease.symptoms}</p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <FaClipboardList className="text-blue-500" size={12} /> Treatment
                    </p>
                    <p className="text-slate-600 pl-4 font-medium">{disease.treatment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Custom Keyframe Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}} />
      </div>
    </div>
  );
};

export default DiseasePage;
