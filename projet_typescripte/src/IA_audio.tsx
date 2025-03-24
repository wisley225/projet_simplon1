import React, { useState, useRef } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

// Définir les types pour les états et les réponses
type AudioBlob = Blob | null;
type BackendResponse = {
    id?: string;
    status?: string;
    text?: string;
    error?: string;
};

const IA_audio= () => {
    const [isRecording, setIsRecording] = useState<boolean>(false); // État pour suivre l'enregistrement
    const [audioBlob, setAudioBlob] = useState<AudioBlob>(null); // État pour stocker l'enregistrement
    const [loading, setLoading] = useState<boolean>(false); // État pour gérer le chargement
    const [response, setResponse] = useState<BackendResponse | null>(null); // État pour stocker la réponse du backend

    const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Référence pour le MediaRecorder
    const audioChunksRef = useRef<Blob[]>([]); // Référence pour stocker les morceaux audio

    // Démarrer l'enregistrement
    const startRecording = async () => {

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });// moi je demande l'acces au micro phone Elle retourne une promesse qui, lorsqu'elle est résolue, fournit un objet MediaStream contenant l'audio capturé
           // Ainsi, stream contiendra l'objet MediaStream qui capte le son du microphone.

            mediaRecorderRef.current = new MediaRecorder(stream); // On crée une instance de MediaRecorder,
            //  qui est un objet permettant d'enregistrer le flux audio provenant de stream.
// Cette instance est stockée dans mediaRecorderRef.current, une référence React (useRef) pour pouvoir
//  l'utiliser ultérieurement (par exemple, pour démarrer ou arrêter l'enregistrement).


            // Gérer les données audio disponibles
            mediaRecorderRef.current.ondataavailable = (event: BlobEvent)=>{
                audioChunksRef.current.push(event.data);
            };

            // Gérer l'arrêt de l'enregistrement
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                setAudioBlob(audioBlob); // Stocker l'enregistrement dans l'état


                audioChunksRef.current = []; // Réinitialiser les morceaux audio
                stream.getTracks().forEach((track) => track.stop()); // Arrêter les pistes du flux audio
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Erreur lors de l'accès au microphone :", error);
        }
    };

    // Arrêter l'enregistrement
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // Envoyer l'enregistrement au backend avec Axios
    const sendRecording = async () => {
        if (!audioBlob) {
            alert("Aucun enregistrement à envoyer.");
            return;
        }

        setLoading(true); // Activer le chargement

        // Créer un objet FormData pour envoyer le fichier
        const formData = new FormData();
        formData.append("audio", audioBlob, "enregistrement.wav"); // Ajouter l'enregistrement
         console.log("voila ce que tu cherche", audioBlob)

        try {
            // Envoyer la requête POST au backend avec Axios
            const response = await axios.post(
                "http://localhost/IA/assemblyIA.php",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Définir le type de contenu
                    },
                }
            );
            console.log(response.data)

            const reponse= response.data.text

          if (reponse!=="") {

            const text=response.data.text
            const response_gemini= await axios.post("http://localhost/IA/gemini.php",{text})

            console.log(response_gemini.data);


            function lireTexte(texte:string) {
                const synth = window.speechSynthesis;
                const utterance = new SpeechSynthesisUtterance(texte);
                utterance.lang = "en-US"; // Langue française
                utterance.rate = 1; // Vitesse normale
                synth.speak(utterance);
            }

            if (response_gemini.data.reponse) {

 
            
  lireTexte(response_gemini.data) // lecture audio avec le navigateur 

  

             const text_gemini=response_gemini.data.reponse // a parti d'ici cc'est avec l'api
             console.log(text_gemini)
            const response_elevenlabs= await axios.post("http://localhost/IA/elevenlabs.php",{text_gemini})

            console.log(response_elevenlabs.data)

            if (response_elevenlabs.data) {
             const audio = new window.Audio(`http://localhost/IA/${response_elevenlabs.data.fichier}`);
             audio.play();
            }



            }

          }

        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Erreur :", axiosError.message);
            setResponse({ error: axiosError.message }); // Afficher l'erreur
        } finally {
            setLoading(false); // Désactiver le chargement
        }
    };

    return (
        <div>
            <h1>Enregistrement vocal</h1>

            {/* Bouton pour démarrer/arrêter l'enregistrement */}

            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Arrêter l'enregistrement" : "Commencer l'enregistrement"}
            </button>

            {/* Bouton pour envoyer l'enregistrement */}
            {audioBlob && (
                <button onClick={sendRecording} disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer l'enregistrement"}
                </button>
            )}

            {/* Afficher l'enregistrement */}
            {audioBlob && (
                <div>
                    <h2>Enregistrement :</h2>

                    <audio controls src={URL.createObjectURL(audioBlob)} />
                </div>


            )}


        </div>
    );
};

export default IA_audio;