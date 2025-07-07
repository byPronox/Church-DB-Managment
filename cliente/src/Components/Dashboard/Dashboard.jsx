import React from 'react';
import './Dashboard.css';

function Dashboard() {
    const stats = [
        {
            title: 'Catequizandos',
            count: '156',
            icon: '👥',
            color: '#4CAF50'
        },
        {
            title: 'Catequistas',
            count: '24',
            icon: '👨‍🏫',
            color: '#2196F3'
        },
        {
            title: 'Parroquias',
            count: '8',
            icon: '⛪',
            color: '#FF9800'
        },
        {
            title: 'Certificados',
            count: '89',
            icon: '📜',
            color: '#9C27B0'
        }
    ];

    const recentActivities = [
        'Nuevo catequizando registrado: María González',
        'Catequista asignado a Parroquia San José',
        'Certificado emitido para Juan Pérez',
        'Actualización de datos de Parroquia Central'
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Panel de Control</h1>
                <p>Resumen general del sistema de gestión eclesiástica</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{borderLeftColor: stat.color}}>
                        <div className="stat-icon" style={{color: stat.color}}>
                            {stat.icon}
                        </div>
                        <div className="stat-content">
                            <h3>{stat.count}</h3>
                            <p>{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="recent-activities">
                    <h2>Actividades Recientes</h2>
                    <div className="activities-list">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-dot"></div>
                                <span>{activity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="quick-actions">
                    <h2>Acciones Rápidas</h2>
                    <div className="actions-grid">
                        <button className="action-btn">
                            <span className="action-icon">➕</span>
                            Nuevo Catequizando
                        </button>
                        <button className="action-btn">
                            <span className="action-icon">👨‍🏫</span>
                            Nuevo Catequista
                        </button>
                        <button className="action-btn">
                            <span className="action-icon">⛪</span>
                            Nueva Parroquia
                        </button>
                        <button className="action-btn">
                            <span className="action-icon">📊</span>
                            Ver Reportes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
