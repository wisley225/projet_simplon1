import { useEffect, useState } from "react";
import axios from "axios";
import "./notification.css";
import { useRef } from "react";



const AddProduct = ({fetchData}) => {
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        prix: '',
        stock: '',
        categories: '',
        image_url: '',
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
     const [notification, setNotification] = useState(false);
     const  notificationRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };





    const handleSubmit = async (e) => {
        e.preventDefault();




        try {
            const response = await axios.post('http://localhost/e-commerce/Admin/produit.php', inputs);
 
            setError('');
            hidden()

            setSuccess('Produit ajouté avec succès');
            setNotification(true)
           
            
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error.response ? error.response.data : error.message);
            
          
            setError("Erreur lors de l'ajout du produit");
            setSuccess('');
        }


    };

     const hidden=()=>{
   
    document.getElementById('form_prod').classList.add('hidden')

     }



 useEffect(() => {
     if (notification) {
       notificationRef.current.classList.add('show');
        const timer = setTimeout(() => {
            notificationRef.current.classList.remove('show');
            notificationRef.current.classList.add('hide');

            setNotification(false);
            fetchData();
        }, 3000);
        return () => clearTimeout(timer);
        
        
        
     }
 }, [notification,fetchData]);

    return (
        <>
        
{
    notification ?     <div ref={notificationRef} className= " notification  absolute left-left-center  rounded-3xl shadow-neutral-800 border size-96 flex justify-center items-center z-20 bg-white text-3xl font-semibold text-green-600 shadow-xl transform "> 
             <p className="text-center"> <i class="fa-regular fa-circle-check  block"></i> produit ajouter avec success !!</p>
             </div>
   
           :<form className="absolute   bg-slate-950 text-center py-10 w-2/6 rounded-xl right-96 top-10" onSubmit={(e)=>handleSubmit(e)} id="form_prod" >
                <h1 className="text-green-600 mb-4 text-3xl font-bold uppercase">Ajouter un produit</h1>
                {success && <p className="text-green-500">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                <input name='name' className="py-3 w-4/5 placeholder:text-xl pl-2 rounded-xl mb-3" type="text" placeholder="Nom de votre produit"onChange={(e)=>handleChange(e)} required />
                <input name='prix' className="py-3 w-4/5 placeholder:text-xl pl-2 rounded-xl mb-3" type="number" placeholder="Prix" onChange={(e)=>handleChange(e)} required />
                <input name='categories' className="py-3 w-4/5 placeholder:text-xl pl-2 rounded-xl mb-3" type="text" placeholder="Catégories" onChange={(e)=>handleChange(e)} required />
                <input name='stock' className="py-3 w-4/5 placeholder:text-xl pl-2 rounded-xl mb-3" type="number" placeholder="Stock" onChange={(e)=>handleChange(e) } required />
                <input
                    name="image_url"
                    className="py-3 w-4/5 placeholder:text-xl pl-2 rounded-xl mb-3"
                    type="text"
                    onChange={(e)=>handleChange(e)}
                />
                
                <textarea name='description' className="w-4/5" cols="40" rows="5" maxLength='200' placeholder="Parlez-nous de votre produit" onChange={(e)=>handleChange(e)}  ></textarea>    
                <div className="text-end pr-4">
                    <button  type="submit" className="text-center text-lg font-medium bg-green-600 px-4 py-1 rounded-lg text-white transition-all hover:bg-green-800">Ajouter</button>
                    <button onClick={hidden} type="button" className="text-center text-lg font-medium bg-red-600 px-4 py-1 rounded-lg text-white transition-all hover:bg-red-800 ml-2">Annuler</button>
                </div>
            </form>}

        </>
    );
};

export default AddProduct;
