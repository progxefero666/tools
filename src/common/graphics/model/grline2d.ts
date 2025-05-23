import { Point2D } from "./point2d";


/**
 * class GrLine2D
 */
export class GrSegment2D {

    public cero: Point2D = Point2D.DEF;
    public uno: Point2D = Point2D.DEF;
    public color:string;

    constructor(cero: Point2D, uno: Point2D,color:string) {
        this.cero = cero;
        this.uno = uno;
        this.color = color;
    }

}//end class