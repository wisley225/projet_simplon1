import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const Panier = () => {
  const usersid = localStorage.getItem("usersid");
  const Productid = localStorage.getItem("ProductId");
  const [panierProduct, setPanierProduct] = useState([]);
  const [prixTotalPanier, setPrixTotalPanier] = useState(0);

  const navigate=useNavigate()

  // Récupérer les produits du panier
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost/e-commerce/recup_panier",{Productid,usersid});
      setPanierProduct(response.data);
     
      
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculer le prix total du panier
  useEffect(() => {
if (panierProduct.length>0) {
  
  const totalPrix = panierProduct.reduce((total, produit) => {
    return total + produit.produit_prix * produit.quantity;
  }, 0);
  setPrixTotalPanier(totalPrix);
}
  }, [panierProduct]);

  // Augmenter la quantité d'un produit
  const ajouter = (id) => {
    const updatePanierProduit = panierProduct.map((produit) => {
      if (produit.panier_id === id) {
        produit.quantity += 1;
        produit.prixTotal = produit.produit_prix * produit.quantity;
      }
      return produit;
    });
    setPanierProduct(updatePanierProduit);
  };

  // Diminuer la quantité d'un produit
  const soustrac = (id) => {
    const updatePanierProduit = panierProduct.map((produit) => {
      if (produit.panier_id === id && produit.quantity > 1) {
        produit.quantity -= 1;
        produit.prixTotal = produit.produit_prix * produit.quantity;
      }
      return produit;
    });
    setPanierProduct(updatePanierProduit);
  };

  // Supprimer un produit du panier
  const supprimerProduit = async(id) => {
    const updatePanierProduit = panierProduct.filter((produit) => produit.panier_id !== id); 
    const response = await axios.post("http://localhost/e-commerce/supprimer_panier", {id});
    setPanierProduct(updatePanierProduit);
    console.log(response.data)
  };

const formCommande=()=>{


navigate('/Commande')

}

  console.log(panierProduct)
  console.log(prixTotalPanier)

  return (
    <>
      <Navbar />
 
{panierProduct.length>0 ? (
   <div className="   ">
  
   <ul className="w-9/12       max-[850px]:w-full ">
     {panierProduct.map((produit) => ( 
       <li key={produit.panier_id} className=" mb-4 max-[480px]:flex-col  max-[480px]:justify-center  flex justify-between items-center  py-3  border-y rounded-xl">
         <div className=" flex justify-center items-center  ">
           <div className="size-32 object-cover object-center ">
             <img src={`http://localhost/e-commerce/Admin/picture/${produit.produit_image}`} alt="Produit" className="w-full h-full " />
           </div>
           <div>
             <p className="text-xl font-medium">{produit.produit_name}</p>
             <p className="text-xl font-medium">{produit.produit_categories}</p>
           </div>
         </div>

         <div className=" w-40 h-10 grid grid-cols-3">
           <div
             className="border flex justify-center items-center justify-items-end cursor-pointer rounded-md transition-all hover:bg-pink-600 hover:text-white"
             onClick={() => soustrac(produit.panier_id)}
           >
             -
           </div>
           <div className="flex justify-center items-center">{produit.quantity}</div>
           <div
             className="border mr-1 flex justify-center items-center justify-items-end cursor-pointer rounded-md transition-all hover:bg-pink-600 hover:text-white"
             onClick={() => ajouter(produit.panier_id)}
           >
             +
           </div>
         </div>

         <div>
           <p className="text-xl font-medium mb-4 text-center">{produit.produit_prix} €</p>
           <button onClick={() => supprimerProduit(produit.panier_id) } className=" border px-6 py-1 rounded-md text-lg font-medium hover:text-pink-600  hover:border-pink-600 transition-all hover:transition-all  ">Supprimer</button>
         </div>
       </li>
     ))}
   </ul>

   <div className="min-w-80 w-3/12 border flex flex-col justify-evenly h-60">
     <h1 className="text-xl font-medium mb-4 bg-clip-text bg-gradient-to-tr from-pink-500 to-fuchsia-400 text-transparent">
       Résumé de la commande
     </h1>
     <ul>
       <li className="border text-lg font-medium flex justify-between">
         <span className="text-pink-500">Sous-total</span> <span>{prixTotalPanier} €</span>
       </li>
       <li className="border text-lg font-medium flex justify-between">
         <span className="text-pink-500">Réduction</span> <span>0 €</span>
       </li>
       <li className="border text-lg font-medium flex justify-between">
         <span className="text-pink-500">Livraison</span> <span>10 €</span>
       </li>
       <li className="border text-lg font-medium flex justify-between">
         <span className="text-pink-500 text-lg">Prix Total</span> <span>{prixTotalPanier + 10} €</span>
       </li>
     </ul>
     <button onClick={formCommande}  className="border w-1/2 m-auto py-2 text-xl rounded-lg bg-gradient-to-tr from-pink-500 to-fuchsia-500 text-white hover:scale-110 transition-all">
       Commander
     </button>
   </div>

 </div>
):<div  className="border h-screen flex justify-center items-center text-neutral-400  "><i class="fa-solid fa-cart-shopping text-9xl"></i></div>   
} 


    </>
  );
};

export default Panier;