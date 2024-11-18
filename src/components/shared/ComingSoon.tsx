'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date('2024-12-31T23:59:59');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#094142] via-[#00b0db] to-[#FF5C00] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-center p-6 shadow-lg backdrop-blur-sm"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="text-lg md:text-xl mb-6"
        >
          We're working hard to bring you something amazing!
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}
          className="flex justify-center gap-6 text-2xl md:text-4xl font-mono"
        >
          <div>
            <span className="block text-4xl md:text-6xl font-bold">
              {timeLeft.days}
            </span>
            <span className="block mt-2 text-sm md:text-base">Days</span>
          </div>
          <div>
            <span className="block text-4xl md:text-6xl font-bold">
              {timeLeft.hours}
            </span>
            <span className="block mt-2 text-sm md:text-base">Hours</span>
          </div>
          <div>
            <span className="block text-4xl md:text-6xl font-bold">
              {timeLeft.minutes}
            </span>
            <span className="block mt-2 text-sm md:text-base">Minutes</span>
          </div>
          <div>
            <span className="block text-4xl md:text-6xl font-bold">
              {timeLeft.seconds}
            </span>
            <span className="block mt-2 text-sm md:text-base">Seconds</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
