//src\lib\xuicomp\common\search.tsx

import { AppThemifyIcons } from "@/style/appthicons";
import { XButton } from "../buttons/xbutton";
import { useState } from "react";
import { ThemeColors } from "@/style/apptheme";



/**
 * JSX Component Search
 *   author: Xefero
 */
export interface SearchIfc {
    name: string;
    onchange: (name: string, value: string) => void;
    maxlen: number;
    placeholder: string;
}

export function XuiSearch({ name, onchange, placeholder, maxlen }: SearchIfc) {

    const [filterOn, setFilterOn] = useState<boolean>(true);
    const [iconColor, setIconColor] = useState<string>(ThemeColors.ACCENT);

    const handleOnChange = (value: string) => {
        onchange(name, value);
    }

    const onFilterClick = (operation?: string): void => {
        alert(filterOn);
        const filterValue = !filterOn;
        setFilterOn(filterValue);
        if(filterValue){
            setIconColor(ThemeColors.NEUTRAL);
        }
        else{
            setIconColor(ThemeColors.ACCENT);
        }
    }

    return (
        <div className="w-full relative">
            <div className="w-full h-auto flex items-center pl-2 pr-12">
                <div className="flex-1">
                    <input
                        name={name}
                        className="input input-sm w-full bg-gray-400 text-black rounded-md"
                        type="text"
                        placeholder={placeholder}
                        onChange={(e) => handleOnChange(e.target.value)}
                        maxLength={maxlen} />
                </div>
                <div className="absolute right-2">
                    <XButton
                        btndisabled={false}
                        callback={onFilterClick}
                        operation={"filteron"}
                        iconname={AppThemifyIcons.TI_FILTER}
                        iconcolor={iconColor} />
                </div>
            </div>
        </div>
    )

}//end comp
