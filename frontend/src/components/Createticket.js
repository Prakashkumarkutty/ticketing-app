import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useTickets } from '../context/TicketContext';

function CreateTicket({ setCurrentPage }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Low'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { createTicket, error } = useTickets();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createTicket(formData);
            setFormData({ title: '', description: '', priority: 'Low' });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Error creating ticket:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'danger';
            case 'Medium': return 'warning';
            default: return 'success';
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h4 className="mb-0">
                                <i className="bi bi-plus-circle me-2"></i>
                                Create New Ticket
                            </h4>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {showSuccess && (
                                <Alert variant="success" className="d-flex align-items-center">
                                    <i className="bi bi-check-circle me-2"></i>
                                    Ticket created successfully!
                                    <Button
                                        variant="link"
                                        className="ms-auto p-0"
                                        onClick={() => setCurrentPage('view')}
                                    >
                                        View All Tickets
                                    </Button>
                                </Alert>
                            )}

                            {error && (
                                <Alert variant="danger">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Title <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Brief summary of the issue"
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <Form.Text className="text-muted">
                                        Provide a clear, concise title for your issue
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Priority <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    >
                                        <option value="Low">🟢 Low - General inquiry or minor issue</option>
                                        <option value="Medium">🟡 Medium - Moderate impact on work</option>
                                        <option value="High">🔴 High - Critical issue blocking work</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        Description <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={6}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the issue in detail. Include steps to reproduce, expected behavior, and any error messages."
                                        required
                                        disabled={isSubmitting}
                                    />
                                    <Form.Text className="text-muted">
                                        The more details you provide, the faster we can resolve your issue
                                    </Form.Text>
                                </Form.Group>

                                {formData.priority && (
                                    <div className="mb-3">
                                        <span className="fw-bold">Selected Priority: </span>
                                        <span className={`badge bg-${getPriorityColor(formData.priority)}`}>
                                            {formData.priority}
                                        </span>
                                    </div>
                                )}

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setCurrentPage('view')}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Spinner size="sm" className="me-2" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-plus-circle me-2"></i>
                                                Create Ticket
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateTicket;