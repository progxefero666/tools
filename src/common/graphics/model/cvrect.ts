
import { Dimension } from "../../model/base/dimension";
import { XColor } from "../color/xcolor";


export class CvRect {

    public dimension: Dimension;
    public color: string;

    constructor(dimension: Dimension,color: string) {        
        this.dimension = dimension;
        this.color = color;
    }
    
}