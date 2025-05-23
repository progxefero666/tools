

import { Point3d } from '@/common/system3d/model/point3d';
import * as THREE from 'three';
import { Raycaster,Vector2,Vector3,
        PerspectiveCamera,OrthographicCamera } from 'three';


/**
 * class Threemath.chargeIntersections(direction,vertex,target);
 */        
export class Threemath {

    /*lookAt ( vector : Vector3 ) :
	raycaster.setFromCamera( pointer, camera );
    const pointer = new THREE.Vector2();*/

    public static chargeIntersections(direction: THREE.Vector3,vertex: Point3d[][],target:THREE.Object3D):void{

        for (let x: number = 0; x < vertex.length; x++) {
            for (let z: number = 0; z < vertex[x].length; z++) {
                if (vertex[x][z].flag_selected == 1) {
                    const raycaster = new THREE.Raycaster();
                    raycaster.set(vertex[x][z].getThreePoint(), direction);
                    const intersects = raycaster.intersectObject(target);
                    if (intersects.length > 0) {
                        //THREE.Vector3=intersects[0].point;
                        console.log("intersección");                        
                       vertex[x][z].flag_distance = intersects[0].distance;
                    }
                    else {
                        //console.log("No hay intersección");
                        vertex[x][z].flag_distance = 0;
                    }
                }
            }
        }       
    }

    public static getOneIntersection(origin:Point3d):THREE.Vector3|null {
        const inter_point:THREE.Vector3 = new THREE.Vector3(0,0,0);
        return inter_point;
    }

}//end class