import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const GOOGLE_CLIENT_ID = "300345994388-bh0uv0j2bvi7nfh7vurl116lkktb4uup.apps.googleusercontent.com";

const Login: React.FC = () => {
  const { login, user, loading, error } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (user) {
      navigate('/dashboard');
    }

    // Load Google's authentication script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        initializeGoogleAuth();
      };
    };

    loadGoogleScript();
  }, [user, navigate]);

  const initializeGoogleAuth = () => {
    if (window.google && GOOGLE_CLIENT_ID) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button")!,
          { 
            theme: "outline", 
            size: "large",
            width: 280,
            text: "signin_with"
          }
        );
        
        console.log(`Google OAuth initialized with client ID: ${GOOGLE_CLIENT_ID}`);
      } catch (error) {
        console.error('Failed to initialize Google auth:', error);
        setAuthError('Failed to initialize authentication. Please try again.');
      }
    }
  };

  const handleGoogleResponse = async (response: any) => {
    try {
      // In a real application, you would validate this token on your backend
      if (response.credential) {
        // For demo purposes, we're just using the credential token directly
        await login(response.credential);
        navigate('/dashboard');
      } else {
        setAuthError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setAuthError('Authentication failed. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">Sign In</h1>
              
              {authError && (
                <Alert variant="danger">{authError}</Alert>
              )}
              
              <div className="text-center">
                <p className="mb-4">Sign in with your Google account to access the CRUD API Platform.</p>
                
                <div id="google-signin-button" className="d-inline-block mb-3"></div>
                
                <p className="text-muted small mt-4">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Add TypeScript interface for Google auth
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default Login; 