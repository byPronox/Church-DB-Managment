import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Crud.css';

function Crud() {
    const [tablaSeleccionada, setTablaSeleccionada] = useState('');
    const [catequizandos, setCatequizandos] = useState([]);
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        contacto: '',
        fechaNacimiento: '',
        feBautismo: false,
        inscripciones: [],
        sacramentos: [],
    });

    // Fetch catequizandos from the backend
    const fetchCatequizandos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/catequizando');
            setCatequizandos(res.data);
        } catch (error) {
            console.error('Error fetching catequizandos:', error);
        }
    };

    useEffect(() => {
        if (tablaSeleccionada === 'Catequizandos') {
            fetchCatequizandos();
        }
    }, [tablaSeleccionada]);

    // Handle form submission to create a new catequizando
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/catequizando', form);
            setForm({
                nombres: '',
                apellidos: '',
                contacto: '',
                fechaNacimiento: '',
                feBautismo: false,
                inscripciones: [],
                sacramentos: [],
            });
            fetchCatequizandos();
        } catch (error) {
            console.error('Error creating catequizando:', error);
        }
    };

    return (
        <div className="crud-container">
            <h2 className="crud-title">CRUD - Catequizandos</h2>
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
                </select>
            </form>

            {/* CRUD para Catequizandos */}
            {tablaSeleccionada === 'Catequizandos' && (
                <>
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Nombres</label>
                        <input
                            placeholder="Nombres"
                            value={form.nombres}
                            onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                            required
                        />
                        <label className="form-label">Apellidos</label>
                        <input
                            placeholder="Apellidos"
                            value={form.apellidos}
                            onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                            required
                        />
                        <label className="form-label">Contacto</label>
                        <input
                            placeholder="Contacto"
                            value={form.contacto}
                            onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                            required
                        />
                        <label className="form-label">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            value={form.fechaNacimiento}
                            onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                            required
                        />
                        <label className="form-label">Fe Bautismo</label>
                        <input
                            type="checkbox"
                            checked={form.feBautismo}
                            onChange={(e) => setForm({ ...form, feBautismo: e.target.checked })}
                        />
                        <button type="submit">Crear</button>
                    </form>

                    {/* Render documents */}
                    <div className="documents-container">
                        {catequizandos.map((doc) => (
                            <div key={doc._id} className="document-card">
                                <h3>Documento ID: {doc._id}</h3>
                                <p><strong>Nombres:</strong> {doc.nombres}</p>
                                <p><strong>Apellidos:</strong> {doc.apellidos}</p>
                                <p><strong>Contacto:</strong> {doc.contacto}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {new Date(doc.fecha_nacimiento).toLocaleDateString()}</p>
                                <p><strong>Fe Bautismo:</strong> {doc.fe_bautismo ? 'Sí' : 'No'}</p>
                                <p><strong>Sacramentos:</strong></p>
                                <ul>
                                    {doc.sacramentos.map((sacramento, index) => (
                                        <li key={index}>
                                            <p><strong>Tipo:</strong> {sacramento.tipo_sacramento}</p>
                                            <p><strong>Lugar:</strong> {sacramento.lugar}</p>
                                            <p><strong>Fecha:</strong> {new Date(sacramento.fecha).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Inscripciones:</strong></p>
                                <ul>
                                    {doc.inscripciones.map((inscripcion, index) => (
                                        <li key={index}>
                                            <p><strong>Estado:</strong> {inscripcion.estado}</p>
                                            <p><strong>Fecha Inscripción:</strong> {new Date(inscripcion.fecha_inscripcion).toLocaleDateString()}</p>
                                            <p><strong>Certificado Emitido:</strong> {inscripcion.certificado_emitido ? 'Sí' : 'No'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Crud;