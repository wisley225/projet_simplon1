import axios from "axios";
import { useState ,useEffect} from "react";


const  Profil = ({id}) =>{
   
const [users,setUsers]=useState([]);
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null)



const fetchUsers=async()=>{
 

    try{

        
      const response=await axios.post("http://localhost/api/users/profil.php",{id}) ;
      setUsers(response.data) ;
    
      
      setLoading(false);
    }
    catch(error){
        console.error('Erreur:',error);
        setError('Erreur lors de la recuperation des utlisateurs');
        setLoading(false);
    }
};


  useEffect(()=>{
    fetchUsers();
},[]);


if (loading) {
    return <div>chargement en cours ...</div>
}


if (error) {
    return <div> {error} </div>
}


    return <> 


{
users.map((user)=>(

    <div key={user.id}>
  <div className=" border flex flex-wrap justify-between p-10">
<div className="border solid flex items-center p-10 ">
<div className=" size-32 rounded-full border mr-4"></div>
<div>
    <span className=" text-2xl font-bold  "> {user.fullname} </span>
</div>
</div>

<div className="flex flex-wrap items-center ">
 <div className=" border  px-8 text-xl font-semibold  rounded-lg mr-4 cursor-pointer  "> modifier</div>
   <button className="size-10 border flex justify-center bg-black text-white rounded-lg "> . . .</button> 
    
 </div>



 </div>


 <table>
    <th className=" text-start border w-full">
        <tr> name: 

            <td> {user.fullname} </td>
        </tr>
        <tr> email: 
            <td> {user.email} </td>
        </tr>
        <tr> address: <td> {user.address} </td> </tr>
        <tr> enregister le:  <td> {user.create_at} </td></tr>
    </th>
    
 </table>
    </div>
  
  

))


}


  
  
    </>
}

export default Profil;