import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return '';
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">CRUD API Platform</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/api-demo">API Demo</Nav.Link>
                <Nav.Link as={Link} to="/credits">Credits</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/email-setup">Email Setup</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-3">
                  <div 
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                    style={{ width: '30px', height: '30px', fontSize: '14px' }}
                  >
                    {getUserInitials()}
                  </div>
                  <span className="text-light ms-1">{user.name}</span>
                </div>
                <Badge bg="info" className="me-3">
                  Credits: {user.credits}
                </Badge>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 