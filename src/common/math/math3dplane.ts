import { Vector3d } from "@/types/types";
import { Point3d } from "../system3d/model/point3d";

/**
 * class Math3dPlane.getVertexPlaneY(System3d.AXIS_Y,10.0, [0,0,0],100)
 */
export class Math3dPlane {

    //countVertex = Math.pow((sides+1),2);
    //
    public static getVertexPlaneY(size: number, position: Vector3d, sides: number): Vector3d[][] {
        const segmentSize: number = size / sides;
        const halfSize: number = size / 2.0;
        const planeVertex: Vector3d[][] = [];

        let currentX: number = position[0] - halfSize;

        for (let xIndex: number = 0; xIndex <= sides; xIndex++) {
            planeVertex[xIndex] = [];
            let currentZ: number = position[2] + halfSize;
            for (let zIndex: number = 0; zIndex <= sides; zIndex++) {
                planeVertex[xIndex].push([currentX, position[1], currentZ]);
                currentZ -= segmentSize;
            }
            currentX += segmentSize;
        }
        return planeVertex;
    }

    public static getPointsPlaneY(size: number, position: Vector3d, sides: number): Point3d[][] {
        const segmentSize: number = size / sides;
        const halfSize: number = size / 2.0;

        const direction: Vector3d = [0.0,1.0,0.0];
        const planeVertex: Point3d[][] = [];

        let currentX: number = position[0] - halfSize;

        for (let xIndex: number = 0; xIndex <= sides; xIndex++) {
            planeVertex[xIndex] = [];
            let currentZ: number = position[2] + halfSize;
            for (let zIndex: number = 0; zIndex <= sides; zIndex++) {
                const currPoint = new Point3d([currentX, position[1], currentZ],direction);
                planeVertex[xIndex].push(currPoint);
                currentZ -= segmentSize;
            }
            currentX += segmentSize;
        }
        return planeVertex;
    }

}//end class