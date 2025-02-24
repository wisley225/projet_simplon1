import { useEffect,useState } from "react"
import axios from "axios";
import Graphique from "./Graphique";
import Chartpie from "./Chartpie";




const  Dashboard=()=> {

  const [numberProduct ,setNumberProduct]=useState([]);
  const [numberCmd ,setNumberCmd]=useState([]);

const fetchData = async () => {

    try {
        const resproduct = await axios.post('http://localhost/e-commerce/shop');
        const respCmd = await axios.post('http://localhost/e-commerce/Admin/comTT');
        console.log(respCmd.data)
    
        setNumberProduct(resproduct.data)
        setNumberCmd(respCmd.data)
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
    }

}



useEffect(() => {
fetchData()
}, [])




    return(
    <>
    <div  className="  grid grid-cols-3 gap-6 h-24  shrink-0  mt-5  mb-10  ">

        <div className=" p-5 border rounded-md flex   items-center hover:bg-neutral-200 cursor-pointer transition-all ">
            <div className=" bg-orange-500 text-white rounded-full  border-8 border-orange-300  mr-4    size-14 flex items-center justify-center ">
                <i className="fa-solid fa-dollar-sign  text-2xl "></i></div>
            <div className=" self-center text-xl font-bold">
                <p className="text-neutral-400">chiffre d'affaire </p>
                <p>$ 123455698 </p>
            </div>
        </div>

        <div className=" p-5 border rounded-md flex   items-center hover:bg-neutral-200 cursor-pointer transition-all ">
            <div className=" bg-green-600 text-white rounded-full  border-8 border-green-300  mr-4    size-14 flex items-center justify-center ">
            <i className="fa-solid fa-cart-shopping"></i>
                </div>
            <div className=" self-center text-xl font-bold">
                <p className="text-neutral-400"> commandes</p>
                <p>{numberCmd.length} </p>
            </div>
        </div>

        <div className=" px-5 border rounded-md flex   items-center hover:bg-neutral-200 cursor-pointer transition-all ">
            <div className=" bg-blue-600 text-white rounded-full  border-8 border-blue-300  mr-4    size-14 flex items-center justify-center ">
            <i className="fa-solid fa-dolly"></i>
                </div>
            <div className=" self-center text-xl font-bold">
                <p className="text-neutral-400">produits </p>
                <p>{numberProduct.length} </p>
            </div>
        </div>
       
    </div>

    <div className="  h-80 w-full flex  justify-between   ">
        <div className="border  w-8/12 mr-8 rounded-md bg-white ">
        
        <Graphique/>
        
        </div>
        <div className="border w-4/12  rounded-md bg-white">
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