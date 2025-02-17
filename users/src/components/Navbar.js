import { Link } from "react-router-dom";
import {Tooltip} from "react-tooltip";


const Navbar =()=>{

    return(
        <>
<nav className=" flex justify-between  max-[320px]:justify-evenly  max-[480px]:justify-start px-20  max-[480px]:px-2   mb-4  bg-fixed">
  <div className=" max-[320px]:text-xl  font-bold text-4xl bg-clip-text bg-gradient-to-tr from-pink-500  to-fuchsia-400 0 text-transparent h-auto "><span>dream</span><span>shop</span></div>


  <div className=" w-1/3  p-2 flex justify-evenly items-center  ">
  <i className="fa-solid fa-bell border p-3 rounded-full text-neutral-400 cursor-pointer transition-all hover:transition-all hover:bg-blue-100"></i>
<Link to="/Panier">     <i className="fa-solid fa-cart-shopping  border p-3 rounded-full text-neutral-400 cursor-pointer transition-all hover:transition-all hover:bg-blue-100"></i>
</Link>       
        <Link to="/Profil"><i data-tooltip-id="tooltip1 border"  className="fa-solid fa-user border p-3 rounded-full text-neutral-400 cursor-pointer transition-all hover:transition-all hover:bg-blue-100">  </i></Link>
        <Tooltip  id="tooltip1" content="voir  mon  profil"/>
    </div>

{/* section sidebar pour les filtre */}
 <div   className="border-4 p-4   w-3/12 bg-slate-50  absolute grid grid-cols-1 gap-4 rounded-lg top-20 -left-96 transition-all transform    ">
    <ul>
      <li className="text-xl font-bold mb-4   " > categories</li>
      <li  className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-border-all   mr-3 text-neutral-400   "></i>all</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-shirt   mr-3 text-neutral-400"></i>vetement</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-desktop  mr-3 text-neutral-400 "></i>electronic</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-gamepad   mr-3 text-neutral-400"></i>jouer</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-book-open   mr-3 text-neutral-400"></i>livre</li>
    </ul>
    <ul>
     <li className="text-xl font-bold mb-4  "  >genre</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-border-all     mr-3 text-neutral-400 "></i>allall</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-person  mr-3 text-neutral-400"></i>homme</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-person-dress  mr-3 text-neutral-400"></i>femme</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-children  mr-3 text-neutral-400"></i>enfants</li>

    </ul>
</div>

</nav></>
    )
}

export default Navbar