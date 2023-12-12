import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaTools } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { FaAnchor } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { RiPassExpiredFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";


const Sidebarr = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

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
    
    const navigate = useNavigate();

    return (
        <Sidebar collapsed={collapsed}>
            <button onClick={handleToggleSidebar} style={{width:"100%"}}>{collapsed ? "Expand" : "Collapse"}</button>
            <Menu>
                <MenuItem icon={<FaHome />} component={<Link to="/HomePage" />}>Home Page</MenuItem>
                <SubMenu icon={<FaTools />} label="Daily Toolbox Record">
                    <MenuItem component={<Link to="/ToolboxCreate" />}>Enter New Record</MenuItem>
                    <MenuItem component={<Link to="/ToolboxView" />}>View Past Record</MenuItem>
                </SubMenu>
                <SubMenu icon={<FaAnchor />} label="Anchorage Record">
                    <MenuItem component={<Link to="/AnchoragePreForm" />}>Enter New Record</MenuItem>
                    <MenuItem>View Past Record</MenuItem>
                </SubMenu>
                <MenuItem icon={<FaHelmetSafety />}>Mass Safety Briefing Record</MenuItem>
                <MenuItem icon={<RiPassExpiredFill />}>Toolbox Expiry</MenuItem>
                <MenuItem icon={<IoLogOut />} onClick={handleLogout}> Logout </MenuItem>

                {/* More menu items... */}
            </Menu>

        </Sidebar>
    );
};

export default Sidebarr;