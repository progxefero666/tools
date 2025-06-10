import { Graphix } from "../graphix";
import { XColor } from "../color/xcolor";


export class GrBorder {

    public static readonly DEF: GrBorder = new GrBorder(1,Graphix.DEF_BORDER_COLOR);
    public static DEF_WIDTH: number = 1;
    public static DEF_COLOR: XColor = Graphix.DEF_BORDER_COLOR; // black
    public static DEF_STYLE: string = Graphix.DEF_BORDER_STYLE; 


    public width: number = GrBorder.DEF_WIDTH;    
    public color: XColor = GrBorder.DEF_COLOR;
    public style: string = GrBorder.DEF_STYLE;

    constructor(width?: number, color?: XColor, style?: string) {
        if (width) { this.width = width; }
        if (color) { this.color = color; }
        if (style) { this.style = style; }
    }

    public clone(): GrBorder {
        return new GrBorder(this.width, this.color, this.style);
    }

} //end class