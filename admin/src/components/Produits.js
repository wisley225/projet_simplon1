import Addproduct from "./Addproduct";
import { useState, useEffect } from "react";
import axios from "axios";
import profile_admin from '../pictures/profile_admin.jpg'

const Produits = () => {
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [editedValues, setEditedValues] = useState({});

  const formAddProd = () => {
    setShowForm(!showForm);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost/e-commerce/Admin/add_produit');
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const modifier = (product) => {
    setEditProduct(product.id);
    setEditedValues({ ...product });
  };

  const handleChange = (e, field) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };

  const sauvegarderModification = async (id) => {
    try {
 const   res=  await axios.post('http://localhost/e-commerce/Admin/modifier.php', editedValues);
      console.log(res.data)
      setProducts(products.map(p => (p.id === id ? editedValues : p)));
      setEditProduct(null);
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
    }
  };

  const supprimer = async (id) => {
    try {
      await axios.post('http://localhost/e-commerce/Admin/supprimer.php',{ id });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  return (
    <>
      {showForm && <Addproduct fetchData={fetchData} />}
      <div className=" ">
        <h1 className="text-red-600 text-xl font-bold w-full ">Gestion des Produits</h1>
        <h2 className="text-center mt-5 text-xl font-bold text-red-600 mb-10">Liste des produits</h2>
        <div className="text-end">
          <h1 className="text-2xl font-semibold mt-5">Ajouter un nouveau produit</h1>
          <button onClick={formAddProd} className="bg-green-600 px-4 py-1 rounded-lg text-white mt-3">+ Ajouter</button>
        </div>
        <ul className="w-full flex flex-wrap justify-center   p-2   ">
           
     {
      products.map((product)=>(


        <div key={product.id} className=" mr-1 w-60 border rounded-lg p-2 mb-2  " >
        <div className=" h-52  m-auto ">
          <img src={`http://localhost/e-commerce/Admin/picture/${product.image_url}`} alt="" className="size-full rounded-lg object-cover object-center" />
          
        </div>
        <p  className="   font-medium ">  {editProduct === product.id ? (
                    <input type="text"  className="w-full outline rounded-md"  />
                  ) : (
                    product.name
                  )} </p>
        <p className="   w-40 font-medium ">prix:  {editProduct === product.id ? (
                    <input type="text"  className="w-full outline rounded-md"  />
                  ) : (
                    product.prix
                  )} $</p>
        <p className="   w-40 font-medium ">stock:  {editProduct === product.id ? (
                    <input type="text"  className="w-full outline rounded-md"  />
                  ) : (
                    product.stock
                  )}</p>




{editProduct === product.id ? (

<div className="flex justify-evenly">
<div  onClick={() => sauvegarderModification(product.id)} className=" border mt-2 p-1 rounded-lg font-semibold text-blue-700 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"> <i class="fa-solid fa-pencil"></i> Enregistrer</div>
<div onClick={() => setEditProduct(null)} className="border mt-2 p-1 rounded-lg font-semibold  text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition-all "><i class="fa-solid fa-trash"></i> annuler</div>
</div>
                  ) : (
                    <div className="flex justify-evenly">
                    <div onClick={() => modifier(product)} className=" border mt-2 p-1 rounded-lg font-semibold text-blue-700 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"> <i class="fa-solid fa-pencil"></i> modifier</div>
                    <div  onClick={() => supprimer(product.id)} className="border mt-2 p-1 rounded-lg font-semibold  text-red-500 hover:bg-red-500 hover:text-white cursor-pointer transition-all "><i class="fa-solid fa-trash"></i> supprimer</div>
                  </div>
                  )}



      


      </div>

      ))}
    

    
    


          <li>

          </li>
        </ul>
      
      </div>
    </>
  );
};

export default Produits;
