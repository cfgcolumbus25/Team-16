
import NavBar from "./components/navbar";
import {
  HashRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import CollegeContainer from "./containers/CollegeContainer";
import Map from './components/Map.tsx';
import Login from './components/login';

function App() {
  const links = ["CLEP Search", "Recent Events"];

  return (
    <>
      <Router>
        <NavBar links={links} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
        <footer style={{
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <p style={{ margin: '5px 0' }}>© 2025 CLEP College Finder</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            Find colleges that accept CLEP scores near you
          </p>
        </footer>
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
