import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { CmOperation } from "@/application/appcommon";
import { CollCommandsIds } from "@/application/collection/appcollection";

/*
showUiPuAddImagesBase(AppCollection.OPID_EDITITEMS, 10).then(({ confirmed, applyExpanded, index }) => {
  if (confirmed) {
    console.log(`El usuario confirmó con applyExpanded=${applyExpanded} e index=${index}`);
  } else {
    console.log("El usuario canceló la selección.");
  }
});
*/
interface UiPuAddImagesBaseProp {
  operation: string;
  maxIndex: number;
  onClose: (applyExpanded: boolean, index: number) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const UiPuAddImagesBase = ({operation,maxIndex,onClose,onCancel,isOpen}: UiPuAddImagesBaseProp) => {
  const [applyExpanded, setApplyExpanded] = useState<boolean>(false);
  const [numberValue, setNumberValue] = useState<number>(1); // Inicializamos en 1 para evitar valores inválidos

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box w-fit grid grid-cols-[auto_1fr] space-y-3 gap-x-4 p-4">
        {/* Apply Expanded */}
        <label className="text-base whitespace-nowrap">Expanded</label>
        <input
          type="checkbox"
          className="toggle"
          checked={applyExpanded}
          onChange={(e) => setApplyExpanded(e.target.checked)}
        />

        {/* Mostrar el div solo si la operación no es OPID_ADDITEMS */}
        {operation !== CollCommandsIds.OPID_ADD && (
          <>
            <label className="text-base whitespace-nowrap">Index:</label>

            {/* Contenedor para el input y los botones */}
            <div className="flex items-center space-x-2">
              {/* Input */}
              <input
                type="number"
                value={numberValue}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (newValue >= 1 && newValue <= maxIndex) {
                    setNumberValue(newValue);
                  }
                }}
                className="input input-bordered w-24 appearance-none" // Ancho reducido
                min={1}
                max={maxIndex} />

              {/* Botones de Incremento/Decremento */}
              <div className="flex flex-row space-x-1">
                <button
                  className="btn btn-sm h-10"
                  onClick={() => {
                    if (numberValue < maxIndex) setNumberValue(numberValue + 1);
                  }} >
                  <ChevronUpIcon className="h-8 w-4" />
                </button>
                <button
                  className="btn btn-sm h-10"
                  onClick={() => {
                    if (numberValue > 1) setNumberValue(numberValue - 1);
                  }}
                >
                  <ChevronDownIcon className="h-8 w-4" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Botones */}
        <div className="modal-action flex justify-center mt-4">
          <form method="dialog">
            <button
              className="btn btn-primary mr-2"
              onClick={() => onClose(applyExpanded, numberValue)}
            >
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

// Función controladora para mostrar el modal
export const showUiPuAddImagesBase = (operation: string,maxIndex: number)
                    : Promise<{ confirmed: boolean; applyExpanded: boolean; index: number }> => {

  return new Promise((resolve) => {
    // Crear contenedor modal y root para React 18+
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);

    // ModalWrapper Componente interno para manejar el modal
    const ModalWrapper = () => {
      const [isOpen, setIsOpen] = useState(true);

      const handleConfirm = (applyExpanded: boolean, index: number) => {
        setIsOpen(false);
        resolve({ confirmed: true, applyExpanded, index });
      };

      const handleCancel = () => {
        setIsOpen(false);
        resolve({ confirmed: false, applyExpanded: false, index: -1 }); // Valores por defecto al cancelar
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
        <UiPuAddImagesBase
          operation={operation}
          maxIndex={maxIndex}
          onClose={(applyExpanded, index) => {
            handleConfirm(applyExpanded, index);
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