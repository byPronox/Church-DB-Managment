import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Crud.css';

function Crud() {
    const [tablaSeleccionada, setTablaSeleccionada] = useState('');
    const [personas, setPersonas] = useState([]);
    const [form, setForm] = useState({ nombres: '', apellidos: '', tipoPersona: '', contacto: '' });
    const [editId, setEditId] = useState(null);
    const [nuevoContacto, setNuevoContacto] = useState('');

    // Listar personas
    const fetchPersonas = async () => {
        const res = await axios.get('http://127.0.0.1:5000/api/persona');
        setPersonas(res.data);
    };

    useEffect(() => {
        if (tablaSeleccionada === 'Persona') {
            fetchPersonas();
        }
    }, [tablaSeleccionada]);

    // Crear persona
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:5000/api/persona', form);
        setForm({ nombres: '', apellidos: '', tipoPersona: '', contacto: '' });
        fetchPersonas();
    };

    // Actualizar persona
    const handleUpdate = async (id) => {
        await axios.put(`http://127.0.0.1:5000/api/persona/${id}`, { nuevoContacto });
        setEditId(null);
        setNuevoContacto('');
        fetchPersonas();
    };

    // Eliminar persona
    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:5000/api/persona/${id}`);
        fetchPersonas();
    };

    return (
        <div className="crud-container">
            <h2 className="crud-title">CRUD</h2>
            {/* Selector de tabla */}
            <form>
                <label className="form-label" htmlFor="tabla">Selecciona la tabla:</label>
                <select
                    id="tabla"
                    value={tablaSeleccionada}
                    onChange={e => setTablaSeleccionada(e.target.value)}
                    required
                >
                    <option value="">-- Selecciona una tabla --</option>
                    <option value="Persona">Persona</option>
                    {/* A futuro puedes agregar más opciones aquí */}
                </select>
            </form>

            {/* Solo muestra el CRUD si se seleccionó una tabla */}
            {tablaSeleccionada === 'Persona' && (
                <>
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Nombres</label>
                        <input placeholder="Nombres" value={form.nombres} onChange={e => setForm({ ...form, nombres: e.target.value })} required />
                        <label className="form-label">Apellidos</label>
                        <input placeholder="Apellidos" value={form.apellidos} onChange={e => setForm({ ...form, apellidos: e.target.value })} required />
                        <label className="form-label">Tipo Persona</label>
                        <input placeholder="Tipo Persona" value={form.tipoPersona} onChange={e => setForm({ ...form, tipoPersona: e.target.value })} required />
                        <label className="form-label">Contacto</label>
                        <input placeholder="Contacto" value={form.contacto} onChange={e => setForm({ ...form, contacto: e.target.value })} required />
                        <button type="submit">Crear</button>
                    </form>
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>ID</th><th>Nombres</th><th>Apellidos</th><th>Tipo</th><th>Contacto</th><th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map(p => (
                                <tr key={p.Id_Persona}>
                                    <td>{p.Id_Persona}</td>
                                    <td>{p.Nombres}</td>
                                    <td>{p.Apellidos}</td>
                                    <td>{p.Tipo_Persona}</td>
                                    <td>
                                        {editId === p.Id_Persona ? (
                                            <input value={nuevoContacto} onChange={e => setNuevoContacto(e.target.value)} />
                                        ) : (
                                            p.Contacto
                                        )}
                                    </td>
                                    <td>
                                        {editId === p.Id_Persona ? (
                                            <button type="button" onClick={() => handleUpdate(p.Id_Persona)}>Guardar</button>
                                        ) : (
                                            <button type="button" onClick={() => { setEditId(p.Id_Persona); setNuevoContacto(p.Contacto); }}>Editar</button>
                                        )}
                                        <button type="button" onClick={() => handleDelete(p.Id_Persona)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Crud;