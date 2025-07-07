import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Crud.css';

function CrudParroquias() {
    const [parroquias, setParroquias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        telefono: '',
        direccion: { calle: '', ciudad: '' },
        niveles_catequesis: [],
    });
    const [editId, setEditId] = useState(null);

    // Fetch parroquias from the backend
    const fetchParroquias = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/parroquia');
            setParroquias(res.data);
        } catch (error) {
            console.error('Error fetching parroquias:', error);
            alert('Error al cargar las parroquias. Verifique la conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParroquias();
    }, []);

    // Reset form
    const resetForm = () => {
        setForm({
            nombre: '',
            telefono: '',
            direccion: { calle: '', ciudad: '' },
            niveles_catequesis: [],
        });
        setEditId(null);
        setShowForm(false);
    };

    // Handle form submission to create or update a parroquia
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                // Update existing parroquia
                await axios.put(`http://127.0.0.1:5000/api/parroquia/${editId}`, form);
                alert('Parroquia actualizada exitosamente');
            } else {
                // Create new parroquia
                await axios.post('http://127.0.0.1:5000/api/parroquia', form);
                alert('Parroquia creada exitosamente');
            }
            resetForm();
            fetchParroquias();
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'creating'} parroquia:`, error);
            alert(`Error al ${editId ? 'actualizar' : 'crear'} la parroquia`);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta parroquia?')) {
            setLoading(true);
            try {
                await axios.delete(`http://127.0.0.1:5000/api/parroquia/${id}`);
                alert('Parroquia eliminada exitosamente');
                fetchParroquias();
            } catch (error) {
                console.error('Error deleting parroquia:', error);
                alert('Error al eliminar la parroquia');
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle edit action
    const handleEdit = (doc) => {
        setEditId(doc._id);
        setForm({
            nombre: doc.nombre,
            telefono: doc.telefono,
            direccion: doc.direccion || { calle: '', ciudad: '' },
            niveles_catequesis: doc.niveles_catequesis || [],
        });
        setShowForm(true);
    };

    return (
        <div className="crud-section">
            <div className="crud-header">
                <h2>⛪ Gestión de Parroquias</h2>
                <button 
                    className="add-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '❌ Cancelar' : '➕ Nueva Parroquia'}
                </button>
            </div>

            {loading && <div className="loading">Cargando...</div>}

            {showForm && (
                <div className="form-container">
                    <h3>{editId ? '✏️ Editar Parroquia' : '➕ Nueva Parroquia'}</h3>
                    <form onSubmit={handleSubmit} className="modern-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Nombre de la Parroquia</label>
                                <input
                                    type="text"
                                    placeholder="Nombre completo de la parroquia"
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Teléfono</label>
                                <input
                                    type="tel"
                                    placeholder="Número de teléfono"
                                    value={form.telefono}
                                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Calle</label>
                                <input
                                    type="text"
                                    placeholder="Dirección de la calle"
                                    value={form.direccion.calle}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            direccion: { ...form.direccion, calle: e.target.value },
                                        })
                                    }
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Ciudad</label>
                                <input
                                    type="text"
                                    placeholder="Ciudad"
                                    value={form.direccion.ciudad}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            direccion: { ...form.direccion, ciudad: e.target.value },
                                        })
                                    }
                                    required
                                />
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
                <h3>📋 Lista de Parroquias ({parroquias.length})</h3>
                <div className="documents-container">
                    {parroquias.map((doc) => (
                        <div key={doc._id} className="document-card">
                            <div className="card-header">
                                <h4>⛪ {doc.nombre}</h4>
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
                                    <span className="label">📞 Teléfono:</span>
                                    <span>{doc.telefono}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">📍 Dirección:</span>
                                    <span>{doc.direccion?.calle}, {doc.direccion?.ciudad}</span>
                                </div>
                                
                                {doc.niveles_catequesis && doc.niveles_catequesis.length > 0 && (
                                    <div className="subsection">
                                        <h5>📚 Niveles de Catequesis:</h5>
                                        <ul className="list">
                                            {doc.niveles_catequesis.map((nivel, index) => (
                                                <li key={index} className="list-item">
                                                    <span><strong>{nivel.nombre}</strong></span>
                                                    <span>Duración: {nivel.duracion_meses} meses</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {parroquias.length === 0 && !loading && (
                        <div className="empty-state">
                            <p>⛪ No hay parroquias registradas</p>
                            <button onClick={() => setShowForm(true)} className="add-btn">
                                Agregar la primera
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CrudParroquias;