import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/NavBar/Navbar';
import Inicio from '../Pages/Inicio/Inicio';
import ReglasNegocio from '../Pages/ReglasNegocio/ReglasNegocio';
import Procedimientos from '../Pages/ProcedimientosPage/Procedimientos';
import RegistrarCatequizando from '../Pages/Procedimientos/RegistrarCatequizando/RegistrarCatequizando';
import InscribirCatequizando from '../Pages/Procedimientos/InscribirCatequizando';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/reglas-negocio" element={<ReglasNegocio />} />
                <Route path="/procedimientos" element={<Procedimientos />} />
                <Route path="/procedimientos/registrar-catequizando" element={<RegistrarCatequizando />} />
                <Route path="/procedimientos/inscribir-catequizando" element={<InscribirCatequizando />} />
            </Routes>
        </Router>
    );
}

export default App;