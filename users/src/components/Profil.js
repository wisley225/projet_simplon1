import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const  Profil = () =>{
   
const [users,setUsers]=useState({});
const [loading,setLoading]=useState(true);
const [editUsers,setEditUsers]=useState(null);
const [editValues,setEditValues]=useState({});
const [error,setError]=useState(null)

const navigate=useNavigate()

const fetchUsers=async()=>{
 

    try{

    const   userId= localStorage.getItem('usersid')
            console.log(userId)
        const response=await axios.post('http://localhost/e-commerce/Admin/profile',{userId});
       
        console.log(response.data[0])
        setUsers(response.data[0]);
    }
    catch(error){
        console.error('Erreur:',error);
   
    }
};


   useEffect(()=>{
     fetchUsers();
 },[]);
 const annuler=()=>{
    setEditUsers(null);
    setEditValues({});
 }

const modifier=(id)=>()=>{

    setEditUsers(id);
    setEditValues({...users});
    
}

const enregistrer=async(id)=>{
    try{
        const response=await axios.post('http://localhost/e-commerce/Admin/profile',{id,...editValues});
        console.log(response.data)
        setUsers({...editValues});
        console.log(editValues)
        setEditUsers(null);
      
    }
    catch(error){
        console.error('Erreur:',error);
    }
}

const deconnexion=()=>{
sessionStorage.removeItem("usersid");
navigate(-2)
}


    return (
        <div >
            <div className="flex    justify-between items-baseline px-5 font-medium text-xl">
                <h1>User Profile</h1>
                <div onClick={modifier(users.id)} className="py-1 cursor-pointer px-5 text-blue-500 border-blue-500 rounded-xl text-lg font-medium border hover:bg-blue-500 hover:text-white transition-all">
                    <i className="fa-solid fa-pen"></i> Edit Info
                </div>

            </div>



            <div className="flex justify-start  m-4">
                <img src="https://via.placeholder.com/150" alt="User Profile" className="rounded-full size-20 border" />
            </div>
            <div className="grid grid-cols-1">
                
                <ul className="  border flex justify-evenly ">
                    {editUsers === users.id ? (
                        <input type="text" value={editValues.fullname} onChange={(e) => setEditValues({ ...editValues, fullname: e.target.value })} />
                    ) : (
                        <>
                            <li className="flex flex-col mb-2 ">
                                <span className="font-semibold">User Name :</span>
                                <span className="">{users.fullname}</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold">Role</span>
                                <span className="">{users.role}</span>
                            </li>
                        </>
                    )}
                </ul>

                <ul className=" flex justify-evenly ">
                    {editUsers === users.id ? (
                        <input type="text" value={editValues.email} onChange={(e) => setEditValues({ ...editValues, email: e.target.value })} />
                    ) : (
                        <>
                            <li className="flex flex-col mb-2">
                                <span className="font-semibold">Address Email: </span>
                                <span className="">{users.email}</span>
                            </li>
                            <li className="flex flex-col mb-2">
                                <span className="font-semibold">Password: .</span>
                                <span className="">*****</span>
                            </li>
                        </>
                    )}
                </ul>

                <ul className="flex justify-evenly">
                    {editUsers === users.id ? (
                        <input type="text" value={editValues.address} onChange={(e) => setEditValues({ ...editValues, address: e.target.value })} />
                    ) : (
                        <>
                            <li className="   ">
                                <span className="font-semibold">Address Commune: </span>
                                <span className="">{users.address}</span>
                            </li>
                            <li className="flexflex-col mb-2 ">
                                <span className="font-semibold">User ID: </span>
                                <span className="">{users.id}</span>
                            </li>
                        </>
                    )
                    
                    
                    }
                </ul>

                <ul className="inline-block">
                    {editUsers === users.id ? (                   
                            <li className="flex justify-evenly ">
                                <span onClick={()=>enregistrer(users.id )} className="font-semibold  inline-block border p-1 rounded-lg text-blue-500 bg-white cursor-pointer">enregistrer</span>
                                <span onClick={()=>annuler()} className="font-semibold inline-block border p-1 rounded-lg text-red-500 bg-white cursor-pointer">annuler</span>
                            </li>
                    ): ""
                    
                    
                    }
                </ul>


            </div>

            <div onClick={deconnexion} className=" border py-2 text-lg  font-semibold  w-48 text-center m-auto my-2 rounded-lg bg-blue-700 text-white cursor-pointer">deconnexion</div>
        </div>
    );
}

export default Profil;