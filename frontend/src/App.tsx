import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/navbar'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import FilterForm from './components/filterFrame'

function App() {
  const [count, setCount] = useState(0)
  const links = ['CLEP Search', 'Recent Events']

  return (
    <>
      <Router>
        <NavBar links={links} />
        <p className='text-blue-50'>Hello</p>
        <Routes></Routes>
        <FilterForm/>

      </Router>
    </>
  )
}

export default App;
