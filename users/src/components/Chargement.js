
import "./chargement.css"


const Chargement=()=>{

    return(
        <div className="bg-gradient-to-l to bg-blue-400 from-red-200 via-slate-400 h-screen flex flex-col justify-center items-center">
            <div className="size-full flex flex-col justify-center items-center">
                <div  className=" position absolute right-96  ">
                    <img src="public/picture/chargement2.png" alt="" />
                </div>
                <div className="flex w-full h-40 justify-center items-center"> 
                    <div className="bounce-ball border size-10 flex items-center justify-center rounded-full bg-white mr-2"></div>
                    <div className="bounce-ball border size-10 flex items-center justify-center rounded-full bg-white mr-2"></div>
                    <div className="bounce-ball border size-10 flex items-center justify-center rounded-full bg-white"></div>
                </div>
              
            </div>
        </div>
    )
}
export default Chargement