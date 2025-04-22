import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ApiKeyManager: React.FC = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const generateNewApiKey = async () => {
    if (!user) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Mock API call - in a real app this would call your backend
      await new Promise(resolve => setTimeout(resolve, 500));
      setSuccess('New API key generated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate new API key');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <h1 className="mb-4">API Key Management</h1>
          
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>Your API Key</Card.Title>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <div className="d-flex mb-3">
                <Form.Control 
                  type="text" 
                  value="sample-api-key-for-testing" 
                  readOnly
                />
                <Button 
                  variant="outline-secondary" 
                  className="ms-2"
                  onClick={() => navigator.clipboard.writeText('sample-api-key-for-testing')}
                >
                  Copy
                </Button>
              </div>
              
              <p className="text-muted small">
                This key allows access to the CRUD API. Keep it secure and don't share it publicly.
              </p>
              
              <Button 
                variant="warning" 
                onClick={generateNewApiKey}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate New Key'}
              </Button>
              <Button 
                variant="link" 
                className="ms-2"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApiKeyManager; 