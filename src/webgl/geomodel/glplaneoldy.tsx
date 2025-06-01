




import { useRef } from "react";

import { JSX } from "react";

import * as THREE from 'three';
import { Vector3,Mesh, Group } from "three";


import { GeoMaterials } from "../three/material/geomaterials";
import { GlConfig } from "../glconfig";
import { Rotation3d, Vector3d } from "@/types/types";
import { WebColors } from "@/common/graphics/color/webcolors";
import { LineMaterials } from "../three/material/linematerials";

export interface GlPlaneOldIfc {
    size: number;
    sides: number;
    position: Vector3d;
    rotation?: Rotation3d;
    direction?: Vector3d;
    showmesh: boolean;
    showgrid: boolean;
    meshColor: string;
    gridColor?: string;
}

export default function GlPlaneOld({ size, sides, position, showmesh, showgrid, meshColor, gridColor }: GlPlaneOldIfc) {

    const plane_geometry = new THREE.PlaneGeometry(size, size, sides, sides);
    const grid_geometry = new THREE.WireframeGeometry(plane_geometry);

    const mesh_material: THREE.MeshStandardMaterial = GeoMaterials.getGeoObjMaterial(meshColor, 1.0, 0, 0.2);
    const grid_material: THREE.LineBasicMaterial = LineMaterials.getMaterial((gridColor ?? WebColors.COLOR_BLACK), 2, 1.0);

    const rotationY:Rotation3d =[-Math.PI / 2, 0, 0];
    return (
        <group position={position} rotation={rotationY}>

            {showmesh ?
                <mesh position={position}
                      geometry={plane_geometry}
                      material={mesh_material} />
                : null}

            {showgrid ?
                <lineSegments geometry={grid_geometry}
                              material={grid_material} />
                : null}
        </group>

    );

}//end component

/*

    return (
        <group position={objPosition}
               rotation={objRotacion}>

            <mesh material={objMaterial}
                  position={bodyPosition}>
                <cylinderGeometry args={cylinderArgs} />        
            </mesh>
            <mesh material={objMaterial} 
                  position={conePosition}>
                <coneGeometry args={coneArgs} />
            </mesh>
        </group>
    );
    const obj_material = GeoMaterials.getGeoObjMaterial(plane.color,plane.alpha, 0.2, 0.2);
    const planeArgs: [number,number,number,number] = [plane.size,plane.size,plane.sides,plane.sides];
*/