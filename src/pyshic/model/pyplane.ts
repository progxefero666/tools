
import * as THREE from 'three';
import { Vector3,Mesh, Group } from "three";

import { Math2D } from "@/common/math/math2d";
import { Point2D } from "@/common/graphics/model/point2d";
import { Rotation3d, Vector3d } from "@/types/types";
import { Math3dPlane } from "@/common/math/math3dplane";
import { System3d } from "@/common/system3d/system3d";
import { Point3d } from "@/common/system3d/model/point3d";


/**
 * class PyPlane
 */
export class PyPlaneSquare {

    public axis: number;
    public size: number;
    public sides: number;
    public sizeunit: number = 0;

    public position: Vector3d;
    public direction: Vector3d = [0, 0, 0];
    public rotation: Rotation3d = [0, 0, 0];

    //materials
    public meshAlpha: number = 1.0;
    public meshColor: string = "#00ff00";
    public gridColor: string = "#000000";

    //grid
    public vertex: Point3d[][];
    public vertex_sel: Point3d[] = [];

    constructor(axis: number, size: number, sides: number,
                position: Vector3d, rotation: Rotation3d,
                meshColor: string, gridColor: string) {
        this.axis = axis;
        this.size = size;
        this.sides = sides;
        this.position = position;
        this.rotation = rotation;
        this.direction = [0.0, 1.0, 0.0];
        this.meshColor = meshColor;
        this.gridColor = gridColor;
        this.sizeunit = this.size / this.sides;
        this.vertex = Math3dPlane.getPointsPlaneY(this.size, this.position, this.sides);
    }
    
    public getThreeDirection():THREE.Vector3 {
        return new THREE.Vector3
            (this.direction[0],this.direction[1],this.direction[2]);
    } 
            
    public selectVertex(vertexflags: boolean[][]):void {
        this.vertex_sel = [];
        for (let x: number = 0; x < vertexflags.length; x++) {            
            for (let z: number = 0; z <vertexflags[x].length; z++) {
                if(vertexflags[x][z]){
                    this.vertex[x][z].flag_selected = 1;
                    this.vertex_sel.push(this.vertex[x][z]);
                }
            }
        }
    }

    //new THREE.Vector3(point.x, point.y, point.z); 

}//end class


//this.direction[Math.abs(this.axis)] = this.axis;