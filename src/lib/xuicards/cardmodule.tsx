//src\lib\xuicards\cardmodule.tsx

//src\lib\xuicards\cardmenuoption.tsx

import React from "react";
import { AppThemifyIcons } from "@/style/appthicons";
import { AppConstants } from "@/lib/common/app/constants";


export interface CardModuleIfc {
    name: string;
    text: string;
    onselection: (operation: string) => void;
    iconname?: string;
    iconcolor?: string;
    iconsize?: string;
}
export function CardModule({ name, text, onselection, iconname, iconsize, iconcolor }: CardModuleIfc) {

    let iconclass: string = AppConstants.UNDEFINED;
    if (iconname) {
        const icon_size: string = iconsize ?? AppThemifyIcons.DEF_SIZE;
        iconclass = AppThemifyIcons.getIconClass(iconname, icon_size, iconcolor);
    }

    const handleOnClick = () => {
        onselection(name);
    };

    return (
        <div className="card bg-base-100 w-all shadow-sm border" onClick={handleOnClick}>
            <div className="card-body flex-row">
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