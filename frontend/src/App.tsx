
import NavBar from "./components/navbar";
import {
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import CollegeContainer from "./containers/CollegeContainer";
import { SimpleGrid } from "@chakra-ui/react";
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
      <SimpleGrid columns={2} gap={4} padding={4}>
        <CollegeContainer />
        <Map />
      </SimpleGrid>
    </>
  );
}

export default App;
