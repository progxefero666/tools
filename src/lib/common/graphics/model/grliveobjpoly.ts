import { GColors } from "../color/colorlib";
import { XColor } from "../color/xcolor";
import { Point2D } from "./point2d";

/**
 * class LiveObjPoly
 */
export class LiveObjPoly {

    public static DEF_BSIZE:number = 1;

    public center: Point2D = Point2D.DEF;
    public color: XColor |null = null;
    public bcolor: XColor |null = null;
    public bsize: number = 1;

    public listvertex: Point2D[]=[];//relative to center
    public points: Point2D[]=[];//canvas coords

    constructor(center: Point2D,listvertex: Point2D[], color: XColor|null,bcolor:XColor|null, bsize?: number) {
        this.center = center;
        this.listvertex = listvertex;
        this.color = color;
        this.bcolor = bcolor;
        if(bsize) {this.bsize = bsize;}
    }    

  
}//end class
