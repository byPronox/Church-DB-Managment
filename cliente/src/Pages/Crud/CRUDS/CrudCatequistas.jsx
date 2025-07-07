import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Crud.css';

function CrudCatequistas() {
    const [catequistas, setCatequistas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        rol: '',
        contacto: '',
    });
    const [editId, setEditId] = useState(null);

    // Fetch catequistas from the backend
    const fetchCatequistas = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/catequista');
            setCatequistas(res.data);
        } catch (error) {
            console.error('Error fetching catequistas:', error);
            alert('Error al cargar los catequistas. Verifique la conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatequistas();
    }, []);

    // Reset form
    const resetForm = () => {
        setForm({
            nombres: '',
            apellidos: '',
            rol: '',
            contacto: '',
        });
        setEditId(null);
        setShowForm(false);
    };

    // Handle form submission to create or update a catequista
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                // Update existing catequista
                await axios.put(`http://127.0.0.1:5000/api/catequista/${editId}`, form);
                alert('Catequista actualizado exitosamente');
            } else {
                // Create new catequista
                await axios.post('http://127.0.0.1:5000/api/catequista', form);
                alert('Catequista creado exitosamente');
            }
            resetForm();
            fetchCatequistas();
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'creating'} catequista:`, error);
            alert(`Error al ${editId ? 'actualizar' : 'crear'} el catequista`);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este catequista?')) {
            setLoading(true);
            try {
                await axios.delete(`http://127.0.0.1:5000/api/catequista/${id}`);
                alert('Catequista eliminado exitosamente');
                fetchCatequistas();
            } catch (error) {
                console.error('Error deleting catequista:', error);
                alert('Error al eliminar el catequista');
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
            rol: doc.rol,
            contacto: doc.contacto,
        });
        setShowForm(true);
    };

    return (
        <div className="crud-section">
            <div className="crud-header">
                <h2>👨‍🏫 Gestión de Catequistas</h2>
                <button 
                    className="add-btn"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '❌ Cancelar' : '➕ Nuevo Catequista'}
                </button>
            </div>

            {loading && <div className="loading">Cargando...</div>}

            {showForm && (
                <div className="form-container">
                    <h3>{editId ? '✏️ Editar Catequista' : '➕ Nuevo Catequista'}</h3>
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
                                <label className="form-label">Rol</label>
                                <select
                                    value={form.rol}
                                    onChange={(e) => setForm({ ...form, rol: e.target.value })}
                                    required
                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="Coordinador">Coordinador</option>
                                    <option value="Catequista Principal">Catequista Principal</option>
                                    <option value="Catequista Auxiliar">Catequista Auxiliar</option>
                                    <option value="Voluntario">Voluntario</option>
                                </select>
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
                <h3>📋 Lista de Catequistas ({catequistas.length})</h3>
                <div className="documents-container">
                    {catequistas.map((doc) => (
                        <div key={doc._id} className="document-card">
                            <div className="card-header">
                                <h4>👨‍🏫 {doc.nombres} {doc.apellidos}</h4>
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
                                    <span className="label">📋 Rol:</span>
                                    <span className="status active">{doc.rol}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">📞 Contacto:</span>
                                    <span>{doc.contacto}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {catequistas.length === 0 && !loading && (
                        <div className="empty-state">
                            <p>👨‍🏫 No hay catequistas registrados</p>
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

export default CrudCatequistas;