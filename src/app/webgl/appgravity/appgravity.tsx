import React, { useContext, useEffect, useMemo, useState } from 'react';
import { math } from "@/common/math/mathjslib";


import { Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import {
    Raycaster, Vector2, Vector3,
    PerspectiveCamera, OrthographicCamera
} from 'three';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import { GlPoliedros, RenderMiniSpheresP, RenderMiniSpheresV, RenderSphere } from '@/webgl/three/render/threnderpoliedros';
import { GlWorld } from '@/webgl/glworld';

import { RenderPlaneY } from '@/webgl/three/render/threnderplanes';
import { Plane3d_Y } from '@/common/system3d/model/plane3d';
import { PySphere } from '@/pyshic/model/pysphere';
import { WebColors } from '@/common/graphics/color/webcolors';
import { Point2D } from '@/common/graphics/model/point2d';
import { GlConfig } from '@/webgl/glconfig';
import { GlPrimitiveUtil } from '@/webgl/primitives/glprimutil';
import { ThreeLine } from '@/webgl/three/model/threeline';
import { RenderThreeLine } from '@/webgl/three/render/threnderlines';
import { System3d } from '@/common/system3d/system3d';
import { MathPoly2d } from '@/common/math/mathpoly2d';
import { Point3d } from '@/common/system3d/model/point3d';
import { ThreeGenPoliedros } from '@/webgl/three/generator/thgenpoliedros';
import { Vector3d } from '@/types/types';
import { MetalMaterials } from '@/webgl/three/material/metalmaterials';
import { PyPlaneSquare } from '@/pyshic/model/pyplane';
import GlPlane from '@/webgl/geomodel/glplaney';
import { RenderSystem } from '../app/world3d';


// sphere_mesh: THREE.Mesh; 

export interface AppGravityElements {
    pysphere: PySphere;           // Sin null
        // Sin null
    pyplane: PyPlaneSquare;       // Sin null
    scene: THREE.Scene;
    executeRays: (scene: THREE.Scene) => void;
}
export const AppGravity = ({scene, pysphere, pyplane, executeRays }: AppGravityElements) => {
    const [showRefObjects, setShowRefObjects] = useState<boolean>(false);

    const pyspherePolyLine = useMemo(() => {
        return GlPrimitiveUtil.getCfThreeLine(WebColors.COLOR_RED, System3d.CM, pysphere.radius, 64);
    }, []);

    scene.rotation.set(0, -0.1, 0); 
    executeRays(scene);

    return (
        <>
            <GlPlane size={pyplane.size} sides={pyplane.sides}
                     position={pyplane.position}
                     meshColor={pyplane.meshColor} showmesh={true}
                     gridColor={pyplane.gridColor} showgrid={true} />
            {showRefObjects ? 
                <>
                    <RenderThreeLine color={pyspherePolyLine.color} obj_vertex={pyspherePolyLine.objvertex} />
                    {RenderMiniSpheresP(0.05, WebColors.COLOR_BLUE, pyplane.vertex_sel)}   
                </>
            : null}
        </>
    );

}//end