import axios from "axios";
import { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import image_connexion2 from '../picture/image_connexion2.webp'

const Catalogue = ({ idProduct, usersid, catalogue,setCatalogue, notifPanier }) => {
  const [product, setProduct] = useState({});
  const [quantite, setQuantite] = useState(1);
  const [prixTotal, setPrixTotal] = useState(0);
  const catalogueRef=useRef(null);



  const fetchData = async () => {
   
    try {
      const response = await axios.post("http://localhost/e-commerce/shop");
      const findProduct = response.data.find((tabProduct) => tabProduct.id === idProduct);

      if (findProduct) {
        setProduct(findProduct);
        console.log(findProduct);
      }

    
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }

    console.log(idProduct)
  };

  useEffect(() => {
    fetchData();
  }, [idProduct]);

  useEffect(() => {
    if (product.prix) {
      setPrixTotal(product.prix * quantite);
    }
  }, [product, quantite]);

  const soustra = () => {
    if (quantite > 1) {
      setQuantite((prevQuantite) => prevQuantite - 1);
      
      setPrixTotal((prevPrix) => prevPrix - product.prix);
    }
  };

  const addit = () => {
    setQuantite((prevQuantite) => prevQuantite + 1);
    setPrixTotal((prevPrix) => prevPrix + product.prix);
  };


  const ajouter = async () => {     
      if (idProduct !== null && usersid !== null) {

        try {
          const res = await axios.post("http://localhost/e-commerce/panier", {idProduct,usersid, quantite });
       
          console.log(res.data);
          localStorage.setItem("prixTotal",prixTotal)         
          alert(res.data.succes)
          if (res.data.succes) {
            const response = await axios.post("http://localhost/e-commerce/recup_panier", { idProduct, usersid });
              if (response.data.length>0) {
                notifPanier(response.data.length)
              }
          }
   
        } catch (error) {
          console.error("Erreur lors de la récupération du panier", error);
        }
       
      
        
      }
    };


if (catalogue) {
  if (catalogueRef.current) {
    catalogueRef.current.classList.remove('scale-0')
  }
  
}

const removeCatalogue=()=>{

  if (catalogueRef.current) {
    catalogueRef.current.classList.add('scale-0')
  }
 setCatalogue(!catalogue)
}



  return (
    <>
    
<div  ref={catalogueRef}  className="     transition-all   h-auto grid grid-cols-2 fixed left-60 bottom-8   z-10 w-7/12 transform scale-0  ">
<div  className=" bg-white rounded-s-lg  p-2 ">
<div className="  flex flex-col justify-evenly ">
<div className="   size-44  m-auto mt-4 rounded-lg ">
  <img src={`http://localhost/e-commerce/Admin/picture/${product.image_url}`} alt="" className="h-full w-full rounded-lg border" />
</div>
   <h1 className=" font-semibold text-2xl"> {product.name} </h1>
   <p>
    <span className="mr-5 text-2xl">${product.prix}
    </span>
     <br/> <br/>
     <i class="fa-solid fa-star text-yellow-400"></i>
      <i class="fa-solid fa-star text-yellow-400"></i>
      <i class="fa-solid fa-star text-yellow-400"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i> 
      <span className="text-green-500"> (600 exemplaire vendu)</span></p>
   <p className="text-neutral-400 "> categories: {product.categories} </p>
   <div>
    <h2 className="text-gray-500 mb-4">description</h2>
    <p>
    {product.description}
    </p>
   </div>
    </div>
  
  
  <div className="" >
  <div className="border cursor-pointer hover:bg-green-600 w-48 text-center  px-2 py-1 bg-green-500  text-white rounded-md">NOUVELLE ARRIVAGE</div>


<ul className="  mt-4 ">
  <li className="font-semibold ">details </li>
  <li><i class="fa-solid fa-location-dot"></i> marcory-residentiel </li>
  <li><i class="fa-solid fa-shield"></i>produit 100% origiale </li>  
</ul>
    </div> 

</div>


<div className="   bg-neutral-300 flex justify-center rounded-e-lg    p-2  "> 
<div className="bg-white  w-full rounded-md p-2  ">
<i onClick={removeCatalogue } class="fa-solid fa-xmark  w-full text-end cursor-pointer"></i>
  <h1 className="text-2xl font-semibold border-b ">details de la commande</h1>
  <div className="flex ">
    <p className="w-8/12 place-content-center text-xl font-medium ">Quantite</p><div className=" h-10  grid  gap-1 grid-cols-3 w-4/12 "> 
    <div onClick={soustra} className="border place-content-center text-center  rounded-md cursor-pointer transition-all hover:transition-all hover:text-blue-600 hover:border-blue-600 active:bg-blue-600">-</div>
    <div className="border place-content-center text-center rounded-md ">{quantite}</div>
    <div onClick={addit} className="border place-content-center text-center  rounded-md cursor-pointer transition-all hover:transition-all hover:text-blue-600 hover:border-blue-600 active:bg-blue-600">+</div>
    </div>
  </div>

  <ul>
    <li className="flex justify-between  py-1 px-4 font-semibold "><span className=" ">color:</span> <span>noire</span></li>
    <li className="flex justify-between  py-1 px-4 font-semibold "><span className=" ">taille:</span> <span>XL</span></li>
    <li className="flex justify-between  py-1 px-4 font-semibold "><span className=" ">prix:</span> <span>${product.prix}</span></li>
    <li className="flex justify-between  py-1 px-4 font-semibold "><span className=" ">livraison:</span> <span>3$</span></li>
  </ul>
  <p className="text-xl my-2">Notes</p>
  <div className="flex justify-between  py-2 px-4 font-semibold mb-2  "><span className=" ">prix total:</span> <span>${prixTotal}</span></div>
  <div className="  py-2 mb-3 px-4 font-semibold text-center w-full m-auto rounded-md text-white bg-blue-600 hover:transition-all transition-all hover:bg-blue-800 cursor-pointer "> Acheter</div>
  <div onClick={()=>ajouter()}   className=" border py-2   font-semibold text-center  m-auto rounded-md bg-white text-blue-600 hover:transition-all transition-all hover:bg-blue-800 cursor-pointer  hover:text-white  "> <i class="fa-solid fa-cart-arrow-down"></i> Ajouter</div>

</div>
</div>



</div>



    </>
  );
};

export default Catalogue;
