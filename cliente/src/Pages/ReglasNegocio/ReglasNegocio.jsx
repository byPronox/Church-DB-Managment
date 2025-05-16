import React from 'react';
import './ReglasNegocio.css';

function ReglasNegocio() {
    return (
        <div className="reglas-container">
            <h1 className="reglas-title">Reglas del Negocio</h1>
            <ul className="reglas-list">
                <li className="reglas-item">
                    <span className="reglas-icon">✔</span>
                    Un catequizando debe presentar fe de bautismo para ser registrado.
                </li>
                <li className="reglas-item">
                    <span className="reglas-icon">✔</span>
                    Un catequizando no puede estar inscrito en más de un nivel activo.
                </li>
                <li className="reglas-item">
                    <span className="reglas-icon">✔</span>
                    Un catequizando debe tener al menos un 80% de asistencia y una calificación mínima de 7 para aprobar.
                </li>
                <li className="reglas-item">
                    <span className="reglas-icon">✔</span>
                    Los certificados solo se emiten a catequizandos aprobados.
                </li>
            </ul>
        </div>
    );
}

export default ReglasNegocio;