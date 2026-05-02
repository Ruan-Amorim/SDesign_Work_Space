import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <>
      <h1 style={{textShadow: "1px 1px 3px #000"}}><span style={{color: "red"}}>S</span>Design - Work Space</h1>
      <Dashboard/>
    </>
  );
}

export default App
