import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/Header';
import AccountComponent from './components/Account';
import DashboardComponent from './components/Dashboard';
import HomeComponent from "./components/Home";
import LoginComponent from "./components/login";
import NoticesComponent from './components/Notices';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
    return (
        <>
            <HeaderComponent />
            <Routes>
                <Route path="/" element={<DashboardComponent />} />
                <Route path="/account" element={<AccountComponent />} />
                <Route path="/dashboard" element={<DashboardComponent />} />
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/notices" element={<NoticesComponent />} /> {/* Updated this line */}
            </Routes>
        </>
    );
}

export default App;
