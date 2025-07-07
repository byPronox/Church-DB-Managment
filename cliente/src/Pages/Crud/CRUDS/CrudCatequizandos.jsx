import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Crud.css';

function CrudCatequizandos() {
    const [catequizandos, setCatequizandos] = useState([]);
    const [loading, setLoading] = useState(false);
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
    const [showForm, setShowForm] = useState(false);
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
        setLoading(true);
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/catequizando');
            setCatequizandos(res.data);
        } catch (error) {
            console.error('Error fetching catequizandos:', error);
            alert('Error al cargar los catequizandos. Verifique la conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatequizandos();
    }, []);

    // Reset form
    const resetForm = () => {
        setForm({
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
        setEditId(null);
        setShowForm(false);
    };

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
        setLoading(true);
        try {
            if (editId) {
                // Update existing catequizando
                await axios.put(`http://127.0.0.1:5000/api/catequizando/${editId}`, form);
                alert('Catequizando actualizado exitosamente');
            } else {
                // Create new catequizando
                await axios.post('http://127.0.0.1:5000/api/catequizando', form);
                alert('Catequizando creado exitosamente');
            }
            resetForm();
            fetchCatequizandos();
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'creating'} catequizando:`, error);
            alert(`Error al ${editId ? 'actualizar' : 'crear'} el catequizando`);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este catequizando?')) {
            setLoading(true);
            try {
                await axios.delete(`http://127.0.0.1:5000/api/catequizando/${id}`);
                alert('Catequizando eliminado exitosamente');
                fetchCatequizandos();
            } catch (error) {
                console.error('Error deleting catequizando:', error);
                alert('Error al eliminar el catequizando');
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle edit action
    const handleEdit = (doc) => {
        setEditId(doc._id);
        setForm({
            nombres: doc.nombres,
            apellidos: doc.apellidos,
            contacto: doc.contacto,
            fechaNacimiento: doc.fecha_nacimiento ? doc.fecha_nacimiento.split('T')[0] : '',
            feBautismo: doc.fe_bautismo,
            inscripciones: doc.inscripciones || [],
            sacramentos: doc.sacramentos || [],
        });
        setShowForm(true);
    };

    return (
        <div className="crud-section">
            <div className="crud-header">
                <h2>📚 Gestión de Catequizandos</h2>
                <button 
                    className="add-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '❌ Cancelar' : '➕ Nuevo Catequizando'}
                </button>
            </div>

            {loading && <div className="loading">Cargando...</div>}

            {showForm && (
                <div className="form-container">
                    <h3>{editId ? '✏️ Editar Catequizando' : '➕ Nuevo Catequizando'}</h3>
                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Nombres</label>
                                <input
                                    type="text"
                                    placeholder="Nombres completos"
                                    value={form.nombres}
                                    onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Apellidos</label>
                                <input
                                    type="text"
                                    placeholder="Apellidos completos"
                                    value={form.apellidos}
                                    onChange={(e) => setForm({ ...form, apellidos: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Contacto</label>
                                <input
                                    type="text"
                                    placeholder="Teléfono o email"
                                    value={form.contacto}
                                    onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    value={form.fechaNacimiento}
                                    onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={form.feBautismo}
                                        onChange={(e) => setForm({ ...form, feBautismo: e.target.checked })}
                                    />
                                    <span className="checkmark"></span>
                                    Presenta Fe de Bautismo
                                </label>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Guardando...' : (editId ? 'Actualizar' : 'Crear')}
                            </button>
                            <button type="button" onClick={resetForm} className="cancel-btn">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="data-section">
                <h3>📋 Lista de Catequizandos ({catequizandos.length})</h3>
                <div className="documents-container">
                    {catequizandos.map((doc) => (
                        <div key={doc._id} className="document-card">
                            <div className="card-header">
                                <h4>👤 {doc.nombres} {doc.apellidos}</h4>
                                <div className="card-actions">
                                    <button onClick={() => handleEdit(doc)} className="edit-btn" title="Editar">
                                        ✏️
                                    </button>
                                    <button onClick={() => handleDelete(doc._id)} className="delete-btn" title="Eliminar">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            
                            <div className="card-content">
                                <div className="info-row">
                                    <span className="label">📞 Contacto:</span>
                                    <span>{doc.contacto}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">🎂 Nacimiento:</span>
                                    <span>{doc.fecha_nacimiento ? new Date(doc.fecha_nacimiento).toLocaleDateString() : 'No especificado'}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">✝️ Fe Bautismo:</span>
                                    <span className={`status ${doc.fe_bautismo ? 'active' : 'inactive'}`}>
                                        {doc.fe_bautismo ? '✅ Sí' : '❌ No'}
                                    </span>
                                </div>
                                
                                {doc.sacramentos && doc.sacramentos.length > 0 && (
                                    <div className="subsection">
                                        <h5>🙏 Sacramentos:</h5>
                                        <ul className="list">
                                            {doc.sacramentos.map((sacramento, index) => (
                                                <li key={index} className="list-item">
                                                    <strong>{sacramento.tipo_sacramento}</strong>
                                                    <span>{sacramento.lugar} - {new Date(sacramento.fecha).toLocaleDateString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                {doc.inscripciones && doc.inscripciones.length > 0 && (
                                    <div className="subsection">
                                        <h5>📝 Inscripciones:</h5>
                                        <ul className="list">
                                            {doc.inscripciones.map((inscripcion, index) => (
                                                <li key={index} className="list-item">
                                                    <span className={`status ${inscripcion.estado.toLowerCase()}`}>
                                                        {inscripcion.estado}
                                                    </span>
                                                    <span>Inscrito: {new Date(inscripcion.fecha_inscripcion).toLocaleDateString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {catequizandos.length === 0 && !loading && (
                        <div className="empty-state">
                            <p>📝 No hay catequizandos registrados</p>
                            <button onClick={() => setShowForm(true)} className="add-btn">
                                Agregar el primero
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CrudCatequizandos;