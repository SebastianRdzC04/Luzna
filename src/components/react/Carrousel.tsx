import React, { useState } from "react";

interface CarrouselProps {
  imagenes: string[];
}

const Carrousel: React.FC<CarrouselProps> = ({ imagenes }) => {
  const [actual, setActual] = useState(0);

  const prev = () => setActual((actual - 1 + imagenes.length) % imagenes.length);
  const next = () => setActual((actual + 1) % imagenes.length);

  return (
    <div className="relative w-[90vw] max-w-xl aspect-[4/3] mx-auto flex items-center justify-center">
      {/* Marco estilo Ghibli */}
      <div className="absolute inset-0 z-0 pointer-events-none rounded-[2.5rem] border-8 border-[#EDDADA] shadow-[0_8px_32px_rgba(142,139,99,0.18)] ring-4 ring-[#CB8587]/30 ring-offset-4 ring-offset-[#D6D4AD] before:content-[''] before:absolute before:inset-2 before:rounded-[2rem] before:border-4 before:border-[#CB8587]/20 before:pointer-events-none"></div>
      {/* Imagen actual */}
      <img
        src={imagenes[actual]}
        alt={`Foto galería ${actual + 1}`}
        className="relative z-10 w-full h-full object-cover rounded-[2rem] transition-all duration-500 shadow-lg"
      />
      {/* Botón anterior */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#EDDADA]/80 hover:bg-[#CB8587]/80 text-[#CB8587] rounded-full p-2 shadow-md transition"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      {/* Botón siguiente */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#EDDADA]/80 hover:bg-[#CB8587]/80 text-[#CB8587] rounded-full p-2 shadow-md transition"
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {imagenes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActual(idx)}
            className={`w-3 h-3 rounded-full transition-all border-2 border-[#CB8587]/40 ${actual === idx ? "bg-[#CB8587] scale-110" : "bg-[#EDDADA]"}`}
            aria-label={`Ir a la imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrousel;
