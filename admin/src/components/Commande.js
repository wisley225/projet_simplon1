import axios from "axios";
import { useEffect,useState,useRef } from "react";
import "./commande.css"

const  Dashboard=()=> {

const [commandes ,setCommandes]=useState([]);
const [originalCommandes, setOriginalCommandes] = useState([]); // Liste des commandes originales
const [commandeUsers_id ,setCommandeId]=useState(null);
const [detailsComd ,setShowDetailsComd]=useState([]);// fait allusion au details concernant les produits
const [detailsplus ,setShowDetailsPlus]=useState([]);// fait allusions aux details sur les information du users par rapport a la commande  
const [numberCmd_EN_COURS ,setNumberCmd_EN_COURS]=useState([]);// recupere les commande en cours 
 const [numberCmd_EXPEDIE ,setNumberCmd_EXPEDIE]=useState([]);// recupere les commande expedié 
    const [numberCmd_LIVRE ,setNumberCmd_LIVRE]=useState([]);// recuperer les commande validé
    const [NumberCmd_ANNULER ,setNumberCmd_ANNULER]=useState([]);// recuperer les commande annuler
    const [vente,setVentes]=useState([])// recuperer les commandes sur 1semaine
const colorsRef=useRef(null);
const [clickDetails,setClickDetails]=useState(false);

      
    
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost/e-commerce/Admin/commande');//recuperer toute les  commandes
            console.log(response.data)

    setCommandes(response.data)
    setOriginalCommandes(response.data)

    setNumberCmd_EN_COURS(response.data.filter(commande=>(commande.order_status==="en cours")))
    setNumberCmd_EXPEDIE(response.data.filter(commande=>(commande.order_status==="expedie")))
    setNumberCmd_LIVRE(response.data.filter(commande=>(commande.order_status==="livre")))
    setNumberCmd_ANNULER(response.data.filter(commande=>(commande.order_status==="annuler")))
  
     setVentes(numberCmd_LIVRE.map(cmd=>(cmd.quantity*cmd.prix)))
      console.log(vente)
      console.log(commandes)
   
    
    } catch (error){
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };



  useEffect(() => {
    fetchData();
   
  }, []);


//recuperation de l'i de la commande pour voir les details



const showDetails=async(commande_id)=>{
    setCommandeId(commande_id)

console.log(commande_id)
    try {
        const respCmd = await axios.post('http://localhost/e-commerce/Admin/details_orders.php',{commande_id});
        console.log(respCmd.data)
        setShowDetailsComd(respCmd.data.produits)
        setShowDetailsPlus(respCmd.data.details_livraison)
        setClickDetails(!clickDetails) 

    } catch (error) {
        console.error('erreur client  a la recuperation ',error.response ? error.response.data : error.message)}

}


console.log(detailsplus)
  


const handleStatus=async(status)=>{

   const id =commandeUsers_id
    const respUpdateStatue = await axios.post('http://localhost/e-commerce/Admin/status.php',{status,id});
  
   if (respUpdateStatue.data && respUpdateStatue.data.succes) {
       alert(respUpdateStatue.data.succes)
       fetchData()
       }
    else{
        alert(respUpdateStatue.data.error)
  }}


const filterStatus = (arg) => {

        setCommandes(originalCommandes.filter((c) => c.order_status === arg));
   
};

