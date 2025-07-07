import React from 'react';
import { Link } from 'react-router-dom';
import './Procedimientos.css';

function Procedimientos() {
    const procedimientos = [
        {
            title: 'Registrar Catequizando',
            description: 'Añadir un nuevo catequizando al sistema con todos sus datos personales',
            icon: '👤',
            link: '/procedimientos/registrar-catequizando',
            color: 'blue',
            status: 'Disponible'
        },
        {
            title: 'Inscribir Catequizando',
            description: 'Inscribir un catequizando existente en un nivel de catequesis específico',
            icon: '📝',
            link: '/procedimientos/inscribir-catequizando',
            color: 'green',
            status: 'Disponible'
        },
        {
            title: 'Registrar Asistencia',
            description: 'Marcar la asistencia de los catequizandos a las clases de catequesis',
            icon: '✅',
            link: '/procedimientos/registrar-asistencia',
            color: 'purple',
            status: 'Próximamente'
        },
        {
            title: 'Registrar Evaluación',
            description: 'Registrar las calificaciones y evaluaciones de los catequizandos',
            icon: '📊',
            link: '/procedimientos/registrar-evaluacion',
            color: 'orange',
            status: 'Próximamente'
        },
        {
            title: 'Emitir Certificado',
            description: 'Generar certificados para catequizandos que han completado su formación',
            icon: '🎓',
            link: '/procedimientos/emitir-certificado',
            color: 'pink',
            status: 'Próximamente'
        },
        {
            title: 'Asignar Sacramento',
            description: 'Asignar sacramentos a catequizandos que han completado los requisitos',
            icon: '⛪',
            link: '/procedimientos/asignar-sacramento',
            color: 'teal',
            status: 'Próximamente'
        },
        {
            title: 'Verificar Aprobación',
            description: 'Verificar si un catequizando cumple con los requisitos para aprobar',
            icon: '🔍',
            link: '/procedimientos/esta-aprobado',
            color: 'indigo',
            status: 'Próximamente'
        }
    ];

    return (
        <div className="procedimientos-container">
            <div className="procedimientos-header">
                <h1 className="procedimientos-title">Procedimientos del Sistema</h1>
                <p className="procedimientos-subtitle">
                    Gestione todos los procesos relacionados con la administración de catequizandos
                </p>
            </div>

            <div className="procedimientos-grid">
                {procedimientos.map((proc, index) => (
                    <div key={index} className={`procedimiento-card ${proc.color}`}>
                        <div className="procedimiento-header">
                            <div className="procedimiento-icon">
                                {proc.icon}
                            </div>
                            <div className={`procedimiento-status ${proc.status === 'Disponible' ? 'available' : 'coming-soon'}`}>
                                {proc.status}
                            </div>
                        </div>
                        
                        <div className="procedimiento-content">
                            <h3 className="procedimiento-title">{proc.title}</h3>
                            <p className="procedimiento-description">{proc.description}</p>
                        </div>

                        <div className="procedimiento-footer">
                            {proc.status === 'Disponible' ? (
                                <Link to={proc.link} className="procedimiento-button">
                                    Acceder
                                    <span className="button-arrow">→</span>
                                </Link>
                            ) : (
                                <button className="procedimiento-button disabled" disabled>
                                    Próximamente
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="procedimientos-info">
                <div className="info-card">
                    <h3>ℹ️ Información Importante</h3>
                    <p>
                        Los procedimientos marcados como "Disponible" están completamente funcionales. 
                        Los demás están en desarrollo y estarán disponibles próximamente.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Procedimientos;