import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CrudCatequistas() {
    const [catequistas, setCatequistas] = useState([]);
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        rol: '',
        contacto: '',
    });
    const [editId, setEditId] = useState(null);

    // Fetch catequistas from the backend
    const fetchCatequistas = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/catequista');
            setCatequistas(res.data);
        } catch (error) {
            console.error('Error fetching catequistas:', error);
        }
    };

    useEffect(() => {
        fetchCatequistas();
    }, []);

    // Handle form submission to create or update a catequista
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update existing catequista
                await axios.put(`http://127.0.0.1:5000/api/catequista/${editId}`, form);
                setEditId(null); // Reset editId after updating
            } else {
                // Create new catequista
                await axios.post('http://127.0.0.1:5000/api/catequista', form);
            }
            setForm({
                nombres: '',
                apellidos: '',
                rol: '',
                contacto: '',
            });
            fetchCatequistas();
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'creating'} catequista:`, error);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/catequista/${id}`);
            fetchCatequistas();
        } catch (error) {
            console.error('Error deleting catequista:', error);
        }
    };

    // Handle edit action
    const handleEdit = (doc) => {
        setEditId(doc._id); // Set the ID of the document being edited
        setForm({
            nombres: doc.nombres,
            apellidos: doc.apellidos,
            rol: doc.rol,
            contacto: doc.contacto,
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
                <label className="form-label">Rol</label>
                <input
                    placeholder="Rol"
                    value={form.rol}
                    onChange={(e) => setForm({ ...form, rol: e.target.value })}
                    required
                />
                <label className="form-label">Contacto</label>
                <input
                    placeholder="Contacto"
                    value={form.contacto}
                    onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                    required
                />
                <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
            </form>

            <div className="documents-container">
                {catequistas.map((doc) => (
                    <div key={doc._id} className="document-card">
                        <h3>Documento ID: {doc._id}</h3>
                        <p><strong>Nombres:</strong> {doc.nombres}</p>
                        <p><strong>Apellidos:</strong> {doc.apellidos}</p>
                        <p><strong>Rol:</strong> {doc.rol}</p>
                        <p><strong>Contacto:</strong> {doc.contacto}</p>
                        <button onClick={() => handleEdit(doc)}>Editar</button>
                        <button onClick={() => handleDelete(doc._id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CrudCatequistas;