import { Link } from "react-router-dom";
import {Tooltip} from "react-tooltip";


const  Shop=()=> {
    return ( 

<>

<nav className=" flex justify-between px-20 mt-5  ">
  <div className="border flex  items-center ">Logo</div>

  <ul className="flex border  w-2/3 justify-evenly items-center">
    <li>Mobile</li>
    <li>Electronoque</li>
    <li>Headphones</li>
    <li>vetement</li>
    <li>all produit</li>

    
  </ul>
  <div className="border p-2">
        <input type="search"  className="mr-4 border-b border-b-black" placeholder="search" />
        <i class="fa-solid fa-cart-shopping mr-4 "></i>
        <Link to="/Profil"><i data-tooltip-id="tooltip1" className="cursor-pointer fa-regular fa-user  border text-xl rounded-full size-10 text-center">  </i>
        </Link>
        <Tooltip  id="tooltip1" content="voir  mon  profil"/>
    </div>
</nav>

</>

     );
}

export default Shop;