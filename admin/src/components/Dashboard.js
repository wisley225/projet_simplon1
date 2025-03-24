import { useEffect,useState } from "react"
import axios from "axios";
import Graphique from "./Graphique";
import Chartpie from "./Chartpie";




const  Dashboard=()=> {

  const [TabProduct ,setTabProduct]=useState([]);
  const [TabCmd ,setTabCmd]=useState([]);

const fetchData = async () => {

    try {
        const resproduct = await axios.post('http://localhost/e-commerce/shop');
        const respCmd = await axios.post('http://localhost/e-commerce/Admin/comTT');
        console.log(respCmd.data)
    
        setTabProduct(resproduct.data)
        setTabCmd(respCmd.data)
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
    }

}

// recuperer les produits livrer et calculer le chiffre d'affaire 

const Tab_prixTT_Com =TabCmd.map(commande => commande.total_price)
const prixTT_Com=Tab_prixTT_Com.reduce((a,b)=>a+b,0)
console.log(prixTT_Com)

useEffect(() => {
fetchData()
}, [])




    return(
    <>
    <div  className="  flex flex-wrap   mt-5  mb-10  ">

        <div className=" h-24 p-5 mr-2   my-2 border  w-80 rounded-md flex   items-center hover:bg-neutral-200 cursor-pointer transition-all ">
            <div className=" shrink-0 bg-blue-500 text-white rounded-full  border-8 border-blue-300  mr-4    size-14 flex items-center justify-center ">
                <i className="fa-solid fa-dollar-sign  text-2xl "></i></div>
            <div className=" self-center text-xl font-bold">
                <p className="text-neutral-400">chiffre d'affaire </p>
                <p>$ {prixTT_Com} </p>
            </div>
        </div>

        <div className=" h-24 p-5 mr-2 my-2 border w-80 rounded-md flex   items-center hover:bg-neutral-200 cursor-pointer transition-all ">
            <div className=" bg-blue-500 text-white rounded-full  border-8 border-blue-300  mr-4    size-14 flex items-center justify-center ">
            <i className="fa-solid fa-cart-shopping"></i>
                </div>
            <div className=" self-center text-xl font-bold">
                <p className="text-neutral-400"> commandes</p>
                <p>{TabCmd.length} </p>
            </div>
        </div>

        <div className=" h-24 px-5 mr-2 my-2 border w-80 rounded-md flex   items-center hover:bg-neutral-200 cursor-pointer transition-all ">
            <div className=" bg-blue-600 text-white rounded-full  border-8 border-blue-300  mr-4    size-14 flex items-center justify-center ">
            <i className="fa-solid fa-dolly"></i>
                </div>
            <div className=" self-center text-xl font-bold">
                <p className="text-neutral-400">produits </p>
                <p>{TabProduct.length} </p>
            </div>
        </div>
       
    </div>

    <div className="  h-80 w-full flex  justify-between max-lg:flex-wrap    ">
        <div className="border  w-8/12 mr-8 rounded-md bg-white mb-3 min-w-96 ">
        
        <Graphique/>
        
        </div>
        <div className="border w-4/12  rounded-md bg-white min-w-80">
          <Chartpie/>
        </div>
    </div>
   
      
    </>)
    
}

export default Dashboard








// Nombre total de commandes (en cours, livrées, annulées).
// Revenus générés (chiffre d’affaires).
// Nombre de nouveaux utilisateurs.
// Produits les plus vendus.
// Graphiques et rapports sur l'évolution des ventes.