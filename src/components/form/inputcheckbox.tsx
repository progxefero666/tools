import { forwardRef } from "react";

import { InputCheckboxProps } from "@/components/basecomp";


export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  ({ name, classname, label, defaultvalue, onchange }, ref) => {

    const handleOnChange = (value: boolean) => {
      if (onchange) {

      }
    }

    const renderContent = () => (
      <div className="flex items-center">
        {label && <label>{label}</label>}
        <input
          name={name}
          type="checkbox"
          className="toggle"
          ref={ref}
          defaultChecked={defaultvalue}
          onChange={(e) => handleOnChange?.(e.target.checked)} />
      </div>
    );

    {/*
        onChange={(e) => onchange?.(e.target.checked ? "true" : "false","manolo")}
      */}

    // Decide si envolver el contenido en un div con className o no
    return classname ? (
      <div className={classname}>{renderContent()}</div>
    ) : (
      renderContent()
    );
  }
);