import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { InputRangeProps } from "@/lib/xuicomp/basecomp";



export interface InputRangeRef {
  setValue: (value: number) => void;
}

export const InputRange = forwardRef<InputRangeRef, InputRangeProps>(
  ({ name, onchange, classname, label, defaultvalue,  min, max, step }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (value: number) => {
      if (onchange) {
        onchange(name,value)
      }
    }
    
    useImperativeHandle(ref, () => ({
      setValue: (newValue: number) => {
        if (inputRef.current) {
          inputRef.current.value = newValue.toString();
        }
      }
    }));

    
    const renderContent = () => (
      <>
        {label && <label className="w-full">{label}</label>}
        <input name={name}
          className="range w-full"
          ref={inputRef}
          type="range"
          value={defaultvalue} 
          onChange={(e) => handleOnChange(Number(e.target.value))}
          step={step}
          min={min}
          max={max}
        />
      </>
    );

    // Decide si envolver el contenido en un div con className o no
    return classname ? (
      <div className={classname}>{renderContent()}</div>
    ) : (
      renderContent()
    );
  }
);