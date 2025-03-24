
import axios from "axios";
import { useState,useEffect,useRef } from "react";
import Catalogue from "./Catalogue";

import image_shop from  '../picture/image_shop.png';
import Navbar from "./Navbar";
import Chargement from "./Chargement";
import ReactPaginate from "react-paginate";
import '../App.css'

const  Shop=()=> {

  const [products, setProducts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
   const [itemsOffset, setItemsOffset]=useState(0)
   const [itemsPerPage, setItemsPerPage]=useState(10)
   const [pageCount,setPageCount]=useState(0)



  const [productsFiltre, setProductsFiltre] = useState([]);
 const  [showCatalogue, setShowCatalogue]=useState(false)
 const  [loading, setchargement]=useState(false)
 const  [idProduct, setIdProduct]=useState(null)
 const  [ panierLength, setPanierLength]=useState(null)
 const   filterRef=useRef(null)

 const fetchData = async () => {

setchargement(true)

  try{
    const response = await axios.post('http://localhost/e-commerce/shop');

    setProducts(response.data);
    setProductsFiltre(response.data);


    

  }catch (error){
    console.error("Erreur lors de la récupération des produits:", error);
  }

  setchargement(false)
  };


  useEffect(()=>{ fetchData()},[])


useEffect(() => {
  
  const endOffset = itemsOffset + itemsPerPage;
  setCurrentItems(products.slice(itemsOffset, endOffset));
  setPageCount(Math.ceil(products.length / itemsPerPage));
}, [itemsOffset, itemsPerPage, products]);

const handlePageClick = (event) => {
  const newOffset = (event.selected * itemsPerPage) % products.length;
  setItemsOffset(newOffset);
};





const catalogue=async(id)=>{
setIdProduct(id)
setShowCatalogue(!showCatalogue)
console.log(idProduct)

}

const usersid =localStorage.getItem('usersid')


const handleFiltrer=()=>{

  if (filterRef.current) {
filterRef.current.classList.toggle("scale-100")

  }
}

const handleSearch=async(recherche)=>{

if(recherche=='all'){

  setProducts( productsFiltre.filter(p=>p.categories))

}


setProducts( productsFiltre.filter(p=>p.categories===recherche))


}


const BarSearch=async(recherche)=>{

  setProducts( productsFiltre.filter(p=>p.name.includes(recherche.trim())) || productsFiltre.filter(p=>p.categories.includes(recherche.trim())) || productsFiltre.filter(p=>p.description.includes(recherche.trim())) || productsFiltre.filter(p=>p.image_url.includes(recherche.trim())) )
}


const notifPanier=(panierLength)=>{

  setPanierLength(panierLength)

}

return (

<>

{ loading ? <Chargement/>:

<div className=" bg-slate-5   ">

<Navbar panierLength={panierLength>0 ? panierLength : null} />
<div className=" w-full pt-4 "> 
<Catalogue idProduct={idProduct}  usersid={usersid} catalogue={showCatalogue} notifPanier={notifPanier}  setCatalogue={setShowCatalogue}  />



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
 <input onChange={(e)=>BarSearch(e.target.value)}  type="search  " placeholder="recherche" className=" py-2 ml-4  w-full outline-none "  /> 
</div>
  </div>




<div className="flex  flex-col  " >
<div  ref={filterRef} onClick={handleFiltrer}  className=" min-w-80 border border-green-700  scale-0 transition-all  p-4   w-3/12 bg-slate-50   grid grid-cols-2 gap-4 rounded-lg  absolute z-20   ">
    <ul>
      <li className="text-xl font-bold mb-4   " > categories</li>
      <li  className=" py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i  onClick={()=>handleSearch('all')} className="fa-solid fa-border-all   mr-3 text-neutral-400   "></i>all</li>
      <li onClick={()=>handleSearch("vetement")} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i  className="fa-solid fa-shirt   mr-3 text-neutral-400"></i>vetement</li>
      <li onClick={()=>handleSearch("electronique")} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-desktop  mr-3 text-neutral-400 "></i>electronic</li>
      <li onClick={()=>handleSearch("jouets")} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-gamepad   mr-3 text-neutral-400"></i>jouet</li>
      <li onClick={()=>handleSearch('livre')} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100">
        <i className="fa-solid fa-book-open   mr-3 text-neutral-400"></i>livre</li>
    </ul>
    <ul>
     <li className="text-xl font-bold mb-4  "  >genre</li>
      <li onClick={()=>handleSearch('all')} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-border-all     mr-3 text-neutral-400 "></i>all</li>
      <li onClick={()=>handleSearch('homme')} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-person  mr-3 text-neutral-400"></i>homme</li>
      <li onClick={()=>handleSearch('femme')} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-person-dress  mr-3 text-neutral-400"></i>femme</li>
      <li onClick={()=>handleSearch('enfant')} className="border py-2 pl-5  rounded-md cursor-pointer transition-all hover:transition-all text-lgy  text-neutral-600 hover:bg-blue-100"><i className="fa-solid fa-children  mr-3 text-neutral-400"></i>enfants</li>

    </ul>
</div>

<div className="   rounded-lg pt-4  overflow-auto flex flex-wrap      px-4">
{   currentItems.map((product) => (
            <div key={product.id} className=" mb-4  product-item mr-2  rounded-md shadow-xl  flex flex-col   h-72 w-60   " >
              <div className=" size-48  object-center  m-auto">
              
              <img src={`http://localhost/e-commerce/Admin/picture/${product.image_url}`} alt="Produit" className=" transition-all hover:transition-all w-full h-full " />
            <div>
            <i onClick={()=>catalogue(product.id)} class="fa-solid fa-cart-plus relative  border text-xl   rounded-full bg-blue-500 text-white cursor-pointer text-center size-10 pt-2 hover:bg-blue-700 active:transform active:scale-90  bottom-5 left-44 "></i>
            
            </div>
              </div>
    <div className="text-lg font-semibold text-center">
    <h3 className="">{product.name}</h3>
          
            <p><span className="mr-5">${product.prix}</span>  <i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i></p>
       
</div>
          </div>
          
          ))}


</div>

<div>
<ReactPaginate
  breakLabel="..."
  nextLabel="next >"
  onPageChange={handlePageClick}
  pageRangeDisplayed={5}
  pageCount={pageCount}
  previousLabel="< previous"
  renderOnZeroPageCount={null}
  containerClassName="pagination" // Conteneur principal
  pageClassName="page-item" // Chaque numéro de page
  pageLinkClassName="page-link" // Lien des numéros de page
  previousClassName="prev-item" // Bouton "previous"
  nextClassName="next-item" // Bouton "next"
  breakClassName="break-item" // Élément "..."
  activeClassName="active" // Page active
/>

</div>



 

</div>
      

</div>

</div>



</div>
</div>
}




</>

     );
}

export default Shop;