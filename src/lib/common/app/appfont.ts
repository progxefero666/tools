
import { XColor } from "@/lib/common/graphics/color/xcolor";
import { GrFont } from "../graphics/model/grfont";

export class FntFamilies {

    public static FAMILIES: string[] = [
        "serif","Times New Roman","Georgia","monospace",
        "Garamond","sans-serif","Arial","Helvetica","Verdana",
        "Tahoma","Courier New","Lucida Console","Monaco",
        "Comic Sans MS","Brush Script MT","fantasy","Impact","Papyrus"
    ];

    public static readonly DEF_FAMILY: string = FntFamilies.FAMILIES[0];

} //end class

export class Fnt {

    // main parameters
    public static readonly DEF_FAMILY: string = "serif";
    public static readonly DEF_SIZE: number = 12;
    public static readonly DEF_SIZE_MIN: number = 12;
    public static readonly DEF_COLOR: XColor = XColor.DEF; // black
    

    public static readonly STYLES: string[] = ["normal","bold", "italic","underline"];
    public static readonly ALIGN: string[] = ["left","center","right","justify"];    
    public static readonly DEF_STYLE: number = 0; // normal
    public static readonly DEF_ALIGN: number = 0; // left
   
    public static readonly DEF_SPACE_X: number = 1; // space between letters in pixels
    public static readonly FONT_LH_PERCINC = 1.2; // 20% more than font size

    public static readonly PARAM_FAMILY: string = "family";
    public static readonly PARAM_SIZE: string = "size";
    public static readonly PARAM_COLOR: string = "color";
    public static readonly PARAM_STYLE: string = "style";
    public static readonly PARAM_ALIGN: string = "align";        
   
} //end class

export class FntHelper {

    // font line height in pixels
    public static getLineHeight(fontSize: number): number {
        return Math.round(fontSize * Fnt.FONT_LH_PERCINC); 
    }

    // font space between letters in pixels
    public static getSpaceX(fontFamily: string): number {
        //not implemented yet
        return 1; 
    }

} //end class
