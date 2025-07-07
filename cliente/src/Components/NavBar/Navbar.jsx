import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        onLogout();
        setMenuOpen(false);
    };

    return (
        <nav>
            <div className="navbar-container">
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
                        <Link to="/" onClick={toggleMenu}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/reglas-negocio" onClick={toggleMenu}>Reglas del Negocio</Link>
                    </li>
                    <li>
                        <Link to="/procedimientos" onClick={toggleMenu}>Procedimientos</Link>
                    </li>
                    <li>
                        <Link to="/crud" onClick={toggleMenu}>CRUD</Link>
                    </li>
                    <li>
                        <button 
                            className="logout-button" 
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;