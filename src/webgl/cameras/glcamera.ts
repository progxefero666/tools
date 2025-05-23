
import { Vector3d } from "@/types/types";
import { GlConfig } from "../glconfig";

/**
 * class GlLine
 */
export class GlCamera {

    public position:Vector3d;
    public direction:Vector3d;
    public fov:number;//grades
    public aspect:number;
    public near:number;
    public far:number;
    
    constructor(position:Vector3d,direction:Vector3d,fov?:number,aspect?:number,near?:number,far?:number){
        this.position   = position;
        this.direction  = direction;
        this.fov        = fov ?? GlConfig.CAMERA_FOV;
        this.aspect     = aspect ?? GlConfig.CAMERA_ASPECT;
        this.near       = near ?? GlConfig.CAMERA_NEAR;
        this.far        = far ?? GlConfig.CAMERA_FAR;
    }

}//end class