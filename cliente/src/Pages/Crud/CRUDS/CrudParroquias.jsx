import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CrudParroquias() {
    const [parroquias, setParroquias] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        telefono: '',
        direccion: { calle: '', ciudad: '' },
        niveles_catequesis: [],
    });
    const [editId, setEditId] = useState(null);

    // Fetch parroquias from the backend
    const fetchParroquias = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/parroquia');
            setParroquias(res.data);
        } catch (error) {
            console.error('Error fetching parroquias:', error);
        }
    };

    useEffect(() => {
        fetchParroquias();
    }, []);

    // Handle form submission to create or update a parroquia
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                // Update existing parroquia
                await axios.put(`http://127.0.0.1:5000/api/parroquia/${editId}`, form);
                setEditId(null); // Reset editId after updating
            } else {
                // Create new parroquia
                await axios.post('http://127.0.0.1:5000/api/parroquia', form);
            }
            setForm({
                nombre: '',
                telefono: '',
                direccion: { calle: '', ciudad: '' },
                niveles_catequesis: [],
            });
            fetchParroquias();
        } catch (error) {
            console.error(`Error ${editId ? 'updating' : 'creating'} parroquia:`, error);
        }
    };

    // Handle delete action
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/parroquia/${id}`);
            fetchParroquias();
        } catch (error) {
            console.error('Error deleting parroquia:', error);
        }
    };

    // Handle edit action
    const handleEdit = (doc) => {
        setEditId(doc._id); // Set the ID of the document being edited
        setForm({
            nombre: doc.nombre,
            telefono: doc.telefono,
            direccion: doc.direccion,
            niveles_catequesis: doc.niveles_catequesis,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Nombre</label>
                <input
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                />
                <label className="form-label">Teléfono</label>
                <input
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    required
                />
                <label className="form-label">Dirección - Calle</label>
                <input
                    placeholder="Calle"
                    value={form.direccion.calle}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            direccion: { ...form.direccion, calle: e.target.value },
                        })
                    }
                    required
                />
                <label className="form-label">Dirección - Ciudad</label>
                <input
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
                <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
            </form>

            <div className="documents-container">
                {parroquias.map((doc) => (
                    <div key={doc._id} className="document-card">
                        <h3>Documento ID: {doc._id}</h3>
                        <p><strong>Nombre:</strong> {doc.nombre}</p>
                        <p><strong>Teléfono:</strong> {doc.telefono}</p>
                        <p><strong>Dirección:</strong> {doc.direccion.calle}, {doc.direccion.ciudad}</p>
                        <p><strong>Niveles Catequesis:</strong></p>
                        <ul>
                            {doc.niveles_catequesis.map((nivel, index) => (
                                <li key={index}>
                                    <p><strong>Nombre Nivel:</strong> {nivel.nombre_nivel}</p>
                                    <p><strong>Orden:</strong> {nivel.orden}</p>
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

export default CrudParroquias;