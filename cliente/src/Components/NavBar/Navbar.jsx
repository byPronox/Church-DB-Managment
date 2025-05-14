import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                        <Link to="/" onClick={toggleMenu}>Inicio</Link>
                    </li>
                    <li>
                        <Link to="/reglas-negocio" onClick={toggleMenu}>Reglas del Negocio</Link>
                    </li>
                    <li>
                        <Link to="/procedimientos" onClick={toggleMenu}>Procedimientos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;