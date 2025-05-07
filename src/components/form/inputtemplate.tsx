import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { forwardRef } from "react";

export interface InputDimensionProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: number;
    onchange?: (name:string,result: unknown) => void;
}


export const InputDimesion = forwardRef<HTMLInputElement, InputDimensionProps>(
    ({ name, classname, label, defaultvalue }, ref) => {
  
      const handleOnChange = (value: number) => {
        if (onchange) {
  
        }
      }
  

  
      // Renderiza el contenido principal (idéntico al patrón de InputText)
      const renderContent = () => (
        <>
          {label && <label className="w-full">{label}</label>}
          <div className="flex items-center gap-1">

          </div>
        </>
      );
  
      // Comportamiento idéntico a InputText:
      // - Si hay classname, envuelve TODO en un div con esa clase
      // - Si no, retorna el fragmento directamente
      return classname ? (
        <div className={classname}>{renderContent()}</div>
      ) : (
        renderContent()
      );
    }
  );
  
  