
import { forwardRef } from "react";
import { InputSelectProps } from "@/lib/xuicomp/basecomp";

export interface XuiSelectIfc {
    name: string;
    collection: string[];
    classname?: string;
    defaultvalue: string;
    onselect: (name: string, result: string) => void;

}
export function XuiSelect({ name, collection, defaultvalue, onselect, classname }: XuiSelectIfc) {

    const handleOnChange = (value: string) => {
       onselect(name,value);
    }

    const renderContent = () => (
        <>
            <select name={name} className="select w-full"
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
        : (renderContent());
}