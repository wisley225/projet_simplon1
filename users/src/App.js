import Home from './components/Home';
import SignIn from './components/SignIn';
import React, { useState } from 'react';
import { Route,Routes} from 'react-router-dom';
import Shop from './components/Shop';
import Profil from './components/Profil';
import PasswordForget from './components/PasswordForget';
import ModifPassword from './components/ModifPassword';
import Commande from './components/Commande';
import Panier from './components/Panier';
import Swipper from './components/Swipper';
import Chargement from './components/Chargement';


function App() {

  const [usersId , setUsersid]=useState(null)
 const recuIdUser=(childData)=>{

  setUsersid(childData)



 }

 


  return (
  
 <>
     <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/SignIn" element={<SignIn onSendUsersId={recuIdUser} />}  />       
        <Route path="/Shop" element={<Shop usersid={usersId}  />}/>
        <Route path="/Profil" element={<Profil />}/>       
        <Route path="/PasswordForget" element={<PasswordForget/>}/>       
        <Route path="/ModifPassword" element={< ModifPassword/>}/>       
        <Route path="/Commande" element={< Commande/>}/>       
        <Route path="/Panier" element={<Panier/>}/> 
              
           
      </Routes>
 
 </>
      




  );
}

export default App;
