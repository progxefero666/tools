import { Vector3d } from "@/types/types";
import { GlConfig } from "@/webgl/glconfig";
import { number } from "mathjs";


/**
 * class Math3d Circunference
 */
export class Math3dCf {

    //for plane vertical axis 
    //three.js --> axis Y: 0 -->return values x,z      
    public static getCfPoint(center: Vector3d, radius: number, angle: number): Vector3d {
        const coord_h: number = center[1];//axis y
        const coord_x = center[0] + radius * Math.cos(angle);
        const coord_z = center[2] + radius * Math.sin(angle);
        return [coord_x, coord_h, coord_z];
    }

    //for plane vertical axis 
    //three.js --> axis Y: 0 -->return values x,z    
    public static getCfVertex(center: Vector3d, radius: number, countSides: number, dir: number): Vector3d[] {

        const coord_h: number = center[1];//axis y
        const obj_vertex: Vector3d[] = [];

        const angleStep: number = (Math.PI * 2) / countSides;

        let angCurrent: number = 0.0;
        for (let idx = 0; idx < countSides; idx++) {
            const coord_x = center[0] + radius * Math.cos(angCurrent);
            const coord_z = center[2] + radius * Math.sin(angCurrent);
            obj_vertex.push([coord_x, coord_h, coord_z]);
            if (dir==GlConfig.DIR_POS) { angCurrent += angleStep; }
            else { angCurrent -= angleStep; }
        }
        return obj_vertex;
    }

    //Math3d.calculateChordLength(radius: number, angleRadians: number)
     //public static getCurves2s

} //end class