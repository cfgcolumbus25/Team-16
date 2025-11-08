
import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import {
  HashRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import Map from './components/Map.tsx';
import Login from './components/login';
import CollegeContainer from "./containers/collegeContainer.tsx";
import UniversityDashboard from './components/UniversityDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const links = ["CLEP Search", "Recent Events"];

  return (
    <>
      <Router>
        <NavBar links={links} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/university-dashboard" element={<UniversityDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/" element={
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px', 
              padding: '16px' 
            }}>
              <CollegeContainer />
              <Map />
            </div>
          } />
        </Routes>
        <Footer />
      </Router>                                                                                                                                                             
    </>
  );
}

// Component to handle login page with query parameter
function LoginPage() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') as 'Learners' | 'University' | 'Admin' | null;
  
  return <Login userType={userType || 'Learners'} />;
}

export default App;
