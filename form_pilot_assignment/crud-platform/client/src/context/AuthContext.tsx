import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  apiKey: string;
  apiUrl: string;
  isRecharged: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => void;
  refreshCredits: () => void;
  sendCredentialsEmail: (userEmail: string, apiKey: string, apiUrl: string, userName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  // Send API credentials via email
  const sendCredentialsEmail = async (userEmail: string, apiKey: string, apiUrl: string, userName: string) => {
    try {
      // Log credentials for development purposes
      console.log("----------- YOUR API CREDENTIALS -----------");
      console.log(`Email: ${userEmail}`);
      console.log(`API URL: ${apiUrl}`);
      console.log(`API Key: ${apiKey}`);
      console.log(`Initial Credits: 4`);
      console.log("-------------------------------------------");

      // Create a well-formatted email subject and body
      const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const subject = encodeURIComponent(`Your CRUD API Credentials (${formattedDate})`);
      
      const body = encodeURIComponent(`Dear ${userName},

Here are your CRUD API credentials:

API URL: ${apiUrl}
API Key: ${apiKey}
Initial Credits: 4

To use these credentials in your code:

// JavaScript example:
process.env.CRUD_API_URL = '${apiUrl}';
process.env.CRUD_API_KEY = '${apiKey}';

// Or in a .env file:
CRUD_API_URL=${apiUrl}
CRUD_API_KEY=${apiKey}

Thank you for using our service!

Regards,
CRUD API Platform Team`);

      // Use mailto link to open email client
      window.location.href = `mailto:${userEmail}?subject=${subject}&body=${body}`;
      toast.success(`API credentials sent to your email: ${userEmail}`);
    } catch (error) {
      console.error('Failed to send credentials email:', error);
      toast.error('Failed to send credentials email. Please check your dashboard for API details.');
    }
  };

  const login = async (token: string) => {
    try {
      // Decode the Google JWT token to get user info
      // JWT tokens are in format: header.payload.signature
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      // Generate a unique API key
      const uniqueApiKey = `key_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
      const apiUrl = `${window.location.origin}/api`;
      
      // Extract user information from the token
      const userData: User = {
        id: decodedPayload.sub,
        name: decodedPayload.name || decodedPayload.email.split('@')[0],
        email: decodedPayload.email,
        credits: 4, // Start with 4 credits
        apiKey: uniqueApiKey,
        apiUrl: apiUrl,
        isRecharged: false
      };

      // Save user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Logged in successfully!');
      
      // Send credentials email automatically after signup
      await sendCredentialsEmail(userData.email, uniqueApiKey, apiUrl, userData.name);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out successfully');
    
    // Force navigate to home page
    window.location.href = '/';
  };

  const refreshUser = () => {
    // Mock implementation - in a real app this would fetch updated user data
    if (user) {
      const updatedUser = { ...user };
      setUser(updatedUser);
    }
  };

  const refreshCredits = () => {
    // Mock implementation - in a real app this would refresh credits count
    if (user) {
      const updatedUser = { ...user, credits: 100 };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Credits refreshed successfully!');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      error,
      isAuthenticated: !!user, 
      login, 
      logout,
      refreshUser,
      refreshCredits,
      sendCredentialsEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 