import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="brand-icon">⛪</span>
                    <span className="brand-text">Gestión Eclesiástica</span>
                </div>

                {/* Menu Icon for Mobile */}
                <div className={`menu-icon ${menuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
                    ☰
                </div>
                <div className={`close-icon ${menuOpen ? '' : 'hidden'}`} onClick={toggleMenu}>
                    ✖
                </div>

                {/* Navbar Links */}
                <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/" onClick={toggleMenu}>
                            <span className="nav-icon">🏠</span>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/reglas-negocio" onClick={toggleMenu}>
                            <span className="nav-icon">📋</span>
                            Reglas del Negocio
                        </Link>
                    </li>
                    <li>
                        <Link to="/crud" onClick={toggleMenu}>
                            <span className="nav-icon">⚙️</span>
                            Gestión
                        </Link>
                    </li>
                    <li>
                        <button className="logout-btn" onClick={onLogout}>
                            <span className="nav-icon">🚪</span>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;