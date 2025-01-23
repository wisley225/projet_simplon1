
import shopping from './shopping.jpg'
import { useState,useEffect  } from "react";
//import axios from "axios";
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Sign_up = () => {
//   const navigate=useNavigate()
//   const [inputs,setInputs]=useState({
//     fullname:'',
//     address:'',
//     email:'',
//     password:'',
// })

// const [errors, setErrors] = useState({});

// const handleChange=(e)=>{
//     const {name,value}=e.target
//     setInputs({...inputs,[name]:value});


   

// }
// const handleSubmit= async(e)=>{
// e.preventDefault()

// const validationErrors={}
// const testnom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
// const testpassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.*@]{8,}$/;

//  if (!testnom.test(inputs.fullname.trim())) {
//   validationErrors.fullname= 'Nom invalide';
// }
//  if (!testpassword.test(inputs.password.trim())) {
//     validationErrors.password = 'password invalide invalide';

// }

// setErrors(validationErrors);

// if (Object.keys(validationErrors).length === 0) {


//      const reponse= await axios.post('http://localhost/api/users/e_commerce.php',inputs)
//       console.log(reponse)
        
//    navigate('/Sign_in');
  
// }

const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // Effacer le message après 15 secondes
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  // Gestion des changements dans les champs
  const handleChange = (e, type) => {
    const value = e.target.value;
    setError(""); // Réinitialiser l'erreur à chaque changement

    switch (type) {
      case "fullname":
        setFullname(value);
        if (value === "") {
          setError("Le champ nom est vide");
        }
        break;
      case "address":
        setAddress(value);
        if (value === "") {
          setError("Le champ adresse est vide");
        }
        break;
      case "email":
        setEmail(value);
        if (value === "") {
          setError("Le champ email est vide");
        }
        break;
      case "password":
        setPassword(value);
        if (value === "") {
          setError("Le champ mot de passe est vide");
        }
        break;
      case "password_confirm":
        setPassword_confirm(value);
        if (value === "") {
          setError("Le champ confirmation du mot de passe est vide");
        } else if (value !== password) {
          setError("La confirmation du mot de passe ne correspond pas");
        } else {
          setMsg("Données validées. Merci !");
        }
        break;
      default:
        break;
    }
  };

  //Vérification de l'email
  const checkEmail = () => {
    const url = 'http://localhost/api/users/check_email.php';
    const headers = {
      "Accept": "application/json",
      "Content-type": "application/json"
    };

    const Data = {
      email: email,
    };

    axios.post(url,Data ,{
      headers: headers
      
    })
      .then((response) => {

    
        setError();
      })
      .catch((err) => {
        setError("Erreur lors de la vérification de l'email");
        console.error(err);
      });
  };

 // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullname === "" || address === "" || email === "" || password === "" || password_confirm === "") {
   

    const url = 'http://localhost/api/users/inscription.php';
    const headers = {
      "Accept": "application/json",
      "Content-type": "application/json"
    };

    const Data = {
      fullname: fullname,
      address: address,
      email: email,
      password: password
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then((response) => response.json())
      .then((response) => {
        setMsg(response[0].result);
        setFullname("");
        setAddress("");
        setEmail("");
        setPassword("");
        setPassword_confirm("");
      })
      .catch((err) => {
        setError("Erreur lors de l'inscription");
        console.error(err);
      });
  };

 
}


return (
  <div className="w-2/4 absolute z-10 left-80 top-20 grid grid-cols-2 m-auto">
    <div>
      <img src={shopping} alt="" className="h-full w-full object-cover rounded-s-lg" />
    </div>
    <form onSubmit={handleSubmit} method="POST" className="p-10 bg-gradient-to-l to-violet-500 from-red-200 via-slate-400 rounded-e-lg">
      <h1 className="font-bold text-white text-3xl mb-4">Sign up</h1>

      {/* Affichage des messages d'erreur ou de succès */}
      {msg && <span className="text-green-800">{msg}</span>}
      {error && <span className="text-red-700">{error}</span>}

      {/* Champ Fullname */}
      <input
        type="text"
        value={fullname}
        name="fullname"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Fullname"
        onChange={(e) => handleChange(e, "fullname")}
      />

      {/* Champ Address */}
      <input
        type="text"
        value={address}
        name="address"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Address"
        onChange={(e) => handleChange(e, "address")}
      />

      {/* Champ Email */}
      <input
        type="email"
        value={email}
        name="email"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Email"
        onChange={(e) => handleChange(e, "email")}
        onBlur={checkEmail}
      />

      {/* Champ Password */}
      <input
        type="password"
        value={password}
        name="password"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Password"
        onChange={(e) => handleChange(e, "password")}
      />

      {/* Champ Password Confirm */}
      <input
        type="password"
        value={password_confirm}
        name="password_confirm"
        className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
        placeholder="Confirm Password"
        onChange={(e) => handleChange(e, "password_confirm")}
      />

      {/* Bouton de soumission */}
      <button className="border py-2 font-bold w-full bg-white rounded-lg mb-2" type="submit">
        Get started
      </button>

      {/* Lien vers la page de connexion */}
      <p>Déjà inscrit ? <Link to='/Sign_in' className="cursor-pointer hover:text-white">Login</Link></p>
    </form>
  </div>
);
};

export default Sign_up;