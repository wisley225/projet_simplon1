
import picture_home from '../picture/picture_home.png';
import SignUp from "./SignUp";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import "./home.css"
import { useRef } from 'react';


const images = [
    "http://localhost/e-commerce/admin/picture/picture_home",
    "http://localhost/e-commerce/admin/picture/image_shop",
    "http://localhost/e-commerce/admin/picture/casque_rose-remove",
    "http://localhost/e-commerce/admin/picture/iphone16-remove",
    "http://localhost/e-commerce/admin/picture/chapeau_remove",
    "http://localhost/e-commerce/admin/picture/chaussure_remove",
    "http://localhost/e-commerce/admin/picture/vetement-bebe",
  ];

const Home=()=>{
  
    const [showSign, setShowsign]=useState(false);
    const  showMenuRef=useRef(null)
const sign=()=>{
 
    setShowsign(!showSign)
   
}

const showMenu=()=>{

  if (showMenuRef.current) {
     showMenuRef.current.classList.toggle('active')
  }

}

   return<>


<SignUp  sign={showSign} /> 
<header className=" overflow-hidden   bg-gradient-to-l to bg-blue-400  from-red-200 via-slate-400 " >

<i className=" pl-4 fa-solid fa-bars text-3xl menu " onClick={showMenu}></i>
<nav ref={showMenuRef}   className="stylecss max-h-80 max-[641px]:backdrop-brightness-50 rounded-md     max-[641px]:absolute max-[641px]:z-20   max-lg:h-auto max-lg:w-full max-[751px]:flex-col  max-[751px]:items-center max-[751px]:justify-evenly max-[751px]:h-40    max-lg:mx-2 text-lg text-white font-medium  flex justify-between mx-20 pt-5  ">
    <ul className='  '>
        <li className="cursor-pointer  ">
        <i className="fa-solid fa-shop" ></i>
           <span className='bg-clip-text bg-gradient-to-tr from-pink-500  to-fuchsia-400 0 text-transparent text-2xl font-extrabold'>Dream shop</span> 
        </li>
    </ul>
    
    <ul className="navul-3 max-[609px]:flex-col max-[609px]:h-60 max-[609px]:items-center  max-lg:h-auto flex justify-between w-2/5   max-lg:w-3/5 max-md:justify-around " >
       <li className="cursor-pointer   ">Home</li> 
       <li className="cursor-pointer   ">Category</li> 
       <li className="cursor-pointer   ">Service</li> 
       <li className="cursor-pointer   ">Contactez nous</li> 
    </ul>

    <ul>
       <li className="  cursor-pointer border px-5 py-1 rounded-full transition-all  hover:backdrop-brightness-50"  onClick={sign}>Sign up</li> 
    </ul>
</nav>







<div className=" grid grid-cols-2 max-md:grid-cols-1 m-5   place-content-cente b">

    <div className="     flex flex-col justify-evenly    ">
    <h1 className="  max-md:w-full text-5xl font-bold text-white mb-4 w-96    leading-snug ">A Personalized Outfit <span className="bg-clip-text text-transparent bg-gradient-to-r  from-violet-500  to-violet-400 via-pink-400">Shopping Experience</span></h1>
     
    <div className="  flex flex-wrap   items-center ">
    <p className="  mr-8 text-lg text-white inline-block w-1/2    ">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, quo qui repellendus sunt beatae,
    !</p>
    <button onClick={sign} className=" my-4  text-white text-2xl font-semibold rounded-full cursor-pointer
            hover:bg-none hover:transition-all transition-all  inline-block   bg-gradient-to-r
              from-violet-600  to-pink-300 via-violet-400 px-10 py-2 ">shop Now</button>
     
     
        </div>
    

    <h2 className=' text-2xl font-semibold text-white my-4 '>Gallery</h2>
    
    <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        loop={true} 
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Défilement toutes les 3s
        className="  border border-violet-700 rounded-xl    w-full "
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className=" object-cover size-52   object-center rounded-lg max-[572px]:hidden  " />
          </SwiperSlide>
        ))}
      </Swiper> 
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true} 
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Défilement toutes les 3s
        className="max-[572px]:border border-violet-700 rounded-xl    w-full "
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className=" object-cover size-52   object-center rounded-lg hidden max-[572px]:block  m-auto  " />
          </SwiperSlide>
        ))}
      </Swiper>
   
    </div>

<div className='max-md:hidden  abosulte z-10 '>
<Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true} 
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Défilement toutes les 3s
        className="rounded-lg    w-full h-9/12"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className=" object-cover   " />
          </SwiperSlide>
        ))}

    
      </Swiper>
      <p className=' text-end '>
      <i class="fa-brands fa-facebook text-2xl border px-1 rounded-full  ml-3  text-center"></i>
      <i class="fa-brands fa-instagram text-2xl border px-1 rounded-full  ml-3 text-center "></i>
      <i class="fa-brands fa-twitter text-2xl border px-1 rounded-full  ml-3  text-center"></i>
      </p>
</div>
  

      
</div>



</header>

    
    </>
}

export default Home