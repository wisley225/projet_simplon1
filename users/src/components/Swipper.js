// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules"; 
// import "swiper/css";

// const images = [
//   "https://img.freepik.com/photos-premium/fille-dans-rue-parapluie-pour-promenade-jour-automne_494741-12147.jpg?ga=GA1.1.1510473559.1738947619&semt=ais_hybrid",
//   "https://img.freepik.com/photos-premium/fille-dans-rue-parapluie-pour-promenade-jour-automne_494741-12147.jpg?ga=GA1.1.1510473559.1738947619&semt=ais_hybrid",
//   "https://img.freepik.com/photos-premium/fille-dans-rue-parapluie-pour-promenade-jour-automne_494741-12147.jpg?ga=GA1.1.1510473559.1738947619&semt=ais_hybrid",
// ];

// const Swipper = () => {
//   return (
//     <div className=" ">
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={10}
//         slidesPerView={1}
//         loop={true} 
//         autoplay={{ delay: 3000, disableOnInteraction: false }} // Défilement toutes les 3s
//         className="rounded-lg size-64"
//       >
//         {images.map((src, index) => (
//           <SwiperSlide key={index}>
//             <img src={src} alt={`Slide ${index + 1}`} className="object-cover rounded-lg w-full h-full" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//     </div>
//   );
// };

// export default Swipper;

import React, { useState } from 'react';

const Swipper = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simuler le traitement de la commande
    console.log('Adresse de livraison:', deliveryAddress);
    console.log('Option de livraison:', deliveryOption);
    console.log('Paiement simule avec les informations:', paymentInfo);
    alert('Commande soumise avec succes!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Formulaire de Commande</h2>

      {/* Selection de l'adresse de livraison */}
      <div className="mb-6">
        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Adresse de Livraison</label>
        <select
          id="deliveryAddress"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Choisissez une adresse</option>
          <option value="address1">Adresse 1</option>
          <option value="address2">Adresse 2</option>
          <option value="address3">Adresse 3</option>
        </select>
      </div>

      {/* Choix des options de livraison */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Options de Livraison</label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              value="standard"
              checked={deliveryOption === 'standard'}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className="form-radio"
              required
            />
            <span className="ml-2">Livraison Standard</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="deliveryOption"
              value="express"
              checked={deliveryOption === 'express'}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">Livraison Express</span>
          </label>
        </div>
      </div>

      {/* Paiement simule */}
      <div className="mb-6">
        <label htmlFor="paymentInfo" className="block text-sm font-medium text-gray-700">Information de Paiement</label>
        <input
          type="text"
          id="paymentInfo"
          value={paymentInfo}
          onChange={(e) => setPaymentInfo(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Paiement securise a implementer plus tard"
          disabled
        />
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Soumettre la Commande
      </button>
    </form>
  );
};

export default Swipper;



