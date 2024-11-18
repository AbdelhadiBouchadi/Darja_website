import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

const SubHeader = () => {
  return (
    <div className="subheader w-full flex flex-col items-center justify-center py-6 absolute top-0  lg:mt-0 lg:top-[15vh] left-0 px-4">
      {/* First Line */}
      <div
        className={cn(
          'flex flex-col  justify-center items-center text-center font-semibold text-xl lg:text-3xl'
        )}
      >
        <span className="text-[#094142] latin-title-bold">
          Dérive casablancaise | Rencontres des arts et de la scène
        </span>
        <span className="text-[#ee7103] mt-2 lg:mt-0 lg:ml-4 arabic-title-bold">
          منعطف بيضاوي | ملتقى فنون الأداء
        </span>
      </div>

      {/* Moving Text Animation */}
      <motion.div
        className={cn(
          'mt-6 flex justify-center items-center text-center font-semibold text-lg lg:text-2xl'
        )}
        whileHover={{ animationPlayState: 'paused' }}
        style={{
          display: 'flex',
          animation: 'scroll 15s linear infinite',
        }}
      >
        <span className="text-[#094142] latin-title-bold">
          Rendez-vous du 04 au 08 décembre 2024 à Casablanca
        </span>
        <span className="text-[#ee7103] mt-2 lg:mt-0 lg:ml-4 arabic-title-bold">
          موعدنا من 4 إلى 8 دجنبر 2024 في الدار البيضاء
        </span>
      </motion.div>

      <style jsx>
        {`
          @keyframes scroll {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SubHeader;
