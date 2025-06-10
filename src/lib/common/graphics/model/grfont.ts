
import { XColor } from "@/lib/common/graphics/color/xcolor";
import { Fnt, FntHelper } from "../../app/appfont";
import { GrBorder } from "./grborder";


/**
 * model app font 
 *  .................................................
 *  style: normal, 1 = bold, 2 = italic, 3 = underline 
 *  align: 0 = left, 1 = center, 2 = right, 3 = justify
 * 
 */
export class GrFont {
    public static readonly DEF:GrFont = new GrFont(Fnt.DEF_FAMILY, Fnt.DEF_SIZE);
    
    public family: string;
    public size: number ;
    public style: number; 
    public align: number = Fnt.DEF_ALIGN; 
    public color: XColor; 
    public lineheight: number = 0; // line height in pixels
    public spacex: number = 0; // space between letters in pixels
    public border:GrBorder = GrBorder.DEF; 

    constructor(family: string, size: number, color?: XColor, border?:GrBorder,style?: number, align?: number) {
        this.family = family;
        this.size   = size;
        this.color  = color ?? Fnt.DEF_COLOR;
        this.border = border ?? GrBorder.DEF;
        this.style  = style?? Fnt.DEF_STYLE;
        this.align  = align?? Fnt.DEF_ALIGN;
        this.postConstruct()
    }

    public postConstruct(): void {
        this.lineheight = FntHelper.getLineHeight(this.size);
        this.spacex = Fnt.DEF_SPACE_X;
    }

    public changeSize(inc:boolean): void {
        if (inc) {this.size += 1;} 
        else {
            if(this.size>Fnt.DEF_SIZE_MIN){
                this.size -= 1;
            }           
        }
    }

} //end class