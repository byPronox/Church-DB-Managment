import React from 'react';

function Inicio() {
    return (        
        <div>
            <h1>Bienvenido al Sistema de Administración de la Iglesia</h1>
            <p>
                Este sistema está diseñado para gestionar catequizandos, inscripciones, asistencias,
                evaluaciones, certificados y más utilizando una base de datos NoSQL MongoDB. 
                La flexibilidad de las colecciones de documentos permite un manejo eficiente de 
                la información pastoral. Navega por las opciones del menú para realizar las 
                operaciones necesarias en las diferentes colecciones.
            </p>
        </div>
    );
}

export default Inicio;