 import React from "react";
 import './sign_in.css';
 import { useState  } from "react";
 import axios from "axios";
 import {  useNavigate } from "react-router-dom";



 const Sign_in=()=> {

  const navigate=useNavigate()
   const [inputs,setInputs]=useState({
     email:'',
     password:'',
 })

 const [errors, setErrors] = useState({});




 const handleChange=(e)=>{
     const {name,value}=e.target
     setInputs({...inputs,[name]:value});}

 const handleSubmit= async(e)=>{
 e.preventDefault()

 const validationErrors={}



 const testpassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.*@]{8,}$/;


  if (!testpassword.test(inputs.password.trim())) {
     validationErrors.password = 'password invalide invalide';

 }




     setErrors(validationErrors);

   if (Object.keys(validationErrors).length === 0) {


      const reponse= await axios.post('http://localhost/api/users/sign_in.php',inputs);
      
       console.log(reponse)

       
     
       alert('Formulaire envoyé avec succès !');
     
  
 }

 }








  
     return (
    
     <div  className=" h-screen flex justify-center items-center    " id="bg">

 <form method='POST' action=" " className="p-10  rounded-e-lg w-1/3 " onSubmit={handleSubmit} >
         <h1 className="font-bold text-white text-3xl mb-4   ">Sign in</h1>                   
           <input type="email" name="email" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold mb-4   " placeholder="email " onChange={handleChange}   required  />
           {errors.email && <span className="text-red-700 mb-3 block w-2/3 m-auto">{errors.email}</span>}

           <input type="password" name="password" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold    mb-4" placeholder="password " onChange={handleChange}   required  />     
           {errors.password && <span className="text-red-700 mb-3 block w-2/3 m-auto">{errors.password}</span>}
          <button className="border py-2 font-bold  w-full bg-white  rounded-lg mb-2" type="submit">login</button>    
           <p>deja inscrit ? <span className="cursor-pointer hover:text-white">login</span></p>

       </form>

     </div> )
 }

 export default Sign_in;