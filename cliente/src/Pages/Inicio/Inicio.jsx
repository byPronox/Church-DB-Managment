import React from 'react';
import './Inicio.css';
import JesusImage from '../../assets/images/Jesus.png'; // Importa la imagen

function Inicio() {
    return (
        <div className="inicio-container">
            <h1 className="inicio-title">Bienvenido al Sistema de Administración de la Iglesia</h1>
            <p className="inicio-description">
                Este sistema está diseñado para gestionar catequizandos, inscripciones, asistencias,
                evaluaciones, certificados y más. Navega por las opciones del menú para realizar
                las operaciones necesarias.
            </p>
            <div className="inicio-image-container">
                <img
                    src={JesusImage} // Usa la imagen importada
                    alt="Imagen representativa de Jesús"
                    className="inicio-image"
                />
            </div>
        </div>
    );
}

export default Inicio;