import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner, Modal } from 'react-bootstrap';
import { useTickets } from '../context/TicketContext';

function ViewTickets({ setCurrentPage }) {
    const { tickets, loading, error, updateTicket, fetchTickets } = useTickets();
    const [filter, setFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'danger';
            case 'Medium': return 'warning';
            default: return 'success';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'primary';
            case 'In Progress': return 'warning';
            case 'Closed': return 'success';
            default: return 'secondary';
        }
    };

    const handleStatusUpdate = async (ticketId, newStatus) => {
        try {
            await updateTicket(ticketId, { status: newStatus });
        } catch (error) {
            console.error('Error updating ticket:', error);
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        if (filter === 'all') return true;
        return ticket.status.toLowerCase().replace(' ', '_') === filter;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const ticketCounts = {
        all: tickets.length,
        open: tickets.filter(t => t.status === 'Open').length,
        in_progress: tickets.filter(t => t.status === 'In Progress').length,
        closed: tickets.filter(t => t.status === 'Closed').length
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3">Loading tickets...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <h2>
                            <i className="bi bi-ticket-perforated me-2"></i>
                            Tickets
                        </h2>
                        <Button
                            variant="primary"
                            onClick={() => setCurrentPage('create')}
                            className="mt-2 mt-md-0"
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            New Ticket
                        </Button>
                    </div>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" className="mb-4">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                </Alert>
            )}

            {/* Filter Tabs */}
            <Row className="mb-4">
                <Col>
                    <div className="d-flex flex-wrap gap-2">
                        {[
                            { key: 'all', label: 'All', count: ticketCounts.all },
                            { key: 'open', label: 'Open', count: ticketCounts.open },
                            { key: 'in_progress', label: 'In Progress', count: ticketCounts.in_progress },
                            { key: 'closed', label: 'Closed', count: ticketCounts.closed }
                        ].map(({ key, label, count }) => (
                            <Button
                                key={key}
                                variant={filter === key ? 'primary' : 'outline-primary'}
                                onClick={() => setFilter(key)}
                                className="d-flex align-items-center"
                            >
                                {label}
                                <Badge bg={filter === key ? 'light' : 'primary'} text="dark" className="ms-2">
                                    {count}
                                </Badge>
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>

            {filteredTickets.length === 0 ? (
                <Card className="text-center py-5">
                    <Card.Body>
                        <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                        <h4 className="mt-3">No tickets found</h4>
                        <p className="text-muted">
                            {filter === 'all'
                                ? "You haven't created any tickets yet."
                                : `No ${filter.replace('_', ' ')} tickets found.`
                            }
                        </p>
                        {filter === 'all' && (
                            <Button variant="primary" onClick={() => setCurrentPage('create')}>
                                Create Your First Ticket
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {filteredTickets.map(ticket => (
                        <Col key={ticket.id} xs={12} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Header className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <Badge bg={getPriorityColor(ticket.priority)} className="me-2">
                                            {ticket.priority}
                                        </Badge>
                                        <Badge bg={getStatusColor(ticket.status)}>
                                            {ticket.status}
                                        </Badge>
                                    </div>
                                    <small className="text-muted">
                                        {formatDate(ticket.created_at)}
                                    </small>
                                </Card.Header>

                                <Card.Body>
                                    <Card.Title className="h6 mb-2" style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {ticket.title}
                                    </Card.Title>
                                    <Card.Text className="small text-muted" style={{
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {ticket.description}
                                    </Card.Text>
                                </Card.Body>

                                <Card.Footer className="bg-transparent">
                                    <div className="d-flex flex-wrap gap-1">
                                        <Button
                                            size="sm"
                                            variant="outline-info"
                                            onClick={() => {
                                                setSelectedTicket(ticket);
                                                setShowModal(true);
                                            }}
                                        >
                                            <i className="bi bi-eye me-1"></i>
                                            View
                                        </Button>

                                        {ticket.status === 'Open' && (
                                            <Button
                                                size="sm"
                                                variant="outline-warning"
                                                onClick={() => handleStatusUpdate(ticket.id, 'In Progress')}
                                            >
                                                <i className="bi bi-play me-1"></i>
                                                Start
                                            </Button>
                                        )}

                                        {ticket.status === 'In Progress' && (
                                            <Button
                                                size="sm"
                                                variant="outline-success"
                                                onClick={() => handleStatusUpdate(ticket.id, 'Closed')}
                                            >
                                                <i className="bi bi-check me-1"></i>
                                                Close
                                            </Button>
                                        )}

                                        {ticket.status === 'Closed' && (
                                            <Button
                                                size="sm"
                                                variant="outline-primary"
                                                onClick={() => handleStatusUpdate(ticket.id, 'Open')}
                                            >
                                                <i className="bi bi-arrow-clockwise me-1"></i>
                                                Reopen
                                            </Button>
                                        )}
                                        {/* <select
                                            className="form-select form-select-sm w-auto"
                                            value={ticket.status}
                                            onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select> */}
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Ticket Detail Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Ticket Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTicket && (
                        <>
                            <Row className="mb-3">
                                <Col>
                                    <h5>{selectedTicket.title}</h5>
                                    <div className="mb-3">
                                        <Badge bg={getPriorityColor(selectedTicket.priority)} className="me-2">
                                            {selectedTicket.priority} Priority
                                        </Badge>
                                        <Badge bg={getStatusColor(selectedTicket.status)}>
                                            {selectedTicket.status}
                                        </Badge>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong>Created:</strong> {formatDate(selectedTicket.created_at)}
                                </Col>
                                <Col sm={6}>
                                    <strong>Last Updated:</strong> {formatDate(selectedTicket.updated_at)}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <strong>Description:</strong>
                                    <div className="mt-2 p-3 bg-light rounded">
                                        {selectedTicket.description}
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default ViewTickets;