import React from 'react';
import { CookieConfig } from '../types';
import { motion } from 'framer-motion';

interface Props {
  config: CookieConfig;
  size?: number;
  animate?: boolean;
}

export const CookieVisual: React.FC<Props> = ({ config, size = 200, animate = false }) => {
  const { skinColor, eyeType, mouthType, accessory, shirtColor } = config;

  const containerVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: [-1, 1, -1], transition: { repeat: Infinity, duration: 2 } }
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      variants={containerVariants}
      animate={animate ? "hover" : "idle"}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
        {/* Body */}
        <path
          d="M60,60 Q50,50 40,60 Q20,80 30,100 L40,120 L40,150 Q40,180 70,180 L80,180 Q90,180 90,160 L90,140 L110,140 L110,160 Q110,180 120,180 L130,180 Q160,180 160,150 L160,120 L170,100 Q180,80 160,60 Q150,50 140,60 L130,70 Q140,30 100,30 Q60,30 70,70 Z"
          fill={skinColor}
          stroke="#8B4F24"
          strokeWidth="3"
        />
        
        {/* Shirt */}
        <path
          d="M40,120 L40,130 Q40,140 60,140 L140,140 Q160,140 160,130 L160,120 L140,100 L60,100 Z"
          fill={shirtColor}
          opacity="0.9"
        />
        {/* Buttons */}
        <circle cx="100" cy="110" r="4" fill="white" />
        <circle cx="100" cy="125" r="4" fill="white" />

        {/* Eyes */}
        {eyeType === 0 && (
          <g fill="#3E2723">
            <circle cx="80" cy="75" r="5" />
            <circle cx="120" cy="75" r="5" />
          </g>
        )}
        {eyeType === 1 && (
          <g stroke="#3E2723" strokeWidth="3" fill="none">
            <path d="M75,75 L85,75" />
            <path d="M115,75 L125,75" />
          </g>
        )}
        {eyeType === 2 && (
          <g fill="#3E2723">
            <circle cx="80" cy="75" r="6" />
            <circle cx="120" cy="75" r="6" />
            <circle cx="82" cy="73" r="2" fill="white"/>
            <circle cx="122" cy="73" r="2" fill="white"/>
          </g>
        )}

        {/* Mouth */}
        {mouthType === 0 && (
          <path d="M85,95 Q100,105 115,95" fill="none" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
        )}
        {mouthType === 1 && (
          <circle cx="100" cy="95" r="5" fill="#3E2723" />
        )}
        {mouthType === 2 && (
          <path d="M85,95 Q100,85 115,95" fill="none" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Accessories */}
        {accessory === 1 && (
          // Santa Hat
          <g>
            <path d="M70,35 Q100,-10 140,40" fill="#D83939" />
            <circle cx="140" cy="40" r="8" fill="white" />
            <rect x="65" y="30" width="70" height="15" rx="5" fill="white" />
          </g>
        )}
        {accessory === 2 && (
          // Bowtie
          <path d="M90,105 L80,100 L80,110 Z M110,105 L120,100 L120,110 Z" fill="#D83939" />
        )}
        {accessory === 3 && (
          // Scarf
           <path d="M80,100 L120,100 L120,115 L80,115 Z M110,115 L110,140 L125,140 L125,115 Z" fill="#176A3A" />
        )}

      </svg>
    </motion.div>
  );
};
