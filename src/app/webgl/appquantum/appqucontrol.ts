
import  {math} from "@/common/math/mathjslib";

import { Vector3d } from "@/types/types";
import { GlCamera } from "@/webgl/cameras/glcamera";
import { GlConfig } from "@/webgl/glconfig";


/**
 * class AppQuantumControl 
 *  DEF_CAMERA_DIRECTION: [0,0,GlConfig.Z_NEG]
 */
export class AppQuantumControl {

    public cameraMain: GlCamera;

    constructor() {

        const cam_position: Vector3d = [0, GlConfig.DEF_CAMERA_HINC, GlConfig.DEF_CAMERA_DISTCC];
        
        this.cameraMain = new GlCamera(cam_position,
            GlConfig.DEF_CAMERA_DIRECTION,
            GlConfig.CAMERA_FOV,
            GlConfig.CAMERA_ASPECT,
            GlConfig.CAMERA_NEAR,
            GlConfig.CAMERA_FAR);
    }

}//end class