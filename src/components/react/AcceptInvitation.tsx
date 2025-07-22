import React, { useState } from "react";

interface AcceptInvitationProps {
  nombreInvitado: string;
  numInvitados: number;
}

const AcceptInvitation: React.FC<AcceptInvitationProps> = ({ nombreInvitado, numInvitados }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [message, setMessage] = useState("Acepto la invitación a tu evento.");

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
    // Número de WhatsApp al que se enviará el mensaje (ajusta el número)
    const phone = "528712515134"; // Reemplaza con el número real, ej: 5218711234567
    const text = `${message}\nNombre: ${nombreInvitado}\nInvitados confirmados: ${selectedGuests}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setModalOpen(false);
  };

  return (
    <>
    <div className="w-screen h-screen bg-[url('/fotosLuz/9.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center relative">

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-[95%] relative"
            style={{ color: "#4B3B28" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-gray-400 hover:text-gray-700"
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
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default AcceptInvitation;
