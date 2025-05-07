
import { forwardRef } from "react";
import { InputSelectProps } from "@/components/basecomp";


export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  ({ name, classname, label, defaultvalue, collection }, ref) => {

    const handleOnChange = (text: string) => {
      if (onchange) {
      }
    }

    const renderContent = () => (
      <>
        {label && <label className="w-full">{label}</label>}
        <select name={name} ref={ref} className="select w-full"
                defaultValue={defaultvalue}
                onChange={(e) => handleOnChange(e.target.value)} >

          {collection.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        
      </>
    );

    return classname ? 
       (<div className={classname}>{renderContent()}</div>) 
      :(renderContent());
    }

);