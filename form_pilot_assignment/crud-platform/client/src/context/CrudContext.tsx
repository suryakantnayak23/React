import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

// Define types for our data
interface FormData {
  id: string;
  title: string;
  description: string;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}

interface Field {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  createdAt: string;
}

interface CrudContextType {
  forms: FormData[];
  submissions: FormSubmission[];
  loading: boolean;
  error: string | null;
  createForm: (formData: Omit<FormData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateForm: (id: string, formData: Partial<FormData>) => Promise<void>;
  deleteForm: (id: string) => Promise<void>;
  fetchForms: () => Promise<void>;
  fetchSubmissions: (formId: string) => Promise<void>;
}

const CrudContext = createContext<CrudContextType | undefined>(undefined);

export const useCrud = () => {
  const context = useContext(CrudContext);
  if (context === undefined) {
    throw new Error('useCrud must be used within a CrudProvider');
  }
  return context;
};

interface CrudProviderProps {
  children: ReactNode;
}

export const CrudProvider: React.FC<CrudProviderProps> = ({ children }) => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // This would normally connect to a real API
  const fetchForms = async () => {
    setLoading(true);
    try {
      // Mock API call for example
      const mockForms: FormData[] = [
        {
          id: '1',
          title: 'Contact Form',
          description: 'Basic contact form with name, email, and message',
          fields: [
            { id: '1', name: 'name', type: 'text', required: true },
            { id: '2', name: 'email', type: 'email', required: true },
            { id: '3', name: 'message', type: 'textarea', required: true }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setForms(mockForms);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch forms');
      toast.error('Failed to fetch forms');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async (formId: string) => {
    setLoading(true);
    try {
      // Mock API call for example
      const mockSubmissions: FormSubmission[] = [
        {
          id: '1',
          formId,
          data: {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello there!'
          },
          createdAt: new Date().toISOString()
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setSubmissions(mockSubmissions);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch submissions');
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const createForm = async (formData: Omit<FormData, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const newForm: FormData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setForms(prevForms => [...prevForms, newForm]);
      toast.success('Form created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create form');
      toast.error('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = async (id: string, formData: Partial<FormData>) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      setForms(prevForms => 
        prevForms.map(form => 
          form.id === id ? { 
            ...form, 
            ...formData, 
            updatedAt: new Date().toISOString() 
          } : form
        )
      );
      
      toast.success('Form updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update form');
      toast.error('Failed to update form');
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (id: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      setForms(prevForms => prevForms.filter(form => form.id !== id));
      toast.success('Form deleted successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to delete form');
      toast.error('Failed to delete form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CrudContext.Provider
      value={{
        forms,
        submissions,
        loading,
        error,
        createForm,
        updateForm,
        deleteForm,
        fetchForms,
        fetchSubmissions
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

export default CrudContext; 