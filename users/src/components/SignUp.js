
import shopping from '../picture/shopping.jpg'
import { useState,useRef  } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const SignUp = ({sign}) => {
   const navigate=useNavigate()
   const filterRef=useRef(null);
   const [inputs,setInputs]=useState({
     fullname:'',
     address:'',
     email:'',
     password:'',
     password_confirm:'',
 })

 const [errors, setErrors] = useState('');
 const [succes, setSucces] = useState('');


 

 const handleChange=(e)=>{
     const {name,value}=e.target
     setInputs({...inputs,[name]:value});
}
 const handleSubmit= async(e)=>{
 e.preventDefault()

 const testnom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

  if (!testnom.test(inputs.fullname.trim())) {
   setErrors('Nom invalide')
   setSucces('')
 }
 
 if (inputs.password !== inputs.password_confirm){
  setErrors('la confirmation du mot de passe ne correspond pas');
  setSucces('')

}


else{

  try {
    const response=await axios.post('http://localhost/e-commerce/sign_up.php',inputs)
    setSucces(response.data.message);

    if(response.data.message==="valide"){
    
        alert('inscription validé') 
        navigate('/SignIn');
        setErrors('');
   
    }
    else{
      setErrors(response.data.message)
    }
    
  } catch (error) {
    
    console.error("ereur lors de l'envoie du formulaire ",error)
  }

}}



if (sign) {
  if (filterRef.current) {
     filterRef.current.classList.remove('scale-0')
    }
}
else{
  if (filterRef.current) {
    filterRef.current.classList.add('scale-0')

  }

}
    
    


return (

 <div ref={filterRef} className="min-h-80 max-[425px]:scale-110 max-[522px]:left-16 max-[522px]:scale-75     max-[865px]:left-28 max-[951px]:left-36 max-[951px]:w-8/12   max-[1129px]:w-7/12 max-[1129px]:left-56  w-6/12 absolute z-20 max-xl:left-72  left-80 top-20 grid grid-cols-2 m-auto   transition-all transform max-[865px]:grid-cols-1 scale-0">
    <div className='max-[865px]:hidden'>
      <img src={shopping} alt="" className="h-full w-full object-cover rounded-s-lg" />
    </div>
    <form onSubmit={handleSubmit} method="POST" className=" p-10 bg-gradient-to-l to-violet-500 from-red-200 via-slate-400 rounded-lg">
      <h1 className="font-bold text-white text-3xl mb-4">Sign up</h1>

   
      { errors ?    <span className="text-red-700">{errors}</span> : <span className="text-green-800">{succes}</span>}

      <input
        type="text"
        value={inputs.fullname}
        name="fullname"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Fullname"
        onChange={(e) => handleChange(e)}
        required
      />

      <input
        type="text"
        value={inputs.address}
        name="address"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Address"
        onChange={(e) => handleChange(e)}
        required
      />

      <input
        type="email"
        value={inputs.email}
        name="email"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Email"
        onChange={(e) => handleChange(e)}
        required
        
      />

      <input
        type="password"
        value={inputs.password}
        name="password"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Password"
        onChange={(e) => handleChange(e)}
        required
      />

      <input
        type="password"
        value={inputs.password_confirm}
        name="password_confirm"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Confirm Password"
        onChange={(e) => handleChange(e)}
        required
      />

 
      <button className="border py-2 font-bold w-full bg-white rounded-lg mb-2" type="submit">
        Get started
      </button>

     
      <p>Déjà inscrit ? <Link to='/SignIn' className="cursor-pointer hover:text-white">Login</Link></p>
    </form>
  </div>

 
);


}
export default SignUp