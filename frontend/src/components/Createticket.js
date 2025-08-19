import React, { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import AppNavbar from './Navbar';

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

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'High': return '🔴';
            case 'Medium': return '🟡';
            default: return '🟢';
        }
    };

    return (
        <div className="gradient-bg min-vh-100">
            <AppNavbar currentPage="create" setCurrentPage={setCurrentPage} />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        <div className="card glass-card border-0 shadow-lg">
                            <div className="card-header gradient-header text-white p-4">
                                <h4 className="mb-0 fw-bold d-flex align-items-center">
                                    <i className="bi bi-plus-circle me-3" style={{ fontSize: '1.5rem' }}></i>
                                    Create New Ticket
                                </h4>
                            </div>

                            <div className="card-body p-4">
                                {showSuccess && (
                                    <div className="alert-success-custom d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-check-circle me-2"></i>
                                            Ticket created successfully!
                                        </div>
                                        <button
                                            className="btn btn-link text-white text-decoration-underline p-0"
                                            onClick={() => setCurrentPage('view')}
                                        >
                                            View All Tickets
                                        </button>
                                    </div>
                                )}

                                {error && (
                                    <div className="alert-danger-custom">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label text-white-custom fw-medium">
                                            Title <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Brief summary of the issue"
                                            required
                                            disabled={isSubmitting}
                                            className="form-control form-control-modern"
                                        />
                                        <div className="form-text text-muted-custom">
                                            Provide a clear, concise title for your issue
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-white-custom fw-medium">
                                            Priority <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className="form-select form-select-modern"
                                        >
                                            <option value="Low">🟢 Low - General inquiry or minor issue</option>
                                            <option value="Medium">🟡 Medium - Moderate impact on work</option>
                                            <option value="High">🔴 High - Critical issue blocking work</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label text-white-custom fw-medium">
                                            Description <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            rows="6"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Describe the issue in detail. Include steps to reproduce, expected behavior, and any error messages."
                                            required
                                            disabled={isSubmitting}
                                            className="form-control form-control-modern"
                                        />
                                        <div className="form-text text-muted-custom">
                                            The more details you provide, the faster we can resolve your issue
                                        </div>
                                    </div>

                                    {formData.priority && (
                                        <div className="mb-4">
                                            <span className="text-white-custom fw-bold">Selected Priority: </span>
                                            <span className={`priority-${formData.priority.toLowerCase()}`}>
                                                {getPriorityIcon(formData.priority)} {formData.priority}
                                            </span>
                                        </div>
                                    )}

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button
                                            type="button"
                                            className="btn btn-outline-light rounded-3"
                                            onClick={() => setCurrentPage('view')}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-gradient-primary"
                                            disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-custom me-2"></span>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-plus-circle me-2"></i>
                                                    Create Ticket
                                                </>
                                            )}
                                        </button>
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

export default CreateTicket;