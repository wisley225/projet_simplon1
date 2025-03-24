import React from 'react';
import './App.css';
import { useState } from 'react';
import { FruitsType } from './FruitType';
import IA from './IA.tsx';
import Form from './Form.tsx';
import Login from './Login.tsx';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import  PassForget from './PassForget.tsx';
import IA_audio from './IA_audio.tsx';

import Audio_chrome from './Audio_chrome.tsx';

function App() {
  // typer un etat de type tableau
  const [fruits,setFruit]=useState<FruitsType[]>([
    {id:1,nom:"mangue"},
    {id:2,nom:"banane"},
    {id:3,nom:"cerise"},
    {id:4,nom:"orange"}
  ])



const handleDelete=(id:number)=>{

 const newFruit=fruits.filter(fruits=>fruits.id!==id)
 setFruit(newFruit)

}

//const [prix,setPrix]=useState(1)
// typer une variabe
// const prix :number=2;

// pour les objet on defini le typage commme suite  nameobject:{ id:number;nom:String}

// function namefunc()

// typage paersonnaliser

// type Fruits={nom:String; id:number}

//  function(fuits:Fruits){}

  return (

    <>

    
    {/* // <div className="App">
    // <h1>bonjour a tous {prix}</h1>
    // <input type="text" value={prix} onChange={ (e)=>setPrix(e.target.value)} />
    // </div> 
    // mais pour les State exemple : useState<FruitsType[]> si c, est un tableau */}
    
      {/* <h1>liste des fruits</h1>
      {
        fruits.map(fruits=>(<ul> <li key={fruits.id}> {fruits.nom} <span style={{ cursor:"pointer"}}
                   onClick={()=>handleDelete(fruits.id)}>X</span></li></ul> ))
      } */}

<IA_audio/> 

  
  </>  
   
  );
}

export default App;
