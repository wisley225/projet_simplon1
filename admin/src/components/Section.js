import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom"
import Produits from "./Produits";
import Commande from "./Commande";
import Users from "./Users";



const  Section=()=> {


    return <>


    <div className=" border-2 border-gray-900 rounded-e-md  w-full  p-4 h-screen overflow-y-auto">
    
    <Routes>
    <Route path="/" element={<Dashboard />}/>
    <Route path="/Produits" element={<Produits />}/>
    <Route path="/Produits" element={<Produits />}/>
    <Route path="/Commande" element={<Commande />}/>
    <Route path="/Users" element={<Users />}/>
    </Routes>

    </div>
           
    </>
    
}
export default Section