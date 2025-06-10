
import { Graphix } from "../graphix";
import { XColor } from "../color/xcolor";
import { Dimension } from "@/lib/common/model/base/dimension";
import { Point2D } from "./point2d";

/**
 * class GrObjFrame
 */
export class GrObjFrame {

    public static readonly DEF: GrObjFrame = new GrObjFrame
            (Point2D.DEF,Dimension.DEF,Graphix.DEF_BORDER_COLOR);

    public bwidth:number;
    public coords:Point2D
    public dim:   Dimension;    
    public color: XColor;
    public style: string;

    constructor(coords:Point2D,dim?: Dimension, color?: XColor,bwidth?:number, style?: string) {
        this.coords = coords ?? Point2D.DEF; 
        this.dim    = dim ?? Dimension.DEF; 
        this.color  = color ?? Graphix.DEF_OBJFRAME_COLOR; 
        this.bwidth = bwidth ?? Graphix.DEF_OBJFRAME_BWITH;
        this.style  = style ?? Graphix.DEF_OBJFRAME_STYLE; 
    }

    public updateMainParams(ncoords:Point2D,ndim:Dimension){
        this.coords = ncoords;
        this.dim = ndim;
    }

    public clone(): GrObjFrame {
        return new GrObjFrame(this.coords,this.dim,this.color,
                              this.bwidth,this.style);
    }

    public getJsonString():string {
        return JSON.stringify(this,null,4);
    }

} //end class