import Home from './components/Home';
import Sign_in from './components/Sign_in';
import React from 'react';
//import Profil from './components/Profil';
import { Route,Routes } from 'react-router-dom';
import Shop from './components/Shop';
import Profil from './components/Profil';

function App() {
  return (
  
 
      <Routes>
        <Route path="*" element={<Home />}/>
        <Route path="/Sign_in" element={<Sign_in/>}  />
        <Route path="/Shop" element={<Shop  />}/>
        <Route path="/Profil" element={<Profil/>}/>       
      </Routes>




  );
}

export default App;
