import { useState } from "react";
import { Person } from "./FruitType";
import React from "react";

const Test =()=>{

const [person , setPerson]=useState< Person>({
nom:"",
prenom:"",
age:0

})

const handleChange=(e :React.ChangeEvent<HTMLInputElement>):void=>{

  const {name,value }:{name:string, value:string} =e.target;

  setPerson( {...person, [name]:value})

}


const HandleSubmite=(e:React.FormEvent<HTMLFormElement>)=>{

  e.preventDefault();

  


}


return(
  <>
  <form onSubmit={(e)=>HandleSubmite(e)}>
  <input type="text" placeholder="nom" required onChange={(e)=>handleChange(e)} />
    <input type="text" placeholder="prenom" required onChange={(e)=>handleChange(e)}  />
    <input type="number" placeholder="age" required onChange={(e)=>handleChange(e)} />

    <button type="submit"> envoyer</button>

  </form>
 
  </>
)

}

export default Test;


