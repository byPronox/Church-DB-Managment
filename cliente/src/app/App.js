import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Navbar from '../Components/NavBar/Navbar';
import Dashboard from '../Components/Dashboard/Dashboard';
import ReglasNegocio from '../Pages/ReglasNegocio/ReglasNegocio';
import Crud from '../Pages/Crud/Crud';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Router>
            <Navbar onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reglas-negocio" element={<ReglasNegocio />} />
                <Route path="/crud" element={<Crud />} />
            </Routes>
        </Router>
    );
}

export default App;