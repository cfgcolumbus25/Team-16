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

interface Institution {
  id: number;
  name: string;
}

const UniversityDashboard: React.FC = () => {
  const [selectedInstitution, setSelectedInstitution] = useState<number | ''>('');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
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
    }
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
          backgroundColor: 'rgba(255, 203, 5, 0.15)',
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 203, 5, 0.15)',
        pt: 4,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
      {requestSubmitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your institution request has been submitted! An admin will review it shortly.
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'rgba(255, 203, 5, 1)' }}>
          Which institution are you?
        </Typography>
        
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="institution-select-label">Select Your Institution</InputLabel>
          <Select
            labelId="institution-select-label"
            id="institution-select"
            value={selectedInstitution}
            label="Select Your Institution"
            onChange={handleInstitutionChange}
          >
            {institutions.map((inst) => (
              <MenuItem key={inst.id} value={inst.id}>
                {inst.name}
              </MenuItem>
            ))}
            <MenuItem value="request-new">
              <em>My institution is not listed - Fill out this form</em>
            </MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {selectedInstitution && (
        <CLEPScoringManager institutionId={selectedInstitution as number} />
      )}

      {/* Request New Institution Dialog */}
      <Dialog open={showRequestForm} onClose={() => setShowRequestForm(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleRequestSubmit}>
          <DialogTitle>Request New Institution</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Institution Name"
              value={requestFormData.institutionName}
              onChange={(e) => setRequestFormData({ ...requestFormData, institutionName: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Location"
              value={requestFormData.location}
              onChange={(e) => setRequestFormData({ ...requestFormData, location: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contact Name"
              value={requestFormData.contactName}
              onChange={(e) => setRequestFormData({ ...requestFormData, contactName: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contact Email"
              type="email"
              value={requestFormData.contactEmail}
              onChange={(e) => setRequestFormData({ ...requestFormData, contactEmail: e.target.value })}
              margin="normal"
              required
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowRequestForm(false)}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                backgroundColor: 'rgba(255, 203, 5, 1)',
                color: '#000',
                '&:hover': {
                  backgroundColor: 'rgba(255, 203, 5, 0.9)',
                },
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

