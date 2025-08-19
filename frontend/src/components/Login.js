import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
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
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <i className="bi bi-ticket-perforated" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                                <h3 className="mt-2">Ticketing App</h3>
                                <p className="text-muted">Sign in to manage your tickets</p>
                            </div>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit" variant="primary" className="w-100 mb-3">
                                    Sign In
                                </Button>

                                <div className="text-center">
                                    <small className="text-muted">
                                        Demo credentials are pre-filled
                                    </small>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;