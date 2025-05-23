import { Vector3d } from "@/types/types";


/**
 * class DataUtil.getVertexBuffer
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

}//end 