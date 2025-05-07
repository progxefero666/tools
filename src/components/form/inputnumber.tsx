import { forwardRef } from "react";
import { InputNumberProps } from "@/components/basecomp";


export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ name, classname, label, defaultvalue,minvalue,maxvalue }, ref) => {

    const handleOnChange = (value: number) => {
      if (onchange) {

      }
    }

    const onIncrement = () => {
      if (ref && "current" in ref && ref.current) {
        const input = ref.current as HTMLInputElement;
        input.stepUp();
      }
    };
    const onDecrement = () => {
      if (ref && "current" in ref && ref.current) {
        const input = ref.current as HTMLInputElement;
        input.stepDown();
      }
    };

    // Renderiza el contenido principal (idéntico al patrón de InputText)
    const renderContent = () => (
      <>
        {label && <label className="w-full">{label}</label>}
        <div className="w-full">
          <input
            name={name}
            ref={ref}
            type="number"
            step="1"
            defaultValue={defaultvalue}
            onChange={(e) => handleOnChange(Number(e.target.value))}
            className="input w-full"
            min={minvalue} max={maxvalue} />

          {/*
          <div className="flex gap-1">
            <button type="button" onClick={onIncrement} className="btn btn-sm h-10 w-10" >
              <ChevronUpIcon className="h-4 w-4" />
            </button>
            <button type="button" onClick={onDecrement} className="btn btn-sm h-10 w-10" >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>          
          */}  
        </div>
      </>
    );

    return classname ? (
      <div className={classname}>{renderContent()}</div>
    ) : (
      renderContent()
    );
  }
);

