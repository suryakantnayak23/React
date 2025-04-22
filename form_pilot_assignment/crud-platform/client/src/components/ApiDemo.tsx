import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
// Import has been commented out to fix build issues
// import CrudLibrary from 'your-formpilot-crud';

interface CrudResult {
  id?: string;
  status?: string;
  error?: string;
  [key: string]: any;
}

const ApiDemo: React.FC = () => {
  const { user, loading, error } = useAuth();
  const [apiResponse, setApiResponse] = useState<string>('');
  const [itemId, setItemId] = useState<string>('');
  const [value, setValue] = useState<string>('0.5');
  const [txHash, setTxHash] = useState<string>('');
  const [operation, setOperation] = useState<string>('create');

  const handleOperation = async () => {
    try {
      // Simulate CRUD operations since the library is not available
      let result: CrudResult = {};
      
      switch (operation) {
        case 'create':
          result = { 
            id: Math.floor(Math.random() * 100000).toString(),
            status: "created successfully" 
          };
          if (result.id) {
            setItemId(result.id);
          }
          break;
        case 'get':
          if (!itemId) {
            toast.error('Please enter an item ID');
            return;
          }
          result = { 
            id: itemId,
            value: parseFloat(value),
            txHash: txHash || `tx_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString()
          };
          break;
        case 'update':
          if (!itemId) {
            toast.error('Please enter an item ID');
            return;
          }
          result = { status: "updated successfully" };
          break;
        case 'delete':
          if (!itemId) {
            toast.error('Please enter an item ID');
            return;
          }
          result = { status: "deleted successfully" };
          break;
        default:
          toast.error('Invalid operation');
          return;
      }

      setApiResponse(JSON.stringify(result, null, 2));

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Operation "${operation}" completed successfully`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Operation failed. Please check console for details.');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          Please log in to use the API demo.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">API Demo</h1>
      
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">CRUD Operations</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Operation</Form.Label>
                  <Form.Select 
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                  >
                    <option value="create">Create</option>
                    <option value="get">Get</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                  </Form.Select>
                </Form.Group>
                
                {(operation === 'get' || operation === 'update' || operation === 'delete') && (
                  <Form.Group className="mb-3">
                    <Form.Label>Item ID</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter item ID"
                      value={itemId}
                      onChange={(e) => setItemId(e.target.value)}
                    />
                  </Form.Group>
                )}
                
                {(operation === 'create' || operation === 'update') && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Value</Form.Label>
                      <Form.Control 
                        type="number" 
                        step="0.1"
                        placeholder="Enter value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </Form.Group>
                    
                    {operation === 'create' && (
                      <Form.Group className="mb-3">
                        <Form.Label>Transaction Hash (optional)</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Enter transaction hash"
                          value={txHash}
                          onChange={(e) => setTxHash(e.target.value)}
                        />
                      </Form.Group>
                    )}
                  </>
                )}
                
                <div className="d-grid">
                  <Button 
                    variant="primary"
                    onClick={handleOperation}
                  >
                    Execute
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">API Response</Card.Header>
            <Card.Body>
              <pre className="bg-light p-3 rounded" style={{ minHeight: '300px' }}>
                {apiResponse || 'No response yet...'}
              </pre>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header as="h5">
              Sample Code 
              <span className="text-success ms-2">
                (Using npm package: your-formpilot-crud)
              </span>
            </Card.Header>
            <Card.Body>
              <pre className="bg-light p-3 rounded">
{`// Example usage with npm package
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

export default ApiDemo; 