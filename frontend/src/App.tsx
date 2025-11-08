import NavBar from "./components/navbar";
import Footer from "./components/Footer";
import {
  HashRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import Map from "./components/Map.tsx";
import Login from "./components/login";
import UniversityDashboard from "./components/UniversityDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AboutUs from "./components/AboutUs";
import CollegeContainer from "./containers/CollegeContainer.tsx";
import { ThemeProvider, useThemeMode } from "./contexts/ThemeContext";
import CursorShadow from "./components/CursorShadow";
import FilterForm from "./components/filterFrame.tsx";
import { useState } from "react";
import type { collegeDisplay } from "./components/collegeCards.tsx";
import Info from './components/Info';

function HomePage() {
  const { mode } = useThemeMode();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        padding: "16px",
        backgroundColor: mode === "dark" ? "transparent" : "#ffffff",
        minHeight: "calc(100vh - 200px)",
        transition: "background-color 0.3s ease",
      }}
    >
      <FilterForm />
      <CollegeContainer />
      <Map />
    </div>
  );
}

function App() {
  const links = ["CLEP Search", "About Us"];
  const [colleges, setColleges] = useState<collegeDisplay[]>([]);

  return (
    <ThemeProvider>
      <CursorShadow />
      <Router>
        <NavBar links={links} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/university-dashboard"
            element={<UniversityDashboard />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/about us" element={<AboutUs />} />
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 2fr",
                  gap: "16px",
                  padding: "16px",
                }}
              >
                <FilterForm />
                <CollegeContainer />
                <Map />
              </div>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

// Component to handle login page with query parameter
function LoginPage() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") as
    | "Learners"
    | "University"
    | "Admin"
    | null;

  return <Login userType={userType || "Learners"} />;
}

export default App;
