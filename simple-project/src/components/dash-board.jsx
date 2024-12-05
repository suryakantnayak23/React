import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBuilding, FaUser, FaBell, FaChartBar, FaCog, FaFileInvoice, FaWallet, FaBox } from "react-icons/fa";
import "../assets/dashboardSCSS.scss";
import {
    Button,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    UncontrolledDropdown,
} from "reactstrap";
import { Menu } from "react-feather";
import logo from "../assets/ohhpro-profile.png";
import { isMobile } from "react-device-detect";

const DashBoardView = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="dashboard-container">
            {/* Top Navigation Bar */}
            <Navbar color="white" light expand="lg" className="topbar shadow-sm">
                <div className="d-flex align-items-center">
                    <img src={logo} alt="OhhPro" className="brand-logo" />
                    <Button
                        color="transparent"
                        className="border-0 sidebar-toggle"
                        onClick={toggleSidebar}
                    >
                        <Menu size={20} />
                    </Button>
                </div>

                <div className="ms-auto d-flex align-items-center">
                    <div className="position-relative me-3">
                        <FaBell size={20} />
                        <span className="notification-badge">3</span>
                    </div>
                    <UncontrolledDropdown>
                        <DropdownToggle color="transparent">
                            <div className="d-flex align-items-center">
                                <img src={logo} alt="profile" className="rounded-circle me-2" width="32" height="32" />
                                <span className="d-none d-md-block">Sushree M</span>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu end>
                            <div className="p-3">
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <Link to="/settings" className="dropdown-item">Settings</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/logout" className="dropdown-item">Logout</Link>
                            </div>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Navbar>

            {/* Sidebar */}
            <div className={`sidebar bg-dark ${isCollapsed ? 'expanded' : ''}`}>
                <Nav vertical className="flex-column">

                    <div className="sidebar-items">
                        <Link to="/dashboard" className="sidebar-item active">
                            <FaChartBar /> <span>Dashboards</span>
                            <span className="badge bg-success rounded-pill ms-2">NEW</span>
                        </Link>
                        <Link to="/apartment" className="sidebar-item">
                            <FaBuilding /> <span>Apartment Setup</span>
                        </Link>
                        <Link to="/complaints" className="sidebar-item">
                            <FaFileInvoice /> <span>Complain Management</span>
                        </Link>
                        <Link to="/daily-help" className="sidebar-item">
                            <FaUser /> <span>Daily Help</span>
                        </Link>

                        <div className="sidebar-category">FINANCIAL TRANSACTION</div>

                        <Link to="/assets" className="sidebar-item">
                            <FaBox /> <span>Asset & Amenity</span>
                            <span className="badge bg-success rounded-pill ms-2">NEW</span>
                        </Link>
                        <Link to="/bank" className="sidebar-item">
                            <FaWallet /> <span>Apartment Bank Account</span>
                        </Link>
                    </div>
                </Nav>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isCollapsed ? 'shifted' : ''}`}>
                {/* Your dashboard content goes here */}
            </div>
        </div>
    );
};

export default DashBoardView;