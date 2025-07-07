import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'admin') {
            onLogin();
            setError('');
        } else {
            setError('Credenciales incorrectas. Use admin/admin');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Sistema de Gestión Eclesiástica</h1>
                    <p>Ingrese sus credenciales para acceder</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Ingrese su usuario"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button type="submit" className="login-btn">
                        Iniciar Sesión
                    </button>
                </form>
                
                <div className="login-footer">
                    <p>Credenciales de prueba: admin / admin</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
