import React from "react";
import { useState  } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";



const ModifPassword=({email})=> {

   const navigate=useNavigate()
  const [inputs,setInputs]=useState({
    code_email:'',
    old_pswd:'',
    new_pswd:'', 
    pswd_confirm:''
})

const [errors, setErrors] = useState('');
 const [succes, setSucces] = useState('');





const handleChange=(e)=>{
    const {name,value}=e.target
    setInputs({...inputs,[name]:value});}

const handleSubmit= async(e)=>{
e.preventDefault()

if(inputs.new_pswd === inputs.pswd_confirm){
 

    try {

        const res= await axios.post('http://localhost/e-commerce/modif_password.php')
     
  
          if( res.data.succes=='valide') {
        
              
              setErrors(' ');
              alert(" mot de passe modifier avec succes !!.  dirigez vous vers la page de connexion ")
              navigate('/Sign_in');
            
          }  
    } catch (error) {
        setErrors('probleme de connexion ou donnée invalid !')
    }




   
}




else{
    setErrors('confirmation invalide')
}


    
}
    return (
   
    <div  className=" h-screen flex justify-center items-center    " id="bg">

<form method='POST' action=" " className="p-10  rounded-e-lg w-1/3 " onSubmit={(e)=>handleSubmit(e)} >
        <h1 className="font-bold text-white text-3xl mb-4   ">reinitialisation du mot de passe</h1>        


    {errors ? <p className="text-red-600"> {errors} </p>:<p className="text-green-600"> {succes} </p>  }
                 
          <input type="text" name="code_email" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
           placeholder="entrez le code de reinitialisation " onChange={(e)=>handleChange(e)}   required  />


          <input type="passdword" name="old_pswd" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
           placeholder="ancien mot de passe " onChange={(e)=>handleChange(e)}   required  />

          <input type="passdword" name="new_pswd" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
           placeholder="nouveau mot de passe " onChange={(e)=>handleChange(e)}   required  />

          <input type="passdword" name="pswd_confirm" className="bg-transparent border border-white w-full  placeholder:text-white  rounded-lg h-10 pl-6 placeholder:font-semibold mb-4" 
          placeholder="comfirmation du mot de passe " onChange={(e)=>handleChange(e)}   required  />

         <button className="border py-2 font-bold  w-full bg-white  rounded-lg mb-2" type="submit">send email</button>    
         

      </form>

    </div> )

    }
export default ModifPassword ;