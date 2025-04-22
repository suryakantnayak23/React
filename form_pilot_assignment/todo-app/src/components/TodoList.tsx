import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import TodoForm from './TodoForm';

interface Todo {
  id: string;
  value: number;
  txHash: string;
}

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, value: number, txHash: string) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete, disabled = false }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const handleEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setShowEditModal(true);
  };

  const handleUpdate = (value: number, txHash: string) => {
    if (currentTodo) {
      onUpdate(currentTodo.id, value, txHash);
      setShowEditModal(false);
      setCurrentTodo(null);
    }
  };

  const handleDeleteConfirm = (todo: Todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (todoToDelete) {
      onDelete(todoToDelete.id);
      setShowDeleteModal(false);
      setTodoToDelete(null);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-3">
        <p className="text-muted">No todos yet. Add one above to get started.</p>
      </div>
    );
  }

  return (
    <>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Value</th>
            <th>Transaction Hash</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.value}</td>
              <td>{todo.txHash}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2" 
                  onClick={() => handleEdit(todo)}
                  disabled={disabled}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => handleDeleteConfirm(todo)}
                  disabled={disabled}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTodo && (
            <TodoForm 
              onSubmit={handleUpdate}
              initialValue={currentTodo.value}
              initialTxHash={currentTodo.txHash}
              disabled={disabled}
              buttonText="Update Todo"
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this todo?</p>
          <p><strong>Value:</strong> {todoToDelete?.value}</p>
          <p><strong>Transaction Hash:</strong> {todoToDelete?.txHash}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoList; 