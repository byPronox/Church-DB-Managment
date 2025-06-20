import React, { useState } from 'react';
import CrudCatequizandos from './CRUDS/CrudCatequizandos';
import CrudParroquias from './CRUDS/CrudParroquias';
import CrudCatequistas from './CRUDS/CrudCatequistas';
import './Crud.css';

function Crud() {
    const [coleccionSeleccionada, setColeccionSeleccionada] = useState('');

    return (
        <div className="crud-container">
            <h2 className="crud-title">CRUD</h2>
            <form>
                <label className="form-label" htmlFor="coleccion">Selecciona la colección:</label>
                <select
                    id="coleccion"
                    value={coleccionSeleccionada}
                    onChange={(e) => setColeccionSeleccionada(e.target.value)}
                    required
                >
                    <option value="">-- Selecciona una colección --</option>
                    <option value="Catequizandos">Catequizandos</option>
                    <option value="Parroquias">Parroquias</option>
                    <option value="Catequistas">Catequistas</option>
                </select>
            </form>

            {coleccionSeleccionada === 'Catequizandos' && <CrudCatequizandos />}
            {coleccionSeleccionada === 'Parroquias' && <CrudParroquias />}
            {coleccionSeleccionada === 'Catequistas' && <CrudCatequistas />}
        </div>
    );
}

export default Crud;