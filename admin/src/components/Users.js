import { useState,useEffect,useRef } from "react";
import axios from "axios";
import profile_admin from '../pictures/profile_admin.jpg'
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";


const Users =()=>{


    const [users,setUsers]=useState([])
    const [usersCopie, setUsersCopie]=useState([])
    const roleRef=useRef(null)
    const formAdminRef=useRef(null)
    const [succes, setSuccess]=useState('')
    const [error, setError]=useState('')
    const [input,setInput]=useState({

      fullname:'',
      address:'',
      email:'',
      password:'',
      password_comfirm:''
})
    const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost/e-commerce/Admin/users');  
          setUsers(response.data)  
          setUsersCopie(response.data) 
          console.log(response.data)
        } catch (error) {
          console.error("Erreur lors de la récupération des produits:", error);
        }
      };
    
    
      useEffect(() => {
        fetchData();
      }, []);


// const showRole=()=>{
// setClickRole(!clickRole)

//   if ( clickRole && roleRef.current ) {
//     roleRef.current.classList.remove('hidden')

//     }
//     else{
//     roleRef.current.classList.add('hidden')
      
//     }
// }


const handleRole=async(id,role)=>{

 let roleUsers=''
 role === 'admin' ? roleUsers = 'client' : roleUsers = 'admin'
 console.log(roleUsers)

  try {
    const resRole=await axios.post('http://localhost/e-commerce/Admin/handlerole', {id, roleUsers})
  console.log(resRole.data)
  fetchData()


  } catch (error) {
    console.error('erreur client '.error)
  }



}



const addNewAdmin=()=>{

  if (formAdminRef.current) {
    formAdminRef.current.classList.toggle('scale-0')
    
  }
}


// ajouter un nouveau admin

const handlechange=(e)=>{

const {name,value}=e.target

setInput({...input,[name]:value})

}

const handleSubmit=async(e)=>{

  e.preventDefault()

if (input.password === input.password_comfirm) {

  try {
    const res= await axios.post('http://localhost/e-commerce/sign_up/', input)
    console.log(res.data)
    if (res.data.message==='valide') {
       setSuccess('utilisateur enregistrer  avec succes')
       setError('')
       fetchData()
    }
    else{
 
      setError(res.data.message)
      setSuccess('')
    }
  }
  catch (error) {
    console.error('erreur client')
    setError('une erreur est survenu l\'ors de l\'inscription')
    setSuccess('')
  }
}
else{

  setError(' mot de passe non identique')
setSuccess('')
}}


const handleFiltre=(value)=>{

  setUsers(usersCopie.filter(user=>user.fullname.includes(value.trim())) )
  
  }
    
const Bannir=async(id)=>{
 try {
 const respBannir=await axios.post('http://localhost/e-commerce/Admin/Bannir',{id})
  console.log(respBannir.data)
  alert(respBannir.data.success)
  fetchData()
 } catch (error) {
  console.error("erreur lors de la suppression ",error)
 }


}


    return <>

<div ref={formAdminRef} className=" rounded-md p-10 absolute border bg-white w-2/5 h-3/5 translate-x-64 flex flex-col justify-evenly transform  scale-0 transition-all">
  <h1 className="mb-4 font-medium">AJOUTER UN NOUVEAU ADMIN</h1>
<form onSubmit={(e)=>handleSubmit(e)} className="pt-3">
{ error ?  <span className="text-red-600"> {error}</span>: <span className="text-green-600">{succes}</span> }

<div>
   
  <label for="fullname">Fullname <sup className="text-red-600">*</sup></label>
  <input  onChange={(e)=>handlechange(e)} type="text" name="fullname" className="w-full py-1 outline-none border  " placeholder="" required />
</div>

<div>
  <label for="Address">Address <sup className="text-red-600">*</sup>  </label>
  <input onChange={(e)=>handlechange(e)} type="text" name="address" className="w-full py-1  outline-none border " placeholder="" required />
</div>
<div>
  <label for="Email">Email <sup className="text-red-600">*</sup></label>
  <input onChange={(e)=>handlechange(e)} type="text" name="email" className="w-full py-1  outline-none border " placeholder="" required />
</div>

<div className="grid grid-cols-2 gap-2">
<div>
  <label for="password">mot de passe <sup className="text-red-600">*</sup> </label>
  <input onChange={(e)=>handlechange(e)} type="text" name="password" className="w-full py-1  outline-none border " placeholder="" required />
</div>
<div>
  <label for="password_comfirm">comfirmation de mot de passe<sup className="text-red-600">*</sup></label>
  <input onChange={(e)=>handlechange(e)} type="text" name="password_comfirm" className="w-full py-1  outline-none border " placeholder="" required />
</div>
</div>

<div className="text-end mt-2">
<button  className=" border px-2  py-1 rounded-md  bg-green-600 text-white" >ajouter</button>
<button onClick={()=>addNewAdmin()} className="border px-2  py-1 rounded-md ml-3 text-white bg-red-600" >anuller</button>
</div>

</form>


</div>
    
    <div className=" flex justify-between mb-3">
      
        <h1 className="text-3xl font-bold">users</h1>
        <button onClick={()=>addNewAdmin()} className="border px-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all">+ Create new admin</button>
    </div>
    <div className="  flex   border  w-3/12 mb-4   rounded-lg"><i className="fa-solid fa-magnifying-glass   text-lg self-center  px-1    text-gray-300"></i>
 <input onChange={(e)=>handleFiltre(e.target.value)}   type="search  " placeholder="search product" className="outline-none  placeholder:pl-2  w-full rounded-lg"  /> 
</div>

<div>

  <div className=" grid grid-cols-4 gap-4  ">

    {users.map(user=>(
 <div key={user.id} data-tooltip-id="tooltip1" className="flex py-4 flex-col items-center justify-evenly border bg-slate-900 text-white rounded-lg ">
  <Link className=" ml-auto "><i onClick={()=>Bannir(user.id)} class=" fa-solid fa-right-from-bracket   mb-1 pr-2 cursor-pointer hover:text-red-700 "></i> </Link> 
   <Tooltip id="tooltip1" content="bannir cette utilisateur" />
 <div  className="size-14 border border-white rounded-full ">
 <img src={profile_admin} alt="" className=" size-full border rounded-full object-cover  object-center" />
   </div>
 <span>{user.fullname}</span>
<span>{user.role} ID: {user.id}</span>
 <span>{user.email}</span>
 <span onClick={()=>handleRole(user.id,user.role)} className="border px-4 py-1 rounded-xl hover:bg-gray-950 hover:text-white transition-all cursor-pointer">passer en {user.role=="admin" ? "client": "admin"}</span>
</div>

    ))}
   
  </div>

</div>

    
    </>
}


export default Users