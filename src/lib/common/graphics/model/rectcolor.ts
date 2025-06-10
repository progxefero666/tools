import { XColor } from "@/lib/common/graphics/color/xcolor";
import { Dimension } from "@/lib/common/model/base/dimension";


export class RectColor {

    public dimension: Dimension;
    public color: XColor;
    public cvcolor:string;
    public sharpColor: { r: number; g: number; b: number; alpha: number };

    constructor(dimension: Dimension,color: XColor) {        
        this.dimension = dimension;
        this.color = color;
        this.cvcolor = this.color.cvcolor;
        this.sharpColor = this.color.sharpColor;
    }
    
}