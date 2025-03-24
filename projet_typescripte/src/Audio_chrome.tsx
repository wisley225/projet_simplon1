
import React  from "react";


const Audio_chrome=()=>{


    function lireTexte(texte:string) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(texte);
        utterance.lang = "en-US"; // Langue française
        utterance.rate = 1; // Vitesse normale
        synth.speak(utterance);
    }
    
    


    
return (
    <>
       <button onClick={()=>lireTexte("hi! how are you  ?")}> parler</button>
    </>
)


}

export default Audio_chrome;

