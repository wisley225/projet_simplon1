import { Link } from "react-router-dom";

const Sidebar=()=>{


return (
< >

<div >


<nav className="bg-gray-950 w-72 text-white h-screen">
<ul>
   
    <input type="search" placeholder="search" className="bg-slate-700 w-full   my-4 py-2 pl-4 placeholder:text-xl" />
    <Link to='/'><li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 "> 📊dashbaord</li></Link>
    <Link to='/Produits' ><li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">  🛍️Produits </li></Link>
    <Link to='/Commande' ><li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">🛒 Commandes</li> </Link>
    <Link to='/Users' >     <li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">👥 Utilisateurs</li></Link>
    <li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">💬 Avis & Évaluations</li>
    <li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">🎟️ Promotions & Codes Promo</li>
    <li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">📩 Emails & Newsletters</li>
    <li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">🔒 Sécurité & Permissions</li>
    <li className="cursor-pointer py-2 transition-all hover:transition-all hover:bg-gray-800 ">⚙️Paramettre</li>
    
</ul>
<div>

</div>

</nav>

</div>



</>


)



}

export default Sidebar






// 📊 Tableau de bord
// 🛍️ Produits (Ajouter, Modifier, Supprimer)
// 🛒 Commandes (Suivi, Statuts)
// 👥 Utilisateurs (Gestion des clients/admins)
// 💬 Avis & Évaluations
// 🎟️ Promotions & Codes Promo
// 📩 Emails & Newsletters
// 📂 Retours & Remboursements
// 🔒 Sécurité & Permissions







