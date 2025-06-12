//src\lib\xuicards\cardmenuoption.tsx

import React from "react";
import { AppThemifyIcons } from "@/style/appthicons";
import { AppConstants } from "@/lib/common/app/constants";


export interface CardMenuOptionIfc {
    name: string;
    text: string;
    onselection: (operation: string) => void;
    iconname?: string;
    iconcolor?: string;
    iconsize?: string;
}
export function CardMenuOption({ name, text, onselection, iconname, iconsize, iconcolor }: CardMenuOptionIfc) {

    let iconclass: string = AppConstants.UNDEFINED;
    if (iconname) {
        const icon_size: string = iconsize ?? AppThemifyIcons.DEF_SIZE;
        iconclass = AppThemifyIcons.getIconClass(iconname, icon_size, iconcolor);
    }

    const handleOnClick = () => {
        onselection(name);
    };

    return (
        <div className="card bg-base-100 w-full shadow-sm border border-gray-500" onClick={handleOnClick}>
            <div className="card-body flex flex-row text-left justify-start items-center">
                {iconname ? <div className={iconclass} /> : null}
                {text}
            </div>
        </div>
    )

} //end component

/*
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
	
    <p>A card component has a figure, a body part,
        and inside body there are title and actions parts</p>
	
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
	
  </div>
*/