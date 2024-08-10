import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // to replace the Angular service
import '../Account.css';

const AccountComponent = () => {
    const [user, setUser] = useState({ name: '', email: '', mobileNumber: '' });
    const [account, setAccount] = useState({ accountNumber: '', accountType: '', branchAddress: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = JSON.parse(sessionStorage.getItem('userdetails'));
        if (userDetails) {
            setUser(userDetails);
            axios.get(`/api/account/${userDetails.id}`)
                .then(response => {
                    setAccount(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the account details!', error);
                });
        }
    }, []);

    return (
        <div className="site-section">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-7">
                        <h2 className="heading-21921">Account Information</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-4">
                            <div className="form-group">
                                <label htmlFor="customerName">Name</label>
                                <input type="text" className="form-control" id="customerName" value={user.name} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerEmail">Email</label>
                                <input type="email" className="form-control" id="customerEmail" value={user.email} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerMobileNum">Mobile Number</label>
                                <input type="text" className="form-control" id="customerMobileNum" value={user.mobileNumber} disabled />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-4">
                            <div className="form-group">
                                <label htmlFor="customerAccNo">Account Number</label>
                                <input type="text" className="form-control" id="customerAccNo" value={account.accountNumber} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerAccountType">Account Type</label>
                                <input type="text" className="form-control" id="customerAccountType" value={account.accountType} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="branchAddress">Branch Address</label>
                                <input type="text" className="form-control" id="branchAddress" value={account.branchAddress} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col">
                    <button className="btn btn-eazybank" onClick={() => navigate('/dashboard')}>
                        BACK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccountComponent;
