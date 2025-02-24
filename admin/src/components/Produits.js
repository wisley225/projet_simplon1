import Addproduct from "./Addproduct";
import { useState, useEffect } from "react";
import axios from "axios";

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
      <div className="ml-10 ">
        <h1 className="text-red-600 text-xl font-bold w-full ">Gestion des Produits</h1>
        <h2 className="text-center mt-5 text-xl font-bold text-red-600 mb-10">Liste des produits</h2>
        <div className="text-end">
          <h1 className="text-2xl font-semibold mt-5">Ajouter un nouveau produit</h1>
          <button onClick={formAddProd} className="bg-green-600 px-4 py-1 rounded-lg text-white mt-3">+ Ajouter</button>
        </div>
        <ul className="w-full flex flex-col p-2">
          <li className="mb-2">
            <ul className="border-b grid grid-cols-7 text-center">
              <li className="text-lg py-2">#ID</li>
              <li className="text-lg py-2">🖼️ IMAGE</li>
              <li className="text-lg py-2">🏷️ NOM</li>
              <li className="text-lg py-2">💰 PRIX</li>
              <li className="text-lg py-2">📦 STOCK</li>
              <li className="text-lg py-2"></li>
              <li className="text-lg py-2"></li>
            </ul>
          </li>
          <li className="">
            {products.map((product) => (
              <ul key={product.id} className="mb-2 grid grid-cols-7 gap-4  items-center ">
                <li className="text-center text-lg font-medium  ">
                  {editProduct === product.id ? (
                    <input type="text" value={editedValues.id} className="w-full outline rounded-md"  />
                  ) : (
                    product.id
                  )}
                </li>
                <li className="text-center text-lg font-medium ">
                  {editProduct === product.id ? (
                    <input type="text" value={editedValues.image} onChange={(e) => handleChange(e, "image")} className="w-full outline rounded-md"   />
                  ) : (
                  <div className=" rounded-lg size-20  "> <img src={`http://localhost/e-commerce/Admin/picture/${product.image_url}`} alt="  image du produit" className="size-full  object-center" />  </div>
                  )}
                </li>
                <li className="text-center text-lg font-medium">
                  {editProduct === product.id ? (
                    <input type="text" value={editedValues.name} onChange={(e) => handleChange(e, "name")} className="w-full outline rounded-md"  />
                  ) : (
                    product.name
                  )}
                </li>
                <li className="text-center text-lg font-medium">
                  {editProduct === product.id ? (
                    <input type="text" value={editedValues.prix} onChange={(e) => handleChange(e, "prix")} className="w-full outline rounded-md"  />
                  ) : (
                    product.prix
                  )}
                </li>
                <li className="text-center text-lg font-medium">
                  {editProduct === product.id ? (
                    <input type="text" value={editedValues.stock} onChange={(e) => handleChange(e, "stock")} className="w-full outline rounded-md"  />
                  ) : (
                    product.stock
                  )}
                </li>
                {editProduct === product.id ? (
                  <>
                    <li className="bg-blue-600 px-4 py-1 rounded-lg text-white cursor-pointer text-center"
                        onClick={() => sauvegarderModification(product.id)}> Enregistrer</li>
                    <li className="bg-red-600 px-4 py-1 rounded-lg text-white cursor-pointer text-center"
                        onClick={() => setEditProduct(null)}> Annuler</li>
                  </>
                ) : (
                  <>
                    <li className="bg-blue-600 px-4 py-1 rounded-lg text-white cursor-pointer text-center h-8 "
                        onClick={() => modifier(product)}> Modifier</li>
                    <li className="bg-red-600 px-4 py-1 rounded-lg text-white cursor-pointer text-center h-8 "
                        onClick={() => supprimer(product.id)}> Supprimer</li>
                  </>
                )}
              </ul>
            ))}
          </li>
        </ul>
      
      </div>
    </>
  );
};

export default Produits;
