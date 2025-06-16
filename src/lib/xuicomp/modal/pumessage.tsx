import React, { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import { CheckIcon } from '@heroicons/react/24/solid';
import { CmOperation } from '@/lib/app/appcommon';


/*
showUiPopupMessage("¡Operación completada con éxito!").then(() => {
  console.log("El usuario cerró el mensaje.");
});
*/
interface UiPopupMessageProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}

export const UiPopupMessage = ({ message, onClose, isOpen }: UiPopupMessageProps) => {
  return (
    <dialog open={isOpen} className="modal">
      
      <div className="modal-box w-fit">

        <div className="w-full">
          <p>{message}</p>
        </div>

        {/* Botones */}
        <div className="modal-action flex justify-center mt-4">
          <form method="dialog">
            <button
              className="btn btn-primary mr-2"
              onClick={(e) => {
                e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
                onClose();
              }}
            >
              <CheckIcon className="h-6 w-6 mr-2" />
              {CmOperation.OPID_CONFIRM}
            </button>
          </form>
        </div>

      </div>
    </dialog>
  );
};

// Función controladora para mostrar el modal
export const showUiPopupMessage = (message: string): Promise<void> => {
  return new Promise((resolve) => {
    // Crear contenedor modal y root para React 18+
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);

    // ModalWrapper Componente interno para manejar el modal
    const ModalWrapper = () => {
      const [isOpen, setIsOpen] = useState(true);

      const handleClose = () => {
        setIsOpen(false);
        resolve(); // Resolver la promesa cuando se cierra el modal
      };

      // Limpiar el modal cuando se cierra
      useEffect(() => {
        if (!isOpen) {
          setTimeout(() => {
            root.unmount(); // Desmontar el componente
            document.body.removeChild(modalRoot);
          }, 0);
        }
      }, [isOpen]);

      // Retornar el componente modal
      return (
        <UiPopupMessage
          message={message}
          onClose={() => {
            handleClose();
          }}
          isOpen={isOpen}
        />
      );
    };

    // Renderizar el modal
    root.render(<ModalWrapper />);
  });
};