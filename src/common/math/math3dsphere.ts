import { Vector3d } from "@/types/types";

/**
 * class Math3d Math3dSpher
 */
export class Math3dSphere {

    
    /**
     * getSphereVolume: (4/3) * PI * r^3
     * @param radius The radius of the sphere.
     * @returns The volume of the sphere.
     */
    public static getSphereVolume(radius: number): number {
        return (4 / 3) * Math.PI * Math.pow(radius, 3);
    }


}//end class