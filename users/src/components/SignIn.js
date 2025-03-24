import React, { useState } from "react";
import "./sign_in.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ onSendUsersId }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [succes, setSucces] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du mot de passe
    const testpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.*@]{8,}$/;
    if (!testpassword.test(inputs.password.trim())) {
      setErrors("Le mot de passe doit comporter au moins une majuscule, une minuscule et un chiffre");
      setSucces("");
      return;
    }

    try {
      const res=await axios.post("http://localhost/e-commerce/sign_in.php",inputs);

      if (res.data.user === "valide") {
        setSucces("Connexion réussie !");
        setErrors("");
 const  usersId=res.data.usersId
        onSendUsersId(usersId);
        localStorage.setItem("usersid",usersId )
        navigate("/Shop");
      } else if (res.data.admin === "valide") {
        setSucces("Connexion réussie !");
        setErrors("");
        window.location.href = "http://localhost:3001/dashboard";
      } else if (res.data.message) {
        setErrors(res.data.message);
        setSucces("");
      }
    } catch (err) {
      setErrors("Problème de connexion au serveur");
      setSucces("");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center border " id="bg">
      <form
        method="POST"
        className="p-10 rounded-e-lg w-1/3 border max-[500px]:w-full max-lg:w-2/3"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-white text-3xl mb-4">Sign in</h1>

        {succes && <span className="text-green-800">{succes}</span>}
        {errors && <span className="text-red-700">{errors}</span>}

        <input
          type="email"
          name="email"
          className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="bg-transparent border border-white w-full placeholder:text-white rounded-lg h-10 pl-6 placeholder:font-semibold mb-4"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button
          className="border py-2 font-bold w-full bg-white rounded-lg mb-2"
          type="submit"
        >
          Login
        </button>

        <p>
          <Link to="/PasswordForget" className="text-white">Mot de passe oublié</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
