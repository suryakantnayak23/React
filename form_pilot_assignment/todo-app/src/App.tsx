import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// Import the Crublibrary - this is linked from our local package
const Crublibrary = require('your-formpilot-crud');

interface Todo {
  id: string;
  value: number;
  txHash: string;
}

interface ApiCredentials {
  apiUrl: string;
  apiKey: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [creditsExhausted, setCreditsExhausted] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<ApiCredentials>({
    apiUrl: localStorage.getItem('CRUD_API_URL') || '',
    apiKey: localStorage.getItem('CRUD_API_KEY') || ''
  });
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedApiUrl = localStorage.getItem('CRUD_API_URL');
    const savedApiKey = localStorage.getItem('CRUD_API_KEY');
    
    if (savedApiUrl && savedApiKey) {
      setCredentials({
        apiUrl: savedApiUrl,
        apiKey: savedApiKey
      });
      setIsConfigured(true);
      
      // Set the credentials on the Crublibrary
      Crublibrary.setCredentials(savedApiUrl, savedApiKey);
    }
    
    setLoading(false);
  }, []);

  // Handle API errors
  const handleApiError = (err: any) => {
    console.error('API Error:', err);
    const errorMessage = err.message || 'An unknown error occurred';
    
    // Check if the error is due to exhausted credits
    if (errorMessage.includes('Request limit exceeded')) {
      setCreditsExhausted(true);
      toast.error('Credits exhausted. Please recharge by mailing support.');
    } else {
      toast.error(errorMessage);
    }
    
    setError(errorMessage);
  };

  // Save API credentials
  const saveCredentials = () => {
    try {
      if (!credentials.apiUrl || !credentials.apiKey) {
        toast.error('Please enter both API URL and API Key');
        return;
      }
      
      // Save to localStorage
      localStorage.setItem('CRUD_API_URL', credentials.apiUrl);
      localStorage.setItem('CRUD_API_KEY', credentials.apiKey);
      
      // Set the credentials on the Crublibrary
      Crublibrary.setCredentials(credentials.apiUrl, credentials.apiKey);
      
      setIsConfigured(true);
      toast.success('API credentials saved successfully!');
    } catch (err) {
      toast.error('Failed to save credentials');
      console.error(err);
    }
  };

  // Create a new todo
  const createTodo = async (value: number, txHash: string) => {
    try {
      setError(null);
      const response = await Crublibrary.create({ value, txHash });
      const newTodo = { id: response.id, value, txHash };
      setTodos([...todos, newTodo]);
      toast.success('Todo created successfully!');
    } catch (err: any) {
      handleApiError(err);
    }
  };

  // Get a todo by ID
  const getTodo = async (id: string) => {
    try {
      setError(null);
      const todo = await Crublibrary.get(id);
      return todo;
    } catch (err: any) {
      handleApiError(err);
      return null;
    }
  };

  // Update a todo
  const updateTodo = async (id: string, value: number, txHash: string) => {
    try {
      setError(null);
      await Crublibrary.update(id, { value, txHash });
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, value, txHash } : todo
      ));
      toast.success('Todo updated successfully!');
    } catch (err: any) {
      handleApiError(err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await Crublibrary.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully!');
    } catch (err: any) {
      handleApiError(err);
    }
  };

  // Reset configuration
  const resetConfiguration = () => {
    localStorage.removeItem('CRUD_API_URL');
    localStorage.removeItem('CRUD_API_KEY');
    setCredentials({
      apiUrl: '',
      apiKey: ''
    });
    setIsConfigured(false);
    setTodos([]);
    toast.info('Configuration reset');
  };

  return (
    <div className="App">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center mb-4">Todo App</h1>
            
            {!isConfigured ? (
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>Configure API Credentials</Card.Title>
                  <p className="text-muted">
                    Enter the API URL and API Key from your CRUD API Platform account. 
                    These should have been emailed to you after signing up.
                  </p>
                  
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>API URL</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="http://localhost:3000/api" 
                        value={credentials.apiUrl}
                        onChange={(e) => setCredentials({...credentials, apiUrl: e.target.value})}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>API Key</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="your-api-key" 
                        value={credentials.apiKey}
                        onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                      />
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button variant="primary" onClick={saveCredentials}>
                        Save Credentials
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : (
              <>
                {creditsExhausted && (
                  <Alert variant="warning" className="mb-4">
                    <Alert.Heading>Credits Exhausted</Alert.Heading>
                    <p>
                      Your API credits have been exhausted. Please recharge by mailing support at: <strong>support@yourapp.com</strong>
                    </p>
                    <p className="mb-0">
                      Email subject should be: <strong>Please recharge my credits</strong>
                    </p>
                  </Alert>
                )}

                <Card className="shadow-sm mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Card.Title>Add New Todo</Card.Title>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={resetConfiguration}
                      >
                        Change API Credentials
                      </Button>
                    </div>
                    <TodoForm onSubmit={createTodo} disabled={creditsExhausted} />
                  </Card.Body>
                </Card>

                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Your Todos</Card.Title>
                    {loading ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <TodoList 
                        todos={todos} 
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                        disabled={creditsExhausted}
                      />
                    )}
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App; 