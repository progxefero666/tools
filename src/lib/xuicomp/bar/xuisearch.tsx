//src\lib\xuicomp\bar\xuisearch.tsx

import { AppThemifyIcons } from "@/style/appthicons";
import { XButton } from "../buttons/xbutton";
import { useState } from "react";
import { ThemeColors } from "@/style/apptheme";



/**
 * JSX Component Search
 *   author: Xefero
 */
export interface SearchIfc {
    placeholder: string;
    maxlen: number;
    onsubmit: (value:string) => void;
}

export function XuiSearch({placeholder,maxlen,onsubmit}: SearchIfc) {

    const handleOnChange = (value:string) => {

    }

    const onKeyEnterDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            console.log("Enter pressed");
        }
    }

    return (
        <div className="w-full flex flex-row items-center gap-2">

            {/* input text */}
            <div className="w-[200px] h-auto">
                <input  className="input input-sm w-full bg-gray-400 text-black rounded-md"
                        type="text"
                        placeholder={placeholder}
                        onChange={(e) => handleOnChange(e.target.value)}
                        maxLength={maxlen} 
                        onKeyDown={onKeyEnterDown}/>
            </div>            

        </div>
    )

}//end comp
