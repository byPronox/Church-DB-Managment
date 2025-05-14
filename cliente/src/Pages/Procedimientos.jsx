import React from 'react';
import { Link } from 'react-router-dom';

function Procedimientos() {
    return (
        <div>
            <h1>Procedimientos Almacenados</h1>
            <ul>
                <li><Link to="/procedimientos/registrar-catequizando">Registrar Catequizando</Link></li>
                <li><Link to="/procedimientos/inscribir-catequizando">Inscribir Catequizando</Link></li>
                <li><Link to="/procedimientos/registrar-asistencia">Registrar Asistencia</Link></li>
                <li><Link to="/procedimientos/registrar-evaluacion">Registrar Evaluación</Link></li>
                <li><Link to="/procedimientos/emitir-certificado">Emitir Certificado</Link></li>
                <li><Link to="/procedimientos/asignar-sacramento">Asignar Sacramento</Link></li>
                <li><Link to="/procedimientos/esta-aprobado">Verificar Aprobación</Link></li>
            </ul>
        </div>
    );
}

export default Procedimientos;