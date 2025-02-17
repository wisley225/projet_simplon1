
import axios from "axios";
import { useState,useEffect,useRef } from "react";
import Catalogue from "./Catalogue";

import image_shop from  '../picture/image_shop.png';
import Navbar from "./Navbar";


const  Shop=()=> {

  const [products, setProducts] = useState([]);
 const  [showCatalogue, setShowCatalogue]=useState(false)
 const  [idProduct, setIdProduct]=useState(null)
 const   filterRef=useRef(null)

 const fetchData = async () => {
  try{
    const response = await axios.post('http://localhost/e-commerce/shop');

    setProducts(response.data);

  }catch (error){
    console.error("Erreur lors de la récupération des produits:", error);
  }

  
 



};




  useEffect(() => {
    fetchData();
  }, []);


const catalogue=async(id)=>{


  setShowCatalogue(!showCatalogue)
  setIdProduct(id)

}

const usersid =localStorage.getItem('usersid')


const handleFiltrer=()=>{

  if (filterRef.current) {

    filterRef.current.classList.toggle("scale-100")

  }
}

const handleSearch=async(recherche)=>{


  const respfiltre = await axios.post('http://localhost/e-commerce/Admin/recherche.php',{recherche});
  setProducts(respfiltre.data)
 


}

return (

<>


<div className=" bg-slate-50  ">


<div className=" w-full pt-4  ">
<Navbar/>

{/* HOME SHOPPING */}
<div className="w-full  ">
<div className="bg-blue-200 h-40 flex  max-[320px]:w-full  justify-between px-10  items-center w-9/12 m-auto  rounded-xl  ">
  <h1 className="font-extrabold ">HOME . SHOPPING</h1>
  <img src={image_shop} alt="" className=" size-40 transform " />
</div>


{/* VENTE DES PRODUITS */}
<div className="product-list p-4    ">
  <div className="flex  items-center justify-end">
  <i onClick={handleFiltrer}   className="fa-solid fa-filter border mr-2  p-3 rounded-full text-neutral-400 cursor-pointer transition-all hover:transition-all hover:bg-blue-100   " ></i>
  <div className=" w-60 flex border text-center   rounded-lg"><i class="fa-solid fa-magnifying-glass text-lg self-center  w-1/6    text-gray-300"></i>
 <input onBlur={(e)=>handleSearch(e.target.value)}  type="search  " placeholder="search product" className=" py-2 ml-4  w-full outline-none "  /> 
</div>
  </div>




<div className="flex  flex-col   " >
<div  ref={filterRef} onClick={handleFiltrer}  className=" min-w-80  scale-0 transition-all border-4 p-4   w-3/12 bg-slate-50   grid grid-cols-2 gap-4 rounded-lg  absolute z-20   ">
    <ul>
      <li className="text-xl font-bold mb-4   " > categories</li>
      <li  className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-border-all   mr-3 text-neutral-400   "></i>all</li>
      <li onClick={(e)=>handleSearch(e.currentTarget,"vetement")} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i  className="fa-solid fa-shirt   mr-3 text-neutral-400"></i>vetement</li>
      <li onClick={(e)=>handleSearch(e.currentTarget,"electronique")} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-desktop  mr-3 text-neutral-400 "></i>electronic</li>
      <li onClick={(e)=>handleSearch(e.currentTarget,"jouet")} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-gamepad   mr-3 text-neutral-400"></i>jouet</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-book-open   mr-3 text-neutral-400"></i>livre</li>
    </ul>
    <ul>
     <li className="text-xl font-bold mb-4  "  >genre</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-border-all     mr-3 text-neutral-400 "></i>all</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-person  mr-3 text-neutral-400"></i>homme</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-person-dress  mr-3 text-neutral-400"></i>femme</li>
      <li className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-children  mr-3 text-neutral-400"></i>enfants</li>

    </ul>
</div>

<div className=" border rounded-lg pt-4 h-screen overflow-auto flex flex-wrap      px-4">
{   products.map((product) => (
            <div key={product.id} className="   product-item mr-2  rounded-md shadow-xl  flex flex-col   h-72 w-60   " >
              <div className=" border h-3/4   ">
              <img src={`http://localhost/e-commerce/Admin/picture/${product.image_url}`} alt="Produit" className=" transition-all hover:transition-all w-full h-full" />
            <div>
            <i onClick={()=>catalogue(product.id)} class="fa-solid fa-cart-plus relative  border text-xl   rounded-full bg-blue-500 text-white cursor-pointer text-center size-10 pt-2 hover:bg-blue-700 active:transform active:scale-90  bottom-5 left-44 "></i>
            
            </div>
              </div>
<div className="text-lg font-semibold text-center">
<h3 className="">{product.name}</h3>
          <div>

          </div>
            <p><span className="mr-5">${product.prix}</span>  <i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></p>
       
</div>
          </div>
          
          ))}


</div>


     <Catalogue idProduct={idProduct}  usersid={usersid} catalogue={showCatalogue} setShowCatalogue={setShowCatalogue} />

 

</div>
      

</div>

</div>



</div>
</div>



</>

     );
}

export default Shop;