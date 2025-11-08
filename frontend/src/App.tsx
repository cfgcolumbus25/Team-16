
import NavBar from "./components/navbar";
import {
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import CollegeContainer from "./containers/CollegeContainer";

function App() {
  const links = ["CLEP Search", "Recent Events"];

  return (
    <>
      <Router>
        <NavBar links={links} />
        <p className="text-blue-50">Hello</p>
        <Routes></Routes>
      </Router>
      <CollegeContainer />
    </>
  );
}

export default App;
