import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin();
            setError('');
        } else {
            setError('Credenciales incorrectas. Usuario: admin, Contraseña: admin');
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingrese su usuario"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                required
                            />
                        </div>
                        
                        {error && <div className="error-message">{error}</div>}
                        
                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        <p>Sistema de Administración de la Iglesia</p>
                        <small>Desarrollado con ❤️ por byPronox</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
