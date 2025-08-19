import React, { useState, useEffect } from 'react';
import { useTickets } from '../context/TicketContext';
import AppNavbar from './Navbar';

function ViewTickets({ setCurrentPage }) {
    const { tickets, loading, error, updateTicket, fetchTickets } = useTickets();
    const [filter, setFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const getPriorityClass = (priority) => {
        return `priority-${priority.toLowerCase()}`;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Open': return 'status-open';
            case 'In Progress': return 'status-progress';
            case 'Closed': return 'status-closed';
            default: return 'status-open';
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
            <div className="gradient-bg min-vh-100">
                <AppNavbar currentPage="view" setCurrentPage={setCurrentPage} />
                <div className="container text-center py-5">
                    <div className="spinner-custom d-inline-block" style={{ width: '3rem', height: '3rem' }}></div>
                    <p className="text-white-custom mt-3 fs-5">Loading tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="gradient-bg min-vh-100">
            <AppNavbar currentPage="view" setCurrentPage={setCurrentPage} />

            <div className="container py-4">
                <div className="row mb-4">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <h2 className="text-white-custom fw-bold d-flex align-items-center">
                                <i className="bi bi-ticket-perforated me-3" style={{ fontSize: '2rem' }}></i>
                                Your Tickets
                            </h2>
                            <button
                                className="btn btn-gradient-success mt-2 mt-md-0"
                                onClick={() => setCurrentPage('create')}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                New Ticket
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="alert-danger-custom mb-4">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </div>
                )}

                {/* Filter Buttons */}
                <div className="row mb-4">
                    <div className="col">
                        <div className="d-flex flex-wrap gap-3">
                            {[
                                { key: 'all', label: 'All Tickets', count: ticketCounts.all },
                                { key: 'open', label: 'Open', count: ticketCounts.open },
                                { key: 'in_progress', label: 'In Progress', count: ticketCounts.in_progress },
                                { key: 'closed', label: 'Closed', count: ticketCounts.closed }
                            ].map(({ key, label, count }) => (
                                <button
                                    key={key}
                                    className={`btn filter-btn d-flex align-items-center ${filter === key ? 'active' : ''}`}
                                    onClick={() => setFilter(key)}
                                >
                                    {label}
                                    <span className="badge-custom badge-light ms-2">
                                        {count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredTickets.length === 0 ? (
                    <div className="card ticket-card text-center py-5 border-0">
                        <div className="card-body">
                            <i className="bi bi-inbox text-muted" style={{ fontSize: '4rem' }}></i>
                            <h4 className="mt-3 text-muted">No tickets found</h4>
                            <p className="text-muted">
                                {filter === 'all'
                                    ? "You haven't created any tickets yet."
                                    : `No ${filter.replace('_', ' ')} tickets found.`
                                }
                            </p>
                            {filter === 'all' && (
                                <button className="btn btn-gradient-primary" onClick={() => setCurrentPage('create')}>
                                    Create Your First Ticket
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {filteredTickets.map(ticket => (
                            <div key={ticket.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <div className="card ticket-card h-100 border-0">
                                    <div className="card-header d-flex justify-content-between align-items-start bg-light border-0">
                                        <div>
                                            <span className={getPriorityClass(ticket.priority)}>
                                                {ticket.priority}
                                            </span>
                                            <span className={`${getStatusClass(ticket.status)} ms-2`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <small className="text-muted">
                                            {formatDate(ticket.created_at)}
                                        </small>
                                    </div>

                                    <div className="card-body">
                                        <h6 className="card-title mb-2 fw-bold" style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {ticket.title}
                                        </h6>
                                        <p className="card-text small text-muted" style={{
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {ticket.description}
                                        </p>
                                    </div>

                                    <div className="card-footer bg-transparent border-0">
                                        <div className="d-flex flex-wrap gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary rounded-3"
                                                onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <i className="bi bi-eye me-1"></i>
                                                View
                                            </button>

                                            {ticket.status === 'Open' && (
                                                <button
                                                    className="btn btn-sm btn-gradient-warning"
                                                    onClick={() => handleStatusUpdate(ticket.id, 'In Progress')}
                                                >
                                                    <i className="bi bi-play me-1"></i>
                                                    Start
                                                </button>
                                            )}

                                            {ticket.status === 'In Progress' && (
                                                <button
                                                    className="btn btn-sm btn-gradient-success"
                                                    onClick={() => handleStatusUpdate(ticket.id, 'Closed')}
                                                >
                                                    <i className="bi bi-check me-1"></i>
                                                    Close
                                                </button>
                                            )}

                                            {ticket.status === 'Closed' && (
                                                <button
                                                    className="btn btn-sm btn-gradient-primary"
                                                    onClick={() => handleStatusUpdate(ticket.id, 'Open')}
                                                >
                                                    <i className="bi bi-arrow-clockwise me-1"></i>
                                                    Reopen
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Ticket Detail Modal */}
                {showModal && (
                    <>
                        <div className="modal-backdrop-custom" onClick={() => setShowModal(false)}></div>
                        <div className="modal-custom">
                            <div className="modal-content-custom">
                                <div className="modal-header p-4 border-bottom">
                                    <h5 className="modal-title fw-bold">Ticket Details</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                        style={{ background: 'none', border: 'none', fontSize: '1.5rem' }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="modal-body p-4">
                                    {selectedTicket && (
                                        <>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <h5 className="fw-bold">{selectedTicket.title}</h5>
                                                    <div className="mb-3">
                                                        <span className={`${getPriorityClass(selectedTicket.priority)} me-2`}>
                                                            {selectedTicket.priority} Priority
                                                        </span>
                                                        <span className={getStatusClass(selectedTicket.status)}>
                                                            {selectedTicket.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-sm-6">
                                                    <strong>Created:</strong> {formatDate(selectedTicket.created_at)}
                                                </div>
                                                <div className="col-sm-6">
                                                    <strong>Last Updated:</strong> {formatDate(selectedTicket.updated_at)}
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <strong>Description:</strong>
                                                    <div className="mt-2 p-3 bg-light rounded" style={{ whiteSpace: 'pre-wrap' }}>
                                                        {selectedTicket.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="modal-footer p-4 border-top">
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-3"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ViewTickets;