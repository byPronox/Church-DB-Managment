import React from 'react';
import './ReglasNegocio.css';

function ReglasNegocio() {
    const reglas = [
        {
            categoria: "Registro de Catequizandos",
            reglas: [
                "Un catequizando debe presentar fe de bautismo para ser registrado.",
                "La edad mínima para iniciar catequesis es de 7 años.",
                "Debe proporcionarse información completa de contacto de los padres o tutores."
            ]
        },
        {
            categoria: "Inscripciones",
            reglas: [
                "Un catequizando no puede estar inscrito en más de un nivel activo simultáneamente.",
                "Las inscripciones deben realizarse antes del inicio del periodo académico.",
                "Se requiere el 100% del pago de matrícula para completar la inscripción."
            ]
        },
        {
            categoria: "Asistencia y Evaluaciones",
            reglas: [
                "Un catequizando debe tener al menos un 80% de asistencia para aprobar el nivel.",
                "La calificación mínima para aprobar es de 7.0 sobre 10.",
                "Las faltas injustificadas superiores al 20% implican reprobación automática."
            ]
        },
        {
            categoria: "Certificados",
            reglas: [
                "Los certificados solo se emiten a catequizandos aprobados.",
                "Un certificado debe incluir la fecha de emisión y firma del catequista responsable.",
                "Los certificados tienen validez permanente una vez emitidos."
            ]
        },
        {
            categoria: "Catequistas",
            reglas: [
                "Un catequista debe estar debidamente capacitado y certificado.",
                "Cada catequista puede manejar un máximo de 25 catequizandos por grupo.",
                "Los catequistas deben reportar asistencia y evaluaciones semanalmente."
            ]
        }
    ];

    return (
        <div className="reglas-container">
            <div className="reglas-header">
                <h1 className="reglas-title">Reglas del Negocio</h1>
                <p className="reglas-subtitle">
                    Normativas y políticas que rigen el funcionamiento del sistema de gestión eclesiástica
                </p>
            </div>

            <div className="reglas-content">
                {reglas.map((seccion, index) => (
                    <div key={index} className="reglas-section">
                        <h2 className="section-title">
                            <span className="section-icon">📋</span>
                            {seccion.categoria}
                        </h2>
                        <ul className="reglas-list">
                            {seccion.reglas.map((regla, reglaIndex) => (
                                <li key={reglaIndex} className="reglas-item">
                                    <span className="reglas-icon">✔</span>
                                    {regla}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReglasNegocio;