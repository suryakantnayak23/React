import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import img from '../assets/profile-img.png';
import ohhpro from '../assets/ohhpro-profile.png';

const LoginPage = () => {
    const [emailPhone, setEmailPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleEmailPhoneSubmit = (e) => {
        e.preventDefault();
        if (emailPhone) {
            toast.success(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}></span> OTP Sent Successfully!
                </div>,
                {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: 'green-toast',
                }
            );

            setOtpSent(true);
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        toast.success(
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}></span> OTP Validated Successfully!
            </div>,
            {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'green-toast',
            }
        );

        setTimeout(() => {
            navigate('/dashboard');
        }, 3000);
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        {/* Header Section */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-0">
                                <div className="bg-primary bg-opacity-10 p-4 rounded-top">
                                    <div className="row">
                                        <div className="col-7">
                                            <h2 className="mb-2">Welcome Back!</h2>
                                            <p className="text-muted mb-0">
                                                Sign in to continue to Ohhpro Junction.
                                            </p>
                                        </div>
                                        <div className="col-5">
                                            <img
                                                src={img}
                                                alt="Person working"
                                                className="img-fluid"
                                                style={{ maxHeight: '120px' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Logo Section */}
                                <div className="text-center" style={{ marginTop: '-30px' }}>
                                    <div className="d-inline-block bg-white p-2 rounded-circle shadow-sm">
                                        <img
                                            src={ohhpro}
                                            alt="Ohhpro Logo"
                                            className="rounded-circle"
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                    </div>
                                </div>

                                {/* Form Section */}
                                <div className="p-4">
                                    {otpSent ? (
                                        <form onSubmit={handleOtpSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="otp" className="form-label">
                                                    Enter OTP
                                                </label>
                                                <input
                                                    id="otp"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    placeholder="Enter the OTP"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100 py-2">
                                                Validate OTP
                                            </button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleEmailPhoneSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="emailPhone" className="form-label">
                                                    Email/Phone
                                                </label>
                                                <input
                                                    id="emailPhone"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    value={emailPhone}
                                                    onChange={(e) => setEmailPhone(e.target.value)}
                                                    placeholder="Enter your email or phone"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100 py-2">
                                                Send OTP
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Copyright Section */}
                        <div className="text-center">
                            <small className="text-muted">
                                Copyright © 2024 Ohhpro Junction. All rights reserved.
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />

            <style>
                {`
                    .green-toast {
                        background-color: #4CAF50 !important;
                        color: white !important;
                    }
                    .btn-primary {
                        background-color: #6366F1;
                        border-color: #6366F1;
                    }
                    .btn-primary:hover {
                        background-color: #5558DD;
                        border-color: #5558DD;
                    }
                    .bg-primary.bg-opacity-10 {
                        background-color: #EEF1FF !important;
                    }
                `}
            </style>
        </div>
    );
};

export default LoginPage;