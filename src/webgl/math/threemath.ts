
import { Vector3d } from "@/types/types";
import { Point3d } from '@/common/system3d/model/point3d';
import * as THREE from 'three';
import { Math3d } from "@/common/math/math3d";



/**
 * class Threemath.chargeDistances(origin:Vector3d,vertex: Point3d[])
 */        
export class Threemath {



   public static chargeIntersections(vertex: Point3d[],target:THREE.Object3D):void{

        for (let i: number = 0; i < vertex.length; i++) {

            if (vertex[i].flag_selected == 1) {
                const raycaster = new THREE.Raycaster();
                raycaster.set(vertex[i].getThreePoint(), vertex[i].getThreeDirection()); //direction
                const intersects = raycaster.intersectObject(target);
                if (intersects.length > 0) {
                    //THREE.Vector3=intersects[0].point;
                    console.log("intersección");                        
                    vertex[i].flag_distance = intersects[0].distance;
                }
                else {
                    console.log("No hay intersección:".concat(i.toString()));
                    vertex[i].flag_distance = 0;
                }
            }     
            else{
                vertex[i].flag_distance = -1;
            }       
        }       
    }    
    
    
    public static getOneIntersection(origin:Point3d):THREE.Vector3|null {
        const inter_point:THREE.Vector3 = new THREE.Vector3(0,0,0);
        return inter_point;
    }

    public static chargeFcIntersections(direction: THREE.Vector3,vertex: Point3d[][],target:THREE.Object3D):void{

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

}