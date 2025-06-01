import * as THREE from 'three';
import { Vector3 } from 'three';


/**
 * class ThreeSegment
 */
export class ThreePlane {

    public position:THREE.Vector3; 

    constructor(position:THREE.Vector3,geometry:THREE.BufferGeometry ){
        this.position = position;
    }
    
    /*
    getGeoBuffer(): THREE.BufferGeometry {
        return new THREE.BufferGeometry().setFromPoints(this.objvertex); 
    }
    */
}//end class