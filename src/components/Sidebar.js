import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaTools } from "react-icons/fa";
import { FaHelmetSafety } from "react-icons/fa6";
import { FaAnchor } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { RiPassExpiredFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Sidebarr = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sidebar collapsed={collapsed}>
            <button onClick={handleToggleSidebar}>Toggle Sidebar</button>
            <Menu>
                <SubMenu icon={<FaTools />} label="Daily Toolbox Record">
                    <MenuItem component={<Link to="/ToolboxCreate" />}>Enter New Record</MenuItem>
                    <MenuItem>View Past Record</MenuItem>
                </SubMenu>
                <MenuItem icon={<FaAnchor />}>Anchorage Record </MenuItem>
                <MenuItem icon={<FaHelmetSafety />}>Mass Safety Briefing Record</MenuItem>
                <MenuItem icon={<RiPassExpiredFill />}>Toolbox Expiry</MenuItem>
                <div className="sidebar-footer">
                    <MenuItem icon={<IoLogOut />}> Logout </MenuItem>
                </div>
                {/* More menu items... */}
            </Menu>

        </Sidebar>
    );
};

export default Sidebarr;