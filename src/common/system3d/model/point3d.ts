
import { Vector3d } from "@/types/types";

import * as THREE from 'three';

/**
 * export type Vector3d = [number, number, number];
 * class PyPoint
 */
export class Point3d {

    public position: Vector3d;
    public direction: Vector3d;
    public flag_selected:number = 0;
    public flag_distance:number = 0;

    constructor(position: Vector3d,direction: Vector3d){
        this.position = position;
        this.direction = direction;
    }

    getThreePoint():THREE.Vector3{
        return new THREE.Vector3(this.position[0], this.position[1],this.position[2]);
    }

    getThreeDirection():THREE.Vector3{
        return new THREE.Vector3(this.direction[0], this.direction[1],this.direction[2]);
    }
    
}//end class