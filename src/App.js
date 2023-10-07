import React from 'react';
import Navbar from './Component/navbar/Navbar';
import './App.css'
import Home from './Component/homepage/Home';
import RegistrationForm from './Component/Getbtn/RegistrationForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Regi from './Component/regi/Regi';




function App() {
  return (
    <div className='main'>

      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          <Route path="/Regi" element={<Regi />} />
          <Route path="RegistrationForm" element={<RegistrationForm />} />
        </Routes>
      </Router>



      {/* <Navbar></Navbar>
      <Home></Home>
      <Get></Get> */}

    </div>
  );
}

export default App;