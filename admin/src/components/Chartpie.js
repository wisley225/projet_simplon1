

import { Pie } from "react-chartjs-2"


const Chartpie=()=>{

const data={
    labels:['users', 'users connectés','users deconnectés'], // donne sur l'axe x
    datasets:[
     {
        label:'#UTILISATEUR',
        data:[40,30,30],// Valeur pour chaque secteur
        fill:false,
        backgroundColor:["#0071bd",'#ff6384', '#36a2eb'],
        borderColor:["#0071bd",'#ff6384', '#36a2eb'],

     }
    ] // les donnees sur l'axe y
}


return<>

<Pie data={data} />

</>


}

export default Chartpie