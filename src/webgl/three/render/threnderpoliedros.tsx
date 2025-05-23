
import { JSX } from 'react';
import * as THREE from 'three'; // Importa Three.js
import { GeoMaterials } from '../material/geomaterials';
import { Vector3d } from '@/types/types';
import { MetalMaterials } from '../material/metalmaterials';
import { DataUtil } from '@/common/math/datautil';
import { ThreeUtil } from '../threeutil';
import { Point3d } from '@/common/system3d/model/point3d';


export class GlPoliedros {
    public static readonly SPHERE_SIDES: number = 32;
    public static readonly SPHERE_RADIUS: number = 0.5;
}


export const RenderMiniSpheresV = (radius: number, color: string, positions: Vector3d[]): JSX.Element => {
    const objMaterial = MetalMaterials.getMaterial(color, 0.95, 0.01);
    return (
        <group>
            {positions.map((pos: Vector3d, index: number) => (
                <mesh material={objMaterial} key={index}
                    position={pos}>
                    <sphereGeometry args={[radius, GlPoliedros.SPHERE_SIDES, GlPoliedros.SPHERE_SIDES]} />
                </mesh>
            ))}
        </group>
    );
};

export const RenderMiniSpheresP = (radius: number, color: string, positions: Point3d[]): JSX.Element => {
    const objMaterial = MetalMaterials.getMaterial(color, 0.95, 0.01);
    return (
        <group>
            {positions.map((pos: Point3d, index: number) => (
                <mesh material={objMaterial} key={index}
                    position={pos.position}>
                    <sphereGeometry args={[radius, GlPoliedros.SPHERE_SIDES, GlPoliedros.SPHERE_SIDES]} />
                </mesh>
            ))}
        </group>
    );
};

export const RenderSphere = (objId:number,position: Vector3d, radius: number, color: string, alpha?: number): JSX.Element => {
    const objMaterial = MetalMaterials.getMaterial(color, 0.95, 0.01);

    return (
        <mesh material={objMaterial} name="masa"
            position={position}>
            <sphereGeometry args={[radius, GlPoliedros.SPHERE_SIDES, GlPoliedros.SPHERE_SIDES]} />
        </mesh>
    );
};

export const RenderBox = (position: Vector3d, size: number, color: string, alpha?: number): JSX.Element => {
    const objMaterial = GeoMaterials.getGeoObjMaterial(color, alpha ?? 1.0, 0.2, 0.2);
    return (
        <mesh material={objMaterial} position={position}>
            <boxGeometry args={[size, size, size]} />
        </mesh>
    );
};

export const RenderCylinder = (position: Vector3d, radius: number, len: number, sides: number,
    color: string, alpha?: number): JSX.Element => {

    const objMaterial = GeoMaterials.getGeoObjMaterial(color, alpha ?? 1.0, 0.2, 0.2);

    const cylinderArgs: [number, number, number, number, number, boolean]
        = [radius, radius, len, sides, sides, true];
    // Usa THREE.CylinderGeometry
    return (
        <mesh material={objMaterial} position={position}>
            <cylinderGeometry args={cylinderArgs} />
        </mesh>
    );
};
