//

import { ThemeColors } from "@/style/apptheme";
import { AppThemifyIcons } from "@/style/appthicons";
import { AppUIButtons } from "@/style/appui";
import { AppConstants } from "@/lib/common/app/constants";


/*
export class AppButtons {
    public static getButtonClass(color:string):string {
      let btnclass = "btn border-0 shadow-sm hover:shadow-md hover:shadow-gray-400";
      if (color) {
          btnclass += " ".concat(color);
      }
      return btnclass;
    }
  } //end class
*/

export interface XButtonIfc {    
    callback: (operation?: string) => void; 
    operation?: string;
    btnsize?: string;
    btndisabled?: boolean;
    btncolor?: string;        
    btntext?:string;
    iconname?: string;
    iconcolor?: string;
    iconsize?: string;     
}
export function XButton({ callback,operation,
                              btnsize,btntext,btncolor,btndisabled,
                              iconname,iconsize,iconcolor}: XButtonIfc) {

    const btn_disabled:boolean  = btndisabled ?? false;
    const btn_color: string     = btncolor ?? ThemeColors.PRIMARY;
    const btn_size: string      = btnsize ?? AppUIButtons.DEF_SIZE;
    const btn_class:string      = AppUIButtons.getButtonClass(btn_color,btn_size);
    const btn_oper: string      = operation ?? AppConstants.UNDEFINED;              

    let iconclass:string = AppConstants.UNDEFINED;
    if(iconname){
        const icon_size: string = iconsize ?? AppThemifyIcons.DEF_SIZE;        
        iconclass= AppThemifyIcons.getIconClass(iconname,icon_size,iconcolor);
    }
    
    const handleOnClick = () => {
        callback(btn_oper);        
    };
    
    return (
        <div className="icon-button" 
                onClick={handleOnClick}>
            {btntext? btntext:null}        
            {iconname ? <div className={iconclass} />:null }            
        </div>        
    )

} //end component

/*
        <button className={btn_class} 
                onClick={handleOnClick} 
                disabled={btn_disabled}>
            {btntext? btntext:null}        
            {iconname ? <div className={iconclass} />:null }            
        </button>        
 const btnclass = AppButtons.getButtonClass(btncolor);
 {RenderIcon(libicon, iconclass)} 
*/