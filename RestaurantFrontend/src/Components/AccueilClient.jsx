// src/AccueilClient.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import HeaderClient from "./HeaderClient";
import MenuCarouselClient from "./MenuCarouselClient";


const AccueilClient = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <header className="headerClient">
          <img src="images/logo.png" alt="Logo"/>
        <HeaderClient />
      </header>

      {/* Main Content */}
      <div className="bodyDepart">

        {/* Ajout du carrousel ici */}
        <MenuCarouselClient />
</div>
    </>
  );
};

export default AccueilClient;
