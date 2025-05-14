import React from 'react';

function ReglasNegocio() {
    return (
        <div>
            <h1>Reglas del Negocio</h1>
            <ul>
                <li>Un catequizando debe presentar fe de bautismo para ser registrado.</li>
                <li>Un catequizando no puede estar inscrito en más de un nivel activo.</li>
                <li>Un catequizando debe tener al menos un 80% de asistencia y una calificación mínima de 7 para aprobar.</li>
                <li>Los certificados solo se emiten a catequizandos aprobados.</li>
            </ul>
        </div>
    );
}

export default ReglasNegocio;