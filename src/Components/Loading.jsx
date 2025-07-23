import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center w-22 h-22">
        {/* Spinner ring */}
        <motion.div
          className="absolute w-full h-full rounded-full border-5 border-cyan-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 1.2 }}
        />

        {/* Static Text */}
        <div className="absolute text-cyan-400 ">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
