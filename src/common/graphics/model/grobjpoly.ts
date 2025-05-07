import { GColors } from "../color/colorlib";
import { Point2D } from "./point2d";


/**
 * class GraphObjPoly
 */
export class GraphObjPoly {

    public static DEF_BSIZE:number = 1;

    public points: Point2D[];
    public color: string  = GColors.TRANSP;
    public bcolor: string = GColors.TRANSP;
    public bsize: number = GraphObjPoly.DEF_BSIZE;

    constructor(points: Point2D[], color?: string|null, bcolor?: string|null, bsize?: number) {
        this.points = points;
        if(color){this.color = color;}
        if(bcolor){this.bcolor = bcolor;}
        if(bsize){this.bsize = bsize;}
    }

} //end class

