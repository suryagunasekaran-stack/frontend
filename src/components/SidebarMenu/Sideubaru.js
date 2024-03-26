import React, {useEffect, useState, useContext} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaTools } from "react-icons/fa";
import { FaAnchor } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { AuthContext } from '../Routing/AuthContext';
import { FaFileAlt } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { HiOfficeBuilding } from "react-icons/hi";

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
    

const Sidebaru = ({ isOpen, onClose}) => {
    const navigate = useNavigate();
    const [isContentVisible, setIsContentVisible] = useState(isOpen);
    const controls = useAnimation();
    const { setTheAuth } = useContext(AuthContext);
    const handleLogout = async () => {
        // Clear local sessions
        localStorage.clear();
        const apiUrl = process.env.REACT_APP_API_URL;
        // Make POST request to server for logout
        await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            // Include credentials if your backend requires them
            credentials: 'include',
        });

        setTheAuth(false);
        handleLinkClick('/');
        // Navigate to '/'
    };

    const handleLinkClick = (path) => {
      navigate(path);
      onClose(); // This will close the sidebar
  };

  
  
    useEffect(() => {
      if (isOpen) {
        setIsContentVisible(true);
        controls.start("visible");
      } else {
        controls.start("hidden").then(() => {
          // Delay the hiding of sidebar to allow content fade-out
          setTimeout(() => setIsContentVisible(false), 0); // Adjust delay to match fade-out animation
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
        zIndex:"100",
      }}
    >

    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '80px', color:'black', opacity:'0.5', borderRadius:'10px'}}>
        <div onClick={() => handleLinkClick('/HomePage')} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <FaHome />
                    HomePage
        </div>
    </motion.div>

    {(localStorage.getItem("role") === 'supervisor' ) && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color: 'black', opacity: '0.5', borderRadius: '10px' }}>
          <div onClick={() => handleLinkClick('/Viewmetausers')} style={{ textDecoration: 'none', color: 'inherit' }}>
          <HiOfficeBuilding /> Brightsun Employee Details
          </div>
        </motion.div>
      )}
    
    {(localStorage.getItem("role") !== 'userindia') && (
    <><motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color: 'black', opacity: '0.5', borderRadius: '10px' }}>
          <div onClick={() => handleLinkClick('/ToolboxView')} style={{ textDecoration: 'none', color: 'inherit' }}>

            <FaTools />
            Toolbox Risk Assessment
          </div>
        </motion.div><motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color: 'black', opacity: '0.5', borderRadius: '10px' }}>
            <div onClick={() => handleLinkClick('/AnchorView')} style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaAnchor /> Anchorage Forms
            </div>
          </motion.div><motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color: 'black', opacity: '0.5', borderRadius: '10px' }}>
            <div onClick={() => handleLinkClick('/MassSafetyView')} style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaHelmetSafety /> Mass Safety Briefing
            </div>
          </motion.div></>

    )}

    {(localStorage.getItem("role") === 'supervisor' || localStorage.getItem("role") === 'userindia') && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color: 'black', opacity: '0.5', borderRadius: '10px' }}>
          <div onClick={() => handleLinkClick('/Ipc')} style={{ textDecoration: 'none', color: 'inherit' }}>
            <FaFileAlt /> IPC
          </div>
        </motion.div>
      )}

      {(localStorage.getItem("role") === 'supervisor' ) && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color: 'black', opacity: '0.5', borderRadius: '10px' }}>
          <div onClick={() => handleLinkClick('/Brightsafeusers')} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ImUsers /> Brightsafe Users
          </div>
        </motion.div>
      )}




    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ padding: '20px', marginTop: '20px', color:'black', opacity:'0.5', borderRadius:'10px' }} >
    <Link to="/" onClick={handleLogout}  style={{ textDecoration: 'none', color: 'inherit' }}>
        <IoLogOut/> Logout
    </Link>
    </motion.div>

    </motion.div>
  );
};

export default Sidebaru;
