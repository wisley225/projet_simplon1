import Sidebar from "./components/Sidebar";
import Section from "./components/Section";
import profile_admin from  "./pictures/profile_admin.jpg"
//import Dashboard from "./components/Dashboard";

function App() {
  return (

    <>

  <nav className=" flex justify-between   ">
    <div>
    <i class="fa-solid fa-user-tie text-4xl   px-4 py-3"></i>
    <span>ADMIN</span>
    </div>

    <div className="flex  justify-evenly items-center   w-1/3 ">
<div className=" rounded-md border cursor-pointer">
<i class="fa-solid fa-magnifying-glass p-2 text-neutral-400 border "></i> <input type="search" className="outline-none  "/>
  </div>
      
      <ul className="flex items-center justify-evenly  w-1/2 ">
       <li><i class="fa-solid fa-bell  text-3xl  cursor-pointer hover:transform hover:scale-110 transition-all"></i></li>
       <li className=" size-12  rounded-full cursor-pointer"> <img src={profile_admin} alt=""  className="size-full rounded-full" /></li>
      </ul>
    </div>
  </nav>
 <div className=" flex">
 <Sidebar/>
 <Section/>
  
</div> 


    
    
    </>
   
  );
}

export default App;
