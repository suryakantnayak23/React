import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

interface TodoFormProps {
  onSubmit: (value: number, txHash: string) => void;
  initialValue?: number;
  initialTxHash?: string;
  disabled?: boolean;
  buttonText?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ 
  onSubmit, 
  initialValue = 0, 
  initialTxHash = '', 
  disabled = false,
  buttonText = 'Add Todo'
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [txHash, setTxHash] = useState<string>(initialTxHash);
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    onSubmit(value, txHash);
    
    // Only reset if it's a new todo form
    if (buttonText === 'Add Todo') {
      setValue(0);
      setTxHash('');
      setValidated(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="todoValue">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            step="0.1"
            required
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="todoTxHash">
          <Form.Label>Transaction Hash</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter transaction hash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            required
            disabled={disabled}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a transaction hash.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <div className="d-grid">
        <Button variant="primary" type="submit" disabled={disabled}>
          {buttonText}
        </Button>
      </div>
    </Form>
  );
};

export default TodoForm; 