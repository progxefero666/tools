import { Vector3d } from "@/types/types";
import { Point3d } from "../system3d/model/point3d";


/**
 * class DataUtil.getDistanceMaxByFlag
 *       DataUtil.getDistanceMinByFlag
 */
export class DataUtil {

    public static getVertexBuffer(vertex: Vector3d[]): Float32Array {
        const vertices = new Float32Array(vertex.length * 3);
        for (let i = 0; i < vertex.length; i++) {
            vertices[i * 3] = vertex[i][0];     
            vertices[i * 3 + 1] = vertex[i][1]; 
            vertices[i * 3 + 2] = vertex[i][2]; 
        }
        return vertices;
    }

    public static getDistanceMinByFlag(vertex: Point3d[]):number {
        let distMin:number=1000000;
        for (let idx:number=0;idx<vertex.length;idx++) {  
            if(vertex[idx].flag_selected==1){
                if(vertex[idx].flag_distance<distMin){
                    distMin = vertex[idx].flag_distance;
                }
            }
        }
        return distMin;
    }

    public static getDistanceMaxByFlag(vertex: Point3d[]):number {
        let distMax:number=0;
        for (let idx:number=0;idx<vertex.length;idx++) {  
            if(vertex[idx].flag_selected==1){
                if(vertex[idx].flag_distance>distMax){
                    distMax = vertex[idx].flag_distance;
                }
            }
        }
        return distMax;
    }
        
}//end 