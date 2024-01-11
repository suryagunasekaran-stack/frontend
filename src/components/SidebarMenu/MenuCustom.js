import React from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';


const CircleButton = ( { onClick, isOpen }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#32292f',
          color: '#FFF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        {isOpen ? <FaTimes size="20" /> : <FaBars size="20" />}
      </motion.button>
    );
  };

  export default CircleButton;