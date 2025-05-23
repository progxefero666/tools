
import { JSX } from "react";

import * as THREE from 'three';

import { GeoMaterials } from "../material/geomaterials";
import { Vector3d } from '@/types/types';
import { Plane3d_Y } from "@/common/system3d/model/plane3d";


export const RenderPlaneY = (plane:Plane3d_Y): JSX.Element => {

    const obj_material = GeoMaterials.getGeoObjMaterial(plane.color,plane.alpha, 0.2, 0.2);
    const planeArgs: [number,number,number,number] = [plane.size,plane.size,plane.sides,plane.sides];

    return (
        <mesh
            material={obj_material}
            position={plane.position}
            geometry={new THREE.PlaneGeometry(...planeArgs)} 
            rotation={[-Math.PI / 2, 0, 0]} />
    )

}//end render
