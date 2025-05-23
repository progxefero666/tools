
import { Vector3d } from "@/types/types";

/**
 * class GlLine
 */
export class GlLine {

    public color:string;
    public objvertex:Vector3d[];

    constructor(color:string,objvertex:Vector3d[]){
        this.color = color;
        this.objvertex = objvertex;
    }

}//end class