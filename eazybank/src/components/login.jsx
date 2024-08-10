import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';
import LoginService from '../Service/LoginService';
import User from '../Service/User';
import Header from './Header'; // Assuming you have a Header component

const LoginComponent = () => {
    const [model, setModel] = useState(new User());
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await LoginService.validateLoginDetails(model);
            const updatedUser = { ...model, authStatus: 'AUTH', ...response.data };
            sessionStorage.setItem('userdetails', JSON.stringify(updatedUser));
            const xsrf = getCookie('XSRF-TOKEN');
            sessionStorage.setItem('XSRF-TOKEN', xsrf);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setModel((prevModel) => ({ ...prevModel, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!model.email) {
            errors.email = 'Error: Email is required!';
        } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(model.email)) {
            errors.email = 'Error: Please provide a valid email address!';
        }
        if (!model.password) {
            errors.password = 'Error: Password is required!';
        } else if (model.password.length < 5) {
            errors.password = 'Error: Password must be at least 5 characters long!';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <>

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form
                            onSubmit={(event) => {
                                if (validateForm()) validateUser(event);
                            }}
                            className="login100-form validate-form p-l-55 p-r-55 p-t-140"
                        >
                            <span className="login100-form-title">Sign In</span>
                            <div className="form-group">
                                <div className="wrap-input100 validate-input m-b-16">
                                    <input
                                        className="input100"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        required
                                        value={model.email}
                                        onChange={handleInputChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>
                                {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                            </div>

                            <div className="form-group">
                                <div className="wrap-input100 validate-input">
                                    <input
                                        className="input100"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id="password"
                                        required
                                        value={model.password}
                                        onChange={handleInputChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>
                                {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                            </div>
                            <div className="text-right p-t-13 p-b-23">
                                <span className="txt1">Forgot</span>
                                <a href="#" className="txt2">Password?</a>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">
                                    Sign in
                                </button>
                            </div>

                            <div className="flex-col-c p-t-40 p-b-20">
                                <span className="txt1 p-b-9">Don’t have an account?</span>
                                <a href="#" className="txt3">Sign up now</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
