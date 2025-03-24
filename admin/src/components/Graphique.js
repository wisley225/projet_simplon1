import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, scales, Ticks } from "chart.js/auto";
import { useEffect,useState } from "react";
import axios from "axios";


const Graphique=()=>{

const [donnees,setdonnes]=useState([])

  const  fetchData=async()=>{

       
    try {
        const response= await axios.post('http://localhost/e-commerce/Admin/Graphique');
        console.log(response)
        setdonnes(response.data)
        
        
    } catch (error) {
        console.error(" erreur lors de l'envoie",error)
    }
 

  }

useEffect(()=>{

  fetchData();

},[])

const jourSemaine=['Dimanche','Lundi','mardi','mercredi','jeudi','vendredi','samedi'];

const getjourSemaine=(date)=>{

    const jour=new Date(date).getDay();
    return jourSemaine[jour]
}

const donneesParjour={};

donnees.forEach(donnee=>{
    const jour=getjourSemaine(donnee.created_at); 
    if (!donneesParjour[jour]) {
        donneesParjour[jour]=[]
    }
    donneesParjour[jour].push(donnee.total_price)
})


const labels=Object.keys(donneesParjour);
const data=Object.values(donneesParjour).map(prix=>prix.reduce((a,b)=>a+b,0));




const chartData={
    labels:labels, // donne sur l'axe x
    datasets:[
     {
        label:'#EVOLUTION DES VENTES HEBDOMADAIRE',
        data:data,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1

     }
    ] // les donnees sur l'axe y
}


const options={
    scales:{
        y:[
            {
             
                    beginAtZero:true
                
            }
        ]
    }
}

return<>

<Bar data={chartData} options={options} />

</>


}

export default Graphique