const search = (value) => {

setCommandes(originalCommandes.filter(c=>String(c.user_id).includes(value)) || originalCommandes.filter(c => c.order_status.includes(value)) || originalCommandes.filter(c => c.total_price.includes(value)) || originalCommandes.filter(c => c.created_at.includes(value)) || originalCommandes.filter(c => c.option_livraison.includes(value)));

}

  if (clickDetails) {
     

      return <>
  <h1 className=" mb-10 text-2xl font-semibold text-gray-700 first-letter:uppercase ">  produits de la commande  </h1>
  <div className=" flex justify-end my-4 ">
      <div  className=" show border rounded-lg py-2 px-3 text-lg  cursor-pointer hover:bg-neutral-300 transition-all "> Autre action <i  class="fa-solid fa-chevron-down"></i>
      <ul   className="border absolute z-10 bg-white rounded-lg transition-all">
          <li className="py-1 px-4 cursor-pointer hover:bg-neutral-200  transition-all text-sm"> Telecharger la facture</li>
          <li className="py-1 px-4 cursor-pointer hover:bg-neutral-200  transition-all text-sm"> Telecharger recu le de commande</li>
      </ul>
      </div>
      <div className=" show border  rounded-lg text-lg py-2 px-3   ml-6 bg-blue-600 text-white  cursor-pointer hover:bg-blue-700 transition-all "> status  de  la commande <i class="fa-solid fa-chevron-down"></i>
    
      <ul  className="border absolute z-10 bg-blue-600 rounded-lg text-white ">
          <li className="py-1 px-4 cursor-pointer hover:bg-blue-500  transition-all text-sm" onClick={()=>handleStatus("en cours")}> en cours</li>
          <li className="py-1 px-4 cursor-pointer hover:bg-blue-500  transition-all text-sm" onClick={()=>handleStatus("expedie")}> expédié</li>
          <li className="py-1 px-4 cursor-pointer hover:bg-blue-500  transition-all text-sm" onClick={()=>handleStatus("livre")}>  validé</li>
          <li className="py-1 px-4 cursor-pointer hover:bg-blue-500  transition-all text-sm" onClick={()=>handleStatus("annuler")}> Annuler la commande</li>
      </ul>
      </div>
  </div>

  <div className="  pb-5 rounded-lg px-4 bg-white">
  <div className="  ">
  <ul className=" grid grid-cols-3 text-end w-1/2 ml-auto">
          <li className=" font-bold ">Prix TTC</li>
          <li className=" font-bold ">Quantité</li>
          <li className=" font-bold ">Total TTC</li>
        </ul> 
  </div>


      <div>

 { detailsComd.map((details) => (
     <div key={details.produit_id} className="  flex justify-between  mb-3">


     <div  className="flex flex-wrap items-center">
     <div className="size-20 ">  

         <img src={`http://localhost/e-commerce/Admin/picture/${details.image_url}`} alt="photo de" className="size-full" /> 
         </div>
     <p>
     <span className="block font-semibold text-xl">{details.produit_nom}</span>
     <span className="block text-neutral-400">{details.categories}</span>
     </p>
     </div>
     <ul className=" grid grid-cols-3 text-end w-1/2   ">
   
         <li className=" self-center">{details.prix_unitaire} </li>
         <li className=" self-center">{details.quantite} </li>
         <li className=" self-center">{details.quantite*details.prix_unitaire} </li>
       
       </ul>
     </div> 
 )) }
 </div>

    

         <div className="border border-gray-950 inline-block p-4 bg-white rounded-md mt-4">
         <p className="" ><span className="font-bold">nom users:</span> {detailsplus.nom_client}</p>
         <p className=""><span className="font-bold">Address de livraison:</span> {detailsplus.address_livraison} </p>   
          <p className="" ><span className="font-bold">date de la commande:</span> {detailsplus.date_commande} </p>
          <p className="" ><span className="font-bold">commande numero:</span> {detailsplus.commande_id} </p>
      </div>

 



  </div>
  </>
 }

    return(
    <>
    <div className=" rounded-md border cursor-pointer inline-block">
<i class="fa-solid fa-magnifying-glass p-2 text-neutral-400  "></i> <input onChange={(e)=>search(e.target.value)} type="search" className="outline-none  " placeholder="rechercher une commande"/>
  </div>
    <div  className="  grid grid-cols-4 gap-3 h-24   mt-5  mb-10  ">

        <div onClick={()=>filterStatus("en cours")} className="  shadow-md shadow-orange-300 border-orange-200 rounded-md flex justify-center   items-center hover:bg-orange-200 cursor-pointer transition-all ">
            <div className=" bg-orange-500 text-white rounded-full  border-8 border-orange-300  mr-1    size-14 flex items-center justify-center ">
            <i class="fa-regular fa-hourglass-half"></i>
                </div>
            <div  className=" self-center text- font-bold">
            {/*        */}
                     <p  className=" text-orange-600">Commande en cours </p>
                <p className="text-center text-orange-600">{ numberCmd_EN_COURS.length } </p>
            </div>
        </div>

        <div onClick={()=>filterStatus("expedie")} className="  shadow-md shadow-blue-300 rounded-md flex  justify-center  items-center hover:bg-blue-200 cursor-pointer transition-all ">
            <div className=" mr-1 bg-blue-600 text-white rounded-full  shadow-md shadow-blue-200   size-14 flex items-center justify-center ">
            <i className="fa-solid fa-cart-shopping"></i>
                </div>
            <div className=" self-center text-base font-bold">
                <p  className="text-blue-600" > commandes expedié</p>
                <p className="text-center"> {numberCmd_EXPEDIE.length} </p>
            </div>
        </div>

        <div onClick={()=>filterStatus("livre")}  className=" shadow-md  shadow-green-300  rounded-md flex justify-center   items-center hover:bg-green-200 cursor-pointer transition-all ">
            <div className=" bg-green-600 mr-1 text-white rounded-full  border-8 border-green-300      size-14 flex items-center justify-center ">
            <i className="fa-solid fa-dolly"></i>
                </div>
            <div className=" self-center text-base font-bold">
                <p  className="text-green-600">commandes  validé </p>
                <p className="text-center">{numberCmd_LIVRE.length} </p>
            </div>
        </div>
       
       
        <div onClick={()=>filterStatus("annuler")}  className=" shadow-md shadow-red-300 rounded-md flex  justify-center  items-center hover:bg-red-200 cursor-pointer transition-all  ">
            <div className=" bg-red-600 text-white rounded-full  border-8 border-red-300  mr-1    size-14 flex items-center justify-center ">
            <i className="fa-solid fa-dolly"></i>
            </div>
            <div className=" self-center text-base font-bold">
                <p  className="text-red-600">annuler </p>
                <p className="text-center">{NumberCmd_ANNULER.length} </p>
            </div>
        </div>
    </div>


{ commandes.length>0 ?  <ul className=" h-8 ">
<li className="grid grid-cols-6  mb-6 text-xl font-medium">

<span className="text-center  "> users</span>
<span className="text-center  "> prix </span>
<span className="text-center  "> status</span>
<span className="text-center  "> option livraison</span>
<span className="text-center  "> heure</span>
<span className="  text-center cursor-pointer flex  items-center m-auto  hover:text-green-500  "></span>
</li>
   {commandes.map((commande) => (
    <li  key={commande.id} className="grid grid-cols-6 mb-3">

        <span className="text-center  "> {commande.user_id}</span>
        <span className="text-center  "> {commande.total_price}</span>
        <span className={`text-center  py-1 rounded-full  ${commande.order_status ==="en cours" ?  'text-orange-600 bg-orange-200 ' : ""  
        } ${commande.order_status ==="expedie" ?  'text-blue-600  bg-blue-200 ' : ""
        } ${commande.order_status ==="livre" ?  'text-green-600 bg-green-200'  : ""
        } ${commande.order_status ==="annuler" ?  'text-red-600 bg-red-200' : ""
        }  `  }   ref={colorsRef}  > {commande.order_status}</span>
        <span className="text-center"> {commande.option_livraison}</span>
        <span className="text-center  "> {commande.created_at}</span>
       <button onClick={()=>showDetails(commande.id)} className= {`text-center cursor-pointer flex  items-center m-auto  ${commande.order_status==="en cours" ? 'text-orange-600 rounded-lg  px-2 bg-orange-300 transition-all hover:text-orange-700': ''} 
                                                                                                                         ${commande.order_status==="expedie" ? 'text-blue-600 rounded-lg  px-2 bg-blue-300 transition-all hover:text-blue-700': ''} 
                                                                                                                          ${commande.order_status==="livre" ? 'text-green-600 rounded-lg  px-2 bg-green-300 transition-all hover:text-green-700': ''}
                                                                                                                           ${commande.order_status==="annuler" ? 'text-red-600 rounded-lg  px-2 bg-red-300 transition-all hover:text-red-700': ''}border`}  
                                                                                                                           >details..</button>
    </li>

   ))}
</ul> : <h1>pas de commande pour l'instant</h1>}
    
      
    </>)



    
}

export default Dashboard








// Nombre total de commandes (en cours, livrées, annulées).
// Revenus générés (chiffre d’affaires).
// Nombre de nouveaux utilisateurs.
// Produits les plus vendus.
// Graphiques et rapports sur l'évolution des ventes.