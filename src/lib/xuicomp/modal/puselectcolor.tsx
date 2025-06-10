import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { CmOperation } from "@/lib/arquitect/app/appcommon";


/*
if (newColor.rgb) setColor(`rgba(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}, ${newColor.rgb.a})`);
const isValidHex = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
*/
interface UiPuSelectColorProps {
  initcolor: string;
  onClose: (colorselected: string) => void; 
  onCancel: () => void;
  isOpen: boolean; 
}

export const UiPuSelectColor = ({ initcolor, onClose, onCancel, isOpen }: UiPuSelectColorProps) => {
  
  // Estado local para el color seleccionado
  const [color, setColor] = useState(initcolor);
  const handleChangeComplete = (newColor: any) => {
    setColor(newColor.hex);
  };

  return (
    <dialog open={isOpen} className="modal modal-middle">
      <div className="modal-box w-fit"> 
        
        {/* Selector de colores */}
        <div className="flex justify-center mb-4">
          <ChromePicker color={color} onChange={handleChangeComplete} />
        </div>
        <div
          className="bg-blue-500 h-20 w-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: color }}>
          <p>Selected Color</p>
        </div>

        {/* Botones de acción */}
        <div className="modal-action flex justify-center mt-4">
          <form method="dialog">
            <button className="btn btn-primary mr-2" onClick={() => onClose(color)}>
              <CheckIcon className="h-6 w-6 mr-2" />
              {CmOperation.OPID_CONFIRM}
            </button>
            <button className="btn btn-secondary" onClick={() => onCancel()}>
              <XMarkIcon className="h-6 w-6 mr-2" />
              {CmOperation.OPID_CANCEL}
            </button>
          </form>
        </div>
        
      </div>
    </dialog>
  );
};

export const showColorPickerModal = (initcolor: string): Promise<{ confirmed: boolean; color: string }> => {
  return new Promise((resolve) => {
    // Crear contenedor modal y root para React 18+
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);

    // ModalWrapper Componente interno para manejar el modal
    const ModalWrapper = () => {
      const [isOpen, setIsOpen] = useState(true);

      const handleConfirm = (selectedColor: string) => {
        setIsOpen(false); 
        resolve({ confirmed: true, color: selectedColor });
      };

      const handleCancel = () => {
        setIsOpen(false); 
        resolve({ confirmed: false, color: initcolor }); 
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
        <UiPuSelectColor
          initcolor={initcolor}
          onClose={(color) => {
            handleConfirm(color);
          }}
          onCancel={() => {
            handleCancel();
          }}
          isOpen={isOpen}
        />
      );
    };

    // Renderizar el modal
    root.render(<ModalWrapper />);
  });
};