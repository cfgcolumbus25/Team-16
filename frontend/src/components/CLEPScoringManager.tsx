import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import type { clepExamsAndScores } from './collegeCards';

interface CLEPScoringManagerProps {
  institutionId: number;
}

const CLEPScoringManager: React.FC<CLEPScoringManagerProps> = ({ institutionId }) => {
  const [clepExams, setCLEPExams] = useState<clepExamsAndScores[]>([]);
  const [newExam, setNewExam] = useState({
    examName: '',
    thresholdScore: 50,
    courseName: '',
    numberOfCredits: 3,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch existing CLEP exams for this institution
  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchCLEPExams = async () => {
      try {
        // Mock data - replace with actual API call
        const mockExams: clepExamsAndScores[] = [
          {
            examName: 'College Mathematics',
            thresholdScore: 50,
            courseName: 'MATH 101',
            numberOfCredits: 3,
          },
          {
            examName: 'Biology',
            thresholdScore: 50,
            courseName: 'BIOL 101',
            numberOfCredits: 3,
          },
        ];
        setCLEPExams(mockExams);
      } catch (error) {
        console.error('Error fetching CLEP exams:', error);
      }
    };

    fetchCLEPExams();
  }, [institutionId]);

  const handleAddExam = () => {
    if (newExam.examName && newExam.courseName) {
      setCLEPExams([...clepExams, { ...newExam }]);
      setNewExam({
        examName: '',
        thresholdScore: 50,
        courseName: '',
        numberOfCredits: 3,
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteExam = (index: number) => {
    setCLEPExams(clepExams.filter((_, i) => i !== index));
  };

  const handleUpdateScore = (index: number, field: keyof clepExamsAndScores, value: any) => {
    const updated = [...clepExams];
    updated[index] = { ...updated[index], [field]: value };
    setCLEPExams(updated);
  };

  const handleSave = async () => {
    // TODO: Replace with actual API call
    try {
      console.log('Saving CLEP exams for institution:', institutionId, clepExams);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving CLEP exams:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ color: 'rgba(255, 203, 5, 1)' }}>
          CLEP Scoring System
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddForm(!showAddForm)}
          sx={{
            backgroundColor: 'rgba(255, 203, 5, 1)',
            color: '#000',
            '&:hover': {
              backgroundColor: 'rgba(255, 203, 5, 0.9)',
            },
          }}
        >
          Add CLEP Exam
        </Button>
      </Box>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          CLEP scoring system updated successfully!
        </Alert>
      )}

      {showAddForm && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>Add New CLEP Exam</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <TextField
              label="Exam Name"
              value={newExam.examName}
              onChange={(e) => setNewExam({ ...newExam, examName: e.target.value })}
              required
            />
            <TextField
              label="Course Name"
              value={newExam.courseName}
              onChange={(e) => setNewExam({ ...newExam, courseName: e.target.value })}
              required
            />
            <TextField
              label="Threshold Score"
              type="number"
              value={newExam.thresholdScore}
              onChange={(e) => setNewExam({ ...newExam, thresholdScore: parseInt(e.target.value) || 50 })}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Number of Credits"
              type="number"
              value={newExam.numberOfCredits}
              onChange={(e) => setNewExam({ ...newExam, numberOfCredits: parseInt(e.target.value) || 3 })}
              inputProps={{ min: 1, max: 6 }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleAddExam}
              sx={{
                backgroundColor: 'rgba(255, 203, 5, 1)',
                color: '#000',
                '&:hover': {
                  backgroundColor: 'rgba(255, 203, 5, 0.9)',
                },
              }}
            >
              Add Exam
            </Button>
            <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
          </Box>
        </Paper>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Exam Name</strong></TableCell>
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Threshold Score</strong></TableCell>
              <TableCell><strong>Credits</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clepExams.map((exam, index) => (
              <TableRow key={index}>
                <TableCell>{exam.examName}</TableCell>
                <TableCell>{exam.courseName}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={exam.thresholdScore}
                    onChange={(e) => handleUpdateScore(index, 'thresholdScore', parseInt(e.target.value) || 50)}
                    size="small"
                    inputProps={{ min: 0, max: 100 }}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={exam.numberOfCredits}
                    onChange={(e) => handleUpdateScore(index, 'numberOfCredits', parseInt(e.target.value) || 3)}
                    size="small"
                    inputProps={{ min: 1, max: 6 }}
                    sx={{ width: 80 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteExam(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {clepExams.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="textSecondary">
                    No CLEP exams configured. Click "Add CLEP Exam" to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {clepExams.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            size="large"
            sx={{
              backgroundColor: 'rgba(255, 203, 5, 1)',
              color: '#000',
              '&:hover': {
                backgroundColor: 'rgba(255, 203, 5, 0.9)',
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 3, p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
        <Typography variant="body2" sx={{ color: 'black' }} gutterBottom>
          <strong>Note:</strong> You can set different threshold scores for different credit amounts. 
          For example, you can add multiple entries for the same exam:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0, color: 'black' }}>
          <li>Physics - Score 65 = 3 credits (lecture only)</li>
          <li>Physics - Score 70 = 4 credits (lecture + lab)</li>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: 'black' }}>
          Simply add multiple rows with the same exam name but different threshold scores and credit amounts.
        </Typography>
      </Box>
    </Paper>
  );
};

export default CLEPScoringManager;

