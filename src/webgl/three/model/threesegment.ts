import * as THREE from 'three';
import { Vector3 } from 'three';


/**
 * class ThreeSegment
 */
export class ThreeSegment {

    public objvertex:THREE.Vector3[]; 

    constructor(start:THREE.Vector3,end:THREE.Vector3){
        this.objvertex = [start,end];
    }
    
    getGeoBuffer(): THREE.BufferGeometry {
        return new THREE.BufferGeometry().setFromPoints(this.objvertex); 
    }

}//end class