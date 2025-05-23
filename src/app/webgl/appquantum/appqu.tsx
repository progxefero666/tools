
import React from 'react';
import { math } from "@/common/math/mathjslib";

import { Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { Html, OrthographicCamera } from '@react-three/drei'

import { RenderSphere } from '@/webgl/three/render/threnderpoliedros';
import { GlWorld } from '@/webgl/glworld';

import { ThreeUtil } from '@/webgl/three/threeutil';
import { ThreeSegment } from '@/webgl/three/model/threesegment';

import { GlLine } from '@/webgl/primitives/model/glline';
import { GlConfig } from '@/webgl/glconfig';
import { GlPrimitiveUtil } from '@/webgl/primitives/glprimutil';
import { ThreeLine } from '@/webgl/three/model/threeline';
import { RenderThreeLine } from '@/webgl/three/render/threnderlines';
import { RenderSystem } from '../app/world3d';


// main wgl scene
export const AppScene = () => {
    

    //GlCamera
    //const matrix = math.matrix([[7, 1], [-2, 3]]) 
    //<GlArrow position={[0,0,0]} len={1} />
    /*
    {RenderSphere([0, 0, 0], 1, "red", 0.5)}
        <mesh rotation={[0, Math.PI / 4, 0]}>
      
      getCfThreeLine
    */
    //const cfLineTest:GlLine = GlPrimitiveUtil.getCfGlLine("#ff00ff",GlWorld.CM,1.2,32,GlConfig.DIR_POS) ;

    const cfLineTest:ThreeLine = GlPrimitiveUtil.getCfThreeLine("#ff00ff",GlWorld.CM,1.2,32,GlConfig.DIR_POS) ;

    const { scene } = useThree();
    scene.background = new THREE.Color('#FFFFFF');
    scene.rotation.set(0, 0.1, 0);
    return (
        <>
            <ambientLight intensity={GlWorld.AMBIENT_LIGHT_INT}
                color={GlWorld.AMBIENT_LIGHT_COLOR} />
            <RenderSystem />
            <RenderThreeLine color={cfLineTest.color} obj_vertex={cfLineTest.objvertex} />
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="white"
                    metalness={0} // Reduce efecto metálico
                    roughness={0.2} // Aumenta reflectividad
                    toneMapped={false} 
                />
            </mesh>
            <OrbitControls />
        </>
    );

};

