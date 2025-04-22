import React from 'react';
import { Container, Card, Alert, ListGroup } from 'react-bootstrap';

const EmailSetup: React.FC = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h4" className="bg-primary text-white">
          Setting Up Real Email Sending with EmailJS
        </Card.Header>
        <Card.Body>
          <Alert variant="info">
            This guide explains how to set up EmailJS to send real emails with your API credentials.
          </Alert>
          
          <h5 className="mb-4">Steps to Configure EmailJS:</h5>
          
          <ListGroup variant="flush" numbered>
            <ListGroup.Item>
              <h6>Create an EmailJS Account</h6>
              <p>Visit <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer">EmailJS.com</a> and sign up for a free account.</p>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h6>Create an Email Service</h6>
              <p>
                In the EmailJS dashboard, go to "Email Services" and click "Add New Service".
                You can connect to Gmail, Outlook, or other email providers.
              </p>
              <Alert variant="secondary" className="p-2">
                <small>Note: Remember the <strong>Service ID</strong> as you'll need it later.</small>
              </Alert>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h6>Create an Email Template</h6>
              <p>
                Go to "Email Templates" and click "Create New Template".
                Design your email with the following variables:
              </p>
              <pre className="bg-light p-3 rounded">
{`Subject: Your CRUD API Credentials

Hello {{to_name}},

Here are your CRUD API credentials:

API URL: {{api_url}}
API Key: {{api_key}}
Initial Credits: {{credits}}

To use these credentials in your code:

// JavaScript example:
process.env.CRUD_API_URL = '{{api_url}}';
process.env.CRUD_API_KEY = '{{api_key}}';

Thank you for using our service!

Regards,
{{from_name}}`}
              </pre>
              <Alert variant="secondary" className="p-2">
                <small>Note: Remember the <strong>Template ID</strong> as you'll need it later.</small>
              </Alert>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h6>Get Your User ID</h6>
              <p>
                Go to "Account" → "API Keys" to find your <strong>User ID</strong>.
              </p>
            </ListGroup.Item>
            
            <ListGroup.Item>
              <h6>Update Your Code</h6>
              <p>
                Open <code>src/context/AuthContext.tsx</code> and update these values:
              </p>
              <pre className="bg-light p-3 rounded">
{`// Initialize EmailJS
emailjs.init("YOUR_USER_ID"); // Replace with your User ID

// In the sendCredentialsEmail function:
const response = await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your Service ID
  'YOUR_TEMPLATE_ID', // Replace with your Template ID
  templateParams
);`}
              </pre>
            </ListGroup.Item>
          </ListGroup>
          
          <Alert variant="success" className="mt-4">
            <Alert.Heading>That's it!</Alert.Heading>
            <p>
              Now when users sign up, they will receive an email with their API credentials.
              The free tier of EmailJS allows 200 emails per month, which should be sufficient for testing.
            </p>
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmailSetup; 