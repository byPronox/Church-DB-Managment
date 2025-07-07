import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Login from '../Components/Login/Login';
import Dashboard from '../Components/Dashboard/Dashboard';
import ReglasNegocio from '../Pages/ReglasNegocio/ReglasNegocio';
import Procedimientos from '../Pages/ProcedimientosPage/Procedimientos';
import RegistrarCatequizando from '../Pages/Procedimientos/RegistrarCatequizando/RegistrarCatequizando';
import InscribirCatequizando from '../Pages/Procedimientos/InscribirCatequizando';
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
                <Route path="/procedimientos" element={<Procedimientos />} />
                <Route path="/procedimientos/registrar-catequizando" element={<RegistrarCatequizando />} />
                <Route path="/procedimientos/inscribir-catequizando" element={<InscribirCatequizando />} />
                <Route path="/crud" element={<Crud />} />
            </Routes>
        </Router>
    );
}

export default App;