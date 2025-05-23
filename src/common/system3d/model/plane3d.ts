import { Math3dPlane } from "@/common/math/math3dplane";
import { Dimension } from "@/common/model/base/dimension";
import { Vector3d } from "@/types/types";
import { System3d } from "../system3d";
import { Point3d } from "./point3d";
import { Point2D } from "@/common/graphics/model/point2d";


/**
 * class Plane3d 
 *  dimension.width = dimension.height
 *  not horizontal rotation
 *  axis X, Y , Z 
 *  direction +-Axis
 */
export class Plane3d_Y {

    public color: string;
    public alpha: number = 1.0;
    public axis: number = System3d.AXIS_Y;
    public size: number;
    public sides: number;
    public sizeunit: number = 0;

    public position: Vector3d;
    public direction: Vector3d = [0, 0, 0];
    public vertex: Point3d[][];

    //public dimension: Dimension;

    constructor(size: number, position: Vector3d, sides: number, color: string) {
        this.size = size;
        this.position = position;
        this.sides = sides;
        this.color = color;
        this.direction[Math.abs(this.axis)] = this.axis;
        this.sizeunit = Math.floor(this.size / this.sides);
        this.vertex = Math3dPlane.getPointsPlaneY(this.size, this.position, this.sides);
    }

    
    public getSelectedVertex(vertexflags: boolean[][]): Vector3d[] {
        let selVertex: Vector3d[] = [];
        for (let x: number = 0; x < vertexflags.length; x++) {
            for (let z: number = 0; z <vertexflags[x].length; z++) {
                if(vertexflags[x][z]){
                    selVertex.push(this.vertex[x][z].position);
                }
            }
        }
        return selVertex;
    }

}//end class