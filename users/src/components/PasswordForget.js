import React from "react";
import './sign_in.css';
import { useState  } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";



const PasswordForget=()=> {

  const navigate=useNavigate()
  const [inputs,setInputs]=useState({
    email:'',
  
})


const [succes, setSucces] = useState('');




const handleChange=(e)=>{
    const {name,value}=e.target
    setInputs({...inputs,[name]:value});}

const handleSubmit= async(e)=>{
e.preventDefault()

   const res= await axios.post('http://localhost/e-commerce/send_email.php', inputs)


     if (res.data.succes) {
      setSucces(res.data.message)
        alert(' un code de reinitialisation vous a ete envoyer sur votre email vous allez en avoir besoin .  cliquez sur ok pour vous rediriger vers la page de reinitialisation ')
         navigate('/Modif_password')

    }
    
 }
 



 
    return (
   
    <div  className=" h-screen flex justify-center items-center    " id="bg">

<form method='POST' action=" " className="p-10  rounded-e-lg w-1/3 " onSubmit={(e)=>handleSubmit(e)} >
        <h1 className="font-bold text-white text-3xl mb-4   ">recuperatiom de votre mot de passe</h1>        



         <span className="text-green-800">{succes}</span>        
          <input type="email" name="email" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold mb-4   " placeholder="email " onChange={(e)=>handleChange(e)}   required  />
         <button className="border py-2 font-bold  w-full bg-white  rounded-lg mb-2" type="submit">send email</button>    
         

      </form>

    </div> )

    }
export default PasswordForget ;