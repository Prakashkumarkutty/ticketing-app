import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';

function AppNavbar({ currentPage, setCurrentPage }) {
    const { user, logout } = useTickets();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setCurrentPage('login');
    };

    if (!user) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
            <div className="container">
                <div className="navbar-brand d-flex align-items-center text-white-custom fw-bold">
                    <div className="brand-icon">
                        <i className="bi bi-ticket-perforated text-white"></i>
                    </div>
                    Ticket App
                </div>

                <button
                    className="navbar-toggler navbar-toggler-custom"
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse navbar-collapse-custom ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <button
                                onClick={() => setCurrentPage('view')}
                                className={`nav-link btn btn-link text-white-custom px-3 py-2 rounded-3 me-2 ${currentPage === 'view' ? 'bg-white bg-opacity-25' : ''
                                    }`}
                                style={{ textDecoration: 'none' }}
                            >
                                View Tickets
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={() => setCurrentPage('create')}
                                className={`nav-link btn btn-link text-white-custom px-3 py-2 rounded-3 me-2 ${currentPage === 'create' ? 'bg-white bg-opacity-25' : ''
                                    }`}
                                style={{ textDecoration: 'none' }}
                            >
                                Create Ticket
                            </button>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="navbar-text text-white-custom me-3">
                            Welcome, {user.name}
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-light btn-sm rounded-3" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AppNavbar;