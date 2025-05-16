import React from 'react';
import { Link } from 'react-router-dom';
import './Procedimientos.css';

function Procedimientos() {
    return (
        <div className="procedimientos-container">
            <h1 className="procedimientos-title">Procedimientos Almacenados</h1>
            <ul className="procedimientos-list">
                <li><Link to="/procedimientos/registrar-catequizando" className="procedimientos-link">Registrar Catequizando</Link></li>
                <li><Link to="/procedimientos/inscribir-catequizando" className="procedimientos-link">Inscribir Catequizando</Link></li>
                <li><Link to="/procedimientos/registrar-asistencia" className="procedimientos-link">Registrar Asistencia</Link></li>
                <li><Link to="/procedimientos/registrar-evaluacion" className="procedimientos-link">Registrar Evaluación</Link></li>
                <li><Link to="/procedimientos/emitir-certificado" className="procedimientos-link">Emitir Certificado</Link></li>
                <li><Link to="/procedimientos/asignar-sacramento" className="procedimientos-link">Asignar Sacramento</Link></li>
                <li><Link to="/procedimientos/esta-aprobado" className="procedimientos-link">Verificar Aprobación</Link></li>
            </ul>
        </div>
    );
}

export default Procedimientos;