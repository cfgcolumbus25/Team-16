import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Alert,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface LoginProps {
  userType?: 'Learners' | 'University' | 'Admin';
}

const Login: React.FC<LoginProps> = ({ userType = 'Learners' }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // TODO: Add actual authentication logic here
    console.log(`${isLogin ? 'Login' : 'Register'} as ${userType}:`, { email, password });
    
    // Simulate API call
    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store user info in localStorage (temporary solution)
      localStorage.setItem('userType', userType);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect based on user type
      if (isLogin) {
        if (userType === 'Learners') {
          navigate('/');
        } else if (userType === 'University') {
          navigate('/university-dashboard');
        } else if (userType === 'Admin') {
          navigate('/admin-dashboard');
        }
      } else {
        // After registration, redirect to login
        alert(`Registration successful for ${userType}! Please login.`);
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error('Authentication error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 203, 5, 0.15)',
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'rgba(255, 203, 5, 1)' }}>
          {userType} {isLogin ? 'Login' : 'Register'}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={isLogin ? 0 : 1} 
            onChange={(_, newValue) => setIsLogin(newValue === 0)}
            sx={{
              '& .MuiTab-root.Mui-selected': {
                color: 'rgba(255, 203, 5, 1)',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'rgba(255, 203, 5, 1)',
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />

          {!isLogin && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="new-password"
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              backgroundColor: 'rgba(255, 203, 5, 1)',
              color: '#000',
              '&:hover': {
                backgroundColor: 'rgba(255, 203, 5, 0.9)',
              },
            }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link 
            component={RouterLink} 
            to="/" 
            sx={{ 
              textDecoration: 'none',
              color: 'rgba(255, 203, 5, 1)',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            ← Back to Home
          </Link>
        </Box>
      </Paper>
      </Container>
    </Box>
  );
};

export default Login;

