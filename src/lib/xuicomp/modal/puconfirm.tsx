import React, { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { CmOperation, CollCommandsIds } from "@/lib/arquitect/app/appcommon";

/*
showUiPopupConfirm("¿Estás seguro de que deseas eliminar este elemento?").then(({ confirmed }) => {
  if (confirmed) {
    console.log("El usuario confirmó la acción.");
    // Realizar la acción de eliminación aquí
  } else {
    console.log("El usuario canceló la acción.");
  }
});
*/

interface UiPopupConfirmProps {
  message: string;
  onClose: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const UiPopupConfirm = ({ message, onClose, onCancel, isOpen }: UiPopupConfirmProps) => {

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

            <button
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
                onCancel();
              }}
            >
              <XMarkIcon className="h-6 w-6 mr-2" />
              {CmOperation.OPID_CANCEL}
            </button>

          </form>
        </div>

      </div>
    </dialog>
  );
};

// Función controladora para mostrar el modal
export const showUiPopupConfirm = (message: string): Promise<{ confirmed: boolean }> => {
  return new Promise((resolve) => {
    
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);

    const ModalWrapper = () => {
      const [isOpen, setIsOpen] = useState(true);

      const handleConfirm = () => {
        setIsOpen(false);
        resolve({ confirmed: true });
      };

      const handleCancel = () => {
        setIsOpen(false);
        resolve({ confirmed: false });
      };

      useEffect(() => {
        if (!isOpen) {
          setTimeout(() => {
            root.unmount(); // Desmontar el componente
            document.body.removeChild(modalRoot);
          }, 0);
        }
      }, [isOpen]);

      return (
        <UiPopupConfirm message={message}
                        onClose={() => { handleConfirm(); }}
                        onCancel={() => {handleCancel();}}
                        isOpen={isOpen} />
      );
    };

    root.render(<ModalWrapper />);

  });
};