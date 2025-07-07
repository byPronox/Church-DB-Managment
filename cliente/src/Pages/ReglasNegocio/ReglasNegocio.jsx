import React from 'react';
import './ReglasNegocio.css';

function ReglasNegocio() {
    const reglas = [
        {
            icon: '📜',
            title: 'Documentación Requerida',
            description: 'Un catequizando debe presentar fe de bautismo para ser registrado en el sistema.',
            color: 'blue'
        },
        {
            icon: '🎯',
            title: 'Nivel Único Activo',
            description: 'Un catequizando no puede estar inscrito en más de un nivel activo simultáneamente.',
            color: 'green'
        },
        {
            icon: '📊',
            title: 'Requisitos de Aprobación',
            description: 'Un catequizando debe tener al menos un 80% de asistencia y una calificación mínima de 7 para aprobar.',
            color: 'purple'
        },
        {
            icon: '🎓',
            title: 'Emisión de Certificados',
            description: 'Los certificados solo se emiten a catequizandos que hayan aprobado satisfactoriamente.',
            color: 'orange'
        },
        {
            icon: '👥',
            title: 'Seguimiento Individual',
            description: 'Cada catequizando debe tener un seguimiento personalizado de su progreso espiritual.',
            color: 'pink'
        },
        {
            icon: '⛪',
            title: 'Participación Sacramental',
            description: 'Los sacramentos solo pueden ser asignados a catequizandos con la preparación adecuada.',
            color: 'teal'
        }
    ];

    return (
        <div className="reglas-container">
            <div className="reglas-header">
                <h1 className="reglas-title">Reglas del Negocio</h1>
                <p className="reglas-subtitle">
                    Normativas y procedimientos que rigen el sistema de gestión de catequizandos
                </p>
            </div>
            
            <div className="reglas-grid">
                {reglas.map((regla, index) => (
                    <div key={index} className={`regla-card ${regla.color}`}>
                        <div className="regla-icon">
                            {regla.icon}
                        </div>
                        <div className="regla-content">
                            <h3 className="regla-title">{regla.title}</h3>
                            <p className="regla-description">{regla.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="reglas-footer">
                <div className="footer-card">
                    <h3>📋 Importante</h3>
                    <p>
                        Estas reglas garantizan la integridad y calidad del proceso de catequesis, 
                        asegurando que cada catequizando reciba la formación adecuada según los 
                        estándares establecidos por la Iglesia.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReglasNegocio;