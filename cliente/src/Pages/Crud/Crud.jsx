import React, { useState } from 'react';
import CrudCatequizandos from './CRUDS/CrudCatequizandos';
import CrudParroquias from './CRUDS/CrudParroquias';
import './Crud.css';

function Crud() {
    const [tablaSeleccionada, setTablaSeleccionada] = useState('');

    return (
        <div className="crud-container">
            <h2 className="crud-title">CRUD</h2>
            <form>
                <label className="form-label" htmlFor="tabla">Selecciona la tabla:</label>
                <select
                    id="tabla"
                    value={tablaSeleccionada}
                    onChange={(e) => setTablaSeleccionada(e.target.value)}
                    required
                >
                    <option value="">-- Selecciona una tabla --</option>
                    <option value="Catequizandos">Catequizandos</option>
                    <option value="Parroquias">Parroquias</option>
                </select>
            </form>

            {tablaSeleccionada === 'Catequizandos' && <CrudCatequizandos />}
            {tablaSeleccionada === 'Parroquias' && <CrudParroquias />}
        </div>
    );
}

export default Crud;