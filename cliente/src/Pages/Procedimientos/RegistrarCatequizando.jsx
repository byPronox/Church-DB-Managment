import React, { useState } from 'react';
import axios from 'axios';

function RegistrarCatequizando() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        feBautismo: '',
        estado: '',
        idPersona: '',
        idInscripcion: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/api/catequizando/registrar', formData);
            alert('Catequizando registrado con éxito');
        } catch (error) {
            console.error(error);
            alert('Error al registrar');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombres" onChange={handleChange} placeholder="Nombres" required />
            <input name="apellidos" onChange={handleChange} placeholder="Apellidos" required />
            <input name="fechaNacimiento" type="date" onChange={handleChange} required />
            <input name="feBautismo" onChange={handleChange} placeholder="Fe de Bautismo" required />
            <input name="estado" onChange={handleChange} placeholder="Estado" required />
            <input name="idPersona" type="number" onChange={handleChange} placeholder="ID Persona" required />
            <input name="idInscripcion" type="number" onChange={handleChange} placeholder="ID Inscripción" required />
            <button type="submit">Registrar</button>
        </form>
    );
}

export default RegistrarCatequizando;