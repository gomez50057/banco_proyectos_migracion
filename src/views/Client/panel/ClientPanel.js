'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";


const Card = ({ onClick, title, imgSrc }) => (
  <div className="e-card playing" onClick={onClick}>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="infotop">
      <img src={imgSrc} alt={title} className="card-image" />
      <br />
      {title}
      <br />
    </div>
  </div>
);

const ClientPanel = () => {
  const router = useRouter();

  return (
    <div className="client-panel-container">
      <div className="client-panel-content">
        <div className="card-container">
          <Card 
            onClick={() => router.push('/dependencia')} 
            title="Agregar Proyecto" 
            imgSrc={`${imgBasePath}agregar.webp`} 
          /> 
          {/* <Card 
            onClick={() => router.push('/presupuesto-inversion')} 
            title="Anteproyecto para el Presupuesto de Inversión 2025" 
            imgSrc={`${imgBasePath}agregar.webp`} 
          /> */}
          <Card 
            onClick={() => router.push('/panel-proyectos')} 
            title="Consultar Proyecto" 
            imgSrc={`${imgBasePath}consultar.webp`} 
          />
        </div>
      </div>
      <img src={`${imgBasePath}galaxiaBlanca1-2.png`} alt="Decorative Star" className="background-image-left" />
      <img src={`${imgBasePath}pajaroBlanco.png`} alt="Decorative Pajaro" className="background-image-right" />
    </div>
  );
};


export default ClientPanel;
