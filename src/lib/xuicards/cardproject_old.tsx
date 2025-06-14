//src\lib\xuicards\cardproject.tsx
//src\lib\xuicards\cardmenuoption.tsx

import React from "react";
import { AppThemifyIcons } from "@/style/appthicons";
import { AppConstants } from "@/lib/common/app/constants";


export interface CardProjectOldIfc {
    name: string;
    text: string;
    onselection: (name: string, value: string) => void;
    iconname?: string;
    iconcolor?: string;
    iconsize?: string;
}
export function CardProjectOld({ name, text, onselection, iconname, iconsize, iconcolor }: CardProjectOldIfc) {

    let iconclass: string = AppConstants.UNDEFINED;
    if (iconname) {
        const icon_size: string = iconsize ?? AppThemifyIcons.DEF_SIZE;
        iconclass = AppThemifyIcons.getIconClass(iconname, icon_size, iconcolor);
    }

    const handleOnClick = () => {
        onselection("card_project", name);
    };

    return (
        <div className="collapse card_project flex items-center bg-base-100 w-full shadow-sm rounded-md border border-gray-500">
           

            <div className="collapse-title m-0 p-0 w-full flex flex-row font-semibold">
                {text}
            </div>

            <div className="collapse-content m-0  p-0  w-full flex flex-col text-sm">
                Click the "Sign Up" button in the top right corner and follow the registration process.
            </div>

        </div>

    )

} //end component

/*
        <div className="card bg-base-100 w-full shadow-sm rounded-md border border-gray-500" onClick={handleOnClick}>

            <div className="card-body w-full flex flex-col">
                <div className="w-full flex flex-row items-center">
                    <h4 className="card-title">{text}</h4>
                </div>
                
                Project Intro
            </div>
        </div>
*/