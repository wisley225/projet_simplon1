import react from "react";
import picture_home from './picture_home.png';
import Sign_up from "./Sign_up";
import { useState } from "react";

const Home=()=>{

    const [showSign, setShowsign]=useState(false);

const sign=()=>{
    setShowsign(!showSign)
}



   return<>

{ showSign ? <Sign_up   />: ''}
<header className="bg-gradient-to-l to bg-blue-300  from-red-200 via-slate-300 h-screen " >

    

<nav className="text-lg font-medium  flex justify-between mx-20 pt-5">
    <ul>
        <li className="cursor-pointer ">
            Dream shop
        </li>
    </ul>
    
    <ul className="flex justify-between w-2/5" >
       <li className="cursor-pointer ">Home</li> 
       <li className="cursor-pointer ">Category</li> 
       <li className="cursor-pointer ">Service</li> 
       <li className="cursor-pointer ">Contactez nous</li> 
    </ul>

    <ul>
       <li className="cursor-pointer "  onClick={sign}>Sign in</li> 
    </ul>
</nav>

<div className="grid grid-cols-2 m-20">

    <div className=" flex flex-col justify-between ">
    <h1 className=" text-4xl font-bold text-white w-80 leading-snug ">A Personalized Outfit <span className="bg-clip-text text-transparent bg-gradient-to-r  from-violet-500  to-violet-400 via-pink-400">Shopping Experience</span></h1>
     
    <div className="flex  items-center justify-around">
    <p className=" text-lg text-white inline-block w-1/2    ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quo qui repellendus sunt beatae,
    !</p><span className="   text-white text-lg font-semibold rounded-full cursor-pointer hover:bg-none hover:transition-all transition-all  inline-block   bg-gradient-to-r  from-violet-600  to-pink-300 via-violet-400 px-10 py-2 ">shop Now</span>
        </div>
    
    <div>
        <h2>Gallery</h2>
        <div>
            <div></div>
        </div>
    </div>
    
    </div>

     <img src={picture_home} alt="une femme  qui fait du shopping" />
  
</div>



</header>

    
    </>
}

export default Home