import { Vector3d } from "@/types/types";

/**
 * class GlSegment
 */
export class GlSegment {

    public color:string;
    public start:Vector3d;
    public end:Vector3d;

    constructor(color:string,start:Vector3d,end:Vector3d){
        this.color = color;
        this.start = start;
        this.end = end;
    }

}//end class