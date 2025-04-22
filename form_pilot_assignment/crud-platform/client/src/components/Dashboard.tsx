import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard: React.FC = () => {
  const { user, loading, error, refreshUser, sendCredentialsEmail } = useAuth();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Refresh user data when component mounts
    refreshUser();
  }, [refreshUser]);

  const handleSendCredentials = async () => {
    if (!user || !user.email) return;
    
    setSending(true);
    try {
      await sendCredentialsEmail(user.email, user.apiKey, user.apiUrl, user.name);
      toast.success(`Credentials email sent to ${user.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container>
      <Card className="my-4 bg-light border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0">
                Welcome, <span className="text-primary">{user.name}</span>!
              </h2>
              <p className="text-muted mb-0">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </Col>
            <Col xs="auto">
              <div className="bg-primary text-white rounded-circle p-3">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <h1 className="mb-4">Dashboard</h1>
      
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header as="h5">Your API Credentials</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6>API URL</h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={user.apiUrl || `${window.location.origin}/api`}
                    readOnly
                  />
                  <Button 
                    variant="outline-secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(user.apiUrl || `${window.location.origin}/api`);
                      toast.success('API URL copied to clipboard');
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              
              <div className="mb-3">
                <h6>API Key</h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={user.apiKey}
                    readOnly
                  />
                  <Button 
                    variant="outline-secondary"
                    onClick={() => {
                      navigator.clipboard.writeText(user.apiKey);
                      toast.success('API Key copied to clipboard');
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              
              <Alert variant="info">
                Use these credentials to authenticate your requests to our CRUD API.
              </Alert>

              <div className="d-grid">
                <Button 
                  variant="outline-primary"
                  onClick={handleSendCredentials}
                  disabled={sending}
                >
                  <i className="bi bi-envelope"></i> {sending ? 'Sending...' : `Send Credentials to ${user.email}`}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header as="h5">API Credits</Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="display-4">{user.credits}</h2>
                <p>Remaining Credits</p>
              </div>
              
              {user.credits <= 1 && (
                <Alert variant="warning">
                  <p className="mb-0">
                    <strong>Low on credits!</strong> When credits are exhausted, please send an email to <strong>support@yourapp.com</strong> with subject "Please recharge my credits".
                  </p>
                </Alert>
              )}
              
              <div className="d-grid">
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/credits')}
                >
                  Manage Credits
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header as="h5">How to Use</Card.Header>
            <Card.Body>
              <h6>Step 1: Install the NPM Package</h6>
              <pre className="bg-light p-3 rounded">
                npm install your-formpilot-crud
              </pre>
              
              <h6 className="mt-4">Step 2: Configure</h6>
              <pre className="bg-light p-3 rounded">
{`// Set environment variables
CRUD_API_URL=${user.apiUrl || `${window.location.origin}/api`}
CRUD_API_KEY=${user.apiKey}

// Or set programmatically
process.env.CRUD_API_URL = '${user.apiUrl || `${window.location.origin}/api`}';
process.env.CRUD_API_KEY = '${user.apiKey}';`}
              </pre>
              
              <h6 className="mt-4">Step 3: Use the CRUD Library</h6>
              <pre className="bg-light p-3 rounded">
{`// Example usage
const Crublibrary = require('your-formpilot-crud');

// Create a new item
const response1 = await Crublibrary.create({ value: 0.5, txHash: "32424" });
// Output: { id: "32872", status: "created successfully" }

// Get an item by ID
const response2 = await Crublibrary.get("32872");
// Output: { value: 0.5, txHash: "0x..." }

// Update an item by ID
const response3 = await Crublibrary.update("32872", { value: 0.9 });
// Output: { status: "updated successfully" }

// Delete an item by ID
const response5 = await Crublibrary.delete("32872");
// Output: { status: "deleted successfully" }`}
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 