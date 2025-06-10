import { forwardRef, useState } from "react";
import { InputTextProps } from "@/lib/xuicomp/basecomp";



export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ name, classname, label, placeholder, defaultvalue, maxlen }, ref) => {

    const handleOnChange = (value: string) => {
      if (onchange) {
      }
    }

    const renderContent = () => (
      <>
        {label && <label className="w-full">{label}</label>}
        <input
          name={name}
          className="input w-full"
          ref={ref}
          type="text"
          placeholder={placeholder}
          defaultValue={defaultvalue}
          onChange={(e) => handleOnChange(e.target.value)}
          maxLength={maxlen} />
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
