import React, { useState, useEffect, useRef } from "react";

interface AcceptInvitationProps {
  nombreInvitado: string;
  numInvitados: number;
}

const AcceptInvitation: React.FC<AcceptInvitationProps> = ({ nombreInvitado, numInvitados }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedGuests, setSelectedGuests] = useState(1);
  const [message, setMessage] = useState("Acepto la invitación a tu evento.");

  // Animación de apertura/cierre
  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.classList.add("mostrar");
    } else if (modalRef.current) {
      modalRef.current.classList.remove("mostrar");
    }
  }, [modalOpen]);

  // Cerrar modal al hacer click fuera del contenido
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setModalOpen(false);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGuests(Number(e.target.value));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "528712515134";
    const text = `${message}\nNombre: ${nombreInvitado}\nInvitados confirmados: ${selectedGuests}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setModalOpen(false);
  };

  return (
    <>
      <div className="w-screen h-screen bg-[url('/fotosLuz/9.webp')] bg-cover bg-center bg-no-repeat flex items-center justify-center relative">
        <div
          className="relative h-[80%] w-[85%] z-10 flex flex-col items-center justify-between rounded-2xl text-center px-6 py-12 mx-auto bg-white/10 backdrop-blur-sm shadow-2xl border border-[var(--color-2)] animate-fade"
          style={{ color: "#4B3B28" }}
        >
          <div className="mb-6">
            <h2
              className="text-4xl font-bold mb-2"
              style={{
                textShadow: "2px 2px 4px rgba(255,255,255,0.5)",
                color: "#4B3B28",
              }}
            >
              ¡Hola, {nombreInvitado}!
            </h2>
          </div>
          <div className="mb-8">
            <div
              className="flex flex-col items-center justify-center"
              style={{ color: "#4B3B28" }}
            >
              <p>
                <span
                  className="text-2xl font-semibold mb-2"
                  style={{ textShadow: "1px 1px 3px rgba(255,255,255,0.5)" }}
                >
                  Número de pases:
                </span>
              </p>
              <span
                className="text-6xl pt-5 font-extrabold"
                style={{ textShadow: "2px 2px 6px rgba(255,255,255,0.5)" }}
              >
                {numInvitados}
              </span>
            </div>
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              style={{ background: "var(--color-3)" }}
              onClick={handleOpenModal}
            >
              Aceptar invitación
            </button>
          </div>
        </div>
        {modalOpen && (
          <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-60 transition-opacity duration-200 opacity-0 pointer-events-none"
            onClick={handleBackdropClick}
          >
            <div
              className="bg-[#fbe7ea] rounded-2xl shadow-lg p-8 max-w-sm w-[90%] text-center relative animate-fade"
              style={{ color: "#4B3B28", border: "2px solid var(--color-3)" }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-[var(--color-3)] text-2xl font-bold hover:text-[#a85e61]"
                onClick={handleCloseModal}
                aria-label="Cerrar"
                type="button"
              >
                ×
              </button>
              <h3 className="text-3xl font-bold mb-4" style={{ color: "var(--color-3)" }}>
                Confirmar asistencia
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <label className="text-lg font-semibold">
                  ¿Cuántos asistirán?
                  <select
                    className="block w-full mt-2 p-2 border rounded"
                    value={selectedGuests}
                    onChange={handleSelectChange}
                  >
                    {Array.from({ length: numInvitados }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-lg font-semibold">
                  Mensaje para WhatsApp:
                  <textarea
                    className="block w-full mt-2 p-2 border rounded"
                    rows={3}
                    value={message}
                    onChange={handleMessageChange}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  style={{ background: "var(--color-3)" }}
                >
                  Confirmar
                </button>
              </form>
              <p className="text-xs text-[#b2b2b2] mt-3">¡Lo más importante es tu presencia!</p>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
        /* Modal styles */
        .fixed.inset-0.z-50 {
          /* Tailwind handles most styles */
        }
        .fixed.inset-0.z-50.mostrar {
          opacity: 1 !important;
          pointer-events: auto !important;
        }
        .animate-fade {
          animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0;}
          to { opacity: 1;}
        }
        `}
      </style>
    </>
  );
};

export default AcceptInvitation;
