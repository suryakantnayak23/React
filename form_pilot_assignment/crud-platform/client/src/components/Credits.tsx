import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Credits: React.FC = () => {
  const { user, refreshCredits } = useAuth();
  const [rechargeMessage, setRechargeMessage] = useState<string | null>(null);
  const [rechargeSuccess, setRechargeSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRechargeRequest = async () => {
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRechargeSuccess(true);
      setRechargeMessage('Your recharge request has been sent. We will process it shortly.');
      
      // In this demo, we'll just refresh the credits immediately
      refreshCredits();
    } catch (error) {
      setRechargeSuccess(false);
      setRechargeMessage('Failed to send recharge request. Please try again.');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container>
      <h1 className="mb-4">Credits Management</h1>
      
      <Row>
        <Col md={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header as="h5">Your API Credits</Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="display-1">{user.credits}</h2>
                <p className="lead">Remaining Credits</p>
                <p className="text-muted">Each CRUD operation consumes 1 credit</p>
              </div>
              
              <div className="mb-4">
                <h5>Credit Usage</h5>
                <ul>
                  <li>Creating an item: 1 credit</li>
                  <li>Reading an item: 1 credit</li>
                  <li>Updating an item: 1 credit</li>
                  <li>Deleting an item: 1 credit</li>
                </ul>
              </div>
              
              <div className="bg-light p-4 rounded mb-4">
                <h5>Need More Credits?</h5>
                <p>
                  You can request additional credits by clicking the button below.
                  Our team will process your request within 24 hours.
                </p>
                
                {rechargeMessage && (
                  <Alert variant={rechargeSuccess ? 'success' : 'danger'}>
                    {rechargeMessage}
                  </Alert>
                )}
                
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleRechargeRequest}
                  disabled={rechargeSuccess}
                >
                  Request Recharge
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header as="h5">API Usage Tips</Card.Header>
            <Card.Body>
              <h6>Optimize Your Requests</h6>
              <p>
                To make the most of your credits, consider these tips:
              </p>
              <ul className="small">
                <li>Batch your operations when possible</li>
                <li>Cache responses to avoid redundant reads</li>
                <li>Implement retry logic with backoff</li>
                <li>Use webhooks for real-time updates instead of polling</li>
              </ul>
              
              <hr />
              
              <h6>Need Enterprise Credits?</h6>
              <p className="small">
                For business use cases requiring higher limits, please contact our sales team at:
              </p>
              <p className="fw-bold">
                enterprise@yourapp.com
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <div className="d-flex justify-content-end">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default Credits; 