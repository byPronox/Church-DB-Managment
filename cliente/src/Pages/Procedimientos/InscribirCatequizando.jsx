import React, { useState } from 'react';
import axios from 'axios';

function InscribirCatequizando() {
    const [formData, setFormData] = useState({
        idCatequizando: '',
        idNivel: '',
        fecha: '',
        estado: '',
        certificadoEmitido: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/catequizando/inscribir', formData);
            alert('Catequizando inscrito con éxito');
        } catch (error) {
            console.error(error);
            alert('Error al inscribir');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="idCatequizando" type="number" onChange={handleChange} placeholder="ID Catequizando" required />
            <input name="idNivel" type="number" onChange={handleChange} placeholder="ID Nivel" required />
            <input name="fecha" type="date" onChange={handleChange} required />
            <input name="estado" onChange={handleChange} placeholder="Estado" required />
            <input name="certificadoEmitido" onChange={handleChange} placeholder="Certificado Emitido" required />
            <button type="submit">Inscribir</button>
        </form>
    );
}

export default InscribirCatequizando;