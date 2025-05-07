
/*
 in globals.css
    .ti-xs { font-size: 12px; } 
    .ti-sm { font-size: 16px; } 
    .ti-md { font-size: 24px; }
    .ti-lg { font-size: 32px; }
    .ti-xl { font-size: 48px; } 
*/

export class AppThemifyIcons {

    public static DEF_SIZE: string = "md";
    public static DEF_COLOR: string = "black";
    //public static DEF_CSS_SIZE: string = "h-[20px] w-[20px]";

    public static readonly TI_PULSE:string = "pulse";
    public static readonly TI_TIMER:string = "timer";
    public static readonly TI_IMAGE:string = "image";
        
    
    public static readonly TI_VIDEOCLAPPER:string = "video-clapper";
    public static readonly TI_VIDEOCAMERA:string = "video-camera";
    public static readonly TI_STATSUP:string = "stats-up";
    


    public static getSizeClassName(size: string): string {
        let value: string = "ti-".concat(size);
        return value;
    }
    public static getColorClassName(color: string): string {
        return "icon-color-".concat(color);
    }
    public static getIconClass(icon: string, iconSize: string,iconColor?:string): string {
        const icon_color:string  = iconColor?? AppThemifyIcons.DEF_COLOR;
        const colorClass: string = AppThemifyIcons.getColorClassName(icon_color);
        const sizeClass: string  = AppThemifyIcons.getSizeClassName(iconSize);
        const iconclass: string  = colorClass.concat(" ti ").concat(sizeClass).concat(" ti-").concat(icon);
        return iconclass;
    }


} //end class

