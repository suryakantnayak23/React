import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../Header.css'; // Import your CSS file
import logo from '../logo.png';
const HeaderComponent = () => {
    const [user, setUser] = useState({ authStatus: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = sessionStorage.getItem('userdetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    const handleLogoClick = () => {
        if (user.authStatus !== 'AUTH') {
            navigate('/home');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div data-navigation="container" className="i-top-header">
            <div className="wrapper top-section">
                <div className="hleft">
                    <a
                        className="logo selfLogo"
                        onClick={handleLogoClick}
                    >
                        <img alt="logo" src={logo}/>
                    </a>
                </div>
                <div className="mnav_hb hide">
                    <div className="hamburger">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
                <nav className="hright dnav">
                    <ul>
                        {user.authStatus !== 'AUTH' && (
                            <>
                                <li>
                                    <NavLink to="/home" activeClassName="active">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login" activeClassName="active">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact" activeClassName="active">Contact US</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/notices" activeClassName="active">Notices</NavLink>
                                </li>
                            </>
                        )}
                        {user.authStatus === 'AUTH' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout" activeClassName="active">Logout</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HeaderComponent;
