
import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";


/**
 * class XImageBuffer.getCloned
 */
export class XImageBuffer {
    
    public static getCloned(ximgbuffer:XImageBuffer):XImageBuffer{
        return new XImageBuffer(ximgbuffer.content,
                                ximgbuffer.dimension,
                                ximgbuffer.coords,
                                ximgbuffer.alpha);
    }
    
    public content:Buffer;
    public dimension: Dimension;
    public coords: Point2D = Point2D.DEF;
    public alpha: number = 1.0;
    
    constructor(content:Buffer,dimension: Dimension,coords?: Point2D, alpha?: number) {
        this.content    = content;
        this.dimension  = dimension;
        if(coords)  {this.coords = coords;}
        if(alpha)   {this.alpha = alpha;} 
    }

}//end class