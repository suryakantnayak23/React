import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body className="text-center p-5">
              <h1 className="mb-4">Welcome to the CRUD API Platform</h1>
              <p className="lead mb-5">
                A simple and powerful API for managing your data with a credit-based system.
              </p>
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 