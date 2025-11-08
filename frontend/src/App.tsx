
import NavBar from "./components/navbar";
import {
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import CollegeContainer from "./containers/CollegeContainer";
import Map from './components/Map.tsx';

function App() {
  const links = ["CLEP Search", "Recent Events"];

  return (
    <>
      <Router>
        <NavBar links={links} />
        <p className="text-blue-50">Hello</p>
        <Routes></Routes>
      </Router>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px', 
        padding: '16px' 
      }}>
        <CollegeContainer />
        <Map />
      </div>
    </>
  );
}

export default App;
