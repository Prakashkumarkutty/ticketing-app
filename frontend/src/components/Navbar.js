import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useTickets } from '../context/TicketContext';

function AppNavbar({ currentPage, setCurrentPage }) {
    const { user, logout } = useTickets();

    const handleLogout = () => {
        logout();
        setCurrentPage('login');
    };

    if (!user) return null;

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="#home">
                    <i className="bi bi-ticket-perforated me-2"></i>
                    Tickets
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            active={currentPage === 'view'}
                            onClick={() => setCurrentPage('view')}
                            style={{ cursor: 'pointer' }}
                        >
                            View Tickets
                        </Nav.Link>
                        <Nav.Link
                            active={currentPage === 'create'}
                            onClick={() => setCurrentPage('create')}
                            style={{ cursor: 'pointer' }}
                        >
                            Create Ticket
                        </Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        <Navbar.Text className="me-3">
                            Welcome, {user.name}
                        </Navbar.Text>
                        <Button variant="outline-light" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;