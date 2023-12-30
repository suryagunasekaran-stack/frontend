import React, {useEffect, useState} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaTools } from "react-icons/fa";
import { FaAnchor } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

const sidebarVariants = {
    open: {
      width: '300px',
      transition: { type: 'spring', stiffness: 100 }
    },
    closed: {
      width: '0px',
      transition: { duration: 0.5 }
    }
  };  

const Sidebaru = ({ isOpen}) => {
    const navigate = useNavigate();
    const [isContentVisible, setIsContentVisible] = useState(isOpen);
    const controls = useAnimation();

    const handleLogout = async () => {
        // Clear local sessions
        localStorage.clear();
    
        // Make POST request to server for logout
        await fetch('http://localhost:3000/logout', {
            method: 'POST',
            // Include credentials if your backend requires them
            credentials: 'include',
        });
    
        // Navigate to '/'
        navigate('/');
    };
  
    useEffect(() => {
      if (isOpen) {
        setIsContentVisible(true);
        controls.start("visible");
      } else {
        controls.start("hidden").then(() => {
          // Delay the hiding of sidebar to allow content fade-out
          setTimeout(() => setIsContentVisible(false), 500); // Adjust delay to match fade-out animation
        });
      }
    }, [isOpen, controls]);

  return (
    <motion.div
     initial="closed"
      animate={isContentVisible ? "open" : "closed"}
      variants={sidebarVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#b8b8d1',
        overflow: 'hidden',
      }}
    >
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '80px', backgroundColor: '#616194', color: 'white', opacity:'0.5', borderRadius:'10px'}}>
        <Link to="/ToolboxView" style={{ textDecoration: 'none', color: 'inherit' }}>
        <FaTools />
        Toolbox Risk Assessment
        </Link>
    </motion.div>

    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#616194', color: 'white', opacity:'0.5', borderRadius:'10px' }} >
    <Link to="/AnchorView" style={{ textDecoration: 'none', color: 'inherit' }}>
        <FaAnchor/> Anchorage Forms
    </Link>
    </motion.div>

    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#616194', color: 'white', opacity:'0.5', borderRadius:'10px' }} >
    <Link to="/MassSafetyView" style={{ textDecoration: 'none', color: 'inherit' }}>
        <FaHelmetSafety/> Mass Safety Briefing
    </Link>
    </motion.div>

    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', backgroundColor: '#616194', color: 'white', opacity:'0.5', borderRadius:'10px' }} >
    <Link to="/" onClick={handleLogout}  style={{ textDecoration: 'none', color: 'inherit' }}>
        <IoLogOut/> Logout
    </Link>
    </motion.div>

    </motion.div>
  );
};

export default Sidebaru;
