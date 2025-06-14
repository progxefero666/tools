
/*
 in globals.css
    .ti-xs { font-size: 12px; } 
    .ti-sm { font-size: 16px; } 
    .ti-md { font-size: 24px; }
    .ti-lg { font-size: 32px; }
    .ti-xl { font-size: 48px; } 
*/

/**
 * class AppThemifyIcons.TI_CLOSE TI_ANGLE_UP
 */
export class AppThemifyIcons {

    public static DEF_SIZE: string = "sd";
    public static DEF_COLOR: string = "black";
    //public static DEF_CSS_SIZE: string = "h-[20px] w-[20px]";


    public static readonly TI_ARROWCIRCLE_DOWN: string = "arrow-circle-down";
    public static readonly TI_ARROWCIRCLE_UP: string = "arrow-circle-up";
    public static readonly TI_ANGLE_UP: string = "angle-up";
    public static readonly TI_ARROW_DOWN: string = "angle-down";
    public static readonly TI_ARROW_UP: string = "arrow-up";
    public static readonly TI_EYE: string = "eye";
    public static readonly TI_USER: string = "user";
    public static readonly TI_LINK: string = "link";
    public static readonly TI_BACK: string = "angle-left";
    public static readonly TI_HOME: string = "home";
    public static readonly TI_INFO: string = "info-alt";
    public static readonly TI_ALERT: string = "alert";
    public static readonly TI_PING: string = "pin-alt";
    public static readonly TI_WIDGET: string = "widget-alt";
    public static readonly TI_IMPORT: string = "import";
    public static readonly TI_FILTER: string = "filter";
    public static readonly TI_SEARCH: string = "search";
    public static readonly TI_VOLUMECHANGE: string = "announcement";
    public static readonly TI_PALETTE: string = "palette";
    public static readonly TI_CLEAN: string = "brush-alt";
    public static readonly TI_PULSE: string = "pulse";
    public static readonly TI_TIMER: string = "timer";
    public static readonly TI_IMAGE: string = "image";
    public static readonly TI_VOLUME: string = "volume";
    public static readonly TI_VIDEOCLAPPER: string = "video-clapper";
    public static readonly TI_VIDEOCAMERA: string = "video-camera";
    public static readonly TI_STATSUP: string = "stats-up";
    public static readonly TI_CONTROLPLAY: string = "control-play";
    public static readonly TI_CONTROLPAUSE: string = "control-pause";
    public static readonly TI_CONTROLSTOP: string = "ccontrol-stop";
    public static readonly TI_CONTROLRECORD: string = "control-pause";
    public static readonly TI_CONTROLINIT: string = "control-skip-backward";
    public static readonly TI_CONTROLPREV: string = "control-backward";
    public static readonly TI_CONTROLNEXT: string = "control-forward";
    public static readonly TI_EDIT: string = "marker-alt";
    public static readonly TI_ADD: string = "plus";
    public static readonly TI_DELETE: string = "trash";
    public static readonly TI_CLOSE: string = "close";
    public static readonly TI_EDITFILE: string = "write";
    public static readonly TI_UPLOAD: string = "export";
    public static readonly TI_DOWNLOAD: string = "cloud-down";
    public static readonly TI_NEW: string = "file";
    public static readonly TI_COPY: string = "files";
    public static readonly TI_MENU: string = "menu";
    public static readonly TI_SETTINGS: string = "panel";


    public static readonly TI_GITHUB: string = "github";
    public static readonly TI_GOOGLE: string = "google";
    
    public static getSizeClassName(size: string): string {
        let value: string = "ti-".concat(size);
        return value;
    }
    public static getColorClassName(color: string): string {
        return "icon-color-".concat(color);
    }
    public static getIconClass(icon: string, iconSize: string, iconColor?: string): string {
        const icon_color: string = iconColor ?? AppThemifyIcons.DEF_COLOR;
        const colorClass: string = AppThemifyIcons.getColorClassName(icon_color);
        const sizeClass: string = AppThemifyIcons.getSizeClassName(iconSize);
        const iconclass: string = colorClass.concat(" ti ").concat(sizeClass).concat(" ti-").concat(icon);
        return iconclass;
    }


} //end class

