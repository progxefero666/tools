import { XColors } from "./color/colorlib";
import { XColor } from "./color/xcolor";


/**
 *  class Graphix.OBJ_PARAM_DIMENSION
 */
export class Graphix {

    public static readonly BORDER_STYLES: string[] = [
        "solid", "dashed", "dotted", "double",
         "groove", "ridge", "inset", "outset" ];

    public static readonly DEF_BORDER_STYLE: string = Graphix.BORDER_STYLES[0]; // solid
    public static readonly DEF_BORDER_COLOR: XColor = XColor.DEF; // black

    public static readonly DEF_OBJFRAME_STYLE: string = Graphix.BORDER_STYLES[0]; 
    public static readonly DEF_OBJFRAME_COLOR: XColor = XColors.GREEN; 
    public static readonly DEF_OBJFRAME_BWITH: number = 1; 

    public static readonly OBJ_PARAM_POSITION:string = "position";
    public static readonly OBJ_PARAM_DIMENSION:string = "dimension";

} //end class