import { Box, Typography, Container, Paper } from '@mui/material';
import { useThemeMode } from '../contexts/ThemeContext';

const AboutUs = () => {
  const { mode } = useThemeMode();
  
  return (
    <Container maxWidth="lg" sx={{ py: 6, px: 3 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: mode === 'dark' ? '#e8f0f8' : 'black',
            mb: 2,
            textAlign: 'center',
            transition: 'color 0.3s ease',
          }}
        >
          About Us
        </Typography>
      </Box>

      {/* Mission Statement Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(15, 31, 53, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 203, 5, 0.1) 0%, rgba(255, 255, 255, 1) 100%)',
          border: mode === 'dark' 
            ? '1px solid rgba(168, 208, 240, 0.3)'
            : '1px solid rgba(255, 203, 5, 0.3)',
          transition: 'background 0.3s ease, border 0.3s ease',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: mode === 'dark' ? '#e8f0f8' : 'black',
            mb: 3,
            borderBottom: mode === 'dark'
              ? '2px solid rgba(168, 208, 240, 0.5)'
              : '2px solid rgba(255, 203, 5, 0.5)',
            pb: 1,
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
        >
          Mission Statement
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: mode === 'dark' ? '#d4e4f4' : '#333',
            textAlign: 'justify',
            transition: 'color 0.3s ease',
          }}
        >
          Modern States Education Alliance is a non-profit organization committed to making high-quality college education accessible and affordable for everyone. By offering free, accredited online courses that prepare students for CLEP (College Level Examination Program) exams, Modern States helps learners earn real college credit and accelerate their degree progress — without the burden of tuition costs. Their mission is to remove financial and informational barriers to higher education so that any motivated learner, regardless of background, can pursue the American dream through knowledge.
        </Typography>
      </Paper>

      {/* About Modern States Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(15, 31, 53, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 203, 5, 0.1) 0%, rgba(255, 255, 255, 1) 100%)',
          border: mode === 'dark' 
            ? '1px solid rgba(168, 208, 240, 0.3)'
            : '1px solid rgba(255, 203, 5, 0.3)',
          transition: 'background 0.3s ease, border 0.3s ease',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: mode === 'dark' ? '#e8f0f8' : 'black',
            mb: 3,
            borderBottom: mode === 'dark'
              ? '2px solid rgba(168, 208, 240, 0.5)'
              : '2px solid rgba(255, 203, 5, 0.5)',
            pb: 1,
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
        >
          About Modern States
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: mode === 'dark' ? '#d4e4f4' : '#333',
            textAlign: 'justify',
            mb: 2,
            transition: 'color 0.3s ease',
          }}
        >
          Modern States partners with leading universities, professors, and the College Board to create a comprehensive digital library of more than 30 introductory college courses. These courses mirror standard first-year college classes and prepare learners to pass CLEP exams accepted by over 2,900 colleges and universities.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: mode === 'dark' ? '#d4e4f4' : '#333',
            textAlign: 'justify',
            transition: 'color 0.3s ease',
          }}
        >
          Through free textbooks, practice questions, and exam vouchers, Modern States empowers students to gain transferable credits, reducing both the cost and time required for a degree. Their work is built on the belief that education is a fundamental human right — not a privilege limited by income or circumstance.
        </Typography>
      </Paper>

      {/* About Our Project Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 58, 95, 0.8) 0%, rgba(15, 31, 53, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 203, 5, 0.1) 0%, rgba(255, 255, 255, 1) 100%)',
          border: mode === 'dark' 
            ? '1px solid rgba(168, 208, 240, 0.3)'
            : '1px solid rgba(255, 203, 5, 0.3)',
          transition: 'background 0.3s ease, border 0.3s ease',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: mode === 'dark' ? '#e8f0f8' : 'black',
            mb: 3,
            borderBottom: mode === 'dark'
              ? '2px solid rgba(168, 208, 240, 0.5)'
              : '2px solid rgba(255, 203, 5, 0.5)',
            pb: 1,
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
        >
          About Our Project
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: mode === 'dark' ? '#d4e4f4' : '#333',
            textAlign: 'justify',
            mb: 2,
            transition: 'color 0.3s ease',
          }}
        >
          Our project supports Modern States' mission by addressing one of the biggest challenges facing learners: the lack of clarity around CLEP credit acceptance policies across colleges and universities.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: mode === 'dark' ? '#d4e4f4' : '#333',
            textAlign: 'justify',
            mb: 2,
            transition: 'color 0.3s ease',
          }}
        >
          We are building a searchable, scalable CLEP Acceptance Dashboard that:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <Typography
            component="li"
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: mode === 'dark' ? '#d4e4f4' : '#333',
              mb: 1,
              transition: 'color 0.3s ease',
            }}
          >
            Aggregates verified data on which institutions accept specific CLEP exams.
          </Typography>
          <Typography
            component="li"
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: mode === 'dark' ? '#d4e4f4' : '#333',
              mb: 1,
              transition: 'color 0.3s ease',
            }}
          >
            Displays each college's credit policy, required scores, and last update date.
          </Typography>
          <Typography
            component="li"
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: mode === 'dark' ? '#d4e4f4' : '#333',
              mb: 1,
              transition: 'color 0.3s ease',
            }}
          >
            Enables learners, advisors, and institutions to contribute verified updates.
          </Typography>
          <Typography
            component="li"
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: mode === 'dark' ? '#d4e4f4' : '#333',
              mb: 1,
              transition: 'color 0.3s ease',
            }}
          >
            Provides transparency through a trusted, easy-to-use interface.
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: mode === 'dark' ? '#d4e4f4' : '#333',
            textAlign: 'justify',
            transition: 'color 0.3s ease',
          }}
        >
          By improving visibility and trust in CLEP transfer information, our project strengthens Modern States' goal of turning free learning into real, transferable college credit — ultimately helping more students earn their degrees faster, with less debt, and greater confidence in their path.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;

