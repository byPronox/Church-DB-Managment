import React, { useState } from 'react';
import CrudCatequizandos from './CRUDS/CrudCatequizandos';
import CrudParroquias from './CRUDS/CrudParroquias';
import CrudCatequistas from './CRUDS/CrudCatequistas';
import './Crud.css';

function Crud() {
    const [coleccionSeleccionada, setColeccionSeleccionada] = useState('');

    const opciones = [
        { 
            value: 'Catequizandos', 
            label: 'Catequizandos', 
            icon: '👥',
            description: 'Gestionar información de estudiantes de catequesis'
        },
        { 
            value: 'Catequistas', 
            label: 'Catequistas', 
            icon: '👨‍🏫',
            description: 'Administrar datos de instructores y maestros'
        },
        { 
            value: 'Parroquias', 
            label: 'Parroquias', 
            icon: '⛪',
            description: 'Mantener registro de parroquias y ubicaciones'
        }
    ];

    return (
        <div className="crud-container">
            <div className="crud-header">
                <h1 className="crud-title">Gestión de Datos</h1>
                <p className="crud-subtitle">
                    Administra la información del sistema de manera segura y eficiente
                </p>
            </div>

            <div className="selection-container">
                <h2 className="selection-title">Selecciona el módulo a gestionar:</h2>
                
                <div className="options-grid">
                    {opciones.map((opcion) => (
                        <div
                            key={opcion.value}
                            className={`option-card ${coleccionSeleccionada === opcion.value ? 'active' : ''}`}
                            onClick={() => setColeccionSeleccionada(opcion.value)}
                        >
                            <div className="option-icon">{opcion.icon}</div>
                            <h3 className="option-title">{opcion.label}</h3>
                            <p className="option-description">{opcion.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="crud-content">
                {coleccionSeleccionada === 'Catequizandos' && <CrudCatequizandos />}
                {coleccionSeleccionada === 'Parroquias' && <CrudParroquias />}
                {coleccionSeleccionada === 'Catequistas' && <CrudCatequistas />}
            </div>
        </div>
    );
}

export default Crud;