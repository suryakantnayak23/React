import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login.jsx';
import DashBoardView from "./edited-component/new-dashboard.jsx";
import HouseTable from "./components/house-table.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard/*" element={<DashBoardView />} />
                {/*<Route path="/house" element={<HouseTable />} />*/}
            </Routes>
        </Router>
    );
};

export default App;