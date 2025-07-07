import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [stats, setStats] = useState({
        totalCatequizandos: 125,
        asistenciasHoy: 23,
        certificadosEmitidos: 45,
        evaluacionesPendientes: 8
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const quickActions = [
        {
            title: 'Registrar Catequizando',
            description: 'Agregar nuevo catequizando al sistema',
            icon: '👤',
            link: '/procedimientos/registrar-catequizando',
            color: 'blue'
        },
        {
            title: 'Registrar Asistencia',
            description: 'Marcar asistencia de catequizandos',
            icon: '✅',
            link: '/procedimientos',
            color: 'green'
        },
        {
            title: 'Emitir Certificado',
            description: 'Generar certificados de catequesis',
            icon: '🎓',
            link: '/procedimientos',
            color: 'purple'
        },
        {
            title: 'CRUD Gestión',
            description: 'Administrar registros completos',
            icon: '⚙️',
            link: '/crud',
            color: 'orange'
        }
    ];

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1>¡Bienvenido al Sistema de Gestión Eclesiástica!</h1>
                    <p>Panel de administración para la gestión de catequizandos</p>
                </div>
                <div className="time-section">
                    <div className="current-time">{formatTime(currentTime)}</div>
                    <div className="current-date">{formatDate(currentTime)}</div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>{stats.totalCatequizandos}</h3>
                        <p>Total Catequizandos</p>
                    </div>
                </div>
                <div className="stat-card green">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>{stats.asistenciasHoy}</h3>
                        <p>Asistencias Hoy</p>
                    </div>
                </div>
                <div className="stat-card purple">
                    <div className="stat-icon">🎓</div>
                    <div className="stat-content">
                        <h3>{stats.certificadosEmitidos}</h3>
                        <p>Certificados Emitidos</p>
                    </div>
                </div>
                <div className="stat-card orange">
                    <div className="stat-icon">⏰</div>
                    <div className="stat-content">
                        <h3>{stats.evaluacionesPendientes}</h3>
                        <p>Evaluaciones Pendientes</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h2>Acciones Rápidas</h2>
                <div className="actions-grid">
                    {quickActions.map((action, index) => (
                        <a 
                            key={index} 
                            href={action.link} 
                            className={`action-card ${action.color}`}
                        >
                            <div className="action-icon">{action.icon}</div>
                            <div className="action-content">
                                <h3>{action.title}</h3>
                                <p>{action.description}</p>
                            </div>
                            <div className="action-arrow">→</div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity-section">
                <h2>Actividad Reciente</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-icon blue">👤</div>
                        <div className="activity-content">
                            <h4>Nuevo catequizando registrado</h4>
                            <p>María González se registró en el nivel inicial</p>
                            <span className="activity-time">Hace 2 horas</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-icon green">✅</div>
                        <div className="activity-content">
                            <h4>Asistencias registradas</h4>
                            <p>23 asistencias marcadas para la clase de hoy</p>
                            <span className="activity-time">Hace 4 horas</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-icon purple">🎓</div>
                        <div className="activity-content">
                            <h4>Certificado emitido</h4>
                            <p>Certificado de confirmación para Juan Pérez</p>
                            <span className="activity-time">Ayer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
