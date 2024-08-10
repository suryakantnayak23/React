import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../Dashboard.css';
const DashboardComponent = () => {
    const [user, setUser] = useState({ name: '', role: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = sessionStorage.getItem('userdetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    }, []);

    return (
        <div className="main-content">
            <div className="container-fluid content-top-gap">
                <div className="welcome-msg pt-3 pb-4">
                    <h1>Hi <span className="text-dark">{user.name}</span>, Welcome back</h1>
                    <p>You logged in as {user.role}</p>
                </div>

                <div className="statistics">
                    <div className="row">
                        <div className="col-xl-6 pr-xl-2">
                            <div className="row">
                                <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={() => navigate('/myAccount')}>
                                    <div className="card card_border border-primary-top p-4">
                                        <i style={{ fontSize: '3em', color: '#343a40' }} className="fa fa-user-circle-o" />
                                        <h3 className="text-dark number">Account</h3>
                                        <p className="stat-text">View account details</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 pl-sm-2 statistics-grid" onClick={() => navigate('/myBalance')}>
                                    <div className="card card_border border-primary-top p-4">
                                        <i style={{ fontSize: '3em', color: '#343a40' }} className="fa fa-usd" />
                                        <h3 className="text-dark number">Balance</h3>
                                        <p className="stat-text">View total available balance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 pl-xl-2">
                            <div className="row">
                                <div className="col-sm-6 pr-sm-2 statistics-grid" onClick={() => navigate('/myLoans')}>
                                    <div className="card card_border border-primary-top p-4">
                                        <i style={{ fontSize: '3em', color: '#343a40' }} className="fa fa-money" />
                                        <h3 className="text-dark number">Loans</h3>
                                        <p className="stat-text">View Loan Details</p>
                                    </div>
                                </div>
                                <div className="col-sm-6 pl-sm-2 statistics-grid" onClick={() => navigate('/myCards')}>
                                    <div className="card card_border border-primary-top p-4">
                                        <i style={{ fontSize: '3em', color: '#343a40' }} className="fa fa-credit-card" />
                                        <h3 className="text-dark number">Cards</h3>
                                        <p className="stat-text">View credit card details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
