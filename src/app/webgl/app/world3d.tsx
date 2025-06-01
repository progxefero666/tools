
import React from 'react';

import { ThreeUtil } from '@/webgl/three/threeutil';
import { ThreeSegment } from '@/webgl/three/model/thsegment';
import { RenderThreeSegment } from '@/webgl/three/render/threnderlines';
import { GlWorld } from '@/webgl/glworld';
//import * as THREE from 'three';
//import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
//import { Html, OrthographicCamera } from '@react-three/drei'
//import { Line, OrbitControls } from '@react-three/drei'

/*
    premultipliedAlpha: false,    
    stencil: false,
    precision: "highp",// Precisión shaders
    depth: true   
const gl_config: THREE.WebGLRendererParameters = {
    antialias: true,
    logarithmicDepthBuffer: true,    // big escenes
    powerPreference: "high-performance", // Prioriza GPU 
};        
*/

/**
 * Render World 3d Axis: X, Y, Z 
 */
export const RenderSystem = React.memo(() => {

    const lines_opacity: number = 0.75;
    const axis_x: ThreeSegment = ThreeUtil.getThreeSegment(GlWorld.AXIS_X);
    const axis_y: ThreeSegment = ThreeUtil.getThreeSegment(GlWorld.AXIS_Y);
    const axis_z: ThreeSegment = ThreeUtil.getThreeSegment(GlWorld.AXIS_Z);

    return (
        <>
            <RenderThreeSegment
                start={axis_x.objvertex[0]}
                end={axis_x.objvertex[1]}
                color={GlWorld.AXIS_X.color}
                opacity={lines_opacity} />

            <RenderThreeSegment
                start={axis_y.objvertex[0]}
                end={axis_y.objvertex[1]}
                color={GlWorld.AXIS_Y.color}
                opacity={lines_opacity} />

            <RenderThreeSegment
                start={axis_z.objvertex[0]}
                end={axis_z.objvertex[1]}
                color={GlWorld.AXIS_Z.color}
                opacity={lines_opacity} />

        </>

    );

});
