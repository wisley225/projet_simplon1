import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Commande = () => {
 const  usersid=parseInt(localStorage.getItem("usersid")) || "";
  const Productid = localStorage.getItem("ProductId")||"";

  const [inputs, setInputs] = useState({
    usersid: parseInt(localStorage.getItem("usersid")) || "",
    addressLivraison: "",
    PrixTT: parseInt(localStorage.getItem("prixTotal")) || "",
    methodPaiement: "",
    optionLivraison: "",
  });

  const navigate=useNavigate()
  const options = [
    { id: 1, name: "carte" },
    { id: 2, name: "mobile_money" },
    { id: 3, name: "espece" },
  ];



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs( {...inputs, [name]:value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   
  
      try {
  
      
       const restabproduct = await axios.post("http://localhost/e-commerce/recup_panier", {Productid, usersid} );
       const produit= restabproduct.data;
       if (produit) {   
      console.log(produit)
      const response = await axios.post("http://localhost/e-commerce/commander", { ...inputs, tabProduct:produit });
      console.log(response.data)
      alert(response.data.message)
      navigate(-2)  
     }
    else{
      alert(restabproduct.data.error)

    }

         
          
          
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Commande</h2>

      {/* Moyen de paiement */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Moyen de paiement</label>
        <select name="methodPaiement" value={inputs.methodPaiement} onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">Sélectionnez un moyen</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.name}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Adresse de livraison */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Adresse de livraison</label>
        <input
          type="text"
          name="addressLivraison"
          placeholder="Ex: MARCORY Pharmacie ptt"
          value={inputs.addressLivraison}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
       required  />
      </div>

      {/* Option de livraison */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Option de livraison</label>
        <div className="mt-2 flex gap-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="optionLivraison"
              value="standard"
              checked={inputs.optionLivraison === "standard"}
              onChange={handleChange}
              className="form-radio"
          required   />
            <span className="ml-2">Standard</span>
          </label>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name="optionLivraison"
              value="express"
              checked={inputs.optionLivraison === "express"}
              onChange={handleChange}
              className="form-radio"
          required  />
            <span className="ml-2">Express</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
        Valider la commande
      </button>
    </form>
  );
};

export default Commande;
