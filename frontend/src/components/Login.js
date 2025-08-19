import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';

function Login({ setCurrentPage }) {
    const [formData, setFormData] = useState({
        email: 'demo@example.com',
        password: 'password123'
    });
    const [error, setError] = useState('');
    const { login } = useTickets();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            login({
                name: 'Demo User',
                email: formData.email
            });
            setCurrentPage('view');
        } else {
            setError('Please enter both email and password');
        }
    };

    return (
        <div className="gradient-bg d-flex align-items-center justify-content-center p-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        <div className="card glass-card border-0">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div className="brand-icon d-inline-flex align-items-center justify-content-center">
                                        <i className="bi bi-ticket-perforated text-white" style={{ fontSize: '2rem' }}></i>
                                    </div>
                                    <h1 className="text-white-custom fw-bold mb-2" style={{ fontSize: '2.5rem' }}>Ticket App</h1>
                                    <p className="text-muted-custom">Streamline your support experience</p>
                                </div>

                                {error && (
                                    <div className="alert-danger-custom">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-white-custom fw-medium">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                            className="form-control form-control-modern"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-white-custom fw-medium">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                            className="form-control form-control-modern"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-gradient-primary w-100 py-3 fw-semibold mb-3">
                                        Sign In
                                    </button>

                                    <div className="text-center">
                                        <small className="text-muted-custom">Demo credentials are pre-filled</small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login;