import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Crud.css';
import '../Crud.css';

function CrudCatequizandos() {
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
    const [editId, setEditId] = useState(null);
    const [newSacramento, setNewSacramento] = useState({
        tipo_sacramento: '',
        fecha: '',
        lugar: ''
    });
    const [newInscripcion, setNewInscripcion] = useState({
        parroquia_id: '',
        nivel_id: '',
        fecha_inscripcion: '',
        estado: 'Activo',
        certificado_emitido: false
    });

    // Fetch catequizandos from the backend
    const fetchCatequizandos = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/catequizando');
            setCatequizandos(res.data);
        } catch (error) {
            console.error('Error fetching catequizandos:', error);        }
    };

    useEffect(() => {
        fetchCatequizandos();
    }, []);

    // Add sacramento to form
    const addSacramento = () => {
        if (newSacramento.tipo_sacramento && newSacramento.fecha && newSacramento.lugar) {
            setForm({
                ...form,
                sacramentos: [...form.sacramentos, { ...newSacramento }]
            });
            setNewSacramento({ tipo_sacramento: '', fecha: '', lugar: '' });
        }
    };

    // Remove sacramento from form
    const removeSacramento = (index) => {
        const updatedSacramentos = form.sacramentos.filter((_, i) => i !== index);
        setForm({ ...form, sacramentos: updatedSacramentos });
    };

    // Add inscripcion to form
    const addInscripcion = () => {
        if (newInscripcion.parroquia_id && newInscripcion.nivel_id && newInscripcion.fecha_inscripcion) {
            const inscripcionWithId = {
                ...newInscripcion,
                inscripcion_id: new Date().getTime().toString(), // Temporary ID
                asistencias: [],
                evaluacion: { calificacion: 0, observaciones: '' }
            };
            setForm({
                ...form,
                inscripciones: [...form.inscripciones, inscripcionWithId]
            });
            setNewInscripcion({
                parroquia_id: '',
                nivel_id: '',
                fecha_inscripcion: '',
                estado: 'Activo',
                certificado_emitido: false
            });
        }
    };

    // Remove inscripcion from form
    const removeInscripcion = (index) => {
        const updatedInscripciones = form.inscripciones.filter((_, i) => i !== index);
        setForm({ ...form, inscripciones: updatedInscripciones });
    };

    // Handle form submission to create or update a catequizando
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update existing catequizando
                await axios.put(`http://127.0.0.1:5000/api/catequizando/${editId}`, form);
                setEditId(null); // Reset editId after updating
            } else {
                // Create new catequizando
                await axios.post('http://127.0.0.1:5000/api/catequizando', form);
            }            setForm({
                nombres: '',
                apellidos: '',
                contacto: '',
                fechaNacimiento: '',
                feBautismo: false,
                inscripciones: [],
                sacramentos: [],
            });
            setNewSacramento({ tipo_sacramento: '', fecha: '', lugar: '' });
            setNewInscripcion({
                parroquia_id: '',
                nivel_id: '',
                fecha_inscripcion: '',
                estado: 'Activo',
                certificado_emitido: false
            });
            setNewSacramento({ tipo_sacramento: '', fecha: '', lugar: '' });
            setNewInscripcion({
                parroquia_id: '',
                nivel_id: '',
                fecha_inscripcion: '',
                estado: 'Activo',
                certificado_emitido: false
            });
            fetchCatequizandos();
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'creating'} catequizando:`, error);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/catequizando/${id}`);
            fetchCatequizandos();
        } catch (error) {
            console.error('Error deleting catequizando:', error);
        }
    };

    // Handle edit action
    const handleEdit = (doc) => {
        setEditId(doc._id); // Set the ID of the document being edited
        setForm({
            nombres: doc.nombres,
            apellidos: doc.apellidos,
            contacto: doc.contacto,
            fechaNacimiento: doc.fecha_nacimiento,
            feBautismo: doc.fe_bautismo,
            inscripciones: doc.inscripciones,
            sacramentos: doc.sacramentos,
        });
    };

    return (
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
                />                <label className="form-label">Fe Bautismo</label>
                <input
                    type="checkbox"
                    checked={form.feBautismo}
                    onChange={(e) => setForm({ ...form, feBautismo: e.target.checked })}
                />
                
                {/* Sección de Sacramentos */}
                <div className="sacramentos-section">
                    <h3>Sacramentos</h3>
                    {form.sacramentos.map((sacramento, index) => (
                        <div key={index} className="sacramento-item">
                            <p><strong>Tipo:</strong> {sacramento.tipo_sacramento}</p>
                            <p><strong>Fecha:</strong> {sacramento.fecha}</p>
                            <p><strong>Lugar:</strong> {sacramento.lugar}</p>
                            <button type="button" onClick={() => removeSacramento(index)}>Eliminar</button>
                        </div>
                    ))}
                    
                    <div className="add-sacramento">
                        <h4>Agregar Sacramento</h4>
                        <input
                            type="text"
                            placeholder="Tipo de Sacramento"
                            value={newSacramento.tipo_sacramento}
                            onChange={(e) => setNewSacramento({...newSacramento, tipo_sacramento: e.target.value})}
                        />
                        <input
                            type="date"
                            placeholder="Fecha"
                            value={newSacramento.fecha}
                            onChange={(e) => setNewSacramento({...newSacramento, fecha: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Lugar"
                            value={newSacramento.lugar}
                            onChange={(e) => setNewSacramento({...newSacramento, lugar: e.target.value})}
                        />
                        <button type="button" onClick={addSacramento}>Agregar Sacramento</button>
                    </div>
                </div>

                {/* Sección de Inscripciones */}
                <div className="inscripciones-section">
                    <h3>Inscripciones</h3>
                    {form.inscripciones.map((inscripcion, index) => (
                        <div key={index} className="inscripcion-item">
                            <p><strong>Estado:</strong> {inscripcion.estado}</p>
                            <p><strong>Fecha Inscripción:</strong> {inscripcion.fecha_inscripcion}</p>
                            <p><strong>Parroquia ID:</strong> {inscripcion.parroquia_id}</p>
                            <p><strong>Nivel ID:</strong> {inscripcion.nivel_id}</p>
                            <p><strong>Certificado Emitido:</strong> {inscripcion.certificado_emitido ? 'Sí' : 'No'}</p>
                            <button type="button" onClick={() => removeInscripcion(index)}>Eliminar</button>
                        </div>
                    ))}
                    
                    <div className="add-inscripcion">
                        <h4>Agregar Inscripción</h4>
                        <input
                            type="text"
                            placeholder="ID de Parroquia"
                            value={newInscripcion.parroquia_id}
                            onChange={(e) => setNewInscripcion({...newInscripcion, parroquia_id: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="ID de Nivel"
                            value={newInscripcion.nivel_id}
                            onChange={(e) => setNewInscripcion({...newInscripcion, nivel_id: e.target.value})}
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Inscripción"
                            value={newInscripcion.fecha_inscripcion}
                            onChange={(e) => setNewInscripcion({...newInscripcion, fecha_inscripcion: e.target.value})}
                        />
                        <select
                            value={newInscripcion.estado}
                            onChange={(e) => setNewInscripcion({...newInscripcion, estado: e.target.value})}
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Completado">Completado</option>                        </select>
                        <div className="checkbox-container">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={newInscripcion.certificado_emitido}
                                    onChange={(e) => setNewInscripcion({...newInscripcion, certificado_emitido: e.target.checked})}
                                />
                                Certificado Emitido
                            </label>
                            <button type="button" onClick={addInscripcion}>Agregar Inscripción</button>
                        </div>
                    </div>
                </div>
                
                <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
            </form>

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
                        <button onClick={() => handleEdit(doc)}>Editar</button>
                        <button onClick={() => handleDelete(doc._id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CrudCatequizandos;