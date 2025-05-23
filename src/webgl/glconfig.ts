import { Vector3d } from "@/types/types";


/**
 * class GlConfig.DIR_NEG
 */
export class GlConfig {

    public static readonly DIR_POS: number = 1;
    public static readonly DIR_NEG: number = -1;

    public static readonly Z_NEG: number = -1;
    public static readonly X_NEG: number = -1;
    public static readonly Y_NEG: number = -1;

    public static readonly ARROW_SIDES: number = 16;
    public static readonly ARROW_BODY_RADIUS: number = 0.05;
    public static readonly ARROW_CONE_RADIUS: number = 0.12;
    public static readonly ARROW_CONE_LEN: number = 0.3;

    public static ARROW_CYLINDER_ARGS: [number, number, number, number, number, boolean] = [
        GlConfig.ARROW_CONE_RADIUS, 
        GlConfig.ARROW_CONE_RADIUS,
        1,
        GlConfig.ARROW_SIDES,
        GlConfig.ARROW_SIDES, true ];

    public static readonly DEF_CAMERA_DISTCC:number = 4;
    public static readonly DEF_CAMERA_HINC:number = 0.25;

    public static readonly DEF_CAMERA_DIRECTION:Vector3d = [0,0,GlConfig.Z_NEG];//Z neg

    public static readonly CAMERA_FOV:number = 45;//degrees
    public static readonly CAMERA_ASPECT:number = 1.0;
    public static readonly CAMERA_NEAR:number = 0.1;
    public static readonly CAMERA_FAR:number = 2000.0;


}//end class