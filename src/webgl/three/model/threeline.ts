import { Vector3d } from "@/types/types";
import * as THREE from 'three';
import { Vector3 } from 'three';



/**
 * class GlLine
 * vertexColors={[new THREE.Color(color), new THREE.Color(color)]}
 */
export class ThreeLine {

    public color:string;
    public objvertex:THREE.Vector3[];
    public objcolor: THREE.Color[] = [];

    constructor(color:string,objvertex:THREE.Vector3[]){
        this.color = color;
        this.objvertex = objvertex;
    }

}//end class