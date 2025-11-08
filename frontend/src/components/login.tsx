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
import { useThemeMode } from '../contexts/ThemeContext';

interface LoginProps {
  userType?: 'Learners' | 'University' | 'Admin';
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ userType = 'Learners', onLoginSuccess }) => {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
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
          // Call onLoginSuccess callback if provided (for embedded login in UniversityDashboard)
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            navigate('/university-dashboard');
          }
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
        backgroundColor: isDark 
          ? 'transparent'
          : 'rgba(255, 203, 5, 0.15)',
        pt: 8,
        pb: 4,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.95) 0%, rgba(15, 31, 53, 0.95) 100%)'
              : 'white',
            border: isDark
              ? '1px solid rgba(168, 208, 240, 0.3)'
              : 'none',
            transition: 'background 0.3s ease, border 0.3s ease',
          }}
        >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ 
            color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 1)',
            transition: 'color 0.3s ease',
          }}
        >
          {userType} {isLogin ? 'Login' : 'Register'}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'divider', mb: 3 }}>
          <Tabs 
            value={isLogin ? 0 : 1} 
            onChange={(_, newValue) => setIsLogin(newValue === 0)}
            sx={{
              '& .MuiTab-root': {
                color: isDark ? '#a8d0f0' : 'inherit',
              },
              '& .MuiTab-root.Mui-selected': {
                color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 1)',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: isDark ? '#a8d0f0' : 'rgba(255, 203, 5, 1)',
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
            sx={{
              '& .MuiInputLabel-root': {
                color: isDark ? '#a8d0f0' : 'inherit',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 1)',
              },
              '& .MuiOutlinedInput-root': {
                color: isDark ? '#e8f0f8' : 'inherit',
                '& fieldset': {
                  borderColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'inherit',
                },
                '&:hover fieldset': {
                  borderColor: isDark ? 'rgba(168, 208, 240, 0.5)' : 'inherit',
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDark ? '#a8d0f0' : 'rgba(255, 203, 5, 1)',
                },
              },
              '& .MuiInputBase-input': {
                backgroundColor: isDark ? 'rgba(15, 31, 53, 0.5)' : 'transparent',
              },
            }}
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
            sx={{
              '& .MuiInputLabel-root': {
                color: isDark ? '#a8d0f0' : 'inherit',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 1)',
              },
              '& .MuiOutlinedInput-root': {
                color: isDark ? '#e8f0f8' : 'inherit',
                '& fieldset': {
                  borderColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'inherit',
                },
                '&:hover fieldset': {
                  borderColor: isDark ? 'rgba(168, 208, 240, 0.5)' : 'inherit',
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDark ? '#a8d0f0' : 'rgba(255, 203, 5, 1)',
                },
              },
              '& .MuiInputBase-input': {
                backgroundColor: isDark ? 'rgba(15, 31, 53, 0.5)' : 'transparent',
              },
            }}
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
              sx={{
                '& .MuiInputLabel-root': {
                  color: isDark ? '#a8d0f0' : 'inherit',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 1)',
                },
                '& .MuiOutlinedInput-root': {
                  color: isDark ? '#e8f0f8' : 'inherit',
                  '& fieldset': {
                    borderColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'inherit',
                  },
                  '&:hover fieldset': {
                    borderColor: isDark ? 'rgba(168, 208, 240, 0.5)' : 'inherit',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: isDark ? '#a8d0f0' : 'rgba(255, 203, 5, 1)',
                  },
                },
                '& .MuiInputBase-input': {
                  backgroundColor: isDark ? 'rgba(15, 31, 53, 0.5)' : 'transparent',
                },
              }}
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
              backgroundColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'rgba(255, 203, 5, 1)',
              color: isDark ? '#e8f0f8' : '#000',
              border: isDark ? '1px solid rgba(168, 208, 240, 0.5)' : 'none',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(168, 208, 240, 0.5)' : 'rgba(255, 203, 5, 0.9)',
              },
              transition: 'background-color 0.3s ease, border 0.3s ease',
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
              color: isDark ? '#a8d0f0' : 'rgba(255, 203, 5, 1)',
              '&:hover': {
                textDecoration: 'underline',
                color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 0.9)',
              },
              transition: 'color 0.3s ease',
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

