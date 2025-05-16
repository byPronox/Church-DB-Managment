import React, { useState } from 'react';
import axios from 'axios';
import './RegistrarCatequizando.css';

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
        <form className="registrar-catequizando-form" onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="nombres">Nombres</label>
            <input
                className="form-input"
                id="nombres"
                name="nombres"
                onChange={handleChange}
                placeholder="Ingrese los nombres"
                required
            />
            <label className="form-label" htmlFor="apellidos">Apellidos</label>
            <input
                className="form-input"
                id="apellidos"
                name="apellidos"
                onChange={handleChange}
                placeholder="Ingrese los apellidos"
                required
            />
            <label className="form-label" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
                className="form-input"
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                onChange={handleChange}
                required
            />
            <label className="form-label" htmlFor="feBautismo">Fe de Bautismo</label>
            <input
                className="form-input"
                id="feBautismo"
                name="feBautismo"
                onChange={handleChange}
                placeholder="Ingrese la fe de bautismo"
                required
            />
            <label className="form-label" htmlFor="estado">Estado</label>
            <input
                className="form-input"
                id="estado"
                name="estado"
                onChange={handleChange}
                placeholder="Ingrese el estado"
                required
            />
            <label className="form-label" htmlFor="idPersona">ID Persona</label>
            <input
                className="form-input"
                id="idPersona"
                name="idPersona"
                type="number"
                onChange={handleChange}
                placeholder="Ingrese el ID de la persona"
                required
            />
            <label className="form-label" htmlFor="idInscripcion">ID Inscripción</label>
            <input
                className="form-input"
                id="idInscripcion"
                name="idInscripcion"
                type="number"
                onChange={handleChange}
                placeholder="Ingrese el ID de inscripción"
                required
            />
            <button className="form-button" type="submit">
                Registrar
            </button>
        </form>
    );
}

export default RegistrarCatequizando;