




import { useRef } from "react";

import { JSX } from "react";

import * as THREE from 'three';



import { GeoMaterials } from "../three/material/geomaterials";
import { Rotation3d, Vector3d } from "@/types/types";
import { WebColors } from "@/common/graphics/color/webcolors";
import { LineMaterials } from "../three/material/linematerials";

import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVH } from 'three-mesh-bvh';

export interface GlPlaneIfc {
    position: Vector3d;
    rotation: Rotation3d;    
    geometry:THREE.BufferGeometry;
    material:THREE.MeshStandardMaterial;
}

export default function GlPlane({position,rotation, geometry, material }: GlPlaneIfc) {
    return (
        <mesh position={position}
                rotation={rotation}
                geometry={geometry}
                material={material} />
    );

}//end component

