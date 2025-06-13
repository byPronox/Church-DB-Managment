import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Inicio from '../Pages/Inicio/Inicio';
import ReglasNegocio from '../Pages/ReglasNegocio/ReglasNegocio';
import Crud from '../Pages/Crud/Crud';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/reglas-negocio" element={<ReglasNegocio />} />
                <Route path="/crud" element={<Crud />} />
            </Routes>
        </Router>
    );
}

export default App;