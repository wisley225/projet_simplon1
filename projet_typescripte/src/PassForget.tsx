import React, { useState } from 'react';
import axios from 'axios'; 

function Login() {
  const [formData, setFormData] = useState<{  email:string}>({
    email: '',
  });



  const handleSubmit  = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:3000/auth/forgetPassword', formData,{
        headers:{
            "Content-Type":"application/json"
        },
      });


      console.log('connexion réussie :', response.data);
      alert(response.data.message);
   

    } catch (error){
      console.error('Erreur lors de la création :', error);
      

     
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
   
        <div> 
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e)=>setFormData({ ...formData, email: e.target.value.trim() })}
            required
          />
        </div>
 
       
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Login;
