

import { useRef } from "react";
import { Vector3, ConeGeometry, Mesh, Group } from "three";

import { Cylinder } from '@react-three/drei'
import { GeoMaterials } from "../three/material/geomaterials";
import { GlConfig } from "../glconfig";

export interface GlArrowIfc {
    position?: [number, number, number];
    direction?: [number, number, number];
    rotation?: [number, number, number];
    len?: number;
}

export default function GlArrow({ position, direction, rotation, len }: GlArrowIfc) {

    const objMaterial = GeoMaterials.getGeoObjMaterial("red",1.0,0,0.2);
    const objPosition: [number, number, number] = position ?? [0, 0, 0];
    const objDirection: [number, number, number] = direction ?? [0, 0, 1];
    const objRotacion: [number, number, number] = rotation ?? [0, 0, 0];

    const coneLen: number = GlConfig.ARROW_CONE_LEN;
    const cylinderLen: number = ((len ?? 1.0) - coneLen);

    const bodyPosition: [number, number, number] = [0,cylinderLen / 2,0];
    const conePosition: [number, number, number] = [0,cylinderLen + (coneLen / 2),0];

    const cylinderArgs: [number, number, number, number, number, boolean] = [
        GlConfig.ARROW_BODY_RADIUS, 
        GlConfig.ARROW_BODY_RADIUS,
        cylinderLen,
        GlConfig.ARROW_SIDES,
        GlConfig.ARROW_SIDES, true ];
 
    const coneArgs: [number, number, number] = [
        GlConfig.ARROW_CONE_RADIUS, 
        coneLen,
        GlConfig.ARROW_SIDES];

    //objPosition: [0,0,0]
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

}//end component