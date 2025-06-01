//src\common\graphics\model\grline2d.ts

import { Point2D } from "./point2d";


/**
 * class GrLine2D
 */
export class GrSegment2D {

    public static DEF: GrSegment2D = new GrSegment2D
        (new Point2D(0, 0),new Point2D(1,0),"rgb(0, 0, 0)")
        
    public cero: Point2D = Point2D.DEF;
    public uno: Point2D = Point2D.DEF;
    public color:string;

    constructor(cero: Point2D, uno: Point2D,color:string) {
        this.cero = cero;
        this.uno = uno;
        this.color = color;
    }

}//end class