import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface InstitutionRequest {
  id: number;
  institutionName: string;
  location: string;
  contactName: string;
  contactEmail: string;
  reason: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'denied';
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    pendingRequests: 0,
    totalCLEPExams: 0,
    activeUsers: 0,
  });
  const [pendingRequests, setPendingRequests] = useState<InstitutionRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<InstitutionRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchData = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockStats = {
          totalInstitutions: 15,
          pendingRequests: 3,
          totalCLEPExams: 45,
          activeUsers: 120,
        };
        setStats(mockStats);

        const mockRequests: InstitutionRequest[] = [
          {
            id: 1,
            institutionName: 'Stanford University',
            location: 'Stanford, CA',
            contactName: 'John Doe',
            contactEmail: 'john.doe@stanford.edu',
            reason: 'We would like to add our institution to help students understand our CLEP acceptance policies.',
            submittedAt: '2024-01-15',
            status: 'pending',
          },
          {
            id: 2,
            institutionName: 'MIT',
            location: 'Cambridge, MA',
            contactName: 'Jane Smith',
            contactEmail: 'jane.smith@mit.edu',
            reason: 'Our institution accepts CLEP credits and we want to update our scoring system.',
            submittedAt: '2024-01-14',
            status: 'pending',
          },
          {
            id: 3,
            institutionName: 'Fake University',
            location: 'Nowhere, USA',
            contactName: 'Spam User',
            contactEmail: 'spam@fake.com',
            reason: 'This is clearly spam or trolling.',
            submittedAt: '2024-01-13',
            status: 'pending',
          },
        ];
        setPendingRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleReviewRequest = (request: InstitutionRequest) => {
    setSelectedRequest(request);
    setReviewDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedRequest) {
      return;
    }

    // TODO: Replace with actual API call
    try {
      console.log('Approving request:', selectedRequest.id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPendingRequests(pendingRequests.filter(r => r.id !== selectedRequest.id));
      setStats({ ...stats, pendingRequests: stats.pendingRequests - 1, totalInstitutions: stats.totalInstitutions + 1 });
      setActionSuccess(`Institution "${selectedRequest.institutionName}" has been approved.`);
      setReviewDialogOpen(false);
      setSelectedRequest(null);
      
      setTimeout(() => setActionSuccess(null), 5000);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleDeny = async () => {
    if (!selectedRequest) {
      return;
    }

    // TODO: Replace with actual API call
    try {
      console.log('Denying request:', selectedRequest.id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPendingRequests(pendingRequests.filter(r => r.id !== selectedRequest.id));
      setStats({ ...stats, pendingRequests: stats.pendingRequests - 1 });
      setActionSuccess(`Institution request "${selectedRequest.institutionName}" has been denied.`);
      setReviewDialogOpen(false);
      setSelectedRequest(null);
      
      setTimeout(() => setActionSuccess(null), 5000);
    } catch (error) {
      console.error('Error denying request:', error);
    }
  };

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
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'rgba(255, 203, 5, 1)' }}>
        Admin Dashboard
      </Typography>

      {actionSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {actionSuccess}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Institutions
              </Typography>
              <Typography variant="h4">{stats.totalInstitutions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Requests
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.pendingRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total CLEP Exams
              </Typography>
              <Typography variant="h4">{stats.totalCLEPExams}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Requests */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'rgba(255, 203, 5, 1)' }}>
          Pending Institution Requests
        </Typography>

        {pendingRequests.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="textSecondary">
              No pending requests at this time.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Institution Name</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell><strong>Submitted</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.institutionName}</TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{request.contactName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {request.contactEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{request.submittedAt}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleReviewRequest(request)}
                        sx={{
                          borderColor: 'rgba(255, 203, 5, 1)',
                          color: 'rgba(255, 203, 5, 1)',
                          '&:hover': {
                            borderColor: 'rgba(255, 203, 5, 0.9)',
                            backgroundColor: 'rgba(255, 203, 5, 0.1)',
                          },
                        }}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedRequest && (
          <>
            <DialogTitle>Review Institution Request</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                  label="Institution Name"
                  value={selectedRequest.institutionName}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Location"
                  value={selectedRequest.location}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Contact Name"
                  value={selectedRequest.contactName}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Contact Email"
                  value={selectedRequest.contactEmail}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
                <TextField
                  label="Reason"
                  value={selectedRequest.reason}
                  InputProps={{ readOnly: true }}
                  multiline
                  rows={4}
                  fullWidth
                />
                <TextField
                  label="Submitted At"
                  value={selectedRequest.submittedAt}
                  InputProps={{ readOnly: true }}
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeny}
                color="error"
                startIcon={<CancelIcon />}
                variant="outlined"
              >
                Deny
              </Button>
              <Button
                onClick={handleApprove}
                startIcon={<CheckCircleIcon />}
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255, 203, 5, 1)',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 203, 5, 0.9)',
                  },
                }}
              >
                Approve
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

