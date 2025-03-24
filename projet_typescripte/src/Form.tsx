import React, { useState } from 'react';
import axios from 'axios'; 

function Form() {
  const [formData, setFormData] = useState<{ name:string, email:string,age:number,password:string}>({
    name: '',
    email: '',
    age:0,
    password:''
  });




  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    


    try {
      const response = await axios.post('http://localhost:3000/users/inscription', formData,{
        headers:{
            "Content-Type":"application/json"
        },
      });


      console.log('Création réussie :', response.data);
      alert('Création réussie : ' + response.data.name);
   

    } catch (error){
      console.error('Erreur lors de la création :', error);
      

      if (error.response.data.message) {
         alert('Erreur : ' + error.response.data.message);
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label>Nom : </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e)=>setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e)=>setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Âge : </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={(e)=>setFormData({ ...formData, age:Number(e.target.value)  })}
            required
          />
        </div>
        <div>
          <label>Âge : </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e)=>setFormData({ ...formData, password:e.target.value  })}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Form;
