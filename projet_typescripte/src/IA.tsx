
import { useState, useEffect, useRef } from "react";
import "./IA.css";
import React from "react";
import logo from "./logo.png";
import ReactMarkdown from "react-markdown"
import faceIA from "./faceIA.png";
import user from "./user.png";
import axios, { AxiosError, AxiosResponse } from "axios";
import Audio from "./Audio.tsx";





const IA = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [responseIA, setResponseIA] = useState<{id:number,question:string, reponse:string}[ ]>([]);
  const [displayedText, setDisplayedText] = useState<string>("");

  /// FONCTIONALITE2 : COMMUNICATION TEXTUELLE

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const question = await axios.post("http://localhost/IA/ia.php", { prompt });
      console.log(question.data);

      setResponseIA((prev) => [...prev, question.data]);

       console.log(question.data.reponse)


      if ( question.data.reponse) {
         typingEffect(question.data.reponse);
      }else{
        alert(question.data)

      }


      setPrompt("");
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  // Fonction effet de frappe


  const typingEffect = (text: string, speed: number = 10) => {
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  };


// FONCTIONALITE2: COMMUNICATION VOCALE



 


  return (
    <>
      <div className="home h-screen   overflow-auto">
        <div className=" h-full flex">
          <div className=" w-full flex flex-col items-center pb-5">
            <div className="flex justify-end  w-full pr-10">
              <div className="flex flex-col w-40 justify-center items-center ">
                <div className="size-10 mb-2">
                  <img src={logo} alt="" className="object-cover object-center" />
                </div>
                <h1 className="ponomar-regular text-xl font-extrabold bg-clip-text bg-gradient-to-l from-pink-600 to-purple-600 via-pink-500 text-transparent">
                  AZAZEL
                </h1>
              </div>
            </div>

            <div className=" h-96 w-full overflow-y-auto px-4">
              <ul className=" text-white text-lg space-y-4">
                {responseIA.map((element: { question: string; reponse: string }, index) => (
                  <li key={index} className="mb-2">
                    <p className="font-semibold italic  mb-6  w-1/2 ml-auto rounded-3xl bg-white bg-opacity-10 p-4"> <img src={user} alt=" image user" className="w-32" /> <h1 className="">vous :</h1> <span>{element.question}</span> </p>



                    <p className="italic w-1/2 rounded-3xl bg-white bg-opacity-10 p-4 ">
        <img src={faceIA} alt=" visage de AZAZEL" className=" w-40" />AZAZEL :{" "}
                      {index === responseIA.length - 1
                        ?  (<ReactMarkdown>
                            {displayedText}
                        </ReactMarkdown>)
                        : element.reponse
                      }
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="border w-2/3 rounded-3xl bg-white bg-opacity-10 p-4 mt-5">
              <textarea
                className="bg-transparent pt-4 w-full border placeholder:text-white pl-2 outline-none text-white rounded-3xl"
                name="prompt"
                placeholder="Message AZAZEL"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                required
              ></textarea>

              <div className="flex justify-end">
                <button className="mr-3" type="button"  >
                <i className="fa-solid fa-stop border text-2xl px-4 py-2 rounded-full text-white cursor-pointer hover:backdrop-brightness-50 transition-all"></i>
               
               <i className="fa-solid fa-microphone  border text-2xl px-4 py-2 rounded-full
                text-white cursor-pointer hover:backdrop-brightness-50 transition-all"></i> 

             
                </button>
                <button type="submit">
                  <i className="fa-solid fa-arrow-up border text-2xl px-4 py-2 rounded-full text-white cursor-pointer hover:backdrop-brightness-50 transition-all"></i>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>



      
    </>
  );
};

export default IA;
