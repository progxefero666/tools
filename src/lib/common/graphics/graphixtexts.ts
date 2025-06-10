import { Dimension } from "@/lib/common/model/base/dimension";
import { GrFont } from "./model/grfont";
import { Point2D } from "./model/point2d";

/**
 * class TextBase.getTextDimension
 */
export class TextBase {

    public static DEF_VALUE: string = "default";
    
    public static checkGrTextValue(value:string):boolean {
        let res:boolean = true;
        return res;
    }

    public static getTextDimension(value:string,font:GrFont) {
        const dim_w:number = 0;
        const dim_h:number= 0;

        return new Dimension(dim_w,dim_h);         
    }

    public static getObjFrameDimension(dim:Dimension,margin:number):Dimension {
        const objDim_w :number   = dim.width  + (margin*2);
        const objDim_h :number   = dim.height + (margin*2);      
        return new Dimension(objDim_w,objDim_h);         
    }
    public static getObjFrameCoords(coords:Point2D,margin:number):Point2D {
        const coord_x:number = coords.x - margin;
        const coord_y:number = coords.y - margin;    
        return new Point2D(coord_x,coord_y);         
    }
    

}//end class