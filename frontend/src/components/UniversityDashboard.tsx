import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import CLEPScoringManager from './CLEPScoringManager';
import Login from './login';
import { useThemeMode } from '../contexts/ThemeContext';

interface Institution {
  id: number;
  name: string;
}

const UniversityDashboard: React.FC = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [selectedInstitution, setSelectedInstitution] = useState<number | ''>('');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    institutionName: '',
    location: '',
    contactEmail: '',
    contactName: '',
    reason: '',
  });
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch institutions from backend (mock for now)
  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchInstitutions = async () => {
      try {
        // Mock data - replace with actual API call
        const mockInstitutions: Institution[] = [
          { id: 1, name: 'Cornell University' },
          { id: 2, name: 'Ohio State University' },
          { id: 3, name: 'University of Maryland' },
        ];
        setInstitutions(mockInstitutions);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const handleInstitutionChange = (event: any) => {
    const value = event.target.value;
    if (value === 'request-new') {
      setShowRequestForm(true);
    } else {
      setSelectedInstitution(value);
      setIsLoggedIn(false); // Reset login when institution changes
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call
    try {
      // Mock API call
      console.log('Submitting institution request:', requestFormData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequestSubmitted(true);
      setShowRequestForm(false);
      setRequestFormData({
        institutionName: '',
        location: '',
        contactEmail: '',
        contactName: '',
        reason: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setRequestSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: isDark ? 'transparent' : 'rgba(255, 203, 5, 0.15)',
          pt: 4,
          pb: 4,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ color: isDark ? '#e8f0f8' : 'inherit' }}>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: isDark ? 'transparent' : 'rgba(255, 203, 5, 0.15)',
        pt: 4,
        pb: 4,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
      {requestSubmitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your institution request has been submitted! An admin will review it shortly.
        </Alert>
      )}

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
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
          sx={{ 
            color: isDark ? '#e8f0f8' : 'rgba(255, 203, 5, 1)',
            transition: 'color 0.3s ease',
          }}
        >
          Which institution are you?
        </Typography>
        
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel 
            id="institution-select-label"
            sx={{
              color: isDark ? '#a8d0f0' : 'inherit',
              '&.Mui-focused': {
                color: isDark ? '#e8f0f8' : 'inherit',
              },
            }}
          >
            Select Your Institution
          </InputLabel>
          <Select
            labelId="institution-select-label"
            id="institution-select"
            value={selectedInstitution}
            label="Select Your Institution"
            onChange={handleInstitutionChange}
            disabled={isLoggedIn}
            sx={{
              color: isDark ? '#e8f0f8' : 'inherit',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'inherit',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'rgba(168, 208, 240, 0.5)' : 'inherit',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#a8d0f0' : 'inherit',
              },
              '& .MuiSvgIcon-root': {
                color: isDark ? '#a8d0f0' : 'inherit',
              },
            }}
          >
            {institutions.map((inst) => (
              <MenuItem 
                key={inst.id} 
                value={inst.id}
                sx={{
                  backgroundColor: isDark ? 'rgba(15, 31, 53, 0.5)' : 'inherit',
                  color: isDark ? '#e8f0f8' : 'inherit',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(168, 208, 240, 0.2)' : 'inherit',
                  },
                }}
              >
                {inst.name}
              </MenuItem>
            ))}
            <MenuItem 
              value="request-new"
              sx={{
                backgroundColor: isDark ? 'rgba(15, 31, 53, 0.5)' : 'inherit',
                color: isDark ? '#a8d0f0' : 'inherit',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(168, 208, 240, 0.2)' : 'inherit',
                },
              }}
            >
              <em>My institution is not listed - Fill out this form</em>
            </MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {selectedInstitution && !isLoggedIn && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4,
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.95) 0%, rgba(15, 31, 53, 0.95) 100%)'
              : 'white',
            border: isDark
              ? '1px solid rgba(168, 208, 240, 0.3)'
              : 'none',
            transition: 'background 0.3s ease, border 0.3s ease',
          }}
        >
          <Login userType="University" onLoginSuccess={handleLoginSuccess} />
        </Paper>
      )}

      {selectedInstitution && isLoggedIn && (
        <CLEPScoringManager institutionId={selectedInstitution as number} />
      )}

      {/* Request New Institution Dialog */}
      <Dialog 
        open={showRequestForm} 
        onClose={() => setShowRequestForm(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: isDark
              ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.95) 0%, rgba(15, 31, 53, 0.95) 100%)'
              : 'white',
            border: isDark
              ? '1px solid rgba(168, 208, 240, 0.3)'
              : 'none',
          },
        }}
      >
        <form onSubmit={handleRequestSubmit}>
          <DialogTitle sx={{ color: isDark ? '#e8f0f8' : 'inherit' }}>
            Request New Institution
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Institution Name"
              value={requestFormData.institutionName}
              onChange={(e) => setRequestFormData({ ...requestFormData, institutionName: e.target.value })}
              margin="normal"
              required
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
              label="Location"
              value={requestFormData.location}
              onChange={(e) => setRequestFormData({ ...requestFormData, location: e.target.value })}
              margin="normal"
              required
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
              label="Contact Name"
              value={requestFormData.contactName}
              onChange={(e) => setRequestFormData({ ...requestFormData, contactName: e.target.value })}
              margin="normal"
              required
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
              label="Contact Email"
              type="email"
              value={requestFormData.contactEmail}
              onChange={(e) => setRequestFormData({ ...requestFormData, contactEmail: e.target.value })}
              margin="normal"
              required
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
              label="Reason for Request"
              multiline
              rows={4}
              value={requestFormData.reason}
              onChange={(e) => setRequestFormData({ ...requestFormData, reason: e.target.value })}
              margin="normal"
              required
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
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setShowRequestForm(false)}
              sx={{
                color: isDark ? '#a8d0f0' : 'inherit',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(168, 208, 240, 0.2)' : 'inherit',
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                backgroundColor: isDark ? 'rgba(168, 208, 240, 0.3)' : 'rgba(255, 203, 5, 1)',
                color: isDark ? '#e8f0f8' : '#000',
                border: isDark ? '1px solid rgba(168, 208, 240, 0.5)' : 'none',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(168, 208, 240, 0.5)' : 'rgba(255, 203, 5, 0.9)',
                },
                transition: 'background-color 0.3s ease, border 0.3s ease',
              }}
            >
              Submit Request
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      </Container>
    </Box>
  );
};

export default UniversityDashboard;

